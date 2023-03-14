/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import { useState } from "react";
import {NavLink} from "react-router-dom";
import { useLocation } from 'react-router-dom';
import "../CustomCss/Reservation.css";
import Localbase from "localbase";
let db = new Localbase("hmctdb");
db.config.debug = false;

const ReservationConfirmation = () => {
  const [amountPaid, setAmountPaid] = useState(0);
  const [bookingData, setBookingData] = useState({})
  const [nights, setNights] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const bookingid = query.get('bookingid');

    if(bookingid){
      async function fetchInitialData() {
        let reservationResData = await getReservationData(bookingid);

        if(reservationResData.success){
          setBookingData(reservationResData.data);
        }
      }
      fetchInitialData();
    }  
  }, [location])


  useEffect(() => { calculateNights(); calculateAmountPaid(); }, [bookingData])




  // Get : Get particular reservation data based on bookingid
  // params : bookingid
  // return : 1. {success: true, data: {<reservation_data_obj>} }                     IF ALL OK
  //          2. {success: false, msg: 'Reservation Not Found!'}                      IF BOOKINGID NOT PRESENT
  //          3. {success: false, msg: 'Something Went Wrong'}                        IF INTERNAL SERVER ERROR
  const getReservationData = async(bookingid) =>{
    try{
      let reservationData = await db.collection('reservation').doc({ bookingid: bookingid }).get()

      if(!reservationData) return {success:false, msg: "Reservation Not Found!"}
      return {success: true, data: reservationData}
    }catch(e){
      console.log("ReservationConfirmationPageError (getReservationData) : ",e);
      return {success:false, msg: "Something Went Wrong"}
    }
  }

  
  // Update : Update how much amount paid by user
  // params : bookingid,credit (amountpaid by user) (string)
  // return : 1. {success: true }                                                     IF ALL OK
  //          2. {success: false, msg: 'Reservation Not Found!'}                      IF BOOKINGID NOT PRESENT
  //          3. {success: false, msg: 'Something Went Wrong'}                        IF INTERNAL SERVER ERROR
  const updateReservationTimePayment = async(bookingid, credit)=>{
    try{
      let reservationData = await db.collection('reservation').doc({ bookingid: bookingid }).get();

      if(!reservationData) return {success:false, msg: "Reservation Not Found!"}

      let updatedpaymenthistory = reservationData.paymenthistory;
      const todaydateforpayment = new Date();
      const todaydateforpaymentstring = todaydateforpayment.toISOString().slice(0, 10);

      if (!updatedpaymenthistory.some((item) => item.name === "reservation")) {
        updatedpaymenthistory.push({
          name: "reservation",
          description: "Reservation time payment",
          date: todaydateforpaymentstring,
          debit: "",
          credit: credit.toString(),
        });
      }else{
        updatedpaymenthistory = updatedpaymenthistory.map((item) => {
          if (item.name === "reservation") {
            return {
              ...item,
              date: todaydateforpaymentstring,
              credit: credit.toString(),
            };
          } else {
            return item;
          }
        });
      }

      await db.collection('reservation').doc({ bookingid: bookingid }).update({
        totalamountpaid: credit.toString(),
        paymenthistory: updatedpaymenthistory
      });

      return {success:true}
    }catch(e){
      console.log("ReservationConfirmationPageError (updateReservationTimePayment) : ",e);
      return {success:false, msg: "Something Went Wrong"}
    }
  }


  // Update : Update how much amount paid by user today in ADR DB
  // params : amount (amountpaid by user. not pay-later) (string)
  // return : 1. {success: true }                                                     IF ALL OK
  //          2. {success: false, msg: 'Something Went Wrong'}                        IF INTERNAL SERVER ERROR
  const updateRupeesAdrValue = async(amount)=>{
    try{
      const todaydateforpayment = new Date();
      const todaydateforpaymentstring = todaydateforpayment.toISOString().slice(0, 10);

      let rupeesadrData = await db.collection('rupeesadr').doc({ date: todaydateforpaymentstring }).get();
      if(!rupeesadrData){
        await db.collection('rupeesadr').add({date: todaydateforpaymentstring, value: parseFloat(amount)});
      }else{
        let updateval = parseFloat(rupeesadrData.value) + parseFloat(amount); 
        await db.collection('rupeesadr').doc({ date: todaydateforpaymentstring }).update({value: updateval});
      }

      return {success:true}
    }catch(e){
      console.log("ReservationConfirmationPageError (updateRupeesAdrValue) : ",e);
      return {success:false, msg: "Something Went Wrong"}
    }
  }




  const calculateNights = ()=>{
    const date1 = new Date(bookingData?.departuredate);
    const date2 = new Date(bookingData?.arrivaldate);

    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setNights(diffDays);
  }


  const calculateAmountPaid = async()=>{
    if(bookingData.roomrate){
      const roomrate = parseFloat(bookingData?.roomrate);
      const discountamount = parseFloat(bookingData?.discountamount);

      if(isNaN(discountamount)){
        setAmountPaid(roomrate);
        await updateReservationTimePayment(bookingData.bookingid, roomrate.toString());
      }else{
        let amountPaidHere = roomrate - discountamount;
        setAmountPaid(amountPaidHere);
        await updateReservationTimePayment(bookingData.bookingid, amountPaidHere.toString());
      }
    }
  }

  const handleInputChange = (e) => {
    if(e.target.name == "amountpaid"){ setAmountPaid(e.target.value) }
  }

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
        <div className="container mt-4 mb-5">
          <div className="card">
            <div className="card-body  bg-skyblue">
              <div className="d-flex align-items-center column-gap-5 mb-3">
                <i className="bx bxs-check-circle text-primary font-size-120"></i>
                <div className="d-flex align-items-center justify-content-center">
                  <h3 className="pt-2 text-primary small-font-size-20">
                    Booking has been done Successfully
                  </h3>
                </div>
              </div>
              <div className="d-flex medium-flex-column mb-3">
                <div className="width-50percent medium-width-full d-flex">
                  <label htmlFor="bookingId" className="fs-5 text-primary padding-right-20 medium-padding-right-50 extra-small-padding-right-35">
                    Booking Id
                  </label>
                  <div>
                    <h5 className="pt-1">#{bookingData?.bookingid}</h5>
                  </div>
                </div>
                <div className="width-50percent medium-width-full d-flex">
                  <label htmlFor="guestName" className="fs-5 text-primary padding-right-20 medium-padding-right-40 extra-small-padding-right-35">
                    Guest Name
                  </label>
                  <div>
                    <h5 className="pt-1">{`${bookingData?.name?.title} ${bookingData?.name?.firstname} ${bookingData?.name?.middlename} ${bookingData?.name?.lastname}`}</h5>
                  </div>
                </div>
              </div>
              <div className="d-flex medium-flex-column mb-3">
                <div className="width-50percent medium-width-full d-flex">
                  <label htmlFor="checkIn" className="fs-5 text-primary padding-right-36 medium-padding-right-70">
                    Check In
                  </label>
                  <div>
                    <h5 className="pt-1">{bookingData?.arrivaldate}</h5>
                    <h5>{bookingData?.arrivaltime} onwards</h5>
                  </div>
                </div>
                <div className="width-50percent medium-width-full d-flex">
                  <label htmlFor="checkout" className="fs-5 text-primary padding-right-36 medium-padding-right-55">
                    Check Out
                  </label>
                  <div>
                    <h5 className="pt-1">{bookingData?.departuredate}</h5>
                    <h5>With in {bookingData?.departuretime}</h5>
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-center column-gap-1 mb-5">
                <i className="bx bxs-moon text-primary font-size-25"></i>
                <h5 className="pt-1">{nights} Nights</h5>
              </div>
              <div className="d-flex flex-column">
                <div className="col-md-6">
                  <h5>{bookingData?.noofrooms} {bookingData?.typeofroom} Room x {bookingData?.mealplan} Plan</h5>
                </div>
                <div className="col-md-6 d-flex align-items-center">
                  <label
                    htmlFor="amountpaid"
                    className="col-sm-3 col-form-label fw-bold"
                  >
                    Amount Paid
                  </label>
                  <div className="col-sm-7">
                    <input
                      type="number"
                      className="form-control"
                      id="inputAmount"
                      name="amountpaid" value={amountPaid} onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationConfirmation;
