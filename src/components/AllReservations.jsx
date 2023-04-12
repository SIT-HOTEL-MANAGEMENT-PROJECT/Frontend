/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import "../CustomCss/Reservation.css";
import Localbase from "localbase";
let db = new Localbase("hmctdb");
db.config.debug = false;

const AllReservations = ({isUserAdmin, isAuthenticated}) => {
  const [bookingData, setBookingData] = useState([])
  const [selectedBookingId, setSelectedBookingId] = useState("")

  const [isAddBtnDisabled, setIsAddBtnDisabled] = useState(true)
  const [isCancelBtnDisabled, setIsCancelBtnDisabled] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const firstname = query.get('firstname');
    const lastname = query.get('lastname');
    const phoneno = query.get('phoneno');

    if(!firstname && !lastname && !phoneno){
      async function fetchInitialData() {
        let reservationResData = await getAllReservationData();
        if(reservationResData.success){ setBookingData(reservationResData.data) }
      }
      fetchInitialData();
    }else{
      async function fetchInitialUserData() {
        let reservationResData = await getReservationData(firstname,lastname,phoneno);
        if(reservationResData.success){ setBookingData(reservationResData.data) }
      }
      fetchInitialUserData();
    }
  }, [location])


  useEffect(() => {
    let adminCheck = ()=>{
      let res = isUserAdmin();
      if(res.success && res.isAdmin){
        setIsAdmin(true);
      }
    }
    isAuthenticated();
    adminCheck();
  }, [])
  



  // GetAll : Get all reservation data (orderBy: recent booking first)
  // params : none 
  // return : 1. {success: true, data: [<Array of all reservation data>{},{}]}        IF ALL OK
  //          2. {success: false, msg: 'Something Went Wrong'}                        IF INTERNAL SERVER ERROR
  const getAllReservationData = async()=>{
    try{
      let reservationData = await db.collection('reservation').orderBy('bookingdate', 'desc').get();
      return {success: true, data: reservationData}
    }catch(e){
      console.log("AllReservationPageError (getAllReservationData) : ",e);
      return {success:false, msg: "Something Went Wrong"}
    }
  }


  // Get : Get all reservation data based on a particular guest (orderBy: recent booking first)
  // params : guestfirstname, guestlastname, guestphoneno
  // return : 1. {success: true, data: [<Array of all reservation data>{},{}]}        IF ALL OK
  //          2. {success: false, msg: 'No Reservations Found!'}                      IF DATA NOT FOUND
  //          3. {success: false, msg: 'Something Went Wrong'}                        IF INTERNAL SERVER ERROR
  const getReservationData = async(guestfirstname, guestlastname, guestphoneno) =>{
    try{
      let reservationData = await db.collection('reservation').orderBy('bookingdate', 'desc').get();

      const filteredData = reservationData.filter(reservation => {
        return reservation.name.firstname == guestfirstname && reservation.name.lastname == guestlastname && reservation.phoneno == guestphoneno;
      });

      if(!filteredData.length) return {success:false, msg: 'No Reservations Found!'}
      return {success: true, data: filteredData}
    }catch(e){
      console.log("AllReservationPageError (getReservationData) : ",e);
      return {success:false, msg: "Something Went Wrong"}
    }
  }

  // Remove : Remove reservation-data and release occupied rooms also
  // params : bookingid
  // return : 1. {success: true}                                                      IF ALL OK
  //          2. {success: false, msg: 'Invalid Booking Details'}                     IF BOOKING DATA NOT FOUND
  //          3. {success: false, msg: 'Something Went Wrong'}                        IF INTERNAL SERVER ERROR
  const removeReservationData = async(bookingid)=>{
    try{
      let booking = await db.collection('reservation').doc({ bookingid: bookingid }).get();

      if(!booking) { return {success:false, msg: "Invalid Booking Details"} }

      let roomreservcheck = await releaseRoomOccupancy(bookingid);

      if(!roomreservcheck.success) { return {success:false, msg: "Something Went Wrong!"} }
      
      await db.collection('reservation').doc({ bookingid: bookingid }).delete();

      return {success: true}
    }catch(e){
      console.log("AllReservationPageError (removeReservationData) : ",e);
      return {success:false, msg: "Something Went Wrong"}
    }
  }


  // Internal Service/Delete : Release Prev Stored Room Occupancy from RoomAv. DB
  // params : bookingid  (case sensitive)
  // return : 1. {success: true}                                            IF ALL OK
  //          2. {success:false, msg: "Invalid Booking Details"}            IF BOOKINGID IS INVALID/NOT FOUND
  //          3. {success:false, msg: "Something Went Wrong!"}              IF ROOMAV DB ERROR
  //          4. {success: false, msg: 'Something Went Wrong'}              IF SERVER ERROR
  const releaseRoomOccupancy = async(bookingid)=>{
    try{
      let booking = await db.collection('reservation').doc({ bookingid: bookingid }).get();
      let roomav = await db.collection("roomavailability").get();

      if(!booking) { return {success:false, msg: "Invalid Booking Details"} }
      if(!roomav)  { return {success:false, msg: "Something Went Wrong!"} }

      let rooms = booking.roomno;
      let roomtype = booking.typeofroom;
      roomtype = roomtype.toLowerCase();

      const avroomnos = rooms.split(',').map(value => value.trim()).filter(value => value !== '');

      avroomnos.forEach(avroom =>{
        const roomObj = roomav[0][roomtype][avroom];

        let bookings = roomav[0][roomtype.toLowerCase()][avroom].activeBookings;
        for (let i = 0; i < bookings.length; i++) {
          if(bookingid === bookings[i].bookingid){
            const today = new Date(); const year = today.getFullYear(); const month = String(today.getMonth() + 1).padStart(2, '0');  const day = String(today.getDate()).padStart(2, '0');
            const todayDate = `${year}-${month}-${day}`;

            if(bookings[i].arrivaldate<= todayDate && todayDate<=bookings[i].departuredate){
              if(roomObj.av == "0"){ roomObj.av = "1"; }
              break;
            }
          }
        }

        roomObj.activeBookings = roomObj.activeBookings.filter(room => room.bookingid !== bookingid);
      })

      await db.collection('roomavailability').set(roomav);
      return {success: true}
    }catch(e){
      console.log("AllReservationsPageError (releaseRoomOccupancy) : ",e);
      return {success: false, msg: 'Something Went Wrong'}
    }
  }





  const selectReservationData = (bookingID)=>{
    if(!isAdmin){ return; }

    if(selectedBookingId == bookingID){
      let tableRow = document.getElementById(selectedBookingId);
      tableRow.classList.remove('background-gray');
      setSelectedBookingId(""); setIsAddBtnDisabled(true); setIsCancelBtnDisabled(true);
      return;
    }

    if(selectedBookingId){ 
      let tableRow = document.getElementById(selectedBookingId);
      tableRow.classList.remove('background-gray')
    }

    setSelectedBookingId(bookingID);

    if(bookingID == ""){  setIsAddBtnDisabled(true); setIsCancelBtnDisabled(true); }
    else{
      setIsAddBtnDisabled(false); setIsCancelBtnDisabled(false);
      let tableRow = document.getElementById(bookingID);
      tableRow.classList.add('background-gray')
    }
  }

  const updateReservationData = ()=>{
    if(!isAdmin){ alert("Access Denied"); return; }
    navigate(`/Reservation?bookingid=${selectedBookingId}&isupdate=true`);
  }

  const deleteReservationData = async()=>{
    if(!isAdmin){ alert("Access Denied"); return; }

    let isDeleted = await removeReservationData(selectedBookingId);
    
    if(isDeleted.success){
      const query = new URLSearchParams(location.search);
      const firstname = query.get('firstname');  const lastname = query.get('lastname');   const phoneno = query.get('phoneno');

      if(!firstname && !lastname && !phoneno){
        let reservationResData = await getAllReservationData();
        if(reservationResData.success){ setBookingData(reservationResData.data) }
      }else{
        let reservationResData = await getReservationData(firstname,lastname,phoneno);
        if(reservationResData.success){ setBookingData(reservationResData.data) }
      }

      alert(selectedBookingId + " Reservation Data Deleted!");
    }else{
      alert(isDeleted?.msg);
    }

    resetUpdateOrDeleteActionChanges();
  }

  const resetUpdateOrDeleteActionChanges = ()=>{    
    if(selectedBookingId){ 
      let tableRow = document.getElementById(selectedBookingId);
      tableRow.classList.remove('background-gray')
    }
    setSelectedBookingId("");
    setIsAddBtnDisabled(true);
    setIsCancelBtnDisabled(true);
  }



  return (
    <div>
      <div className="bg-light min-height-vh">
        <nav className="navbar sticky-top navbar navbar-expand-lg bg-light">
          <div className="container-fluid">
            <div className="navbar-brand d-flex align-items-center">
              <div className="text-primary make-cursor-pointer" onClick={()=>{navigate(-1)}}>
                <i className="bx bx-chevrons-left font-size-25"></i>
              </div>
              <h5 className="text-primary">Reservation</h5>
            </div>
          </div>
        </nav>
        <div className="container mb-5">
          <div className="d-flex justify-content-end column-gap-3">
            <button
              type="button"
              className="d-flex align-items-center text-primary btn btn-light" onClick={()=>{navigate('/reservation')}}
            >
              <i className="bx bxs-building font-size-25"></i>Reservations
            </button>
            <button
              type="button"
              className="d-flex align-items-center text-primary btn btn-light" onClick={updateReservationData}
              disabled={isAddBtnDisabled}
            >
              <i className="bx bxs-plus-square font-size-25"></i>Add
            </button>
            <button
              type="button"
              className="d-flex align-items-center text-primary btn btn-light" onClick={deleteReservationData}
              disabled={isCancelBtnDisabled}
            >
              <i className="bx bxs-x-circle font-size-25"></i>Cancel
            </button>
          </div>
          <div className="table-responsive height-500 bg-skyblue mt-2">
            <table className="table table-borderless table-border-collapse text-primary">
              <thead className="table-head">
                <tr>
                  <th scope="col">Sl</th>
                  <th scope="col">Booking Date</th>
                  <th scope="col">Booking ID</th>
                  <th scope="col">Guest Name</th>
                  <th scope="col">Arrival Date</th>
                  <th scope="col">Departure Date</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {bookingData && bookingData.map((item,index)=>{
                  return <tr key={item?.bookingid} className='hover-gray make-cursor-pointer' id={item?.bookingid} onClick={()=>{selectReservationData(item?.bookingid)}}>
                    <th scope="row">{index+1}</th>
                    <td className="table-tdata">{item?.bookingdate}</td>
                    <td className="table-tdata">{item?.bookingid}</td>
                    <td className="table-tdata">{`${item?.name?.title} ${item?.name?.firstname} ${item?.name?.middlename} ${item?.name?.lastname}`}</td>
                    <td className="table-tdata">{item?.arrivaldate}</td>
                    <td className="table-tdata">{item?.departuredate}</td>
                  </tr>
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllReservations;
