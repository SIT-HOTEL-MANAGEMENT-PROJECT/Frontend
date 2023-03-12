/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useState } from "react";
import {NavLink} from "react-router-dom";
import "../CustomCss/Reservation.css";
import India from "./checkinpages/checkinIndia";
import Other from "./checkinpages/checkinOther";
import Localbase from "localbase";
let db = new Localbase("hmctdb");
db.config.debug = false;

const CheckIn = () => {
  const [roomTypeBtnColor, setRoomTypeBtnColor] = useState("");
  const [paymentTypeBtnColor, setPaymentTypeBtnColor] = useState("");
  const [mealTypeBtnColor, setMealTypeBtnColor] = useState("");
  const [CountryBtnColor, setCountryBtnColor] = useState("");

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
  const [guestPhoneNumber, setGuestPhoneNumber] = useState("");
  const [icNo, seticNo] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [designation, setDesignation] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [departureDate, setdepartureDate] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [roomType, setRoomType] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [noOfRooms, setNoOfRooms] = useState("");
  const [noOfPax, setNoOfPax] = useState("");
  const [modeOfArrival, setModeOfArrival] = useState("");
  const [trainNo, setTrainNo] = useState("");
  const [flightNo, setFlightNo] = useState("");
  const [roomRate, setRoomRate] = useState("");
  const [discountAmount, setDiscountAmount] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [modeOfPayment, setModeOfPayment] = useState("");
  const [cardNo, setCardNo] = useState("");
  const [upi, setUpi] = useState("");
  const [mealPlan, setMealPlan] = useState("");
  const [travelAgentName, setTravelAgentName] = useState("");
  const [resAssisName, setResAssisName] = useState("");
  const [specialReq, setSpecialReq] = useState("");
  const [reservationNumber, setreservationNumber] = useState("");
  const [cityName, setcityName] = useState("");
  const [zipNumber, setzipNumber] = useState("");
  const [StateName, setStateName] = useState("");
  const [adultNumber, setadultNumber] = useState("");
  const [childrenNumber, setchildrenNumber] = useState("");
  const [nightNumber, setnightNumber] = useState("");
  const [cityledgetacctNumber, setcityledgetacctNumber] = useState("");
  const [gstRate, setgstRate] = useState("");
  const [depositRate, setdepositRate] = useState("");
  const [countryType, setcountryType] = useState("");
  

  // Add :  Book room number against bookingid
  // params : bookingid, roomtype, roomnumber, arrivaldate, arrivaltime, departuredate, departuretime
  // return :   1.  {success:true}                                                                IF BOOKED
  //            2.  {success:false, msg: 'Something Went Wrong'}                                  IF BOOKING FAILED
  //            3.  {success:false, msg: '<Room_No> Invalid Room Number'}                         IF ROOM NO IS INVALID/NOT FOUND
  //            4.  {success:false, msg: '<Room_No> Room is not available!'}                      IF ROOM NO IS ALREADY BOOKED
  //            5.  {success:false, msg: '<Room_No> Room is not available in your Date Range!'}   IF ROOM NO IS ALREADY BOOKED IN A REQUESTED DATE
  const bookRoom = async(bookingid, roomtype, roomnumber, arrivaldate, arrivaltime, departuredate, departuretime)=>{
    try{
      let roomav = await db.collection("roomavailability").get();

      if (!roomav.length) { return { success: false, msg: "Something Went Wrong!" }; }
      
      const avroomnos = roomnumber.split(',').map(value => value.trim()).filter(value => value !== '');
      
      let checkAv = await checkRoomAvForUpdate(bookingid, roomtype, roomnumber, arrivaldate, arrivaltime, departuredate, departuretime);
      if(!checkAv.success) { return {success:false, msg: checkAv?.msg} }

      let res = await releaseRoomOccupancy(bookingid);
      if(!res.success) { return { success: false, msg: "Something Went Wrong!" }; }

      roomav = await db.collection("roomavailability").get();
      
      let isCheckPass = true;
      let isCheckPassMsg = "";
      for (const avroom of avroomnos) {  
        let roomData = roomav[0][roomtype.toLowerCase()];
        if (!roomData[avroom]) { isCheckPass = false; isCheckPassMsg = `${avroom} Invalid Room Number`; break; }
        if(roomData[avroom].av != "1") { isCheckPass = false; isCheckPassMsg = `${avroom} Room is not available!`; break; }

        let isrmavl = await isRoomAvailable(roomtype.toLowerCase(), avroom, arrivaldate, arrivaltime, departuredate, departuretime );
        if(!isrmavl) { isCheckPass = false; isCheckPassMsg = `${avroom} Room is not available in your Date Range!`; break; }
      };
    
      if(!isCheckPass) { return { success:false, msg: isCheckPassMsg } }

      avroomnos.forEach(avroom =>{
        const roomObj = roomav[0][roomtype.toLowerCase()][avroom];
        roomObj.av = "0";
        const ifBookingExist = roomObj.activeBookings.find(room => room.bookingid === bookingid);
        if (!ifBookingExist) {
          roomObj.activeBookings.push({bookingid: bookingid, arrivaldate: arrivaldate, departuredate: departuredate, arrivaltime: arrivaltime, departuretime: departuretime});
        }
      })

      await db.collection('roomavailability').set(roomav);
  
      return {success: true}
    }catch(e){
      console.log("ReservationPageError (bookRoom) : ",e);
      return {success: false, msg: 'Something Went Wrong'}
    }
  }

  
  // Get :  Get all user data of a booking against bookingid
  // params : bookingid
  // return : 1. {success:true, data: {bookingid:"",name: {..}, phoneno: "", ...} }            IF ALL OK
  //          2. {success: false, msg: 'Something Went Wrong'}                                 IF SERVER ERROR
  //          3. {success:false, msg: "Invalid Booking Details"}                               IF BOOKING DATA NOT FOUND
  const getUserDataAgainstBookingId = async(bookingid)=>{
    try{
      let booking = await db.collection('reservation').doc({ bookingid: bookingid }).get();
      if(!booking) { return {success:false, msg: "Invalid Booking Details"} }
      return {success:true, data: booking};
    }catch(e){
      console.log("CheckinPageError (getUserDataAgainstBookingId) : ",e);
      return {success: false, msg: 'Something Went Wrong'}
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
        roomObj.activeBookings = roomObj.activeBookings.filter(room => room.bookingid !== bookingid);
      })

      await db.collection('roomavailability').set(roomav);
      return {success: true}
    }catch(e){
      console.log("CheckoutPageError (releaseRoomOccupancy) : ",e);
      return {success: false, msg: 'Something Went Wrong'}
    }
  }

  
  // Internal Service/Check : Perform check to test updated req rooms are available or not
  // params : bookingid, updatedroomtype, updatedroomnumber, arrivaldate, arrivaltime, departuredate, departuretime
  // return : 1. {success: true}                                                               IF ALL OK
  //          2. {success:false, msg: "Invalid Booking Details"}                               IF BOOKINGID IS INVALID/NOT FOUND
  //          3. {success:false, msg: "Something Went Wrong!"}                                 IF ROOMAV DB ERROR
  //          4. {success:false, msg: '<Room_No> Invalid Room Number'}                         IF ROOM NO IS INVALID/NOT FOUND
  //          5. {success:false, msg: '<Room_No> Room is not available!'}                      IF ROOM NO IS ALREADY BOOKED
  //          6. {success:false, msg: '<Room_No> Room is not available in your Date Range!'}   IF ROOM NO IS ALREADY BOOKED IN A REQUESTED DATE
  //          7. {success: false, msg: 'Something Went Wrong'}                                 IF SERVER ERROR
  const checkRoomAvForUpdate = async(bookingid, uroomtype, uroomnumber, arrivaldate, arrivaltime, departuredate, departuretime)=>{
    try{
      // Temp Remove Prev Booking Data locally
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
        roomObj.activeBookings = roomObj.activeBookings.filter(room => room.bookingid !== bookingid);
      })
      // End of Temp Remove Prev Booking Data locally


      // Check room availability
      const avrnos = uroomnumber.split(',').map(value => value.trim()).filter(value => value !== '');
      let isCheckPass = true;
      let isCheckPassMsg = "";
      for (const avroom of avrnos) {  
        let roomData = roomav[0][uroomtype.toLowerCase()];
        if (!roomData[avroom]) { isCheckPass = false; isCheckPassMsg = `${avroom} Invalid Room Number`; break; }
        if(roomData[avroom].av != "1") { isCheckPass = false; isCheckPassMsg = `${avroom} Room is not available!`; break; }

        let ubookings = roomav[0][uroomtype.toLowerCase()][avroom].activeBookings;    
        const requestedArrivalDT = new Date(arrivaldate + 'T' + arrivaltime);
        const requestedDepartureDT = new Date(departuredate + 'T' + departuretime);
        let isAv = true;
        for (let i = 0; i < ubookings.length; i++) {
          const ubooking = ubookings[i];
        
          const bookingArrivalDT = new Date(ubooking.arrivaldate + 'T' + ubooking.arrivaltime);
          const bookingDepartureDT = new Date(ubooking.departuredate + 'T' + ubooking.departuretime);
        
          if (requestedArrivalDT >= bookingArrivalDT && requestedArrivalDT < bookingDepartureDT       ||
              requestedDepartureDT > bookingArrivalDT && requestedDepartureDT <= bookingDepartureDT) 
          {
            isAv = false; break;
          }
        }

        if(!isAv) { isCheckPass = false; isCheckPassMsg = `${avroom} Room is not available in your Date Range!`; break; }
      };
    
      if(!isCheckPass) { return { success:false, msg: isCheckPassMsg } }
      // End of check room availability

      return {success: true}
    }catch(e){
      console.log("CheckoutPageError (checkRoomAvForUpdate) : ",e);
      return {success: false, msg: 'Something Went Wrong'}
    }
  }


  // Internal Service/Check :  Check room is available or not
  // params :  roomtype, roomnumber, arrivaldate, arrivaltime, departuredate, departuretime
  // return :  1. true                      IF ROOM AVAILABLE
  //           2. false                     IF ROOM NOT AVAILABLE
  const isRoomAvailable = async(roomtype, roomnumber, arrivaldate, arrivaltime, departuredate, departuretime)=>{
    let roomav = await db.collection("roomavailability").get();
    let bookings = roomav[0][roomtype.toLowerCase()][roomnumber].activeBookings;
    
    const requestedArrivalDT = new Date(arrivaldate + 'T' + arrivaltime);
    const requestedDepartureDT = new Date(departuredate + 'T' + departuretime);

    let isAv = true;
    for (let i = 0; i < bookings.length; i++) {
      const booking = bookings[i];

      const bookingArrivalDT = new Date(booking.arrivaldate + 'T' + booking.arrivaltime);
      const bookingDepartureDT = new Date(booking.departuredate + 'T' + booking.departuretime);

      if (requestedArrivalDT >= bookingArrivalDT && requestedArrivalDT < bookingDepartureDT       ||
          requestedDepartureDT > bookingArrivalDT && requestedDepartureDT <= bookingDepartureDT) 
      {
        isAv = false;
        break;
      }
    }

    return isAv;
  }




  const changeRoomBtnColor = (whichRoom) => {
    setRoomTypeBtnColor(whichRoom);
    setRoomType(whichRoom);
  };

  const changeCountryBtnColor = (whichcountry) => {
    setCountryBtnColor(whichcountry);
    setcountryType(whichcountry);
  };

  const changePaymentBtnColor = (paymentType) => {
    setPaymentTypeBtnColor(paymentType);
    setModeOfPayment(paymentType);
  };

  const changeMealBtnColor = (mealType) => {
    setMealTypeBtnColor(mealType);
    setMealPlan(mealType);
  };

  const handleInputChange = (e) => {
    if (e.target.name == "title") {
      setGuestName({ ...guestName, title: e.target.value });
    } else if (e.target.name == "firstname") {
      setGuestName({ ...guestName, firstname: e.target.value });
    } else if (e.target.name == "middlename") {
      setGuestName({ ...guestName, middlename: e.target.value });
    } else if (e.target.name == "lastname") {
      setGuestName({ ...guestName, lastname: e.target.value });
    } else if (e.target.name == "address") {
      setAddress({ ...address, ad1: e.target.value });
    } else if (e.target.name == "guestphonenumber") {
      setGuestPhoneNumber(e.target.value);
    } else if (e.target.name == "icno") {
      seticNo(e.target.value);
    } else if (e.target.name == "companyname") {
      setCompanyName(e.target.value);
    } else if (e.target.name == "designation") {
      setDesignation(e.target.value);
    } else if (e.target.name == "bookingdate") {
      setBookingDate(e.target.value);
    } else if (e.target.name == "arrivaldate") {
      setArrivalDate(e.target.value);
    } else if (e.target.name == "arrivaltime") {
      setArrivalTime(e.target.value);
    } else if (e.target.name == "departuredate") {
      setdepartureDate(e.target.value);
    } else if (e.target.name == "reservationnumber") {
      setreservationNumber(e.target.value);
    } else if (e.target.name == "cityname") {
      setcityName(e.target.value);
    } else if (e.target.name == "statename") {
      setStateName(e.target.value);
    } else if (e.target.name == "zipnumber") {
      setzipNumber(e.target.value);
    } else if (e.target.name == "adultnumber") {
      setadultNumber(e.target.value);
    } else if (e.target.name == "childrennumber") {
      setchildrenNumber(e.target.value);
    } else if (e.target.name == "nightnumber") {
      setnightNumber(e.target.value);
    } else if (e.target.name == "cityledgetnumber") {
      setcityledgetacctNumber(e.target.value);
    } else if (e.target.name == "gstrate") {
      setgstRate(e.target.value);
    } else if (e.target.name == "depositnumber") {
      setdepositRate(e.target.value);
    } else if (e.target.name == "departuretime") {
      setDepartureTime(e.target.value);
    } else if (e.target.name == "roomnumber") {
      setRoomNumber(e.target.value);
    } else if (e.target.name == "noofrooms") {
      setNoOfRooms(e.target.value);
    } else if (e.target.name == "noofpax") {
      setNoOfPax(e.target.value);
    } else if (e.target.name == "modeofarrival") {
      setModeOfArrival(e.target.value);
    } else if (e.target.name == "trainno") {
      setTrainNo(e.target.value);
    } else if (e.target.name == "flightno") {
      setFlightNo(e.target.value);
    } else if (e.target.name == "roomrate") {
      setRoomRate(e.target.value);
    } else if (e.target.name == "discountamount") {
      setDiscountAmount(e.target.value);
    } else if (e.target.name == "discountpercentage") {
      setDiscountPercentage(e.target.value);
    } else if (e.target.name == "cardno") {
      setCardNo(e.target.value);
    } else if (e.target.name == "upi") {
      setUpi(e.target.value);
    } else if (e.target.name == "travelagentname") {
      setTravelAgentName(e.target.value);
    } else if (e.target.name == "resassisname") {
      setResAssisName(e.target.value);
    } else if (e.target.name == "specialreq") {
      setSpecialReq(e.target.value);
    }
    
  };

  const onSubmitAction = async (e) => {
    e.preventDefault();
    alert("Your form submitted!");
    console.log(guestName);
    console.log(address);
    console.log(guestPhoneNumber);
    console.log(companyName);
    console.log(designation);
    console.log(bookingDate);
    console.log(arrivalDate);
    console.log(arrivalTime);
    console.log(departureDate);
    console.log(departureTime);
    console.log(roomType);
    console.log(countryType);
    console.log(roomNumber);
    console.log(noOfRooms);
    console.log(noOfPax);
    console.log(modeOfArrival);
    console.log(trainNo);
    console.log(flightNo);
    console.log(roomRate);
    console.log(discountAmount);
    console.log(discountPercentage);
    console.log(modeOfPayment);
    console.log(cardNo);
    console.log(upi);
    console.log(mealPlan);
    console.log(travelAgentName);
    console.log(resAssisName);
    console.log(specialReq);
  };

  return (
    <div>
      <div className="bg-light h-100">
        <nav className="navbar sticky-top navbar navbar-expand-lg bg-light">
          <div className="container-fluid">
            <div className="navbar-brand d-flex align-items-center">
              <NavLink className="text-primary" to="/Home3">
                <i className="bx bx-chevrons-left"></i>
              </NavLink>
              <h5 className="text-primary">Check-In</h5>
            </div>
          </div>
        </nav>
        <div className="container mb-1">
          <form
            className="row g-3 bg-skyblue d-flex align-items-center justify-content-center mt-0 p-1"
            onSubmit={onSubmitAction}
          >
            <div className="col-md-6 d-flex align-items-center rev-margin-gap">
              <label htmlFor="roomtype" className="col-sm-3 col-form-label">
                Room Type{" "}
              </label>
              <div className="col-sm-7 d-flex justify-content-between">
                <button
                  type="button"
                  className={`d-flex align-items-center justify-content-center text-light btn button-padding-5 height-30 large-button-width-60 large-button-font-size-12 ${
                    roomTypeBtnColor === "Standard"
                      ? "btn-success"
                      : "btn-primary"
                  }`}
                  onClick={() => {
                    changeRoomBtnColor("Standard");
                  }}
                >
                  Standard
                </button>
                <button
                  type="button"
                  className={`d-flex align-items-center justify-content-center text-light btn button-padding-5 height-30 large-button-width-60 large-button-font-size-12 ${
                    roomTypeBtnColor === "Delux" ? "btn-success" : "btn-primary"
                  }`}
                  onClick={() => {
                    changeRoomBtnColor("Delux");
                  }}
                >
                  Delux
                </button>
                <button
                  type="button"
                  className={`d-flex align-items-center justify-content-center text-light btn button-padding-5 height-30 large-button-width-60 large-button-font-size-12 ${
                    roomTypeBtnColor === "Executive"
                      ? "btn-success"
                      : "btn-primary"
                  }`}
                  onClick={() => {
                    changeRoomBtnColor("Executive");
                  }}
                >
                  Executive
                </button>
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-center rev-margin-gap bg-light">
            <button
              type="button"
              className="d-flex align-items-center text-primary btn btn-light button-padding-5"
            >
              <i className="bx bxs-x-circle"></i>Cancel
            </button>
            <button
              type="button"
              className="d-flex align-items-center text-primary btn btn-light button-padding-5"
            >
              <i className="bx bxs-plus-square"></i>Add
            </button>
            </div>
            <div className="col-md-6 d-flex align-items-center">
              <label htmlFor="noofrooms" className="col-sm-3 col-form-label">
                No of Room{" "}
              </label>
              <div className="col-sm-6">
                <input
                  type="number"
                  className="form-control height-30"
                  id="inputNoOfRoom"
                  name="noofrooms"
                  min="0"
                  value={noOfRooms}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-center rev-margin-gap">
              <label htmlFor="name" className="col-sm-3 col-form-label">
                Guest Name
              </label>
              <div className="col-sm-7 d-flex column-gap-1">
                <select
                  id="designation"
                  className="form-select w-50 height-30"
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
                  className="form-control height-30"
                  id="inputName"
                  name="firstname"
                  value={guestName.firstname}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  className="form-control height-30"
                  id="inputName"
                  name="middlename"
                  value={guestName.middlename}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  className="form-control height-30"
                  id="inputName"
                  name="lastname"
                  value={guestName.lastname}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-center">
              <label htmlFor="roomnumber" className="col-sm-3 col-form-label">
                Room No{" "}
              </label>
              <div className="col-sm-5">
                <input
                  type="text"
                  className="form-control height-30"
                  id="inputRoomNo"
                  name="roomnumber"
                  value={roomNumber}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-center rev-margin-gap">
              <div className="col-md-6 d-flex align-items-center rev-margin-gap">
                <label
                  htmlFor="icno"
                  className="col-sm-3 col-form-label"
                >
                  IC No{" "}
                </label>
                <div className="col-sm-7">
                  <input
                    type="text"
                    className="form-control height-30"
                    id="icNumber"
                    name="icno"
                    value={icNo}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6 d-flex align-items-center rev-margin-gap">
                <label
                  htmlFor="guestphonenumber"
                  className="col-sm-4 col-form-label"
                >
                  Phone No{" "}
                </label>
                <div className="col-sm-7">
                  <input
                    type="text"
                    className="form-control height-30"
                    id="inputNumber"
                    name="guestphonenumber"
                    value={guestPhoneNumber}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-center">
              <label htmlFor="reservationnumber" className="col-sm-3 col-form-label">
                Reservation No{" "}
              </label>
              <div className="col-sm-5">
                <input
                  type="text"
                  className="form-control height-30"
                  id="inputreservationNo"
                  name="reservationnumber"
                  value={reservationNumber}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-center rev-margin-gap">
              <label htmlFor="companyname" className="col-sm-3 col-form-label">
                Company{" "}
              </label>
              <div className="col-sm-7">
                <input
                  type="text"
                  className="form-control height-30"
                  id="inputCompany"
                  name="companyname"
                  value={companyName}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-center rev-margin-gap">
              <label htmlFor="bookingdate" className="col-sm-3 col-form-label">
                Booking Date{" "}
              </label>
              <div className="col-sm-7">
                <input
                  type="date"
                  className="form-control height-30"
                  id="inputBookingDate"
                  name="bookingdate"
                  value={bookingDate}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-center rev-margin-gap">
              <label htmlFor="address" className="col-sm-3 col-form-label">
                Address{" "}
              </label>
              <div className="col-sm-7">
                <textarea
                type="text"
                className="form-control height-30"
                id="inputAddress"
                name="address"
                value={address.ad1}
                onChange={handleInputChange}
                required
                ></textarea>
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-center rev-margin-gap">
              <label htmlFor="extrabedtype" className="col-sm-3 col-form-label">
                Extra Bed Type{" "}
              </label>
              <div className="col-sm-7">
                <input
                  type="text"
                  className="form-control height-30"
                  id="extrabedtype"
                  name="extrabedtype"
                  value={companyName}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-center rev-margin-gap">
              <div className="col-md-6 d-flex align-items-center">
                <label
                  htmlFor="city"
                  className="col-sm-6 col-form-label"
                >
                  City{" "}
                </label>
                <div className="col-sm-5">
                  <input
                    type="text"
                    className="form-control height-30"
                    id="inputcityname"
                    name="cityname"
                    value={cityName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-md-6 d-flex align-items-center">
                <label
                  htmlFor="state"
                  className="col-sm-4 col-form-label"
                >
                  State{" "}
                </label>
                <div className="col-sm-6">
                  <input
                    type="text"
                    className="form-control height-30"
                    id="inputstate"
                    name="statename"
                    value={StateName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-center rev-margin-gap">
              <label htmlFor="mealplan" className="col-sm-3 col-form-label">
                Meal Plan{" "}
              </label>
              <div className="col-sm-7 d-flex justify-content-between">
                <button
                  type="button"
                  className={`w-70 height-30 d-flex align-items-center justify-content-center text-light btn button-padding-5 large-button-width-40 large-button-font-size-12 ${
                    mealTypeBtnColor === "EP" ? "btn-success" : "btn-primary"
                  }`}
                  onClick={() => {
                    changeMealBtnColor("EP");
                  }}
                >
                  TP
                </button>
                <button
                  type="button"
                  className={`w-70 height-30 d-flex align-items-center justify-content-center text-light btn button-padding-5 large-button-width-40 large-button-font-size-12 ${
                    mealTypeBtnColor === "CP" ? "btn-success" : "btn-primary"
                  }`}
                  onClick={() => {
                    changeMealBtnColor("CP");
                  }}
                >
                  CP
                </button>
                <button
                  type="button"
                  className={`w-70 height-30 d-flex align-items-center justify-content-center text-light btn button-padding-5 large-button-width-40 large-button-font-size-12 ${
                    mealTypeBtnColor === "AP" ? "btn-success" : "btn-primary"
                  }`}
                  onClick={() => {
                    changeMealBtnColor("AP");
                  }}
                >
                  AP
                </button>
                <button
                  type="button"
                  className={`w-70 height-30 d-flex align-items-center justify-content-center text-light btn button-padding-5 large-button-width-40 large-button-font-size-12 ${
                    mealTypeBtnColor === "MAP" ? "btn-success" : "btn-primary"
                  }`}
                  onClick={() => {
                    changeMealBtnColor("MAP");
                  }}
                >
                  MAP
                </button>
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-center rev-margin-gap">
              <div className="col-md-6 d-flex align-items-center">
                <label htmlFor="zipnumber" className="col-sm-6 col-form-label">
                  Zip{" "}
                </label>
                <div className="col-sm-5">
                  <input
                    type="text"
                    className="form-control height-30"
                    id="zipNo"
                    name="zipnumber"
                    value={zipNumber}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-md-6 d-flex align-items-center">
                <label htmlFor="noofrooms" className="col-sm-4 col-form-label">
                  Tel{" "}
                </label>
                <div className="col-sm-6">
                  <input
                    type="number"
                    className="form-control height-30"
                    id="inputNoOfRoom"
                    name="noofrooms"
                    value={noOfRooms}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-center rev-margin-gap">
              <div className="col-md-6 d-flex align-items-center rev-margin-gap">
                <label
                  htmlFor="arrivaldate"
                  className="col-sm-4 col-form-label"
                >
                  Arrival Date{" "}
                </label>
                <div className="col-sm-6">
                  <input
                    type="date"
                    className="form-control height-30"
                    id="inputArrivalDate"
                    name="arrivaldate"
                    value={arrivalDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6 d-flex align-items-center rev-margin-gap">
                <label
                  htmlFor="bookingdate"
                  className="col-sm-1 col-form-label"
                >
                  at{" "}
                </label>
                <div className="col-sm-7">
                  <input
                    type="time"
                    className="form-control height-30"
                    id="inputBookingDate"
                    name="bookingdate"
                    value={bookingDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-center rev-margin-gap">
              <div className="col-md-6 d-flex align-items-center">
                <label htmlFor="adult" className="col-sm-6 col-form-label">
                  Adults{" "}
                </label>
                <div className="col-sm-5">
                  <input
                    type="text"
                    className="form-control height-30"
                    id="inputadult"
                    name="adultnumber"
                    value={adultNumber}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-md-6 d-flex align-items-center">
                <label htmlFor="children" className="col-sm-4 col-form-label">
                  Children{" "}
                </label>
                <div className="col-sm-6">
                  <input
                    type="number"
                    className="form-control height-30"
                    id="inputchildren"
                    name="childrennumber"
                    value={childrenNumber}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-center">
              <label htmlFor="night" className="col-sm-3 col-form-label">
                Nights{" "}
              </label>
              <div className="col-sm-6">
                <input
                  type="number"
                  className="form-control height-30"
                  id="inputnight"
                  min="0"
                  name="nightnumber"
                  value={nightNumber}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-center rev-margin-gap">
              <div className="col-md-6 d-flex align-items-center">
                <label htmlFor="cityledgetacct" className="col-sm-6 col-form-label">
                  City Ledget Acct{" "}
                </label>
                <div className="col-sm-5">
                  <input
                    type="text"
                    className="form-control height-30"
                    id="inputcityledgetacct"
                    name="cityledgetacctnumber"
                    value={cityledgetacctNumber}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-md-6 d-flex align-items-center">
                <label htmlFor="noofrooms" className="col-sm-4 col-form-label">
                  Group ID{" "}
                </label>
                <div className="col-sm-6">
                  <input
                    type="number"
                    className="form-control height-30"
                    id="inputNoOfRoom"
                    name="noofrooms"
                    value={noOfRooms}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-center rev-margin-gap">
              <div className="col-md-6 d-flex align-items-center rev-margin-gap">
                <label
                  htmlFor="departuredate"
                  className="col-sm-5 col-form-label"
                >
                  Departure Date{" "}
                </label>
                <div className="col-sm-6">
                  <input
                    type="date"
                    className="form-control height-30"
                    id="inputdepartureDate"
                    name="departuredate"
                    value={departureDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6 d-flex align-items-center rev-margin-gap">
                <label
                  htmlFor="bookingdate"
                  className="col-sm-1 col-form-label"
                >
                  at{" "}
                </label>
                <div className="col-sm-7">
                  <input
                    type="time"
                    className="form-control height-30"
                    id="inputBookingDate"
                    name="bookingdate"
                    value={bookingDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-center">
                <label
                  htmlFor="travelagentname"
                  className="col-sm-4 col-form-label"
                >
                  Travel Agent{" "}
                </label>
                <div className="col-sm-4">
                  <input
                    type="text"
                    className="form-control height-30"
                    id="inputTravelAgent"
                    name="travelagentname"
                    value={travelAgentName}
                    onChange={handleInputChange}
                  />
                </div>
            </div>
            <div className="col-md-6 d-flex align-items-center rev-margin-gap">
              <label htmlFor="roomrate" className="col-sm-3 col-form-label">
                Room Rate{" "}
              </label>
              <div className="col-sm-7">
                <input
                  type="text"
                  className="form-control height-30 font-size-14"
                  id="inputRoomRate"
                  name="roomrate"
                  value={roomRate}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-center rev-margin-gap">
              <label htmlFor="countrytype" className="col-sm-3 col-form-label">
                Country{" "}
              </label>
              <div className="col-sm-4 d-flex justify-content-between">
                <button
                  type="button"
                  className={`d-flex align-items-center justify-content-center text-light btn button-padding-5 height-30 large-button-width-60 large-button-font-size-12 ${
                    CountryBtnColor === "Standard"
                      ? "btn-success"
                      : "btn-primary"
                  }`}
                  onClick={() => {
                    changeCountryBtnColor("Standard");
                  }}
                >
                  India
                </button>
                <button
                  type="button"
                  className={`d-flex align-items-center justify-content-center text-light btn button-padding-5 height-30 large-button-width-60 large-button-font-size-12 ${
                    CountryBtnColor === "Delux" ? "btn-success" : "btn-primary"
                  }`}
                  onClick={() => {
                    changeCountryBtnColor("Delux");
                  }}
                >
                  Other
                </button>
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-center rev-margin-gap">
              <div className="col-md-6 d-flex align-items-center">
                <label
                  htmlFor="discountamount"
                  className="col-sm-6 col-form-label"
                >
                  Discount amount{" "}
                </label>
                <div className="col-sm-5">
                  <input
                    type="number"
                    className="form-control height-30"
                    id="inputRoomNo"
                    name="discountamount"
                    value={discountAmount}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-md-6 d-flex align-items-center">
                <label
                  htmlFor="discountpercentage"
                  className="col-sm-4 col-form-label"
                >
                  Discount %{" "}
                </label>
                <div className="col-sm-4">
                  <input
                    type="number"
                    className="form-control height-30"
                    id="inputNoOfRoom"
                    name="discountpercentage"
                    value={discountPercentage}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className=" col-md-6 d-flex align-items-center rev-margin-gap">
              {CountryBtnColor === "Standard" && <India/>}
              {CountryBtnColor === "Delux" && <Other/>}
            </div>
            <div className="col-md-6 d-flex align-items-center rev-margin-gap">
              <label
                htmlFor="modeofpayment"
                className="col-sm-3 col-form-label"
              >
                Payment Type{" "}
              </label>
              <div className="col-sm-7 d-flex justify-content-between">
                <button
                  type="button"
                  className={`w-70 height-30 d-flex align-items-center justify-content-center text-light btn button-padding-5 large-button-width-60 large-button-font-size-12 ${
                    paymentTypeBtnColor === "Cash"
                      ? "btn-success"
                      : "btn-primary"
                  }`}
                  onClick={() => {
                    changePaymentBtnColor("Cash");
                  }}
                >
                  Cash
                </button>
                <button
                  type="button"
                  className={`w-70 height-30 d-flex align-items-center justify-content-center font-size-14 text-light btn button-padding-5 large-button-width-60 large-button-font-size-12 ${
                    paymentTypeBtnColor === "Card"
                      ? "btn-success"
                      : "btn-primary"
                  }`}
                  onClick={() => {
                    changePaymentBtnColor("Card");
                  }}
                >
                  Card
                </button>
                <button
                  type="button"
                  className={`w-70 height-30 d-flex align-items-center justify-content-center font-size-14 text-light btn button-padding-5 large-button-width-60 large-button-font-size-12 ${
                    paymentTypeBtnColor === "UPI"
                      ? "btn-success"
                      : "btn-primary"
                  }`}
                  onClick={() => {
                    changePaymentBtnColor("UPI");
                  }}
                >
                  UPI
                </button>
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-center rev-margin-gap"></div>
            <div className="col-md-6 d-flex align-items-center rev-margin-gap">
              <label htmlFor="roomrate" className="col-sm-3 col-form-label">
                GST{" "}
              </label>
              <div className="col-sm-7">
                <input
                  type="number"
                  className="form-control height-30 font-size-14"
                  id="inputgst"
                  name="gstrate"
                  value={gstRate}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-center rev-margin-gap"></div>
            <div className="col-md-6 d-flex align-items-center rev-margin-gap">
              <label htmlFor="roomrate" className="col-sm-3 col-form-label">
                Deposit{" "}
              </label>
              <div className="col-sm-7">
                <input
                  type="number"
                  className="form-control height-30 font-size-14"
                  id="inputdeposiy"
                  name="depositrate"
                  value={depositRate}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-center rev-margin-gap"></div>
            <div className="col-md-6 d-flex rev-margin-gap">
              <label htmlFor="specialreq" className="col-sm-3 col-form-label">
                Special Request{" "}
              </label>
              <div className="col-sm-7">
                <textarea
                  className="form-control"
                  id="inputRequest"
                  rows="2"
                  name="specialreq"
                  value={specialReq}
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-center rev-margin-gap"></div>
            <div className="d-flex justify-content-between">
            <button type="submit" class="btn btn-primary">Booking Hold</button>
            <button type="submit" class="btn btn-primary">Pay and Book</button>
            <button type="submit" class="btn btn-primary">Book</button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default CheckIn;
