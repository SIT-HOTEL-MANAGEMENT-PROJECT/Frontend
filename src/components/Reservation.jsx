/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {NavLink} from "react-router-dom";
import "../CustomCss/Reservation.css";
import ShortUniqueId from "short-unique-id";
import Localbase from "localbase";
let db = new Localbase("hmctdb");
db.config.debug = false;

const Reservation = () => {
  const navigate = useNavigate();

  const [isCardNoDisabled, setIsCardNoDisabled] = useState(false);
  const [isUpiDisabled, setIsUpiDisabled] = useState(false);
  const [isDiscountDisabled, setIsDiscountDisabled] = useState(true);
  const [isRoomNoDisabled, setIsRoomNoDisabled] = useState(true);

  const [roomTypeBtnColor, setRoomTypeBtnColor] = useState("");
  const [paymentTypeBtnColor, setPaymentTypeBtnColor] = useState("");
  const [mealTypeBtnColor, setMealTypeBtnColor] = useState("");

  const [guestName, setGuestName] = useState({ title: "", firstname: "", middlename: "", lastname: "", });
  const [address, setAddress] = useState({ ad1: "", city: "", state: "", zip: "", });
  const [guestPhoneNumber, setGuestPhoneNumber] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [designation, setDesignation] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [departureDate, setdepartureDate] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [nights, setNights] = useState(0);
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


  // Add :  Add reservation details 
  // params : none     (directly get data from useState)
  // return :   1.  {success:true, bookingid: 'string'}               IF ADDED SUCCESSFULLY
  //            2.  {success:false, msg: 'Something Went Wrong'}      IF ADD FAILED
  const addReservationData = async()=>{
    try{
      let ubid = new ShortUniqueId({ length: 14 });  let ubookingid = ubid();
      
      if(roomNumber){
        let isBooked = await bookRoom(ubookingid);
        if(!isBooked.success){  return { success: false, msg: isBooked?.msg }}
      }

      db.collection('reservation').add({
          bookingid: ubookingid,  name: guestName,  address: address, icno: "", 
          phoneno: guestPhoneNumber,  telno: "",  companyname: companyName, designation: designation,

          checkcountry: "", aadhaarno: "",  passportno: "", visano: "", passportdateofissue: "",  
          arrivedfrom: "",  placeofissue: "", purdurofstayinhotel: "",

          cityledgetacct: "", groupid: "",

          adultno: "",  childno: "",

          bookingdate: bookingDate, arrivaldate: arrivalDate, arrivaltime: arrivalTime, 
          departuredate: departureDate, departuretime: departureTime, nights: nights,

          typeofroom: roomType, roomno: roomNumber, noofrooms: noOfRooms,

          noofpax: noOfPax, modeofarrival: modeOfArrival, trainno: trainNo, flightno: flightNo,

          roomrate: roomRate, discountamount: discountAmount, discountpercentage: discountPercentage,
          totalamountpaid: "",  finalamount: "",  gst: "",  modeofpayment: modeOfPayment, cardno: cardNo, upi: upi,

          mealplan: mealPlan, extrabedtype: "",

          travelagentname: travelAgentName, travelagentno: "",

          billingno: "",  regno: "",

          resassisname: resAssisName, specialreq: specialReq
      })

      return {success: true, bookingid: ubookingid}     
    }catch(e){
      console.log("ReservationPageError (addReservationData) : ",e);
      return {success: false, msg: 'Something Went Wrong'}
    }
  }


  // Internal Service/Add :  Book room number against bookingid
  // params : bookingid   (take useState internally-auto -> roomType,roomNumber,arrivalDate,arrivalTime,departureDate,departureTime)
  // return :   1.  {success:true}                                             IF BOOKED
  //            2.  {success:false, msg: 'Something Went Wrong'}               IF BOOKING FAILED
  //            3.  {success:false, msg: '<Room_No> Invalid Room Number'}      IF ROOM NO IS INVALID/NOT FOUND
  //            4.  {success:false, msg: '<Room_No> Room is not available!'}   IF ROOM NO IS ALREADY BOOKED
  const bookRoom = async(bookingid)=>{
    try{
      let roomav = await db.collection("roomavailability").get();

      if (!roomav.length) { return { success: false, msg: "Something Went Wrong!" }; }
      
      const avroomnos = roomNumber.split(',').map(value => value.trim()).filter(value => value !== '');
      
      let isCheckPass = true;
      let isCheckPassMsg = "";
      for (const avroom of avroomnos) {  
        let roomData = roomav[0][roomType.toLowerCase()];
        if (!roomData[avroom]) { isCheckPass = false; isCheckPassMsg = `${avroom} Invalid Room Number`; break; }
        if(roomData[avroom].av != "1") { isCheckPass = false; isCheckPassMsg = `${avroom} Room is not available!`; break; }

        let isrmavl = await isRoomAvailable(roomType.toLowerCase(),avroom);
        if(!isrmavl) { isCheckPass = false; isCheckPassMsg = `${avroom} Room is not available in your Date Range!`; break; }
      };
    
      if(!isCheckPass) { return { success:false, msg: isCheckPassMsg } }

      avroomnos.forEach(avroom =>{
        const roomObj = roomav[0][roomType.toLowerCase()][avroom];
        const ifBookingExist = roomObj.activeBookings.find(room => room.bookingid === bookingid);
        if (!ifBookingExist) {
          roomObj.activeBookings.push({bookingid: bookingid, arrivaldate: arrivalDate, departuredate: departureDate, arrivaltime: arrivalTime, departuretime: departureTime});
        }
      })

      await db.collection('roomavailability').set(roomav);
  
      return {success: true}
    }catch(e){
      console.log("ReservationPageError (bookRoom) : ",e);
      return {success: false, msg: 'Something Went Wrong'}
    }
  }

  // Internal Service/Check :  Check room is available or not
  // params :  roomtype, roomnumber   (take useState internally-auto -> arrivalDate,arrivalTime,departureDate,departureTime)
  // return :  1. true                      IF ROOM AVAILABLE
  //           2. false                     IF ROOM NOT AVAILABLE
  const isRoomAvailable = async(roomtype,roomnumber)=>{
    let roomav = await db.collection("roomavailability").get();
    let bookings = roomav[0][roomtype][roomnumber].activeBookings;
    
    const requestedArrivalDT = new Date(arrivalDate + 'T' + arrivalTime);
    const requestedDepartureDT = new Date(departureDate + 'T' + departureTime);

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
    if(roomType == whichRoom){
      setRoomTypeBtnColor(""); setRoomType(""); setIsRoomNoDisabled(true);  return;
    }
    setRoomTypeBtnColor(whichRoom);
    setRoomType(whichRoom);
    setIsRoomNoDisabled(false);
  };

  const changePaymentBtnColor = (paymentType) => {
    if(paymentType == modeOfPayment){
      setIsCardNoDisabled(false); setIsUpiDisabled(false);
      setPaymentTypeBtnColor(""); setModeOfPayment(""); return;
    }
    if(paymentType == 'Cash') { setIsCardNoDisabled(true); setIsUpiDisabled(true); }
    if(paymentType == 'Card') { setIsCardNoDisabled(false); setIsUpiDisabled(true); }
    if(paymentType == 'UPI') { setIsCardNoDisabled(true); setIsUpiDisabled(false); }
    setPaymentTypeBtnColor(paymentType);
    setModeOfPayment(paymentType);
  };

  const changeMealBtnColor = (mealType) => {
    if(mealPlan == mealType){
      setMealTypeBtnColor(""); setMealPlan(""); return;
    }
    setMealTypeBtnColor(mealType);
    setMealPlan(mealType);
  };

  const clearForm = ()=>{
    setGuestName({ title: "", firstname: "", middlename: "", lastname: "", });
    setAddress({ ad1: "", city: "", state: "", zip: "", });
    setGuestPhoneNumber(""); setCompanyName(""); setDesignation(""); setBookingDate(""); setArrivalDate(""); setArrivalTime(""); setdepartureDate("");
    setDepartureTime(""); setNights(0); setRoomType(""); setRoomNumber(""); setNoOfRooms(""); setNoOfPax(""); setModeOfArrival(""); setTrainNo("");
    setFlightNo(""); setRoomRate(""); setDiscountAmount(""); setDiscountPercentage(""); setModeOfPayment(""); setCardNo("");
    setUpi(""); setMealPlan(""); setTravelAgentName(""); setResAssisName(""); setSpecialReq("");

    setRoomTypeBtnColor(""); setPaymentTypeBtnColor(""); setMealTypeBtnColor("");

    setIsCardNoDisabled(false); setIsUpiDisabled(false);  setIsDiscountDisabled(true); setIsRoomNoDisabled(true);
  }

  const handleInputChange = (e) => {
    if (e.target.name == "title") {  setGuestName({ ...guestName, title: e.target.value }); }
    else if (e.target.name == "firstname") {  setGuestName({ ...guestName, firstname: e.target.value }); }
    else if (e.target.name == "middlename") {  setGuestName({ ...guestName, middlename: e.target.value }); }
    else if (e.target.name == "lastname") {  setGuestName({ ...guestName, lastname: e.target.value }); }
    else if (e.target.name == "address") {  setAddress({ ...address, ad1: e.target.value }); }
    else if (e.target.name == "guestphonenumber") {  setGuestPhoneNumber(e.target.value); }
    else if (e.target.name == "companyname") {  setCompanyName(e.target.value); }
    else if (e.target.name == "designation") {  setDesignation(e.target.value); }
    else if (e.target.name == "bookingdate") {  setBookingDate(e.target.value); }
    else if (e.target.name == "arrivaldate") {  
      setArrivalDate(e.target.value); 
      if(departureDate && e.target.value) { 
        const date2 = new Date(departureDate);
        const date1 = new Date(e.target.value);

        const diffTime = Math.abs(date2.getTime() - date1.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setNights(diffDays);
      }
    }
    else if (e.target.name == "arrivaltime") {  setArrivalTime(e.target.value); }
    else if (e.target.name == "departuredate") {  
      setdepartureDate(e.target.value); 
      if(arrivalDate && e.target.value) { 
        const date1 = new Date(e.target.value);
        const date2 = new Date(arrivalDate);

        const diffTime = Math.abs(date2.getTime() - date1.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setNights(diffDays);
      }
    }
    else if (e.target.name == "nights") { setNights(e.target.value); }
    else if (e.target.name == "departuretime") {  setDepartureTime(e.target.value); }
    else if (e.target.name == "roomnumber" && e.target.value!=" ") {  
      setRoomNumber(e.target.value);
      const avroomnos = e.target.value.split(',').map(value => value.trim()).filter(value => value !== '');
      if(!avroomnos.length) { setNoOfRooms("") }
      else { setNoOfRooms(avroomnos.length); }
    }
    else if (e.target.name == "noofrooms") {  setNoOfRooms(e.target.value); }
    else if (e.target.name == "noofpax") {  setNoOfPax(e.target.value); }
    else if (e.target.name == "modeofarrival") {  setModeOfArrival(e.target.value); }
    else if (e.target.name == "trainno") {  setTrainNo(e.target.value); }
    else if (e.target.name == "flightno") {  setFlightNo(e.target.value); }
    else if (e.target.name == "roomrate") {  
      setRoomRate(e.target.value); if(e.target.value == ''){ setIsDiscountDisabled(true); }else{ setIsDiscountDisabled(false); }
      setDiscountAmount(""); setDiscountPercentage("");
    }
    else if (e.target.name == "discountamount") { 
      setDiscountAmount(e.target.value);  let result = (e.target.value / roomRate) * 100; setDiscountPercentage(result);
    }  
    else if (e.target.name == "discountpercentage") {  
      setDiscountPercentage(e.target.value);  let result = (e.target.value * roomRate) / 100; setDiscountAmount(result);
    }
    else if (e.target.name == "cardno") {  setCardNo(e.target.value); }
    else if (e.target.name == "upi") {  setUpi(e.target.value); }
    else if (e.target.name == "travelagentname") {  setTravelAgentName(e.target.value); }
    else if (e.target.name == "resassisname") {  setResAssisName(e.target.value); }
    else if (e.target.name == "specialreq") {  setSpecialReq(e.target.value); }
  };

  const onSubmitAction = async (e) => {
    e.preventDefault();
    if(roomType == "") { alert("Select Type of Room"); return; }
    if(mealPlan == "") { alert("Select Meal Plan"); return; }
    if(modeOfPayment == "") { alert("Select Mode of Payment"); return; }

    let res = await addReservationData();
    if(res.success){
      navigate(`/ReservationConfirmation?bookingid=${res.bookingid}`);
    }else{
      alert(res.msg);
    }
  };

  return (
    <div>
      <div className="bg-light vh-100">
        <nav className="navbar sticky-top navbar navbar-expand-lg bg-light">
          <div className="container-fluid">
            <div className="navbar-brand d-flex align-items-center">
              <NavLink className="text-primary" to="/Home3">
                <i className="bx bx-chevrons-left font-size-25"></i>
              </NavLink>
              <h5 className="text-primary">Reservation</h5>
            </div>
          </div>
        </nav>
        <div className="container mb-1">
          <div className="d-flex justify-content-end column-gap-3">
            <button
              type="button"
              className="d-flex align-items-center text-primary btn btn-light button-padding-5" onClick={()=>{navigate('/AllReservations')}}
            >
              <i className="bx bxs-building font-size-25"></i>Reservation
            </button>
            <button
              type="button"
              className="d-flex align-items-center text-primary btn btn-light button-padding-5"
            >
              <i className="bx bxs-plus-square font-size-25"></i>Add
            </button>
            <button
              type="button"
              className="d-flex align-items-center text-primary btn btn-light button-padding-5" onClick={clearForm}
            >
              <i className="bx bxs-x-circle font-size-25"></i>Cancel
            </button>
          </div>
          <form
            className="row g-3 bg-skyblue d-flex align-items-center justify-content-center mt-0 p-1"
            onSubmit={onSubmitAction}
          >
            <div className="col-md-6 d-flex align-items-center rev-margin-gap">
              <label htmlFor="name" className="col-sm-3 col-form-label font-size-14">
                Guest Name
              </label>
              <div className="col-sm-7 d-flex column-gap-1">
                <select
                  id="designation"
                  className="form-select w-50 height-30 font-size-14"
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
                  className="form-control height-30 font-size-14"
                  id="inputName"
                  name="firstname"
                  value={guestName.firstname}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  className="form-control height-30 font-size-14"
                  id="inputName"
                  name="middlename"
                  value={guestName.middlename}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  className="form-control height-30 font-size-14"
                  id="inputName"
                  name="lastname"
                  value={guestName.lastname}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-center rev-margin-gap">
              <label
                htmlFor="guestphonenumber"
                className="col-sm-3 col-form-label font-size-14"
              >
                Phone No{" "}
              </label>
              <div className="col-sm-7">
                <input
                  type="number"
                  className="form-control height-30 font-size-14"
                  id="inputNumber"
                  name="guestphonenumber"
                  value={guestPhoneNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-center rev-margin-gap">
              <label htmlFor="address" className="col-sm-3 col-form-label font-size-14">
                Address{" "}
              </label>
              <div className="col-sm-7">
                <input
                  type="text"
                  className="form-control height-30 font-size-14"
                  id="inputAddress"
                  name="address"
                  value={address.ad1}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-center font-size-14 rev-margin-gap">
              <label htmlFor="companyname" className="col-sm-3 col-form-label">
                Company{" "}
              </label>
              <div className="col-sm-7">
                <input
                  type="text"
                  className="form-control height-30 font-size-14"
                  id="inputCompany"
                  name="companyname"
                  value={companyName}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-center rev-margin-gap">
              <label htmlFor="arrivaldate" className="col-sm-3 col-form-label font-size-14">
                Arrival Date{" "}
              </label>
              <div className="col-sm-7">
                <input
                  type="date"
                  className="form-control height-30 font-size-14"
                  id="inputArrivalDate"
                  name="arrivaldate"
                  max={departureDate}
                  value={arrivalDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-center font-size-14 rev-margin-gap">
              <div className="col-md-6 d-flex align-items-center">
                <label
                  htmlFor="designation"
                  className="col-sm-6 col-form-label font-size-14"
                >
                  Designation{" "}
                </label>
                <div className="col-sm-5">
                  <input
                    type="text"
                    className="form-control height-30 font-size-14"
                    id="inputDesignation"
                    name="designation"
                    value={designation}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-md-6 d-flex align-items-center">
                <label
                  htmlFor="travelagentname"
                  className="col-sm-4 col-form-label font-size-14"
                >
                  Travel Agent{" "}
                </label>
                <div className="col-sm-4">
                  <input
                    type="text"
                    className="form-control height-30 font-size-14"
                    id="inputTravelAgent"
                    name="travelagentname"
                    value={travelAgentName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-center rev-margin-gap">
              <label
                htmlFor="departuredate"
                className="col-sm-3 col-form-label font-size-14"
              >
                Departure Date{" "}
              </label>
              <div className="col-sm-7">
                <input
                  type="date"
                  className="form-control height-30 font-size-14"
                  id="inputDepartureDate"
                  name="departuredate"
                  min={arrivalDate}
                  value={departureDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-center rev-margin-gap">
              <label htmlFor="arrivaltime" className="col-sm-3 col-form-label font-size-14">
                Arrival Time{" "}
              </label>
              <div className="col-sm-7">
                <input
                  type="time"
                  className="form-control height-30 font-size-14"
                  id="inputArrivalTime"
                  name="arrivaltime"
                  value={arrivalTime}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-center rev-margin-gap">
              <label htmlFor="roomtype" className="col-sm-3 col-form-label font-size-14">
                Type of Room{" "}
              </label>
              <div className="col-sm-7 d-flex justify-content-between">
                <button
                  type="button"
                  className={`d-flex align-items-center justify-content-center text-light font-size-14 btn button-padding-5 height-30 large-button-width-60 large-button-font-size-12 ${
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
                  className={`d-flex align-items-center justify-content-center text-light font-size-14 btn button-padding-5 height-30 large-button-width-60 large-button-font-size-12 ${
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
                  className={`d-flex align-items-center justify-content-center text-light font-size-14 btn button-padding-5 height-30 large-button-width-60 large-button-font-size-12 ${
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
            <div className="col-md-6 d-flex align-items-center rev-margin-gap">
              <label
                htmlFor="departuretime"
                className="col-sm-3 col-form-label font-size-14"
              >
                Departure Time{" "}
              </label>
              <div className="col-sm-7">
                <input
                  type="time"
                  className="form-control height-30 font-size-14"
                  id="inputDepartureTime"
                  name="departuretime"
                  value={departureTime}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-center font-size-14 rev-margin-gap">
              <div className="col-md-6 d-flex align-items-center">
                <label
                  htmlFor="noofpax"
                  className="col-sm-6 col-form-label font-size-14"
                >
                  No of Pax{" "}
                </label>
                <div className="col-sm-5">
                  <input
                    type="text"
                    className="form-control height-30 font-size-14"
                    id="inputPax"
                    name="noofpax"
                    value={noOfPax}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-md-6 d-flex align-items-center">
                <label
                  htmlFor="nights"
                  className="col-sm-3 col-form-label font-size-14"
                >
                  Nights
                </label>
                <div className="col-sm-5">
                  <input
                    type="text"
                    className="form-control height-30 font-size-14"
                    id="inputNights"
                    name="nights"
                    value={nights}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-center rev-margin-gap">
              <div className="col-md-6 d-flex align-items-center">
                <label htmlFor="roomnumber" className="col-sm-6 col-form-label font-size-14">
                  Room No{" "}
                </label>
                <div className="col-sm-5">
                  <input disabled={isRoomNoDisabled}
                    type="text"
                    className="form-control height-30 font-size-14"
                    id="inputRoomNo"
                    name="roomnumber"
                    value={roomNumber}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-md-6 d-flex align-items-center">
                <label htmlFor="noofrooms" className="col-sm-4 col-form-label font-size-14">
                  No of Room{" "}
                </label>
                <div className="col-sm-4">
                  <input
                    type="number"
                    className="form-control height-30 font-size-14"
                    id="inputNoOfRoom"
                    name="noofrooms"
                    value={noOfRooms}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-center rev-margin-gap">
              <label
                htmlFor="modeofarrival"
                className="col-sm-3 col-form-label font-size-14"
              >
                Mode of Arrival{" "}
              </label>
              <div className="col-sm-7">
                <input
                  type="text"
                  className="form-control height-30 font-size-14"
                  id="inputModeofArrival"
                  name="modeofarrival"
                  value={modeOfArrival}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-center rev-margin-gap">
              <label htmlFor="trainno" className="col-sm-3 col-form-label font-size-14">
                Train No{" "}
              </label>
              <div className="col-sm-7">
                <input
                  type="text"
                  className="form-control height-30 font-size-14"
                  id="inputTrainNo"
                  name="trainno"
                  value={trainNo}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-center rev-margin-gap">
              <label htmlFor="flightno" className="col-sm-3 col-form-label font-size-14">
                Flight No{" "}
              </label>
              <div className="col-sm-7">
                <input
                  type="text"
                  className="form-control height-30 font-size-14"
                  id="inputFlightNo"
                  name="flightno"
                  value={flightNo}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-center rev-margin-gap">
              <label htmlFor="roomrate" className="col-sm-3 col-form-label font-size-14">
                Room Rate{" "}
              </label>
              <div className="col-sm-7">
                <input
                  type="number"
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
              <label
                htmlFor="modeofpayment"
                className="col-sm-3 col-form-label font-size-14"
              >
                Mode of Payment{" "}
              </label>
              <div className="col-sm-7 d-flex justify-content-between">
                <button
                  type="button"
                  className={`w-70 height-30 d-flex align-items-center justify-content-center font-size-14 text-light btn button-padding-5 large-button-width-60 large-button-font-size-12 ${
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
            <div className="col-md-6 d-flex align-items-center rev-margin-gap">
              <div className="col-md-6 d-flex align-items-center">
                <label
                  htmlFor="discountamount"
                  className="col-sm-6 col-form-label font-size-14"
                >
                  Discount amount{" "}
                </label>
                <div className="col-sm-5">
                  <input
                    disabled={isDiscountDisabled}
                    type="number"
                    className="form-control height-30 font-size-14"
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
                  className="col-sm-4 col-form-label font-size-14"
                >
                  Discount %{" "}
                </label>
                <div className="col-sm-4">
                  <input
                    disabled={isDiscountDisabled}
                    type="number"
                    className="form-control height-30 font-size-14"
                    id="inputNoOfRoom"
                    name="discountpercentage"
                    value={discountPercentage}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-center rev-margin-gap">
              <label htmlFor="cardno" className="col-sm-3 col-form-label font-size-14">
                Card No{" "}
              </label>
              <div className="col-sm-7">
                <input disabled={isCardNoDisabled}
                  type="number"
                  className="form-control height-30 font-size-14"
                  id="inputCardNo"
                  name="cardno"
                  value={cardNo}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-center rev-margin-gap">
              <label htmlFor="upi" className="col-sm-3 col-form-label font-size-14">
                UPI{" "}
              </label>
              <div className="col-sm-7">
                <input disabled={isUpiDisabled}
                  type="text"
                  className="form-control height-30 font-size-14"
                  id="inputupi"
                  name="upi"
                  value={upi}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-center rev-margin-gap">
              <label htmlFor="bookingdate" className="col-sm-3 col-form-label font-size-14">
                Date of Booking{" "}
              </label>
              <div className="col-sm-7">
                <input
                  type="date"
                  className="form-control height-30 font-size-14"
                  id="inputBookingDate"
                  name="bookingdate"
                  max={arrivalDate}
                  value={bookingDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-center rev-margin-gap">
              <label htmlFor="mealplan" className="col-sm-3 col-form-label font-size-14">
                Meal Plan{" "}
              </label>
              <div className="col-sm-7 d-flex justify-content-between">
                <button
                  type="button"
                  className={`w-70 height-30 d-flex align-items-center justify-content-center font-size-14 text-light btn button-padding-5 large-button-width-40 large-button-font-size-12 ${
                    mealTypeBtnColor === "EP" ? "btn-success" : "btn-primary"
                  }`}
                  onClick={() => {
                    changeMealBtnColor("EP");
                  }}
                >
                  EP
                </button>
                <button
                  type="button"
                  className={`w-70 height-30 d-flex align-items-center justify-content-center font-size-14 text-light btn button-padding-5 large-button-width-40 large-button-font-size-12 ${
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
                  className={`w-70 height-30 d-flex align-items-center justify-content-center font-size-14 text-light btn button-padding-5 large-button-width-40 large-button-font-size-12 ${
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
                  className={`w-70 height-30 d-flex align-items-center justify-content-center font-size-14 text-light btn button-padding-5 large-button-width-40 large-button-font-size-12 ${
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
            <div className="col-md-6 d-flex rev-margin-gap">
              <label htmlFor="specialreq" className="col-sm-3 col-form-label font-size-14">
                Special Request{" "}
              </label>
              <div className="col-sm-7">
                <textarea
                  className="form-control font-size-14"
                  id="inputRequest"
                  rows="2"
                  name="specialreq"
                  value={specialReq}
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </div>
            <div className="col-md-6 d-flex flex-column rev-margin-rev-margin-gap">
              <div className="col-12 d-flex align-items-center">
                <label
                  htmlFor="resassisname"
                  className="col-sm-3 col-form-label font-size-14"
                >
                  Reservation Assistant Name{" "}
                </label>
                <div className="col-sm-7">
                  <input
                    type="text"
                    className="form-control height-30 font-size-14"
                    id="inputReservationAssistantName"
                    name="resassisname"
                    value={resAssisName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="col-12 d-flex align-items-center justify-content-center">
                <button
                  type="submit"
                  className="d-flex align-items-center justify-content-center font-size-14 text-light btn btn-primary height-30 button-padding-5"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
