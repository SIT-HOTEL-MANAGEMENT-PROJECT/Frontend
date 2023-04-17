/* eslint-disable eqeqeq */
import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import "../CustomCss/Reservation.css";
import Localbase from "localbase";
import { useEffect } from "react";
let db = new Localbase("hmctdb");
db.config.debug = false;

const printUrl = process.env.REACT_APP_PRINT_URL;

const CheckOut = () => {
  let navigate = useNavigate();
  const location = useLocation();

  const [paymentTypeBtnColor, setPaymentTypeBtnColor] = useState("");
  const [splitTypeBtnColor, setSplitTypeBtnColor] = useState("");

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
  const [filterFrom, setFilterFrom] = useState("");
  const [filterTo, setFilterTo] = useState("");
  const [settlementAmount, setSettlementAmount] = useState(0);
  const [modeOfPayment, setModeOfPayment] = useState("");
  const [modeOfSplit, setModeOfSplit] = useState("");
  const [pendingCheckoutData, setPendingCheckoutData] = useState([]);

  const [openGuestInfo, setOpenGuestInfo] = useState(false);
  const [openSettlementPopup, setOpenSettlementPopup] = useState(false);
  const [openSplitBillPopup, setOpenSplitBillPopup] = useState(false);



  useEffect(() => { initialPrepopulatedData(); }, [])


  useEffect(() => {
    setTimeout(() => {
      const query = new URLSearchParams(location.search);
      const bookingid = query.get('bookingid');
      if (bookingid && bookingid.length === 14) { getAndSetUserData(bookingid); setregistrationNo(bookingid); }
      else if (!bookingid) { showPendingCheckoutDataAction(); }
    }, 1000);
  }, [location])


  const getPendingCheckoutData = async (startdate, enddate) => {
    try {
      let bookings = await db.collection('reservation').get();
      if (!Array.isArray(bookings)) { bookings = [bookings]; }

      let pendingBookings = [];
      if (bookings?.length >= 1) {
        pendingBookings = bookings.filter(booking => {
          return booking.checkedoutstatus === 'pending' && booking.checkedinstatus === 'done' &&
            booking.departuredate >= startdate &&
            booking.departuredate <= enddate;
        });
      }

      return { success: true, data: pendingBookings };
    } catch (e) {
      console.log("CheckoutPageError (getPendingCheckoutData) : ", e);
      return { success: false, msg: 'Something Went Wrong' }
    }
  }


  // Add :  Add checkout details 
  // params : none     (directly get data from useState)
  // return :   1.  {success:true}                                    IF ADDED SUCCESSFULLY
  //            2.  {success:false, msg: 'Something Went Wrong'}      IF ADD FAILED
  const updateReservationData = async () => {
    try {
      let reservationData = await db.collection('reservation').doc({ bookingid: registrationNo }).get();
      if (!reservationData) return { success: false, msg: "Reservation Not Found!" }

      if (roomNumber) {
        let isBooked = await releaseRoomOccupancy(registrationNo);
        if (!isBooked.success) { return { success: false, msg: isBooked?.msg } }
      }

      await db.collection('reservation').doc({ bookingid: registrationNo }).update({
        departuredate: departureDate, departuretime: departureTime, billingdate: billDate, checkedoutstatus: "done"
      })

      return { success: true }
    } catch (e) {
      console.log("CheckoutPageError (updateReservationData) : ", e);
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
      let booking = await db.collection('reservation').doc({ bookingid: bookingid, checkedinstatus: "done", checkedoutstatus: "pending" }).get();
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


  const updatePaymentSettlement = async()=>{
    try{
      let reservationData = await db.collection('reservation').doc({ bookingid: registrationNo }).get();
      if (!reservationData) return { success: false, msg: "Reservation Not Found!" }

      let updatedpaymenthistory = reservationData.paymenthistory;
      const todaydateforpayment = new Date();
      const todaydateforpaymentstring = todaydateforpayment.toISOString().slice(0, 10);

      let paym = settlementAmount;
      let paymString = paym.toString();

      if (!updatedpaymenthistory.some((item) => item.name === "settlement")) {
        updatedpaymenthistory.push({
          name: "settlement",
          description: "Checkout time payment",
          date: todaydateforpaymentstring,
          debit: "",
          credit: paymString,
        });
      } else {
        updatedpaymenthistory = updatedpaymenthistory.map((item) => {
          if (item.name === "settlement") {
            paym = paym + parseInt(item.credit)
            paymString = paym.toString();
            return {
              ...item,
              date: todaydateforpaymentstring,
              debit:"",
              credit: paymString,
            };
          } else {
            return item;
          }
        });
      }

      await db.collection('reservation').doc({ bookingid: registrationNo }).update({
        departuredate: departureDate, departuretime: departureTime, 
        paymenthistory: updatedpaymenthistory
      })

      await updateRupeesAdrValue(paymString);
      
      setPaymentData(updatedpaymenthistory);

      let totalDebit = 0;
      let totalCredit = 0;

      for (const transaction of updatedpaymenthistory) {
        if (transaction.debit !== '') {
          totalDebit += parseFloat(transaction.debit);
        }
        if (transaction.credit !== '') {
          totalCredit += parseFloat(transaction.credit);
        }
      }

      setTtlDebit(totalDebit);
      setTtlCredit(totalCredit);
      checkBillSettlement(totalDebit,totalCredit);
      
      const bill = document.getElementById("billpopup");
      bill.contentWindow.location.reload();
      
      const roombill = document.getElementById("roombillpopup");
      roombill.contentWindow.location.reload();
      
      const servicebill = document.getElementById("servicebillpopup");
      servicebill.contentWindow.location.reload();

      return { success: true }
    }catch(e){
      console.log("CheckoutPageError (updatePaymentSettlement) : ", e);
      return { success: false, msg: "Something Went Wrong" };
    }
  }


  // Update : Update how much amount paid by user today in ADR DB
  // params : amount (amountpaid by user. not pay-later) (string)
  // return : 1. {success: true }                                                     IF ALL OK
  //          2. {success: false, msg: 'Something Went Wrong'}                        IF INTERNAL SERVER ERROR
  let prevvalue = 0;
  const updateRupeesAdrValue = async (amount) => {
    try {
      const todaydateforpayment = new Date();
      const todaydateforpaymentstring = todaydateforpayment.toISOString().slice(0, 10);

      let rupeesadrData = await db.collection('rupeesadr').doc({ date: todaydateforpaymentstring }).get();
      if (!rupeesadrData) {
        prevvalue = parseFloat(amount);
        await db.collection('rupeesadr').add({ date: todaydateforpaymentstring, value: parseFloat(amount) });
      } else {
        let updateval;
        updateval = parseFloat(rupeesadrData.value) + parseFloat(amount);
        if (prevvalue) { updateval = parseFloat(updateval) - parseFloat(prevvalue); }
        prevvalue = parseFloat(amount);
        await db.collection('rupeesadr').doc({ date: todaydateforpaymentstring }).update({ value: parseFloat(updateval) });
      }

      return { success: true }
    } catch (e) {
      console.log("ReservationConfirmationPageError (updateRupeesAdrValue) : ", e);
      return { success: false, msg: "Something Went Wrong" }
    }
  }



  const showPendingCheckoutDataAction = async () => {
    let todayDate = new Date();
    let todayDateString = todayDate.toISOString().slice(0, 10);
    let res = await getPendingCheckoutData(todayDateString, todayDateString);
    if (res?.success) { if (res?.data.length >= 1) { setOpenGuestInfo(true); } setPendingCheckoutData(res?.data); } else { setOpenGuestInfo(false); setPendingCheckoutData([]); }
  }


  const checkBillSettlement = (debitamt,creditamt)=>{
    if(debitamt==0){ setSettlementAmount(0); return; }
    if(creditamt > debitamt) { setSettlementAmount(0); return; }

    let stamt = debitamt - creditamt;
    setSettlementAmount(stamt);
  }

  const getAndSetUserData = async (bookingid) => {
    let res = await getUserDataAgainstBookingId(bookingid);
    if (res?.success) {
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
      checkBillSettlement(totalDebit,totalCredit);
    } else {
      setGuestName({ title: "", firstname: "", middlename: "", lastname: "", });
      setTravelAgentName(''); setGuestPhoneNumber(''); setCompanyName(''); setGstId(''); setBilling(''); setBillNo('');
      setConfirmationNo(''); setRoomNumber(''); setNoOfRooms(''); setRoomRate(''); setGuestsNo(''); setArrivalDate('');
      setArrivalTime(''); setPaymentData([]);

      setTtlDebit(0);
      setTtlCredit(0);
      checkBillSettlement(0,0);
    }
  }


  const initialPrepopulatedData = async () => {
    let todayDate = new Date();
    let todayDateString = todayDate.toISOString().slice(0, 10);
    const hours = todayDate.getHours().toString().padStart(2, '0');
    const minutes = todayDate.getMinutes().toString().padStart(2, '0');
    const todayTimeString = `${hours}:${minutes}`;
    setdepartureDate(todayDateString); setDepartureTime(todayTimeString); setBillDate(todayDateString);
    setFilterFrom(todayDateString); setFilterTo(todayDateString);
  }

  const showGuestInfo = async () => {
    let res = await getPendingCheckoutData(filterFrom, filterTo);
    if (res?.success) { if (res?.data.length >= 1) { setOpenGuestInfo(true); } setPendingCheckoutData(res?.data); } else { setOpenGuestInfo(false); setPendingCheckoutData([]); }
  }

  const showSettlementPopup = () => {
    setModeOfPayment(""); setPaymentTypeBtnColor("");
    setOpenSettlementPopup(!openSettlementPopup);
  }

  const settlementAction = async()=>{
    let res = await updatePaymentSettlement();
    if(res?.success){
      showSettlementPopup();
      alert("Payment Settled");
    }else{
      alert(res?.msg);
    }
  }
  
  const changePaymentBtnColor = (paymentType) => {
    if (paymentType == modeOfPayment) {
      setPaymentTypeBtnColor(""); setModeOfPayment(""); return;
    }
    setPaymentTypeBtnColor(paymentType);
    setModeOfPayment(paymentType);
  };
  
  const printBill = ()=>{
    const bill = document.getElementById("billpopup");
    bill.contentWindow.print();
  }
  
  const printRoomBill = ()=>{
    const roombill = document.getElementById("roombillpopup");
    roombill.contentWindow.print();
  }
  
  const printServiceBill= ()=>{
    const servicebill = document.getElementById("servicebillpopup");
    servicebill.contentWindow.print();
  }
  
  const showSplitBillPopup = ()=>{
    setModeOfSplit(""); setSplitTypeBtnColor("");
    setOpenSplitBillPopup(!openSplitBillPopup);
  }

  const changeSplitBillBtnColor = (splitType) => {
    if (splitType == modeOfSplit) {
      setSplitTypeBtnColor(""); setModeOfSplit(""); return;
    }
    setSplitTypeBtnColor(splitType);
    setModeOfSplit(splitType);
  };

  const printAction = ()=>{
    showSplitBillPopup();
    if(modeOfSplit == 'roombill'){ printRoomBill(); }
    else if(modeOfSplit == 'servicebill'){ printServiceBill(); }
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
    else if (e.target.name == "roomnumber" && e.target.value != " ") {
      setRoomNumber(e.target.value);
      const avroomnos = e.target.value.split(',').map(value => value.trim()).filter(value => value !== '');
      if (!avroomnos.length) { setNoOfRooms("") }
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
      if (e.target.value.length != 14 && confirmationNo != '') {
        setGuestName({ title: "", firstname: "", middlename: "", lastname: "", });
        setTravelAgentName(''); setGuestPhoneNumber(''); setCompanyName(''); setGstId(''); setBilling(''); setBillNo('');
        setConfirmationNo(''); setRoomNumber(''); setNoOfRooms(''); setRoomRate(''); setGuestsNo(''); setArrivalDate('');
        setArrivalTime(''); setPaymentData([]); setSettlementAmount(0);

        setTtlDebit(0);
        setTtlCredit(0);
      }
      else if (e.target.value.length == 14) { getAndSetUserData(e.target.value); }
    }
    else if (e.target.name == "filterfrom") { setFilterFrom(e.target.value); }
    else if (e.target.name == "filterto") { setFilterTo(e.target.value); }
    else if (e.target.name == "settlementamount") { setSettlementAmount(e.target.value); }
  };

  const submitAction = async (e) => {
    e.preventDefault();
    let res = await updateReservationData();
    if (res.success) {
      alert("Your Checkout Successful!");
      navigate('/Home3');
    } else {
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
          <div>
            <div className='d-flex justify-content-center align-items-center reserv-col-gap-1'>
              <h5>From</h5>
              <input type='date' className="form-control height-30 width-150 font-size-14 background-gray" id="inputDate" name="filterfrom" value={filterFrom} onChange={handleInputChange}></input>
              <h5>To</h5>
              <input type='date' className="form-control height-30 width-150 font-size-14 background-gray" id="inputDate" name="filterto" value={filterTo} onChange={handleInputChange}></input>
              <button type="button" className="d-flex align-items-center justify-content-center text-primary font-size-16 btn btn button-color-onHover button-padding-5 height-30 large-button-width-60 large-button-font-size-12" onClick={() => { showGuestInfo() }}>Apply</button>
            </div>
            {openGuestInfo && <div className="table-responsive height-200 bg-skyblue mt-2 mx-5">
              <table className="table table-borderless table-border-collapse text-primary">
                <thead className="table-head">
                  <tr>
                    <th scope="col" className="col-md-6">Guest Name</th>
                    <th scope="col" className="col-md-2">Phone No</th>
                    <th scope="col" className="col-md-3">Room No</th>
                    <th scope="col" className="col-md-1"></th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {pendingCheckoutData.length >= 1 && pendingCheckoutData.map((item, index) => {
                    return <tr key={index + 1} className='hover-gray make-cursor-pointer'>
                      <td className="col-md-6">{`${item.name.title} ${item.name.firstname} ${item.name.middlename} ${item.name.lastname}`}</td>
                      <td className="col-md-2">{item.phoneno}</td>
                      <td className="col-md-3">{item.roomno}</td>
                      <td className="col-md-1"><button onClick={() => { getAndSetUserData(item.bookingid); setOpenGuestInfo(false); setregistrationNo(item.bookingid); }} type="button" className="d-flex align-items-center justify-content-center text-primary font-size-16 btn btn button-color-onHover button-padding-5 height-30 large-button-width-60 large-button-font-size-12">Select</button></td>
                    </tr>
                  })}
                </tbody>
              </table>
            </div>}
          </div>
          <div className="d-flex align-items-center justify-content-between large-flex-column reserv-col-gap-1 mt-4">
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
                {paymentData && paymentData.map((item, index) => {
                  return <tr key={index + 1} className='hover-gray make-cursor-pointer' >
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
                <tr className='hover-gray make-cursor-pointer table-br-last-blue' >
                  <td className="table-tdata"></td>
                  <td className="table-tdata"></td>
                  <td className="table-tdata">Amount to be Paid</td>
                  <td className="table-tdata">{settlementAmount}</td>
                  <td className="table-tdata"></td>
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
          </div>
          <div>
            <div className="d-flex align-items-center justify-content-center reserv-col-gap-1 mb-2">
              <button className="d-flex align-items-center justify-content-center width-150 font-size-16 text-primary btn button-color-onHover height-40 button-padding-5" disabled={!(registrationNo && confirmationNo && (settlementAmount == 0) && registrationNo.length==14)} onClick={() => { showSplitBillPopup() }} >  Split Bill </button>
              <button className="d-flex align-items-center justify-content-center width-150 font-size-16 text-primary btn button-color-onHover height-40 button-padding-5" disabled={!(settlementAmount > 0.0)} onClick={()=>{showSettlementPopup()}}>  Settlement </button>
              <button className="d-flex align-items-center justify-content-center width-150 font-size-16 text-primary btn button-color-onHover height-40 button-padding-5" disabled={!(registrationNo && confirmationNo && (settlementAmount == 0) && registrationNo.length==14)} onClick={()=>{printBill()}}>  Print Bill </button>
              <button className="d-flex align-items-center justify-content-center width-150 font-size-16 text-primary btn button-color-onHover height-40 button-padding-5" disabled={!(registrationNo && confirmationNo && (settlementAmount == 0) && registrationNo.length==14)} onClick={(e) => { submitAction(e) }} >  Submit </button>
            </div>
          </div>



          {openSettlementPopup && <div className="d-flex align-items-center justify-content-center overlay">
            <div className="bg-light height-300 width-50percent position-fixed z-index-3 mt-4 p-4 border-radius-10">
              <div className="d-flex justify-content-between">
                <h4>Settlement</h4>
                <button className='width-40 height-40 d-flex justify-content-center align-items-center border-none font-size-25 make-cursor-pointer' onClick={()=>{showSettlementPopup()}}><i className="fa fa-times" aria-hidden="true"></i></button>
              </div>
              <div className="mt-3">
                <div className="d-flex align-items-center flex-wrap">
                  <label
                    htmlFor="modeofpayment"
                    className="col-sm-3 col-form-label font-size-18 medium-width-40percent text-primary"
                  >
                    Mode of Payment{" "}
                  </label>
                  <div className="col-sm-9 d-flex justify-content-between medium-width-60percent">
                    <button
                      type="button"
                      className={`w-70 height-40 d-flex align-items-center justify-content-center font-size-14 text-primary btn button-padding-5 large-button-width-60 large-button-font-size-12 ${paymentTypeBtnColor === "Cash"
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
                      className={`w-150 height-40 d-flex align-items-center justify-content-center font-size-14 text-primary btn button-padding-5 large-button-width-60 large-button-font-size-12 ${paymentTypeBtnColor === "CreditCard"
                        ? "button-color-onHover"
                        : "background-gray"
                        }`}
                      onClick={() => {
                        changePaymentBtnColor("CreditCard");
                      }}
                    >
                      Credit Card
                    </button>
                    <button
                      type="button"
                      className={`w-150 height-40 d-flex align-items-center justify-content-center font-size-14 text-primary btn button-padding-5 large-button-width-60 large-button-font-size-12 ${paymentTypeBtnColor === "DebitCard"
                        ? "button-color-onHover"
                        : "background-gray"
                        }`}
                      onClick={() => {
                        changePaymentBtnColor("DebitCard");
                      }}
                    >
                      Debit Card
                    </button>

                    <button
                      type="button"
                      className={`w-70 height-40 d-flex align-items-center justify-content-center font-size-14 text-primary btn button-padding-5 large-button-width-60 large-button-font-size-12 ${paymentTypeBtnColor === "UPI"
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
                <div className="d-flex align-items-center flex-wrap">
                  <label
                    htmlFor="modeofpayment"
                    className="col-sm-3 col-form-label font-size-18 medium-width-40percent text-primary"
                  >
                    Total Amount{" "}
                  </label>
                  <div className="col-sm-9 d-flex justify-content-between medium-width-60percent">
                    <input
                      type="number"
                      className="form-control height-40 font-size-18 background-gray"
                      min="0"
                      id="inputsettlementAmount"
                      name="settlementamount"
                      value={settlementAmount}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-center reserv-col-gap-1 mt-3">
                <button type="submit" className="d-flex align-items-center justify-content-center width-150 font-size-16 text-primary btn button-color-onHover height-40 button-padding-5" onClick={()=>{settlementAction()}}>  Settlement </button>
                <button type="submit" className="d-flex align-items-center justify-content-center width-150 font-size-16 text-primary btn button-color-onHover height-40 button-padding-5" onClick={()=>{showSettlementPopup()}}>  Cancel </button>
              </div>
            </div>
          </div>}
          
          
          
          
          {openSplitBillPopup && <div className="d-flex align-items-center justify-content-center overlay">
            <div className="bg-light height-200 width-50percent position-fixed z-index-3 mt-4 p-4 border-radius-10">
            <div className="d-flex justify-content-between">
                <h4>Split Bill</h4>
                <button className='width-40 height-40 d-flex justify-content-center align-items-center border-none font-size-25 make-cursor-pointer' onClick={()=>{showSplitBillPopup()}}><i className="fa fa-times" aria-hidden="true"></i></button>
              </div>
              <div className="mt-3">
                <div className="d-flex align-items-center flex-wrap">
                  <label
                    htmlFor="modeofpayment"
                    className="col-sm-3 col-form-label font-size-18 medium-width-40percent text-primary"
                  >
                    Mode Of Split{" "}
                  </label>
                  <div className="col-sm-9 d-flex justify-content-between medium-width-60percent">
                    <button
                      type="button"
                      className={`width-45percent height-40 d-flex align-items-center justify-content-center font-size-14 text-primary btn button-padding-5 large-button-width-60 large-button-font-size-12 ${splitTypeBtnColor === "roombill"
                        ? "button-color-onHover"
                        : "background-gray"
                        }`}
                      onClick={() => {
                        changeSplitBillBtnColor("roombill");
                      }}
                    >
                      Room Bill
                    </button>
                    <button
                      type="button"
                      className={`width-45percent height-40 d-flex align-items-center justify-content-center font-size-14 text-primary btn button-padding-5 large-button-width-60 large-button-font-size-12 ${splitTypeBtnColor === "servicebill"
                        ? "button-color-onHover"
                        : "background-gray"
                        }`}
                      onClick={() => {
                        changeSplitBillBtnColor("servicebill");
                      }}
                    >
                      Service Bill
                    </button>
                  </div>
                </div>
            </div>
            <div className="d-flex align-items-center justify-content-center reserv-col-gap-1 mt-3">
                <button type="submit" className="d-flex align-items-center justify-content-center width-150 font-size-16 text-primary btn button-color-onHover height-40 button-padding-5" onClick={()=>{printAction()}}>  Print Bill </button>
              </div>
            </div>
          </div>}


          <iframe id="billpopup" title="SIT HMCT Bill" src={`${printUrl}/Billing?bookingid=${registrationNo}`} className="display-none"/>
          <iframe id="roombillpopup" title="SIT HMCT Room Bill" src={`${printUrl}/RoomBill?bookingid=${registrationNo}`} className="display-none"/>
          <iframe id="servicebillpopup" title="SIT HMCT Service Bill" src={`${printUrl}/ServiceBill?bookingid=${registrationNo}`} className="display-none"/>
        
        
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
