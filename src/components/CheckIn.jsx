/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "../CustomCss/Reservation.css";
import Localbase from "localbase";
let db = new Localbase("hmctdb");
db.config.debug = false;

const CheckIn = () => {
  let navigate = useNavigate();

  const [roomTypeBtnColor, setRoomTypeBtnColor] = useState("");
  const [paymentTypeBtnColor, setPaymentTypeBtnColor] = useState("");
  const [mealTypeBtnColor, setMealTypeBtnColor] = useState("");
  const [CountryBtnColor, setCountryBtnColor] = useState("India");

  const [isRoomNoDisabled, setIsRoomNoDisabled] = useState(true);
  const [isDiscountDisabled, setIsDiscountDisabled] = useState(true);

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
  const [roomType, setRoomType] = useState("");
  const [noOfRooms, setNoOfRooms] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [reservationNumber, setreservationNumber] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [extraBed, setExtraBed] = useState("");
  const [mealPlan, setMealPlan] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [nights, setNights] = useState("");
  const [departureDate, setdepartureDate] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [roomRate, setRoomRate] = useState("");
  const [discountAmount, setDiscountAmount] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [modeOfPayment, setModeOfPayment] = useState("");
  const [gstRate, setgstRate] = useState("");
  const [depositRate, setDepositRate] = useState("");
  const [specialReq, setSpecialReq] = useState("");
  const [guestICNumber, setGuestICNumber] = useState("");
  const [guestPhoneNumber, setGuestPhoneNumber] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [tel, setTel] = useState("");
  const [adults, setAdults] = useState("");
  const [children, setChildren] = useState("");
  const [cityLedgetAcct, setCityLedgetAcct] = useState("");
  const [groupId, setGroupId] = useState("");
  const [travelAgentName, setTravelAgentName] = useState("");
  const [aadharNo, setAadharNo] = useState("");
  const [passportNumber, setPassportNumber] = useState("");
  const [visaNumber, setVisaNumber] = useState("");
  const [passportDateOfIssue, setPassportDateOfIssue] = useState("");
  const [visaDateOfIssue, setVisaDateOfIssue] = useState("");
  const [arrivedFrom, setArrivedFrom] = useState("");
  const [placeOfIssue, setPlaceOfIssue] = useState("");
  const [purpose, setPurpose] = useState("");

  const [openCountry, setOpenCountry] = useState("India");
  const [openBookingSuccessful, setOpenBookingSuccessful] = useState(false);
  const [openBookingButtons, setOpenBookingButtons] = useState(true);





  // Add :  Book room number against bookingid
  // params : bookingid, roomtype, roomnumber, arrivaldate, arrivaltime, departuredate, departuretime
  // return :   1.  {success:true}                                                                IF BOOKED
  //            2.  {success:false, msg: 'Something Went Wrong'}                                  IF BOOKING FAILED
  //            3.  {success:false, msg: '<Room_No> Invalid Room Number'}                         IF ROOM NO IS INVALID/NOT FOUND
  //            4.  {success:false, msg: '<Room_No> Room is not available!'}                      IF ROOM NO IS ALREADY BOOKED
  //            5.  {success:false, msg: '<Room_No> Room is not available in your Date Range!'}   IF ROOM NO IS ALREADY BOOKED IN A REQUESTED DATE
  const bookRoom = async (bookingid, roomtype, roomnumber, arrivaldate, arrivaltime, departuredate, departuretime) => {
    try {
      let roomav = await db.collection("roomavailability").get();

      if (!roomav.length) { return { success: false, msg: "Something Went Wrong!" }; }

      const avroomnos = roomnumber.split(',').map(value => value.trim()).filter(value => value !== '');

      let checkAv = await checkRoomAvForUpdate(bookingid, roomtype, roomnumber, arrivaldate, arrivaltime, departuredate, departuretime);
      if (!checkAv.success) { return { success: false, msg: checkAv?.msg } }

      let res = await releaseRoomOccupancy(bookingid);
      if (!res.success) { return { success: false, msg: "Something Went Wrong!" }; }

      roomav = await db.collection("roomavailability").get();

      let isCheckPass = true;
      let isCheckPassMsg = "";
      for (const avroom of avroomnos) {
        let roomData = roomav[0][roomtype.toLowerCase()];
        if (!roomData[avroom]) { isCheckPass = false; isCheckPassMsg = `${avroom} Invalid Room Number`; break; }
        if (roomData[avroom].av != "1") { isCheckPass = false; isCheckPassMsg = `${avroom} Room is not available!`; break; }

        let isrmavl = await isRoomAvailable(roomtype.toLowerCase(), avroom, arrivaldate, arrivaltime, departuredate, departuretime);
        if (!isrmavl) { isCheckPass = false; isCheckPassMsg = `${avroom} Room is not available in your Date Range!`; break; }
      };

      if (!isCheckPass) { return { success: false, msg: isCheckPassMsg } }

      avroomnos.forEach(avroom => {
        const roomObj = roomav[0][roomtype.toLowerCase()][avroom];
        roomObj.av = "0";
        const ifBookingExist = roomObj.activeBookings.find(room => room.bookingid === bookingid);
        if (!ifBookingExist) {
          roomObj.activeBookings.push({ bookingid: bookingid, arrivaldate: arrivaldate, departuredate: departuredate, arrivaltime: arrivaltime, departuretime: departuretime });
        }
      })

      await db.collection('roomavailability').set(roomav);

      return { success: true }
    } catch (e) {
      console.log("ReservationPageError (bookRoom) : ", e);
      return { success: false, msg: 'Something Went Wrong' }
    }
  }


  // Get :  Get all user data of a booking against bookingid
  // params : bookingid
  // return : 1. {success:true, data: {bookingid:"",name: {..}, phoneno: "", ...} }            IF ALL OK
  //          2. {success: false, msg: 'Something Went Wrong'}                                 IF SERVER ERROR
  //          3. {success:false, msg: "Invalid Booking Details"}                               IF BOOKING DATA NOT FOUND
  const getUserDataAgainstBookingId = async (bookingid) => {
    try {
      let booking = await db.collection('reservation').doc({ bookingid: bookingid }).get();
      if (!booking) { return { success: false, msg: "Invalid Booking Details" } }
      return { success: true, data: booking };
    } catch (e) {
      console.log("CheckinPageError (getUserDataAgainstBookingId) : ", e);
      return { success: false, msg: 'Something Went Wrong' }
    }
  }


  // Internal Service/Delete : Release Prev Stored Room Occupancy from RoomAv. DB
  // params : bookingid  (case sensitive)
  // return : 1. {success: true}                                            IF ALL OK
  //          2. {success:false, msg: "Invalid Booking Details"}            IF BOOKINGID IS INVALID/NOT FOUND
  //          3. {success:false, msg: "Something Went Wrong!"}              IF ROOMAV DB ERROR
  //          4. {success: false, msg: 'Something Went Wrong'}              IF SERVER ERROR
  const releaseRoomOccupancy = async (bookingid) => {
    try {
      let booking = await db.collection('reservation').doc({ bookingid: bookingid }).get();
      let roomav = await db.collection("roomavailability").get();

      if (!booking) { return { success: false, msg: "Invalid Booking Details" } }
      if (!roomav) { return { success: false, msg: "Something Went Wrong!" } }

      let rooms = booking.roomno;
      let roomtype = booking.typeofroom;
      roomtype = roomtype.toLowerCase();

      const avroomnos = rooms.split(',').map(value => value.trim()).filter(value => value !== '');

      avroomnos.forEach(avroom => {
        const roomObj = roomav[0][roomtype][avroom];
        roomObj.activeBookings = roomObj.activeBookings.filter(room => room.bookingid !== bookingid);
      })

      await db.collection('roomavailability').set(roomav);
      return { success: true }
    } catch (e) {
      console.log("CheckoutPageError (releaseRoomOccupancy) : ", e);
      return { success: false, msg: 'Something Went Wrong' }
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
  const checkRoomAvForUpdate = async (bookingid, uroomtype, uroomnumber, arrivaldate, arrivaltime, departuredate, departuretime) => {
    try {
      // Temp Remove Prev Booking Data locally
      let booking = await db.collection('reservation').doc({ bookingid: bookingid }).get();
      let roomav = await db.collection("roomavailability").get();

      if (!booking) { return { success: false, msg: "Invalid Booking Details" } }
      if (!roomav) { return { success: false, msg: "Something Went Wrong!" } }

      let rooms = booking.roomno;
      let roomtype = booking.typeofroom;
      roomtype = roomtype.toLowerCase();

      const avroomnos = rooms.split(',').map(value => value.trim()).filter(value => value !== '');

      avroomnos.forEach(avroom => {
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
        if (roomData[avroom].av != "1") { isCheckPass = false; isCheckPassMsg = `${avroom} Room is not available!`; break; }

        let ubookings = roomav[0][uroomtype.toLowerCase()][avroom].activeBookings;
        const requestedArrivalDT = new Date(arrivaldate + 'T' + arrivaltime);
        const requestedDepartureDT = new Date(departuredate + 'T' + departuretime);
        let isAv = true;
        for (let i = 0; i < ubookings.length; i++) {
          const ubooking = ubookings[i];

          const bookingArrivalDT = new Date(ubooking.arrivaldate + 'T' + ubooking.arrivaltime);
          const bookingDepartureDT = new Date(ubooking.departuredate + 'T' + ubooking.departuretime);

          if (requestedArrivalDT >= bookingArrivalDT && requestedArrivalDT < bookingDepartureDT ||
            requestedDepartureDT > bookingArrivalDT && requestedDepartureDT <= bookingDepartureDT) {
            isAv = false; break;
          }
        }

        if (!isAv) { isCheckPass = false; isCheckPassMsg = `${avroom} Room is not available in your Date Range!`; break; }
      };

      if (!isCheckPass) { return { success: false, msg: isCheckPassMsg } }
      // End of check room availability

      return { success: true }
    } catch (e) {
      console.log("CheckoutPageError (checkRoomAvForUpdate) : ", e);
      return { success: false, msg: 'Something Went Wrong' }
    }
  }


  // Internal Service/Check :  Check room is available or not
  // params :  roomtype, roomnumber, arrivaldate, arrivaltime, departuredate, departuretime
  // return :  1. true                      IF ROOM AVAILABLE
  //           2. false                     IF ROOM NOT AVAILABLE
  const isRoomAvailable = async (roomtype, roomnumber, arrivaldate, arrivaltime, departuredate, departuretime) => {
    let roomav = await db.collection("roomavailability").get();
    let bookings = roomav[0][roomtype.toLowerCase()][roomnumber].activeBookings;

    const requestedArrivalDT = new Date(arrivaldate + 'T' + arrivaltime);
    const requestedDepartureDT = new Date(departuredate + 'T' + departuretime);

    let isAv = true;
    for (let i = 0; i < bookings.length; i++) {
      const booking = bookings[i];

      const bookingArrivalDT = new Date(booking.arrivaldate + 'T' + booking.arrivaltime);
      const bookingDepartureDT = new Date(booking.departuredate + 'T' + booking.departuretime);

      if (requestedArrivalDT >= bookingArrivalDT && requestedArrivalDT < bookingDepartureDT ||
        requestedDepartureDT > bookingArrivalDT && requestedDepartureDT <= bookingDepartureDT) {
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
      setPaymentTypeBtnColor(""); setModeOfPayment(""); return;
    }
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

  const showBookingSuccessful = ()=>{
    setOpenBookingSuccessful(!openBookingSuccessful);
    setOpenBookingButtons(false);
  }

  const handleInputChange = (e) => {
    if (e.target.name == "title") { setGuestName({ ...guestName, title: e.target.value }); }
    else if (e.target.name == "firstname") { setGuestName({ ...guestName, firstname: e.target.value }); }
    else if (e.target.name == "middlename") { setGuestName({ ...guestName, middlename: e.target.value }); }
    else if (e.target.name == "lastname") { setGuestName({ ...guestName, lastname: e.target.value }); }
    else if (e.target.name == "address") { setAddress({ ...address, ad1: e.target.value }); }
    else if (e.target.name == "city") { setAddress({ ...address, city: e.target.value }); }
    else if (e.target.name == "state") { setAddress({ ...address, state: e.target.value }); }
    else if (e.target.name == "zip") { setAddress({ ...address, zip: e.target.value }); }
    else if (e.target.name == "noofrooms") { setNoOfRooms(e.target.value); }
    else if (e.target.name == "roomnumber" && e.target.value!=" ") { 
      setRoomNumber(e.target.value); 
      const avroomnos = e.target.value.split(',').map(value => value.trim()).filter(value => value !== '');
      if(!avroomnos.length) { setNoOfRooms("") }
      else { setNoOfRooms(avroomnos.length); }
    }
    else if (e.target.name == "reservationnumber") { setreservationNumber(e.target.value); }
    else if (e.target.name == "bookingdate") { setBookingDate(e.target.value); }
    else if (e.target.name == "extrabed") { setExtraBed(e.target.value); }
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
    else if (e.target.name == "arrivaltime") { setArrivalTime(e.target.value); }
    else if (e.target.name == "nights") { setNights(e.target.value); }
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
    else if (e.target.name == "departuretime") { setDepartureTime(e.target.value); }
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
    else if (e.target.name == "gstrate") { setgstRate(e.target.value); }
    else if (e.target.name == "deposit") { setDepositRate(e.target.value); }
    else if (e.target.name == "specialreq") { setSpecialReq(e.target.value); }
    else if (e.target.name == "guesticnumber") { setGuestICNumber(e.target.value); }
    else if (e.target.name == "guestphonenumber" && !isNaN(e.target.value) && e.target.value.length < 14 ) { setGuestPhoneNumber(e.target.value); }
    else if (e.target.name == "companyname") { setCompanyName(e.target.value); }
    else if (e.target.name == "tel") { setTel(e.target.value); }
    else if (e.target.name == "adults") { setAdults(e.target.value); }
    else if (e.target.name == "children") { setChildren(e.target.value); }
    else if (e.target.name == "cityledgetacct") { setCityLedgetAcct(e.target.value); }
    else if (e.target.name == "groupid") { setGroupId(e.target.value); }
    else if (e.target.name == "travelagentname") { setTravelAgentName(e.target.value); }
    else if (e.target.name == "aadharno" && !isNaN(e.target.value) && e.target.value.length < 17 ) { setAadharNo(e.target.value); }
    else if (e.target.name == "passportnumber") { setPassportNumber(e.target.value); }
    else if (e.target.name == "visanumber") { setVisaNumber(e.target.value); }
    else if (e.target.name == "passportdateofissue") { setPassportDateOfIssue(e.target.value); }
    else if (e.target.name == "visadateofissue") { setVisaDateOfIssue(e.target.value); }
    else if (e.target.name == "arrivedfrom") { setArrivedFrom(e.target.value); }
    else if (e.target.name == "placeofissue") { setPlaceOfIssue(e.target.value); }
    else if (e.target.name == "purpose") { setPurpose(e.target.value); }
  };

  const submitAction = (e) => {
    e.preventDefault();
    alert("Your form submitted!");
    console.log(roomType);
    console.log(noOfRooms);
    console.log(roomNumber);
    console.log(reservationNumber);
    console.log(bookingDate);
    console.log(extraBed);
    console.log(mealPlan);
    console.log(arrivalDate);
    console.log(arrivalTime);
    console.log(nights);
    console.log(departureDate);
    console.log(departureTime);
    console.log(roomRate);
    console.log(discountAmount);
    console.log(discountPercentage);
    console.log(modeOfPayment);
    console.log(gstRate);
    console.log(depositRate);
    console.log(specialReq);
    console.log(guestName);
    console.log(guestICNumber);
    console.log(guestPhoneNumber);
    console.log(companyName);
    console.log(address);
    console.log(tel);
    console.log(adults);
    console.log(children);
    console.log(cityLedgetAcct);
    console.log(groupId);
    console.log(travelAgentName);
    console.log(openCountry);
    console.log(aadharNo);
    console.log(passportNumber);
    console.log(visaNumber);
    console.log(passportDateOfIssue);
    console.log(visaDateOfIssue);
    console.log(arrivedFrom);
    console.log(placeOfIssue);
    console.log(purpose);
  };

  return (
    <div>
      <div className="bg-light h-100">
        <nav className="navbar sticky-top navbar navbar-expand-lg bg-light">
          <div className="container-fluid">
            <div className="navbar-brand d-flex align-items-center">
              <NavLink className="text-primary" to="/Home3">
                <i className="bx bx-chevrons-left font-size-25"></i>
              </NavLink>
              <h5 className="text-primary">Check In</h5>
            </div>
          </div>
        </nav>
        <div className="container mb-1">
          <div className="d-flex align-items-center justify-content-between large-flex-column reserv-col-gap-1">
            <form className="col-6 bg-skyblue mt-0 p-2 height-650 large-width-full">
              <div className="d-flex align-items-center rev-margin-gap">
                <label htmlFor="roomtype" className="col-sm-3 col-form-label font-size-14">
                  Room Type{" "}
                </label>
                <div className="col-sm-9 d-flex justify-content-between reserv-col-gap-5p">
                  <button
                    type="button"
                    className={`d-flex align-items-center justify-content-center width-100p text-primary font-size-14 btn button-padding-5 height-30 large-button-width-60 large-button-font-size-12 ${roomTypeBtnColor === "Standard"
                      ? "button-color-onHover"
                      : "background-gray"
                      }`}
                    onClick={() => {
                      changeRoomBtnColor("Standard");
                    }}
                  >
                    Standard
                  </button>
                  <button
                    type="button"
                    className={`d-flex align-items-center justify-content-center text-primary font-size-14 btn button-padding-5 height-30 large-button-width-60 large-button-font-size-12 ${roomTypeBtnColor === "Delux" ? "button-color-onHover" : "background-gray"
                      }`}
                    onClick={() => {
                      changeRoomBtnColor("Delux");
                    }}
                  >
                    Delux
                  </button>
                  <button
                    type="button"
                    className={`d-flex align-items-center justify-content-center width-100p text-primary font-size-14 btn button-padding-5 height-30 large-button-width-60 large-button-font-size-12 ${roomTypeBtnColor === "Executive"
                      ? "button-color-onHover"
                      : "background-gray"
                      }`}
                    onClick={() => {
                      changeRoomBtnColor("Executive");
                    }}
                  >
                    Executive
                  </button>
                </div>
              </div>
              <div className="d-flex align-items-center rev-margin-gap">
                <label htmlFor="noofrooms" className="col-sm-3 col-form-label font-size-14">
                  No of Room{" "}
                </label>
                <div className="col-sm-9">
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
              <div className="d-flex align-items-center rev-margin-gap">
                <label htmlFor="roomnumber" className="col-sm-3 col-form-label font-size-14">
                  Room No{" "}
                </label>
                <div className="col-sm-9">
                  <input
                    readOnly={isRoomNoDisabled}
                    type="text"
                    className="form-control height-30 font-size-14 background-gray"
                    id="inputRoomNo"
                    name="roomnumber"
                    value={roomNumber}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="d-flex align-items-center rev-margin-gap">
                <label htmlFor="reservationnumber" className="col-sm-3 col-form-label font-size-14">
                  Reservation No{" "}
                </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control height-30 font-size-14 background-gray"
                    id="inputReservationNumber"
                    name="reservationnumber"
                    value={reservationNumber}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="d-flex align-items-center rev-margin-gap">
                <label htmlFor="bookingdate" className="col-sm-3 col-form-label font-size-14">
                  Booking Date{" "}
                </label>
                <div className="col-sm-9">
                  <input
                    type="date"
                    className="form-control height-30 font-size-14 background-gray"
                    id="inputBookingDate"
                    name="bookingdate"
                    max={arrivalDate}
                    value={bookingDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="d-flex align-items-center rev-margin-gap">
                <label htmlFor="extrabed" className="col-sm-3 col-form-label font-size-14">
                  Extra Bed{" "}
                </label>
                <div className="col-sm-9">
                  <input
                    type="number"
                    className="form-control height-30 font-size-14 background-gray"
                    id="inputExtraBed"
                    name="extrabed"
                    min="0"
                    value={extraBed}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="d-flex align-items-center rev-margin-gap">
                <label htmlFor="mealplan" className="col-sm-3 col-form-label font-size-14">
                  Meal Plan{" "}
                </label>
                <div className="col-sm-9 d-flex justify-content-between">
                  <button
                    type="button"
                    className={`w-70 height-30 d-flex align-items-center justify-content-center font-size-14 text-primary btn button-padding-5 large-button-width-40 large-button-font-size-12 ${mealTypeBtnColor === "EP" ? "button-color-onHover" : "background-gray"
                      }`}
                    onClick={() => {
                      changeMealBtnColor("EP");
                    }}
                  >
                    EP
                  </button>
                  <button
                    type="button"
                    className={`w-70 height-30 d-flex align-items-center justify-content-center font-size-14 text-primary btn button-padding-5 large-button-width-40 large-button-font-size-12 ${mealTypeBtnColor === "CP" ? "button-color-onHover" : "background-gray"
                      }`}
                    onClick={() => {
                      changeMealBtnColor("CP");
                    }}
                  >
                    CP
                  </button>
                  <button
                    type="button"
                    className={`w-70 height-30 d-flex align-items-center justify-content-center font-size-14 text-primary btn button-padding-5 large-button-width-40 large-button-font-size-12 ${mealTypeBtnColor === "AP" ? "button-color-onHover" : "background-gray"
                      }`}
                    onClick={() => {
                      changeMealBtnColor("AP");
                    }}
                  >
                    AP
                  </button>
                  <button
                    type="button"
                    className={`w-70 height-30 d-flex align-items-center justify-content-center font-size-14 text-primary btn button-padding-5 large-button-width-40 large-button-font-size-12 ${mealTypeBtnColor === "MAP" ? "button-color-onHover" : "background-gray"
                      }`}
                    onClick={() => {
                      changeMealBtnColor("MAP");
                    }}
                  >
                    MAP
                  </button>
                </div>
              </div>
              <div className="d-flex align-items-center rev-margin-gap">
                <label htmlFor="arrivaldate" className="col-sm-3 col-form-label font-size-14">
                  Arrival Date{" "}
                </label>
                <div className="col-sm-4">
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
                <label htmlFor="arrivaltime" className="col-sm-1 col-form-label font-size-14 reserv-padding-left">
                  at{" "}
                </label>
                <div className="col-sm-4">
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
              <div className="d-flex align-items-center rev-margin-gap">
                <label
                  htmlFor="nights"
                  className="col-sm-3 col-form-label font-size-14"
                >
                  Nights
                </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control height-30 font-size-14 background-gray"
                    id="inputNights"
                    name="nights"
                    value={nights}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="d-flex align-items-center rev-margin-gap">
                <label htmlFor="departuredate" className="col-sm-3 col-form-label font-size-14">
                  Departure Date{" "}
                </label>
                <div className="col-sm-4">
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
                <label htmlFor="departuretime" className="col-sm-1 col-form-label font-size-14 reserv-padding-left">
                  at{" "}
                </label>
                <div className="col-sm-4">
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
              <div className="d-flex align-items-center rev-margin-gap">
                <label htmlFor="roomrate" className="col-sm-3 col-form-label font-size-14">
                  Room Rate{" "}
                </label>
                <div className="col-sm-9">
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
              <div className="d-flex align-items-center rev-margin-gap">
                <div className="col-md-6 d-flex align-items-center">
                  <label
                    htmlFor="discountamount"
                    className="col-sm-6 col-form-label font-size-14"
                  >
                    Discount amount{" "}
                  </label>
                  <div className="col-sm-6">
                    <input
                      readOnly={isDiscountDisabled}
                      type="number"
                      className="form-control height-30 font-size-14 background-gray"
                      min="0"
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
                    className="col-sm-4 col-form-label font-size-14 reserv-padding-left"
                  >
                    Discount %{" "}
                  </label>
                  <div className="col-sm-8">
                    <input
                      readOnly={isDiscountDisabled}
                      type="number"
                      min="0"
                      className="form-control height-30 font-size-14 background-gray"
                      id="inputNoOfRoom"
                      name="discountpercentage"
                      value={discountPercentage}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center rev-margin-gap">
                <label
                  htmlFor="modeofpayment"
                  className="col-sm-3 col-form-label font-size-14"
                >
                  Mode of Payment{" "}
                </label>
                <div className="col-sm-9 d-flex justify-content-between">
                  <button
                    type="button"
                    className={`w-70 height-30 d-flex align-items-center justify-content-center font-size-14 text-primary btn button-padding-5 large-button-width-60 large-button-font-size-12 ${paymentTypeBtnColor === "Cash"
                      ? "button-color-onHover"
                      : "background-gray"
                      }`}
                    onClick={() => {
                      changePaymentBtnColor("Cash");
                    }}
                  >
                    Cash
                  </button>
                  <button
                    type="button"
                    className={`w-70 height-30 d-flex align-items-center justify-content-center font-size-14 text-primary btn button-padding-5 large-button-width-60 large-button-font-size-12 ${paymentTypeBtnColor === "Card"
                      ? "button-color-onHover"
                      : "background-gray"
                      }`}
                    onClick={() => {
                      changePaymentBtnColor("Card");
                    }}
                  >
                    Card
                  </button>
                  <button
                    type="button"
                    className={`w-70 height-30 d-flex align-items-center justify-content-center font-size-14 text-primary btn button-padding-5 large-button-width-60 large-button-font-size-12 ${paymentTypeBtnColor === "UPI"
                      ? "button-color-onHover"
                      : "background-gray"
                      }`}
                    onClick={() => {
                      changePaymentBtnColor("UPI");
                    }}
                  >
                    UPI
                  </button>
                </div>
              </div>
              <div className="d-flex align-items-center rev-margin-gap">
                <label
                  htmlFor="gstrate"
                  className="col-sm-3 col-form-label font-size-14"
                >
                  GST{" "}
                </label>
                <div className="col-sm-9">
                  <input
                    type="number"
                    className="form-control height-30 font-size-14 background-gray"
                    min="0"
                    id="inputGst"
                    name="gstrate"
                    value={gstRate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="d-flex align-items-center rev-margin-gap">
                <label
                  htmlFor="deposit"
                  className="col-sm-3 col-form-label font-size-14"
                >
                  Deposit{" "}
                </label>
                <div className="col-sm-9">
                  <input
                    type="number"
                    className="form-control height-30 font-size-14 background-gray"
                    min="0"
                    id="inputDeposit"
                    name="deposit"
                    value={depositRate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="d-flex rev-margin-gap">
                <label htmlFor="specialreq" className="col-sm-3 col-form-label font-size-14">
                  Special Request{" "}
                </label>
                <div className="col-sm-9">
                  <textarea
                    className="form-control font-size-14 background-gray"
                    id="inputRequest"
                    rows="2"
                    name="specialreq"
                    value={specialReq}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              </div>
            </form>
            <div className="flex-column align-items-start height-650 large-width-full">
              <div className="d-flex justify-content-end column-gap-3">
                <button
                  type="button"
                  className="d-flex align-items-center text-primary btn btn-light button-padding-5"
                >
                  <i className="bx bxs-plus-square font-size-25"></i>Add
                </button>
                <button
                  type="button"
                  className="d-flex align-items-center text-primary btn btn-light button-padding-5"
                >
                  <i className="bx bxs-x-circle font-size-25"></i>Cancel
                </button>
              </div>
              <form className="bg-skyblue mt-0 p-2 height-600">
                <div className="d-flex align-items-center rev-margin-gap">
                  <label htmlFor="name" className="col-sm-3 col-form-label font-size-14">
                    Guest Name
                  </label>
                  <div className="col-sm-9 d-flex column-gap-1">
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
                <div className="d-flex align-items-center rev-margin-gap">
                  <div className="col-md-6 d-flex align-items-center">
                    <label
                      htmlFor="guesticnumber"
                      className="col-sm-6 col-form-label font-size-14"
                    >
                      IC No{" "}
                    </label>
                    <div className="col-sm-6">
                      <input
                        type="text"
                        className="form-control height-30 font-size-14 background-gray"
                        id="inputICNumber"
                        name="guesticnumber"
                        value={guestICNumber}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6 d-flex align-items-center reserv-padding-left">
                    <label
                      htmlFor="guestphonenumber"
                      className="col-sm-4 col-form-label font-size-14"
                    >
                      Phone No{" "}
                    </label>
                    <div className="col-sm-8">
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
                <div className="d-flex align-items-center font-size-14 rev-margin-gap">
                  <label htmlFor="companyname" className="col-sm-3 col-form-label">
                    Company{" "}
                  </label>
                  <div className="col-sm-9">
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
                <div className="d-flex align-items-center rev-margin-gap">
                  <label htmlFor="address" className="col-sm-3 col-form-label font-size-14">
                    Address{" "}
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control height-30 font-size-14 background-gray"
                      id="inputAddress"
                      name="address"
                      value={address.ad1}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="d-flex align-items-center rev-margin-gap">
                  <div className="col-md-6 d-flex align-items-center">
                    <label
                      htmlFor="city"
                      className="col-sm-6 col-form-label font-size-14"
                    >
                      City{" "}
                    </label>
                    <div className="col-sm-6">
                      <input
                        type="text"
                        className="form-control height-30 font-size-14 background-gray"
                        id="inputCity"
                        name="city"
                        value={address.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6 d-flex align-items-center reserv-padding-left">
                    <label
                      htmlFor="state"
                      className="col-sm-3 col-form-label font-size-14"
                    >
                      State{" "}
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control height-30 font-size-14 background-gray"
                        id="inputState"
                        name="state"
                        value={address.state}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center rev-margin-gap">
                  <div className="col-md-6 d-flex align-items-center">
                    <label
                      htmlFor="zip"
                      className="col-sm-6 col-form-label font-size-14"
                    >
                      Zip{" "}
                    </label>
                    <div className="col-sm-6">
                      <input
                        type="text"
                        className="form-control height-30 font-size-14 background-gray"
                        id="inputZip"
                        name="zip"
                        value={address.zip}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6 d-flex align-items-center reserv-padding-left">
                    <label
                      htmlFor="tel"
                      className="col-sm-3 col-form-label font-size-14"
                    >
                      Tel{" "}
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control height-30 font-size-14 background-gray"
                        id="inputTel"
                        name="tel"
                        value={tel}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center rev-margin-gap">
                  <div className="col-md-6 d-flex align-items-center">
                    <label
                      htmlFor="adults"
                      className="col-sm-6 col-form-label font-size-14"
                    >
                      Adults{" "}
                    </label>
                    <div className="col-sm-6">
                      <input
                        type="number"
                        className="form-control height-30 font-size-14 background-gray"
                        id="inputAdults"
                        name="adults"
                        min="0"
                        value={adults}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6 d-flex align-items-center reserv-padding-left">
                    <label
                      htmlFor="children"
                      className="col-sm-3 col-form-label font-size-14"
                    >
                      Children{" "}
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="number"
                        className="form-control height-30 font-size-14 background-gray"
                        id="inputChildren"
                        name="children"
                        min="0"
                        value={children}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center rev-margin-gap">
                  <div className="col-md-6 d-flex align-items-center">
                    <label
                      htmlFor="cityledgetacct"
                      className="col-sm-6 col-form-label font-size-14"
                    >
                      City Ledge Acct{" "}
                    </label>
                    <div className="col-sm-6">
                      <input
                        type="text"
                        className="form-control height-30 font-size-14 background-gray"
                        id="inputCityledgetAcct"
                        name="cityledgetacct"
                        value={cityLedgetAcct}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6 d-flex align-items-center reserv-padding-left">
                    <label
                      htmlFor="groupid"
                      className="col-sm-3 col-form-label font-size-14"
                    >
                      Group Id{" "}
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control height-30 font-size-14 background-gray"
                        id="inputGroupId"
                        name="groupid"
                        value={groupId}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <label
                    htmlFor="travelagentname"
                    className="col-sm-3 col-form-label font-size-14"
                  >
                    Travel Agent{" "}
                  </label>
                  <div className="col-sm-9">
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
                <div className="d-flex align-items-center rev-margin-gap">
                  <label
                    htmlFor="country"
                    className="col-sm-3 col-form-label font-size-14"
                  >
                    Country{" "}
                  </label>
                  <div className="col-sm-5 d-flex justify-content-between">
                    <button
                      type="button"
                      className={`w-70 height-30 d-flex align-items-center justify-content-center font-size-14 text-primary btn button-padding-5 large-button-width-60 large-button-font-size-12 ${CountryBtnColor === "India"
                        ? "button-color-onHover"
                        : "background-gray"
                        }`}
                      onClick={() => {
                        setCountryBtnColor("India"); setOpenCountry("India");
                      }}
                    >
                      India
                    </button>
                    <button
                      type="button"
                      className={`w-70 height-30 d-flex align-items-center justify-content-center font-size-14 text-primary btn button-padding-5 large-button-width-60 large-button-font-size-12 ${CountryBtnColor === "Other"
                        ? "button-color-onHover"
                        : "background-gray"
                        }`}
                      onClick={() => {
                        setCountryBtnColor("Other"); setOpenCountry("Other");
                      }}
                    >
                      Other
                    </button>
                  </div>
                </div>
                {openCountry == "India" && <div className="flex-column">
                  <div className="d-flex align-items-center font-size-14 rev-margin-gap">
                    <label htmlFor="aadharno" className="col-sm-3 col-form-label">
                      Aadhar No{" "}
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control height-30 font-size-14 background-gray"
                        id="inputAadhar"
                        name="aadharno"
                        value={aadharNo}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="d-flex align-items-center font-size-14 rev-margin-gap">
                    <label htmlFor="aadharphoto" className="col-sm-3 col-form-label">
                      Aadhar Photo{" "}
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="file"
                        className="form-control height-30 font-size-14 background-gray"
                        id="inputAadharPhoto"
                        name="aadharphoto"
                      />
                    </div>
                  </div>
                </div>}
                {openCountry == "Other" && <div className="flex-column">
                  <div className="d-flex align-items-center rev-margin-gap">
                    <div className="col-md-6 d-flex align-items-center">
                      <label
                        htmlFor="passportnumber"
                        className="col-sm-6 col-form-label font-size-14"
                      >
                        Passport No{" "}
                      </label>
                      <div className="col-sm-6">
                        <input
                          type="text"
                          className="form-control height-30 font-size-14 background-gray"
                          id="inputPassportNumber"
                          name="passportnumber"
                          value={passportNumber}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6 d-flex align-items-center reserv-padding-left">
                      <label
                        htmlFor="visanumber"
                        className="col-sm-5 col-form-label font-size-14"
                      >
                        Visa No{" "}
                      </label>
                      <div className="col-sm-7">
                        <input
                          type="text"
                          className="form-control height-30 font-size-14 background-gray"
                          id="inputVisaNumber"
                          name="visanumber"
                          value={visaNumber}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center rev-margin-gap">
                    <div className="col-md-6 d-flex align-items-center">
                      <label
                        htmlFor="passportdateofissue"
                        className="col-sm-6 col-form-label font-size-14"
                      >
                        Passport Date of Issue{" "}
                      </label>
                      <div className="col-sm-6">
                        <input
                          type="date"
                          className="form-control height-30 font-size-14 background-gray"
                          id="inputPassportDateOfIssue"
                          name="passportdateofissue"
                          value={passportDateOfIssue}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6 d-flex align-items-center reserv-padding-left">
                      <label
                        htmlFor="visadateofissue"
                        className="col-sm-5 col-form-label font-size-14"
                      >
                        Visa Date of Issue{" "}
                      </label>
                      <div className="col-sm-7">
                        <input
                          type="date"
                          className="form-control height-30 font-size-14 background-gray"
                          id="inputVisaDateOfIssue"
                          name="visadateofissue"
                          value={visaDateOfIssue}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center rev-margin-gap">
                    <div className="col-md-6 d-flex align-items-center">
                      <label
                        htmlFor="arrivedfrom"
                        className="col-sm-6 col-form-label font-size-14"
                      >
                        Arrived From{" "}
                      </label>
                      <div className="col-sm-6">
                        <input
                          type="text"
                          className="form-control height-30 font-size-14 background-gray"
                          id="inputArrivedFrom"
                          name="arrivedfrom"
                          value={arrivedFrom}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6 d-flex align-items-center reserv-padding-left">
                      <label
                        htmlFor="placeofissue"
                        className="col-sm-5 col-form-label font-size-14"
                      >
                        Place of Issue{" "}
                      </label>
                      <div className="col-sm-7">
                        <input
                          type="text"
                          className="form-control height-30 font-size-14 background-gray"
                          id="inputPlaceofIssue"
                          name="placeofissue"
                          value={placeOfIssue}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center font-size-14 rev-margin-gap">
                    <label htmlFor="purpose" className="col-sm-7 col-form-label">
                      Purposed Duration of Stay in Hotel{" "}
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="text"
                        className="form-control height-30 font-size-14 background-gray"
                        id="inputPurpose"
                        name="purpose"
                        value={purpose}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>}
              </form>
            </div>
          </div>
          {openBookingButtons && <div className="d-flex align-items-center justify-content-between reserv-col-gap-1 mt-2 p-2 pb-2">
            <button
              type="button"
              className={`d-flex align-items-center justify-content-center text-primary font-size-18 btn button-padding-5 width-200 height-40 large-button-width-60 large-button-font-size-12 background-gray`}
              onClick={()=>{navigate('/Home3')}}
              >
              Booking Hold
            </button>
            <button
              type="button"
              className={`d-flex align-items-center justify-content-center text-primary font-size-18 btn button-padding-5 width-200 height-40 large-button-width-60 large-button-font-size-12 background-gray`}
              onClick={(e)=>{showBookingSuccessful(); submitAction(e);}}
              >
              Pay & Book
            </button>
            <button
              type="button"
              className={`d-flex align-items-center justify-content-center text-primary font-size-18 btn button-padding-5 width-200 height-40 large-button-width-60 large-button-font-size-12 background-gray`} 
              onClick={(e)=>{showBookingSuccessful(); submitAction(e);}}
              >
              Book
            </button>
          </div>}
          {openBookingSuccessful && <div className="d-flex align-items-center justify-content-center mb-3 p-4 mt-2">
            <i className="bx bxs-check-circle text-primary font-size-50"></i>
            <div className="d-flex align-items-center justify-content-center">
              <h3 className="pt-2 text-primary small-font-size-20">
                Booking has been done Successfully
              </h3>
            </div>
          </div>}
        </div>
      </div>
    </div>
  );
};

export default CheckIn;
