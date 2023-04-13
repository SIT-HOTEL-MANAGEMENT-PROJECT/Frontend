import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../CustomCss/Reservation.css";
import Localbase from "localbase";
import { useEffect } from "react";
let db = new Localbase("hmctdb");
db.config.debug = false;

const CheckOut = () => {
  let navigate = useNavigate();
  
  const [guestName, setGuestName] = useState({
    title: "",
    firstname: "",
    middlename: "",
    lastname: "",
  });
  const [address, setAddress] = useState({
    ad1: "",
    city: "",
    state: "",
    zip: "",
  });
  const [travelAgentName, setTravelAgentName] = useState("");
  const [guestPhoneNumber, setGuestPhoneNumber] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [gstId, setGstId] = useState("");
  const [billing, setBilling] = useState("");
  const [billNo, setBillNo] = useState("");
  const [confirmationNo, setConfirmationNo] = useState("");
  const [billDate, setBillDate] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [noOfRooms, setNoOfRooms] = useState("");
  const [roomRate, setRoomRate] = useState("");
  const [guestsNo, setGuestsNo] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [departureDate, setdepartureDate] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [registrationNo, setregistrationNo] = useState("");
  const [paymentData, setPaymentData] = useState([]);
  const [ttlDebit, setTtlDebit] = useState(0);
  const [ttlCredit, setTtlCredit] = useState(0);



  useEffect(() => {
    initialPrepopulatedData();
  }, [])
  


  // Add :  Add checkout details 
  // params : none     (directly get data from useState)
  // return :   1.  {success:true}                                    IF ADDED SUCCESSFULLY
  //            2.  {success:false, msg: 'Something Went Wrong'}      IF ADD FAILED
  const updateReservationData = async()=>{
    try{
      let reservationData = await db.collection('reservation').doc({ bookingid: registrationNo }).get();
      if(!reservationData) return {success:false, msg: "Reservation Not Found!"}

      if(roomNumber){
        let isBooked = await releaseRoomOccupancy(registrationNo);
        if(!isBooked.success){  return { success: false, msg: isBooked?.msg }}
      }
      
      await db.collection('reservation').doc({bookingid: registrationNo}).update({
        checkedoutstatus: "done" 
      })

      return {success: true }     
    }catch(e){
      console.log("CheckoutPageError (updateReservationData) : ",e);
      return {success: false, msg: 'Something Went Wrong'}
    }
  }



  // Get :  Get all user data of a booking against bookingid
  // params : bookingid
  // return : 1. {success:true, data: {bookingid:"",name: {..}, phoneno: "", ...} }            IF ALL OK
  //          2. {success: false, msg: 'Something Went Wrong'}                                 IF SERVER ERROR
  //          3. {success:false, msg: "Invalid Booking Details"}                               IF BOOKING DATA NOT FOUND
  const getUserDataAgainstBookingId = async (bookingid) => {
    try {
      let booking = await db.collection('reservation').doc({ bookingid: bookingid, checkedinstatus:"done", checkedoutstatus: "pending" }).get();
      if (!booking) { return { success: false, msg: "Invalid Booking Details" } }
      return { success: true, data: booking };
    } catch (e) {
      console.log("CheckinPageError (getUserDataAgainstBookingId) : ", e);
      return { success: false, msg: 'Something Went Wrong' }
    }
  }


  // Delete : Release Room Occupancy from RoomAv. DB
  // params : bookingid (case sensitive)
  // return : 1. {success: true} IF ALL OK
  // 2. {success:false, msg: "Invalid Booking Details"} IF BOOKINGID IS INVALID/NOT FOUND
  // 3. {success:false, msg: "Something Went Wrong!"} IF ROOMAV DB ERROR
  // 4. {success: false, msg: 'Something Went Wrong'} IF SERVER ERROR
  const releaseRoomOccupancy = async (bookingid) => {
    try {
      let booking = await db
        .collection("reservation")
        .doc({ bookingid: bookingid })
        .get();
      let roomav = await db.collection("roomavailability").get();

      if (!booking) {
        return { success: false, msg: "Invalid Booking Details" };
      }
      if (!roomav) {
        return { success: false, msg: "Something Went Wrong!" };
      }

      let rooms = booking.roomno;
      let roomtype = booking.typeofroom;
      roomtype = roomtype.toLowerCase();

      const avroomnos = rooms
        .split(",")
        .map((value) => value.trim())
        .filter((value) => value !== "");

      avroomnos.forEach((avroom) => {
        const roomObj = roomav[0][roomtype][avroom];
        roomObj.av = "1";
        roomObj.activeBookings = roomObj.activeBookings.filter(
          (room) => room.bookingid !== bookingid
        );
      });

      await db.collection("roomavailability").set(roomav);
      return { success: true };
    } catch (e) {
      console.log("CheckoutPageError (releaseRoomOccupancy) : ", e);
      return { success: false, msg: "Something Went Wrong" };
    }
  };






  const getAndSetUserData = async(bookingid)=>{
    let res = await getUserDataAgainstBookingId(bookingid);
    if(res?.success){
      let booking = res?.data;
      setGuestName(booking.name);
      setTravelAgentName(booking.travelagentname);
      setGuestPhoneNumber(booking.phoneno);
      setCompanyName(booking.companyname);
      setGstId(booking.gst);
      setBilling(booking.billing);
      setBillNo(booking.billingno);
      setConfirmationNo(booking.confno);
      setRoomNumber(booking.roomno);
      setNoOfRooms(booking.noofrooms);
      setRoomRate(booking.roomrate);
      setGuestsNo(booking.phoneno);
      setArrivalDate(booking.arrivaldate); 
      setArrivalTime(booking.arrivaltime);
      // setdepartureDate(booking.departuredate);
      // setDepartureTime(booking.departuretime);
      setPaymentData(booking.paymenthistory);

      let totalDebit = 0;
      let totalCredit = 0;

      for (const transaction of booking.paymenthistory) {
        if (transaction.debit !== '') {
          totalDebit += parseFloat(transaction.debit);
        }
        if (transaction.credit !== '') {
          totalCredit += parseFloat(transaction.credit);
        }
      }

      setTtlDebit(totalDebit);
      setTtlCredit(totalCredit);
    }else{
      setGuestName({ title: "", firstname: "", middlename: "", lastname: "", });
      setTravelAgentName(''); setGuestPhoneNumber(''); setCompanyName(''); setGstId(''); setBilling(''); setBillNo('');
      setConfirmationNo(''); setRoomNumber(''); setNoOfRooms(''); setRoomRate(''); setGuestsNo(''); setArrivalDate(''); 
      setArrivalTime(''); setPaymentData([]);

      setTtlDebit(0);
      setTtlCredit(0);
    }
  }


  const initialPrepopulatedData = async()=>{
    let todayDate = new Date();
    let todayDateString = todayDate.toISOString().slice(0, 10);
    const hours = todayDate.getHours().toString().padStart(2, '0');
    const minutes = todayDate.getMinutes().toString().padStart(2, '0');
    const todayTimeString = `${hours}:${minutes}`;
    setdepartureDate(todayDateString); setDepartureTime(todayTimeString); setBillDate(todayDateString);
  }

  const handleInputChange = (e) => {
    if (e.target.name == "title") { setGuestName({ ...guestName, title: e.target.value }); }
    else if (e.target.name == "firstname") { setGuestName({ ...guestName, firstname: e.target.value }); }
    else if (e.target.name == "middlename") { setGuestName({ ...guestName, middlename: e.target.value }); }
    else if (e.target.name == "lastname") { setGuestName({ ...guestName, lastname: e.target.value }); }
    else if (e.target.name == "travelagentname") { setTravelAgentName(e.target.value); }
    else if (e.target.name == "guestphonenumber") { setGuestPhoneNumber(e.target.value); }
    else if (e.target.name == "companyname") { setCompanyName(e.target.value); }
    else if (e.target.name == "gstid") { setGstId(e.target.value); }
    else if (e.target.name == "billing") { setBilling(e.target.value); }
    else if (e.target.name == "billnumber") { setBillNo(e.target.value); }
    else if (e.target.name == "confirmationnumber") { setConfirmationNo(e.target.value); }
    else if (e.target.name == "billdate") { setBillDate(e.target.value); }
    else if (e.target.name == "roomnumber" && e.target.value!=" ") { 
      setRoomNumber(e.target.value); 
      const avroomnos = e.target.value.split(',').map(value => value.trim()).filter(value => value !== '');
      if(!avroomnos.length) { setNoOfRooms("") }
      else { setNoOfRooms(avroomnos.length); }
    }
    else if (e.target.name == "noofrooms") { setNoOfRooms(e.target.value); }
    else if (e.target.name == "roomrate") { setRoomRate(e.target.value); }
    else if (e.target.name == "guestsnumber") { setGuestsNo(e.target.value); }
    else if (e.target.name == "arrivaldate") { setArrivalDate(e.target.value); }
    else if (e.target.name == "arrivaltime") { setArrivalTime(e.target.value); }
    else if (e.target.name == "departuredate") { setdepartureDate(e.target.value); }
    else if (e.target.name == "departuretime") { setDepartureTime(e.target.value); }
    else if (e.target.name == "registrationnumber") { 
      setregistrationNo(e.target.value); 
      if(e.target.value.length != 14 && confirmationNo != '') { 
        setGuestName({ title: "", firstname: "", middlename: "", lastname: "", });
        setTravelAgentName(''); setGuestPhoneNumber(''); setCompanyName(''); setGstId(''); setBilling(''); setBillNo('');
        setConfirmationNo(''); setRoomNumber(''); setNoOfRooms(''); setRoomRate(''); setGuestsNo(''); setArrivalDate(''); 
        setArrivalTime(''); setPaymentData([]);

        setTtlDebit(0);
        setTtlCredit(0); 
      }
      else if(e.target.value.length ==14) { getAndSetUserData(e.target.value); } 
    }
  };

  const submitAction = async(e)=>{
    e.preventDefault();
    let res = await updateReservationData();
    if(res.success){
      alert("Your Checkout Successful!");
      setTimeout(() => { 
        navigate(-1);
      }, 5000);
    }else{
      alert(res.msg);
    }
  }

  return (
    <div>
      <div className="bg-light min-height-vh">
        <nav className="navbar sticky-top navbar navbar-expand-lg bg-light">
          <div className="container-fluid">
            <div className="navbar-brand d-flex align-items-center">
              <NavLink className="text-primary" to="/Home3">
                <i className="bx bx-chevrons-left font-size-25"></i>
              </NavLink>
              <h5 className="text-primary">Check Out</h5>
            </div>
          </div>
        </nav>
        <div className="container mb-1">
          <div className="d-flex align-items-center justify-content-between large-flex-column reserv-col-gap-1">
            <form className="col-6 bg-skyblue mt-0 p-2 large-width-full">
              <div className="d-flex align-items-center flex-wrap rev-margin-gap">
                <label htmlFor="name" className="col-sm-3 col-form-label font-size-14 medium-width-40percent">
                  Guest Name
                </label>
                <div className="col-sm-9 medium-width-60percent d-flex column-gap-1">
                  <select
                    id="designation"
                    className="form-select w-50 height-30 font-size-14 background-gray"
                    name="title"
                    value={guestName.title}
                    onChange={handleInputChange}
                    required
                  >
                    <option value={""}> </option>
                    <option value={"Mr"}>Mr.</option>
                    <option value={"Master"}>Master</option>
                    <option value={"Miss"}>Miss</option>
                    <option value={"Mrs"}>Mrs.</option>
                  </select>
                  <input
                    type="text"
                    className="form-control height-30 font-size-14 background-gray"
                    id="inputName"
                    name="firstname"
                    value={guestName.firstname}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="text"
                    className="form-control height-30 font-size-14 background-gray"
                    id="inputName"
                    name="middlename"
                    value={guestName.middlename}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    className="form-control height-30 font-size-14 background-gray"
                    id="inputName"
                    name="lastname"
                    value={guestName.lastname}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="d-flex medium-flex-column align-items-center rev-margin-gap">
                <div className="col-md-6 d-flex align-items-center flex-wrap medium-width-full">
                  <label
                    htmlFor="travelagentname"
                    className="col-sm-6 col-form-label font-size-14 medium-width-40percent"
                  >
                    Travel Agent{" "}
                  </label>
                  <div className="col-sm-6 medium-width-60percent">
                    <input
                      type="text"
                      className="form-control height-30 font-size-14 background-gray"
                      id="inputTravelAgent"
                      name="travelagentname"
                      value={travelAgentName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-md-6 d-flex align-items-center flex-wrap medium-width-full reserv-padding-left medium-reserv-padding-left">
                  <label
                    htmlFor="guestphonenumber"
                    className="col-sm-4 col-form-label font-size-14 medium-width-40percent"
                  >
                    Phone No{" "}
                  </label>
                  <div className="col-sm-8 medium-width-60percent">
                    <input
                      type="text"
                      className="form-control height-30 font-size-14 background-gray"
                      id="inputNumber"
                      name="guestphonenumber"
                      value={guestPhoneNumber}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center medium-flex-column rev-margin-gap">
                <div className="col-md-6 d-flex align-items-center flex-wrap medium-width-full font-size-14">
                  <label htmlFor="companyname" className="col-sm-6 medium-width-40percent col-form-label">
                    Company{" "}
                  </label>
                  <div className="col-sm-6 medium-width-60percent">
                    <input
                      type="text"
                      className="form-control height-30 font-size-14 background-gray"
                      id="inputCompany"
                      name="companyname"
                      value={companyName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-md-6 d-flex align-items-center flex-wrap medium-width-full reserv-padding-left medium-reserv-padding-left">
                  <label
                    htmlFor="gstid"
                    className="col-sm-4 col-form-label font-size-14 medium-width-40percent"
                  >
                    GST{" "}
                  </label>
                  <div className="col-sm-8 medium-width-60percent">
                    <input
                      type="text"
                      className="form-control height-30 font-size-14 background-gray"
                      min="0"
                      id="inputGstId"
                      name="gstid"
                      value={gstId}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center flex-wrap rev-margin-gap">
                <label htmlFor="billing" className="col-sm-3 col-form-label font-size-14 medium-width-40percent">
                  Billing{" "}
                </label>
                <div className="col-sm-9 medium-width-60percent">
                  <input
                    type="text"
                    className="form-control height-30 font-size-14 background-gray"
                    id="inputBilling"
                    name="billing"
                    value={billing}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="d-flex align-items-center medium-flex-column rev-margin-gap rev-margin-gap">
                <div className="col-md-6 d-flex align-items-center flex-wrap medium-width-full font-size-14">
                  <label htmlFor="billnumber" className="col-sm-6 col-form-label medium-width-40percent">
                    Bill No{" "}
                  </label>
                  <div className="col-sm-6 medium-width-60percent">
                    <input
                      type="text"
                      className="form-control height-30 font-size-14 background-gray"
                      id="inputBillNumber"
                      name="billnumber"
                      min="0"
                      value={billNo}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-md-6 d-flex align-items-center flex-wrap medium-width-full reserv-padding-left medium-reserv-padding-left">
                  <label
                    htmlFor="page"
                    className="col-sm-4 col-form-label font-size-14 medium-width-40percent"
                  >
                    Page{" "}
                  </label>
                  <div className="col-sm-8 medium-width-60percent">
                    <input
                      type="number"
                      className="form-control height-30 font-size-14 background-gray"
                      min="0"
                      id="inputPage"
                      placeholder="1 of 1"
                    />
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center flex-wrap rev-margin-gap">
                <label htmlFor="confirmationnumber" className="col-sm-3 col-form-label font-size-14 medium-width-40percent">
                  Confirmation No{" "}
                </label>
                <div className="col-sm-9 medium-width-60percent">
                  <input
                    type="text"
                    className="form-control height-30 font-size-14 background-gray"
                    id="inputConfirmationNumber"
                    name="confirmationnumber"
                    value={confirmationNo}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="d-flex align-items-center flex-wrap rev-margin-gap">
                <label htmlFor="billdate" className="col-sm-3 col-form-label font-size-14 medium-width-40percent">
                  Original Bill Date{" "}
                </label>
                <div className="col-sm-9 medium-width-60percent">
                  <input
                    type="date"
                    className="form-control height-30 font-size-14 background-gray"
                    id="inputBillDate"
                    name="billdate"
                    value={billDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </form>
            <form className="col-6 bg-skyblue mt-0 p-2 large-width-full">
              <div className="d-flex align-items-center flex-wrap rev-margin-gap">
                <label htmlFor="roomnumber" className="col-sm-3 col-form-label font-size-14 medium-width-40percent">
                  Room No{" "}
                </label>
                <div className="col-sm-9 medium-width-60percent">
                  <input
                    type="text"
                    className="form-control height-30 font-size-14 background-gray"
                    id="inputRoomNo"
                    name="roomnumber"
                    value={roomNumber}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="d-flex align-items-center flex-wrap rev-margin-gap">
                <label htmlFor="noofrooms" className="col-sm-3 col-form-label font-size-14 medium-width-40percent">
                  No of Room{" "}
                </label>
                <div className="col-sm-9 medium-width-60percent">
                  <input
                    type="number"
                    className="form-control height-30 font-size-14 background-gray"
                    min="0"
                    id="inputNoOfRoom"
                    name="noofrooms"
                    value={noOfRooms}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="d-flex align-items-center flex-wrap rev-margin-gap">
                <label htmlFor="roomrate" className="col-sm-3 col-form-label font-size-14 medium-width-40percent">
                  Room Rate{" "}
                </label>
                <div className="col-sm-9 medium-width-60percent">
                  <input
                    type="number"
                    className="form-control height-30 font-size-14 background-gray"
                    min="0"
                    id="inputRoomRate"
                    name="roomrate"
                    value={roomRate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="d-flex align-items-center flex-wrap rev-margin-gap">
                <label htmlFor="guestsnumber" className="col-sm-3 col-form-label font-size-14 medium-width-40percent">
                  Guests No{" "}
                </label>
                <div className="col-sm-9 medium-width-60percent">
                  <input
                    type="text"
                    className="form-control height-30 font-size-14 background-gray"
                    id="inputGuestsNumber"
                    name="guestsnumber"
                    value={guestsNo}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="d-flex flex-wrap align-items-center rev-margin-gap">
                <label htmlFor="arrivaldate" className="col-sm-3 col-form-label font-size-14 medium-width-40percent">
                  Arrival Date{" "}
                </label>
                <div className="col-sm-4 medium-width-60percent">
                  <input
                    type="date"
                    className="form-control height-30 font-size-14 background-gray"
                    id="inputArrivalDate"
                    name="arrivaldate"
                    max={departureDate}
                    value={arrivalDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <label htmlFor="arrivaltime" className="col-sm-1 col-form-label font-size-14 medium-width-40percent reserv-padding-left">
                  at{" "}
                </label>
                <div className="col-sm-4 medium-width-60percent">
                  <input
                    type="time"
                    className="form-control height-30 font-size-14 background-gray"
                    id="inputArrivalTime"
                    name="arrivaltime"
                    value={arrivalTime}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="d-flex align-items-center flex-wrap rev-margin-gap">
                <label htmlFor="departuredate" className="col-sm-3 col-form-label font-size-14 medium-width-40percent">
                  Departure Date{" "}
                </label>
                <div className="col-sm-4 medium-width-60percent">
                  <input
                    type="date"
                    className="form-control height-30 font-size-14 background-gray"
                    id="inputDepartureDate"
                    name="departuredate"
                    min={arrivalDate}
                    value={departureDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <label htmlFor="departuretime" className="col-sm-1 col-form-label font-size-14 medium-width-40percent reserv-padding-left">
                  at{" "}
                </label>
                <div className="col-sm-4 medium-width-60percent">
                  <input
                    type="time"
                    className="form-control height-30 font-size-14 background-gray"
                    id="inputDepartureTime"
                    name="departuretime"
                    value={departureTime}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="d-flex align-items-center flex-wrap rev-margin-gap">
                <label htmlFor="registrationnumber" className="col-sm-3 col-form-label font-size-14 medium-width-40percent">
                  Registration No{" "}
                </label>
                <div className="col-sm-9 medium-width-60percent">
                  <input
                    type="text"
                    className="form-control height-30 font-size-14 background-gray"
                    id="inputRegistrationNumber"
                    name="registrationnumber"
                    value={registrationNo}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="table-responsive mt-2">
            <table className="table table-borderless table-border-collapse text-primary">
              <thead className="table-head-blue">
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Description</th>
                  <th scope="col">Reference</th>
                  <th scope="col">Debit</th>
                  <th scope="col">Credit</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                  {paymentData && paymentData.map((item,index)=>{
                    return <tr key={index+1} className='hover-gray make-cursor-pointer' >
                            <td>{item.date}</td>
                            <td>{item.description}</td>
                            <td>{item.name}</td>
                            <td>{item.debit}</td>
                            <td>{item.credit}</td>
                          </tr>
                  })}
                {/* <tr className='hover-gray make-cursor-pointer' >
                  <td>Date</td>
                  <td>Accomodation SGST @9% </td>
                  <td>Room</td>
                  <td>Amount</td>
                  <td>Amount</td>
                </tr>
                <tr className='hover-gray make-cursor-pointer' >
                  <td>Date</td>
                  <td>Accomodation CGST @9% </td>
                  <td>Room</td>
                  <td>Amount</td>
                  <td>Amount</td>
                </tr> */}
                <tr className='hover-gray make-cursor-pointer table-br-last-blue' >
                  <td className="table-tdata"></td>
                  <td className="table-tdata"></td>
                  <td className="table-tdata"></td>
                  <td className="table-tdata">{ttlDebit}</td>
                  <td className="table-tdata">{ttlCredit}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="d-flex medium-flex-column align-items-center justify-content-between reserv-col-gap-1 mt-2 p-2 pb-2">
            <div className="d-flex align-items-center">
              <h5>Cashier</h5>
              <input type="text" className="reserv-padding-left bg-light border-bottom-blue" />
            </div>
            <div className="d-flex align-items-center">
              <h5>Guest's Signature</h5>
              <input type="text" className="reserv-padding-left bg-light border-bottom-blue" />
            </div>
          </div>
          <div className="d-flex medium-flex-column align-items-center justify-content-between">
            <div className="d-flex align-items-center font-size-14">
              <input
                type="checkbox"
                className="height-30 font-size-14 background-gray"
                id="check"
                value="checkAgree"
              />
              <span className="padding-left-16 text-primary font-size-14">I agree to the terms & conditions above</span>
            </div>
            <div className="d-flex align-items-center justify-content-center mb-2">
              <button
                type="submit"
                className="d-flex align-items-center justify-content-center width-150 font-size-16 text-primary btn button-color-onHover height-40 button-padding-5"
                onClick={(e)=>{submitAction(e)}}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
