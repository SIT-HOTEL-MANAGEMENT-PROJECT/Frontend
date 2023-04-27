/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable eqeqeq */
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {NavLink} from "react-router-dom";
import "../CustomCss/Reservation.css";
import { useLocation } from 'react-router-dom';
import ShortUniqueId from "short-unique-id";
import Localbase from "localbase";
let db = new Localbase("hmctdb");
db.config.debug = false;

const Reservation = ({getLoggedInUserDetails}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isCardNoDisabled, setIsCardNoDisabled] = useState(false);
  const [isUpiDisabled, setIsUpiDisabled] = useState(false);
  const [isDiscountDisabled, setIsDiscountDisabled] = useState(true);
  const [isRoomNoDisabled, setIsRoomNoDisabled] = useState(true);
  const [isForUpdate, setIsForUpdate] = useState(false);

  const [roomTypeBtnColor, setRoomTypeBtnColor] = useState("");
  const [paymentTypeBtnColor, setPaymentTypeBtnColor] = useState("");
  const [mealTypeBtnColor, setMealTypeBtnColor] = useState("");

  const [bookingidForUpdate, setBookingidForUpdate] = useState("");
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
  const [curTodayDate, setCurTodayDate] = useState("");

  

  useEffect(() => {
    setTimeout(() => {
      const query = new URLSearchParams(location.search);
      const bookingid = query.get('bookingid');
      const isupdate = query.get('isupdate');
      const roomtype = query.get('roomtype');
      const roomnumber = query.get('roomnumber');
    
      initialPrepopulatedData();

      if(bookingid && isupdate){
        setBookingidForUpdate(bookingid);
        setIsForUpdate(isupdate);
        getAndSetUserData(bookingid);
      }
      
      else if(roomtype && roomnumber){
        if(roomtype === 'Standard' || roomtype === 'Delux' || roomtype === 'Executive'){
          changeRoomBtnColor(roomtype);
          setRoomNumber(roomnumber);
          const avroomnos = roomnumber.split(',').map(value => value.trim()).filter(value => value !== '');
          if(!avroomnos.length) { setNoOfRooms("") }
          else { setNoOfRooms(avroomnos.length); }
        }
      }

    }, 1000);
  }, [location])
  


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


      let payments = [];
      const todaydateforpayment = new Date();
      const todaydateforpaymentstring = todaydateforpayment.toISOString().slice(0, 10);
      if(roomRate){
        payments.push({name:"bookingamount", description:"Room Charges", date:todaydateforpaymentstring, debit:roomRate, credit:""})
      }
      if(discountAmount){
        payments.push({"name":"reservationdiscount","description":"Discount", "date":todaydateforpaymentstring, "debit":"", "credit":discountAmount})
      }

      
      await db.collection('reservation').add({
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
          totalamountpaid: "",  finalamount: "", paymenthistory:payments,  gst: "",  modeofpayment: modeOfPayment, cardno: cardNo, upi: upi,

          mealplan: mealPlan, extrabedtype: "",

          travelagentname: travelAgentName, travelagentno: "",

          billingno: "",  regno: "",

          resassisname: resAssisName, specialreq: specialReq, bookingstatus:"done", checkedinstatus:"pending", checkedoutstatus: "pending" 
      })

      return {success: true, bookingid: ubookingid}     
    }catch(e){
      console.log("ReservationPageError (addReservationData) : ",e);
      return {success: false, msg: 'Something Went Wrong'}
    }
  }


  // Update :  Update reservation details 
  // params : none     (directly get data from useState)
  // return :   1.  {success:true}                                    IF UPDATED SUCCESSFULLY
  //            2.  {success:false, msg: 'Reservation Not Found!'}    IF BOOKING ID NOT FOUND
  //            2.  {success:false, msg: 'Something Went Wrong'}      IF ADD FAILED
  const updateReservationData = async()=>{
    try{
      let isBooked = await updateBookRoom(bookingidForUpdate);
      if(!isBooked.success){  return { success: false, msg: isBooked?.msg }}

      
      let reservationData = await db.collection('reservation').doc({ bookingid: bookingidForUpdate }).get();

      if(!reservationData) return {success:false, msg: "Reservation Not Found!"}

      let updatedpaymenthistory = reservationData.paymenthistory;
      const todaydateforpayment = new Date();
      const todaydateforpaymentstring = todaydateforpayment.toISOString().slice(0, 10);

      if (!updatedpaymenthistory.some((item) => item.name === "bookingamount")) {
        updatedpaymenthistory.push({
          name: "bookingamount",
          description: "Room Charges",
          date: todaydateforpaymentstring,
          debit: roomRate,
          credit: "",
        });
      }else{
        updatedpaymenthistory = updatedpaymenthistory.map((item) => {
          if (item.name === "bookingamount") {
            return {
              ...item,
              date: todaydateforpaymentstring,
              debit: roomRate,
            };
          } else {
            return item;
          }
        });
      }

      
      if (!updatedpaymenthistory.some((item) => item.name === "reservationdiscount")) {
        updatedpaymenthistory.push({
          name: "reservationdiscount",
          description: "Discount",
          date: todaydateforpaymentstring,
          debit: "",
          credit: discountAmount,
        });
      }else{
        updatedpaymenthistory = updatedpaymenthistory.map((item) => {
          if (item.name === "reservationdiscount") {
            return {
              ...item,
              date: todaydateforpaymentstring,
              credit: discountAmount,
            };
          } else {
            return item;
          }
        });
      }

      await db.collection('reservation').doc({bookingid: bookingidForUpdate}).update({
          name: guestName,  address: address,
          phoneno: guestPhoneNumber, companyname: companyName, designation: designation,

          bookingdate: bookingDate, arrivaldate: arrivalDate, arrivaltime: arrivalTime, 
          departuredate: departureDate, departuretime: departureTime, nights: nights,

          typeofroom: roomType, roomno: roomNumber, noofrooms: noOfRooms,

          noofpax: noOfPax, modeofarrival: modeOfArrival, trainno: trainNo, flightno: flightNo,

          roomrate: roomRate, discountamount: discountAmount, discountpercentage: discountPercentage, paymenthistory:updatedpaymenthistory,
          modeofpayment: modeOfPayment, cardno: cardNo, upi: upi,

          mealplan: mealPlan,

          travelagentname: travelAgentName,

          resassisname: resAssisName, specialreq: specialReq
      })

      return {success: true}     
    }catch(e){
      console.log("ReservationPageError (updateReservationData) : ",e);
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


  // Internal Service/Update :  Update booking room number against bookingid
  // params : bookingid   (take useState internally-auto -> roomType,roomNumber,arrivalDate,arrivalTime,departureDate,departureTime)
  // return :   1.  {success:true}                                             IF BOOKED
  //            2.  {success:false, msg: 'Something Went Wrong'}               IF BOOKING FAILED
  //            3.  {success:false, msg: '<Room_No> Invalid Room Number'}      IF ROOM NO IS INVALID/NOT FOUND
  //            4.  {success:false, msg: '<Room_No> Room is not available!'}   IF ROOM NO IS ALREADY BOOKED
  const updateBookRoom = async(bookingid)=>{
    try{
      let roomav = await db.collection("roomavailability").get();

      if (!roomav.length) { return { success: false, msg: "Something Went Wrong!" }; }
      
      const avroomnos = roomNumber.split(',').map(value => value.trim()).filter(value => value !== '');
      
      let checkAv = await checkRoomAvForUpdate(bookingid);
      if(!checkAv.success) { return {success:false, msg: checkAv?.msg} }

      let res = await releaseRoomOccupancy(bookingid);
      if(!res.success) { return { success: false, msg: "Something Went Wrong!" }; }

      roomav = await db.collection("roomavailability").get();

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
      console.log("ReservationPageError (updateBookRoom) : ",e);
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
        let roomObj = roomav[0][roomtype][avroom];

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
      console.log("ReservationsPageError (releaseRoomOccupancy) : ",e);
      return {success: false, msg: 'Something Went Wrong'}
    }
  }


  // Internal Service/Check : Perform check to test updated req rooms are available or not
  // params : bookingid   (take useState internally-auto -> roomType, roomNumber, arrivalDate,arrivalTime,departureDate,departureTime)
  // return : 1. {success: true}                                                               IF ALL OK
  //          2. {success:false, msg: "Invalid Booking Details"}                               IF BOOKINGID IS INVALID/NOT FOUND
  //          3. {success:false, msg: "Something Went Wrong!"}                                 IF ROOMAV DB ERROR
  //          4. {success:false, msg: '<Room_No> Invalid Room Number'}                         IF ROOM NO IS INVALID/NOT FOUND
  //          5. {success:false, msg: '<Room_No> Room is not available!'}                      IF ROOM NO IS ALREADY BOOKED
  //          6. {success:false, msg: '<Room_No> Room is not available in your Date Range!'}   IF ROOM NO IS ALREADY BOOKED IN A REQUESTED DATE
  //          7. {success: false, msg: 'Something Went Wrong'}                                 IF SERVER ERROR
  const checkRoomAvForUpdate = async(bookingid)=>{
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
      // End of Temp Remove Prev Booking Data locally


      // Check room availability
      const avrnos = roomNumber.split(',').map(value => value.trim()).filter(value => value !== '');
      let isCheckPass = true;
      let isCheckPassMsg = "";
      for (const avroom of avrnos) {  
        let roomData = roomav[0][roomType.toLowerCase()];
        if (!roomData[avroom]) { isCheckPass = false; isCheckPassMsg = `${avroom} Invalid Room Number`; break; }
        if(roomData[avroom].av != "1") { isCheckPass = false; isCheckPassMsg = `${avroom} Room is not available!`; break; }

        let ubookings = roomav[0][roomType.toLowerCase()][avroom].activeBookings;    
        const requestedArrivalDT = new Date(arrivalDate + 'T' + arrivalTime);
        const requestedDepartureDT = new Date(departureDate + 'T' + departureTime);
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
      console.log("ReservationPageError (checkRoomAvForUpdate) : ",e);
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

      if ( (requestedArrivalDT >= bookingArrivalDT && requestedArrivalDT < bookingDepartureDT)       ||
          (requestedDepartureDT > bookingArrivalDT && requestedDepartureDT <= bookingDepartureDT) ) 
      {
        isAv = false;
        break;
      }
    }

    return isAv;
  }


  // Get :  Get all user data of a booking against bookingid
  // params : bookingid
  // return : 1. { success:true, data: {bookingid:"",name: {..}, phoneno: "", ...} }           IF ALL OK
  //          2. {success: false, msg: 'Something Went Wrong'}                                 IF SERVER ERROR
  //          3. {success:false, msg: "Invalid Booking Details"}                               IF BOOKING DATA NOT FOUND
  const getUserDataAgainstBookingId = async(bookingid)=>{
    try{
      let booking = await db.collection('reservation').doc({ bookingid: bookingid }).get();
      if(!booking) { return {success:false, msg: "Invalid Booking Details"} }
      return {success:true, data: booking};
    }catch(e){
      console.log("ReservationPageError (getUserDataAgainstBookingId) : ",e);
      return {success: false, msg: 'Something Went Wrong'}
    }
  }





  const initialPrepopulatedData = async()=>{
    let res = await getLoggedInUserDetails();
    if(res?.success){ setResAssisName(res?.data?.name); }

    let todayDate = new Date();
    let todayDateString = todayDate.toISOString().slice(0, 10);
    setBookingDate(todayDateString);
    setCurTodayDate(todayDateString);
    setArrivalTime("12:00"); setDepartureTime("12:00");
  }


  const getAndSetUserData = async(bookingid)=>{
    let res = await getUserDataAgainstBookingId(bookingid);

    if(res?.success){
      let booking = res?.data;
      setGuestName(booking.name); setAddress(booking.address); setGuestPhoneNumber(booking.phoneno); 
      setCompanyName(booking.companyname); setDesignation(booking.designation); setBookingDate(booking.bookingdate); 
      setArrivalDate(booking.arrivaldate); setArrivalTime(booking.arrivaltime); setdepartureDate(booking.departuredate);
      setDepartureTime(booking.departuretime); setNights(booking.nights); setRoomNumber(booking.roomno); 
      setNoOfRooms(booking.noofrooms); setNoOfPax(booking.noofpax); setModeOfArrival(booking.modeofarrival); 
      setTrainNo(booking.trainno); setFlightNo(booking.flightno); setRoomRate(booking.roomrate); 
      setDiscountAmount(booking.discountamount); setDiscountPercentage(booking.discountpercentage); setCardNo(booking.cardno); 
      setUpi(booking.upi); setTravelAgentName(booking.travelagentname); setResAssisName(booking.resassisname); 
      setSpecialReq(booking.specialreq);

      changeRoomBtnColor(booking.typeofroom);
      changePaymentBtnColor(booking.modeofpayment);
      changeMealBtnColor(booking.mealplan);

      if(booking.roomrate == ''){ setIsDiscountDisabled(true); } else{ setIsDiscountDisabled(false); }
    }
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
    else if (e.target.name == "guestphonenumber" && !isNaN(e.target.value) && e.target.value.length < 14) {  setGuestPhoneNumber(e.target.value); }
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
    else if (e.target.name == "cardno" && !isNaN(e.target.value) && e.target.value.length <= 16) {  setCardNo(e.target.value); }
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

    
    if(isForUpdate){
      let res = await updateReservationData();
      if(res.success){
        alert("Reservation Data Updated!");
        navigate(-1);
      }else{
        alert(res.msg);
      }
    }else{
      let res = await addReservationData();
      if(res.success){
        navigate(`/ReservationConfirmation?bookingid=${res.bookingid}`);
      }else{
        alert(res.msg);
      }
    }
  };

  return (
    <div>
      <div className="bg-light min-height-vh">
        <nav className="navbar sticky-top navbar navbar-expand-lg bg-light">
          <div className="container-fluid">
            <div className="navbar-brand d-flex align-items-center">
              <NavLink className="text-primary" to="/Home4">
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
              <i className="bx bxs-building font-size-25"></i>All Reservations
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
            <div className="col-md-6 d-flex align-items-center flex-wrap rev-margin-gap medium-width-full">
              <label htmlFor="name" className="col-sm-3 col-form-label font-size-14 medium-width-40percent">
                Guest Name
              </label>
              <div className="col-sm-7 d-flex column-gap-1 medium-width-60percent">
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
            <div className="col-md-6 d-flex align-items-center rev-margin-gap flex-wrap medium-width-full">
              <label
                htmlFor="guestphonenumber"
                className="col-sm-3 col-form-label font-size-14 medium-width-40percent"
              >
                Phone No{" "}
              </label>
              <div className="col-sm-7 medium-width-60percent">
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
            <div className="col-md-6 d-flex align-items-center rev-margin-gap flex-wrap medium-width-full">
              <label htmlFor="address" className="col-sm-3 col-form-label font-size-14 medium-width-40percent">
                Address{" "}
              </label>
              <div className="col-sm-7 medium-width-60percent">
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
            <div className="col-md-6 d-flex align-items-center font-size-14 rev-margin-gap flex-wrap medium-width-full">
              <label htmlFor="companyname" className="col-sm-3 col-form-label medium-width-40percent">
                Company{" "}
              </label>
              <div className="col-sm-7 medium-width-60percent">
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
            <div className="col-md-6 d-flex align-items-center rev-margin-gap flex-wrap medium-width-full">
              <label htmlFor="arrivaldate" className="col-sm-3 col-form-label font-size-14 medium-width-40percent">
                Arrival Date{" "}
              </label>
              <div className="col-sm-7 medium-width-60percent">
                <input
                  type="date"
                  className="form-control height-30 font-size-14 background-gray"
                  id="inputArrivalDate"
                  name="arrivaldate"
                  min={curTodayDate}
                  max={departureDate}
                  value={arrivalDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-center font-size-14 rev-margin-gap flex-wrap">
              <div className="col-md-6 d-flex align-items-center flex-wrap medium-width-full">
                <label
                  htmlFor="designation"
                  className="col-sm-6 col-form-label font-size-14 medium-width-40percent"
                >
                  Designation{" "}
                </label>
                <div className="col-sm-5 medium-width-60percent">
                  <input
                    type="text"
                    className="form-control height-30 font-size-14 background-gray"
                    id="inputDesignation"
                    name="designation"
                    value={designation}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-md-6 d-flex align-items-center flex-wrap medium-width-full">
                <label
                  htmlFor="travelagentname"
                  className="col-sm-4 col-form-label font-size-14 medium-width-40percent"
                >
                  Travel Agent{" "}
                </label>
                <div className="col-sm-4 medium-width-60percent">
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
            </div>
            <div className="col-md-6 d-flex align-items-center rev-margin-gap flex-wrap medium-width-full">
              <label
                htmlFor="departuredate"
                className="col-sm-3 col-form-label font-size-14 medium-width-40percent"
              >
                Departure Date{" "}
              </label>
              <div className="col-sm-7 medium-width-60percent">
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
            </div>
            <div className="col-md-6 d-flex align-items-center rev-margin-gap flex-wrap medium-width-full">
              <label htmlFor="arrivaltime" className="col-sm-3 col-form-label font-size-14 medium-width-40percent">
                Arrival Time{" "}
              </label>
              <div className="col-sm-7 medium-width-60percent">
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
            <div className="col-md-6 d-flex align-items-center rev-margin-gap flex-wrap medium-width-full">
              <label htmlFor="roomtype" className="col-sm-3 col-form-label font-size-14 medium-width-40percent">
                Type of Room{" "}
              </label>
              <div className="col-sm-7 d-flex flex-wrap justify-content-between medium-width-60percent">
                <button
                  type="button"
                  className={`d-flex align-items-center justify-content-center text-primary width-100p font-size-14 btn button-padding-5 height-30 large-button-width-60 large-button-font-size-12 ${
                    roomTypeBtnColor === "Standard"
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
                  className={`d-flex align-items-center justify-content-center text-primary width-100p font-size-14 btn button-padding-5 height-30 large-button-width-60 large-button-font-size-12 ${
                    roomTypeBtnColor === "Delux" ? "button-color-onHover" : "background-gray"
                  }`}
                  onClick={() => {
                    changeRoomBtnColor("Delux");
                  }}
                >
                  Delux
                </button>
                <button
                  type="button"
                  className={`d-flex align-items-center justify-content-center text-primary width-100p font-size-14 btn button-padding-5 height-30 large-button-width-60 large-button-font-size-12 ${
                    roomTypeBtnColor === "Executive"
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
            <div className="col-md-6 d-flex align-items-center rev-margin-gap flex-wrap medium-width-full">
              <label
                htmlFor="departuretime"
                className="col-sm-3 col-form-label font-size-14 medium-width-40percent"
              >
                Departure Time{" "}
              </label>
              <div className="col-sm-7 medium-width-60percent">
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
            <div className="col-md-6 d-flex align-items-center font-size-14 rev-margin-gap flex-wrap">
              <div className="col-md-6 d-flex align-items-center flex-wrap medium-width-full">
                <label
                  htmlFor="noofpax"
                  className="col-sm-6 col-form-label font-size-14 medium-width-40percent"
                >
                  No of Pax{" "}
                </label>
                <div className="col-sm-5 medium-width-60percent">
                  <input
                    type="text"
                    className="form-control height-30 font-size-14 background-gray"
                    id="inputPax"
                    name="noofpax"
                    value={noOfPax}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-md-6 d-flex align-items-center flex-wrap medium-width-full">
                <label
                  htmlFor="nights"
                  className="col-sm-4 col-form-label font-size-14 medium-width-40percent"
                >
                  No. of Nights
                </label>
                <div className="col-sm-4 medium-width-60percent">
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
            </div>
            <div className="col-md-6 d-flex align-items-center medium-flex-column rev-margin-gap">
              <div className="col-md-6 d-flex align-items-center flex-wrap medium-width-full">
                <label htmlFor="roomnumber" className="col-sm-6 col-form-label font-size-14 medium-width-40percent">
                  Room No{" "}
                </label>
                <div className="col-sm-5 medium-width-60percent">
                  <input readOnly={isRoomNoDisabled}
                    type="text"
                    className="form-control height-30 font-size-14 background-gray"
                    id="inputRoomNo"
                    name="roomnumber"
                    value={roomNumber}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-md-6 d-flex align-items-center flex-wrap medium-width-full">
                <label htmlFor="noofrooms" className="col-sm-4 col-form-label font-size-14 medium-width-40percent">
                  No of Room{" "}
                </label>
                <div className="col-sm-4 medium-width-60percent">
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
            </div>
            <div className="col-md-6 d-flex align-items-center rev-margin-gap flex-wrap medium-width-full">
              <label
                htmlFor="modeofarrival"
                className="col-sm-3 col-form-label font-size-14 medium-width-40percent"
              >
                Mode of Arrival{" "}
              </label>
              <div className="col-sm-7 medium-width-60percent">
                <input
                  type="text"
                  className="form-control height-30 font-size-14 background-gray"
                  id="inputModeofArrival"
                  name="modeofarrival"
                  value={modeOfArrival}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-center rev-margin-gap flex-wrap medium-width-full">
              <label htmlFor="trainno" className="col-sm-3 col-form-label font-size-14 medium-width-40percent">
                Train No{" "}
              </label>
              <div className="col-sm-7 medium-width-60percent">
                <input
                  type="text"
                  className="form-control height-30 font-size-14 background-gray"
                  id="inputTrainNo"
                  name="trainno"
                  value={trainNo}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-center rev-margin-gap flex-wrap medium-width-full">
              <label htmlFor="flightno" className="col-sm-3 col-form-label font-size-14 medium-width-40percent">
                Flight No{" "}
              </label>
              <div className="col-sm-7 medium-width-60percent">
                <input
                  type="text"
                  className="form-control height-30 font-size-14 background-gray"
                  id="inputFlightNo"
                  name="flightno"
                  value={flightNo}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-center rev-margin-gap flex-wrap medium-width-full">
              <label htmlFor="roomrate" className="col-sm-3 col-form-label font-size-14 medium-width-40percent">
                Room Rate{" "}
              </label>
              <div className="col-sm-7 medium-width-60percent">
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
            <div className="col-md-6 d-flex align-items-center rev-margin-gap flex-wrap medium-width-full">
              <label
                htmlFor="modeofpayment"
                className="col-sm-3 col-form-label font-size-14 medium-width-40percent"
              >
                Mode of Payment{" "}
              </label>
              <div className="col-sm-7 d-flex justify-content-between medium-width-60percent">
                <button
                  type="button"
                  className={`w-70 height-30 d-flex align-items-center justify-content-center font-size-14 text-primary btn button-padding-5 large-button-width-60 large-button-font-size-12 ${
                    paymentTypeBtnColor === "Cash"
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
                  className={`w-70 height-30 d-flex align-items-center justify-content-center font-size-14 text-primary btn button-padding-5 large-button-width-60 large-button-font-size-12 ${
                    paymentTypeBtnColor === "Card"
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
                  className={`w-70 height-30 d-flex align-items-center justify-content-center font-size-14 text-primary btn button-padding-5 large-button-width-60 large-button-font-size-12 ${
                    paymentTypeBtnColor === "UPI"
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
            <div className="col-md-6 d-flex align-items-center rev-margin-gap flex-wrap">
              <div className="col-md-6 d-flex align-items-center flex-wrap medium-width-full">
                <label
                  htmlFor="discountamount"
                  className="col-sm-6 col-form-label font-size-14 medium-width-40percent"
                >
                  Discount amount{" "}
                </label>
                <div className="col-sm-5 medium-width-60percent">
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
              <div className="col-md-6 d-flex align-items-center flex-wrap medium-width-full">
                <label
                  htmlFor="discountpercentage"
                  className="col-sm-4 col-form-label font-size-14 medium-width-40percent"
                >
                  Discount %{" "}
                </label>
                <div className="col-sm-4 medium-width-60percent">
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
            <div className="col-md-6 d-flex align-items-center rev-margin-gap flex-wrap medium-width-full">
              <label htmlFor="cardno" className="col-sm-3 col-form-label font-size-14 medium-width-40percent">
                Card No{" "}
              </label>
              <div className="col-sm-7 medium-width-60percent">
                <input disabled={isCardNoDisabled}
                  type="text"
                  className="form-control height-30 font-size-14 background-gray"
                  id="inputCardNo"
                  name="cardno"
                  value={cardNo}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-center rev-margin-gap flex-wrap medium-width-full">
              <label htmlFor="upi" className="col-sm-3 col-form-label font-size-14 medium-width-40percent">
                UPI{" "}
              </label>
              <div className="col-sm-7 medium-width-60percent">
                <input disabled={isUpiDisabled}
                  type="text"
                  className="form-control height-30 font-size-14 background-gray"
                  id="inputupi"
                  name="upi"
                  value={upi}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-center rev-margin-gap flex-wrap medium-width-full">
              <label htmlFor="bookingdate" className="col-sm-3 col-form-label font-size-14 medium-width-40percent">
                Date of Booking{" "}
              </label>
              <div className="col-sm-7 medium-width-60percent">
                <input
                  type="date"
                  className="form-control height-30 font-size-14 background-gray"
                  id="inputBookingDate"
                  name="bookingdate"
                  min={curTodayDate}
                  max={arrivalDate}
                  value={bookingDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-center rev-margin-gap flex-wrap medium-width-full">
              <label htmlFor="mealplan" className="col-sm-3 col-form-label font-size-14 medium-width-40percent">
                Meal Plan{" "}
              </label>
              <div className="col-sm-7 d-flex justify-content-between flex-wrap medium-width-60percent">
                <button
                  type="button"
                  className={`w-70 height-30 d-flex align-items-center justify-content-center font-size-14 text-primary btn button-padding-5 large-button-width-40 large-button-font-size-12 ${
                    mealTypeBtnColor === "EP" ? "button-color-onHover" : "background-gray"
                  }`}
                  onClick={() => {
                    changeMealBtnColor("EP");
                  }}
                >
                  EP
                </button>
                <button
                  type="button"
                  className={`w-70 height-30 d-flex align-items-center justify-content-center font-size-14 text-primary btn button-padding-5 large-button-width-40 large-button-font-size-12 ${
                    mealTypeBtnColor === "CP" ? "button-color-onHover" : "background-gray"
                  }`}
                  onClick={() => {
                    changeMealBtnColor("CP");
                  }}
                >
                  CP
                </button>
                <button
                  type="button"
                  className={`w-70 height-30 d-flex align-items-center justify-content-center font-size-14 text-primary btn button-padding-5 large-button-width-40 large-button-font-size-12 ${
                    mealTypeBtnColor === "AP" ? "button-color-onHover" : "background-gray"
                  }`}
                  onClick={() => {
                    changeMealBtnColor("AP");
                  }}
                >
                  AP
                </button>
                <button
                  type="button"
                  className={`w-70 height-30 d-flex align-items-center justify-content-center font-size-14 text-primary btn button-padding-5 large-button-width-40 large-button-font-size-12 ${
                    mealTypeBtnColor === "MAP" ? "button-color-onHover" : "background-gray"
                  }`}
                  onClick={() => {
                    changeMealBtnColor("MAP");
                  }}
                >
                  MAP
                </button>
              </div>
            </div>
            <div className="col-md-6 d-flex rev-margin-gap flex-wrap medium-width-full">
              <label htmlFor="specialreq" className="col-sm-3 col-form-label font-size-14 medium-width-40percent">
                Special Request{" "}
              </label>
              <div className="col-sm-7 medium-width-60percent">
                <textarea
                  className="form-control font-size-14 background-gray"
                  id="inputRequest"
                  rows="3"
                  name="specialreq"
                  value={specialReq}
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </div>
            <div className="col-md-6 d-flex flex-column rev-margin-gap flex-wrap">
              <div className="col-12 d-flex align-items-center flex-wrap medium-width-full">
                <label
                  htmlFor="resassisname"
                  className="col-sm-3 col-form-label font-size-14 medium-width-40percent"
                >
                  Reservation Assistant Name{" "}
                </label>
                <div className="col-sm-7 medium-width-60percent">
                  <input
                    type="text"
                    className="form-control height-30 font-size-14 background-gray"
                    id="inputReservationAssistantName"
                    name="resassisname"
                    value={resAssisName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="col-12 d-flex align-items-center justify-content-center mb-2">
                <button
                  type="submit"
                  className="d-flex align-items-center justify-content-center font-size-14 text-primary btn button-color-onHover height-30 button-padding-5 medium-margin-button"
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
