/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import "../CustomCss/Reservation.css";
import Localbase from "localbase";
let db = new Localbase("hmctdb");
db.config.debug = false;

const AllReservations = () => {
  const [bookingData, setBookingData] = useState([])
  const location = useLocation();

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


  return (
    <div>
      <div className="bg-light vh-100">
        <nav className="navbar sticky-top navbar navbar-expand-lg bg-light">
          <div className="container-fluid">
            <div className="navbar-brand d-flex align-items-center">
              <a className="text-primary" href="/#">
                <i className="bx bx-chevrons-left"></i>
              </a>
              <h5 className="text-primary">Reservation</h5>
            </div>
          </div>
        </nav>
        <div className="container mb-5">
          <div className="d-flex justify-content-end column-gap-3">
            <button
              type="button"
              className="d-flex align-items-center text-primary btn btn-light"
            >
              <i className="bx bxs-building"></i>Reservation
            </button>
            <button
              type="button"
              className="d-flex align-items-center text-primary btn btn-light"
            >
              <i className="bx bxs-plus-square"></i>Add
            </button>
            <button
              type="button"
              className="d-flex align-items-center text-primary btn btn-light"
            >
              <i className="bx bxs-x-circle"></i>Cancel
            </button>
          </div>
          <div className="table-responsive height-500 bg-skyblue mt-4">
            <table className="table table-borderless text-primary">
              <thead>
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
                  return <tr key={item?.bookingid}>
                    <th scope="row">{index+1}</th>
                    <td>{item?.bookingdate}</td>
                    <td>{item?.bookingid}</td>
                    <td>{`${item?.name?.title} ${item?.name?.firstname} ${item?.name?.middlename} ${item?.name?.lastname}`}</td>
                    <td>{item?.arrivaldate}</td>
                    <td>{item?.departuredate}</td>
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
