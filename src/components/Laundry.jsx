/* eslint-disable eqeqeq */
import React, { useEffect } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../CustomCss/Reservation.css";
import Localbase from "localbase";
let db = new Localbase("hmctdb");
db.config.debug = false;


const Laundry = () => {
  let navigate = useNavigate();
  const [serviceTypeBtnColor, setServiceTypeBtnColor] = useState("");

  const [guestName, setGuestName] = useState({
    title: "",
    firstname: "",
    middlename: "",
    lastname: "",
  });
  const [itemCode, setItemCode] = useState("");
  const [itemName, setItemName] = useState("");
  const [cost, setCost] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [serviceType, setServiceType] = useState("");
  const [date, setDate] = useState("");
  const [specialReq, setSpecialReq] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [departureDate, setdepartureDate] = useState("");
  const [totalItem, setTotalItem] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [paymentType, setPaymentType] = useState("");
  const [bookingIdL, setBookingIdL] = useState("");

  const [itemCodeArray, setItemCodeArray] = useState([]);

  const itemData = [
    { code: "C1", name: "Tie", price: 15 },
    { code: "C2", name: "Dhoti", price: 20 },
    { code: "C3", name: "Shorts", price: 20 },
    { code: "C4", name: "Muffler", price: 50 },
    { code: "C5", name: "Vest", price: 10 },
    { code: "C6", name: "Jeans", price: 60 },
    { code: "C7", name: "Handkerchif", price: 10 },
    { code: "C8", name: "Shirt", price: 50 },
    { code: "C9", name: "Trousers", price: 40 },
    { code: "C10", name: "T-shirt", price: 40 },
    { code: "C11", name: "Saree", price: 50 },
    { code: "C12", name: "Blouse", price: 20 },
    { code: "C13", name: "Salwar", price: 50 },
    { code: "C14", name: "Skirt", price: 30 },
    { code: "C15", name: "Top", price: 30 },
    { code: "C16", name: "Jeans", price: 40 },
    { code: "C17", name: "Pants", price: 30 }
  ];





  // Update : Update how much amount paid by user today in ADR DB
  // params : amount (amountpaid by user. not pay-later) (string)
  // return : 1. {success: true }                                                     IF ALL OK
  //          2. {success: false, msg: 'Something Went Wrong'}                        IF INTERNAL SERVER ERROR
  let prevvalue = 0;
  const updateRupeesAdrValue = async(amount)=>{
    try{
      const todaydateforpayment = new Date();
      const todaydateforpaymentstring = todaydateforpayment.toISOString().slice(0, 10);

      let rupeesadrData = await db.collection('rupeesadr').doc({ date: todaydateforpaymentstring }).get();
      if(!rupeesadrData){
        prevvalue = parseFloat(amount);
        await db.collection('rupeesadr').add({date: todaydateforpaymentstring, value: parseFloat(amount)});
      }else{
        let updateval;
        updateval = parseFloat(rupeesadrData.value) + parseFloat(amount); 
        if(prevvalue){  updateval = parseFloat(updateval) - parseFloat(prevvalue);  }
        prevvalue = parseFloat(amount);
        await db.collection('rupeesadr').doc({ date: todaydateforpaymentstring }).update({value: parseFloat(updateval)});
      }

      return {success:true}
    }catch(e){
      console.log("ReservationConfirmationPageError (updateRupeesAdrValue) : ",e);
      return {success:false, msg: "Something Went Wrong"}
    }
  }


  const findBookingIDAgainstRoomNo = async (rmno) => {
    let roomData = await db.collection("roomavailability").get();
    const today = new Date().toISOString().slice(0, 10); // get today's date in YYYY-MM-DD format
    let reservations;

    if (rmno.charAt(0) == '1') {
      if(roomData[0]['standard'][rmno]['av'] != '0') return
      reservations = roomData[0]['standard'][rmno]['activeBookings'];
    }

    if (rmno.charAt(0) == '2') {
      if(roomData[0]['delux'][rmno]['av'] != '0') return
      reservations = roomData[0]['delux'][rmno]['activeBookings'];
    }

    if (rmno.charAt(0) == '3') {
      if(roomData[0]['executive'][rmno]['av'] != '0') return
      reservations = roomData[0]['executive'][rmno]['activeBookings'];
    }

    const reservationToday = reservations.find(reservation => {
      return reservation.arrivaldate <= today && reservation.departuredate >= today;
    });

    const bookingId = reservationToday ? reservationToday.bookingid : '';

    if (bookingId) {
      let reservationData = await db.collection('reservation').doc({ bookingid: bookingId }).get();
      if (!reservationData) return { success: false, msg: "Reservation Not Found!" }
      
      setBookingIdL(bookingId);
      setGuestName(reservationData.name);
      setArrivalDate(reservationData.arrivaldate);
      setdepartureDate(reservationData.departuredate);
    }else{
      setBookingIdL("");
      setGuestName({title: "", firstname: "", middlename: "", lastname: "",});
      setArrivalDate("");
      setdepartureDate("");
    }
  }


  const settlePayment = async () => {
    try {
      let reservationData = await db.collection('reservation').doc({ bookingid: bookingIdL }).get();
      if (!reservationData) return { success: false, msg: "Reservation Not Found!" }

      let dbtamt = '0';
      let credamt = '0';

      if (paymentType == "Postwithroom") {
        dbtamt = totalAmount.toString();
      } else {
        dbtamt = totalAmount.toString();
        credamt = totalAmount.toString();
      }

      let updatedpaymenthistory = reservationData.paymenthistory;
      const todaydateforpayment = new Date();
      const todaydateforpaymentstring = todaydateforpayment.toISOString().slice(0, 10);

      if (!updatedpaymenthistory.some((item) => item.name === "laundry")) {
        updatedpaymenthistory.push({
          name: "laundry",
          description: "Laundry time payment",
          date: todaydateforpaymentstring,
          debit: dbtamt,
          credit: credamt,
        });
      } else {
        updatedpaymenthistory = updatedpaymenthistory.map((item) => {
          if (item.name === "laundry") {
            let fdbtamt = parseFloat(dbtamt) + parseFloat(item.debit);
            let fcredamt = parseFloat(credamt) + parseFloat(item.credit);
            return {
              ...item,
              date: todaydateforpaymentstring,
              debit: fdbtamt,
              credit: fcredamt
            };
          } else {
            return item;
          }
        });
      }

      await db.collection('reservation').doc({ bookingid: bookingIdL }).update({
        paymenthistory: updatedpaymenthistory
      })

      await updateRupeesAdrValue(dbtamt);

      return { success: true }
    } catch (e) {
      console.log("LaundryPageError (settlePayment) : ",e);
      return {success: false, msg: 'Something Went Wrong'}
    }
  }


  const updateLaundryData = async(ordersData)=>{
    try{
      const todaydate = new Date();
      const todaydateString = todaydate.toISOString().slice(0, 10);

      let paidstatus = true;
      if(paymentType == 'Postwithroom') paidstatus = false;

      if(bookingIdL && bookingIdL!=""){
        await db.collection('laundryservice').add({
          bookingid:bookingIdL, date: todaydateString ,roomno:roomNumber, orders:ordersData, discount:discountAmount, netamount:totalAmount, paymentmode:paymentType, paid: paidstatus
        })
      }

      return {success:true}
    }catch(e){
      console.log("LaundryPageError (updateLaundryData) : ",e);
      return {success: false, msg: 'Something Went Wrong'} 
    }
  }

  const initialPrepopulatedData = async()=>{
    let todayDate = new Date();
    let todayDateString = todayDate.toISOString().slice(0, 10);
    setDate(todayDateString);
  }


  useEffect(() => {
    initialPrepopulatedData();
  }, [])
  
  useEffect(() => {
    const commaSeparatedNames = itemCodeArray?.map(item => item?.name).join(",");
    const commaSeparatedPrice = itemCodeArray?.map(item => item?.price).join("+");
    setItemName(commaSeparatedNames);
    setCost(commaSeparatedPrice);
    setTotalItem(itemCodeArray.length);
    // const prices = cost.split("+").map(price => parseInt(price.trim()));
    const prices = itemCodeArray?.map(item => item?.price);
    if(prices.length >= 1){
      const total = prices.reduce((accumulator, currentValue) => accumulator + currentValue);
      setTotalAmount(total - discountAmount);
    }else{
      setTotalAmount(0);
    }
  }, [itemCodeArray])

  const handleInputChange = (e) => {
    if (e.target.name == "title") { setGuestName({ ...guestName, title: e.target.value }); }
    else if (e.target.name == "firstname") { setGuestName({ ...guestName, firstname: e.target.value }); }
    else if (e.target.name == "middlename") { setGuestName({ ...guestName, middlename: e.target.value }); }
    else if (e.target.name == "lastname") { setGuestName({ ...guestName, lastname: e.target.value }); }
    else if (e.target.name == "itemcode") {
      setItemCode(e.target.value);
      const arr = e.target.value.split(",");
      const resultArr = [];
      arr.forEach((code) => {
        const obj = itemData.find((item) => item.code === code);
        if (obj) {
          resultArr.push(obj);
        }
      });
      setItemCodeArray(resultArr);
    }
    else if (e.target.name == "itemname") { setItemName(e.target.value); }
    else if (e.target.name == "cost") {
      setCost(e.target.value);
      const prices = e.target.value.split("+").map(price => parseInt(price.trim()));
      const total = prices.reduce((accumulator, currentValue) => accumulator + currentValue);
      setTotalAmount(total);
    }
    else if (e.target.name == "discountamount") {
      setDiscountAmount(e.target.value);
      const prices = cost.split("+").map(price => parseInt(price.trim()));
      const total = prices.reduce((accumulator, currentValue) => accumulator + currentValue);
      if (!e.target.value || e.target.value == 0) {
        setTotalAmount(total);
      }
      else {
        let res = total - e.target.value;
        setTotalAmount(res);
      }
    }  
    else if (e.target.name == "discountpercentage") {  
      setDiscountPercentage(e.target.value);
    }
    else if (e.target.name == "date") { setDate(e.target.value); }
    else if (e.target.name == "specialreq") { setSpecialReq(e.target.value); }
    else if (e.target.name == "roomnumber") {
      setRoomNumber(e.target.value);
      if (e.target.value.length != 3 && departureDate != '') { 
        setBookingIdL(""); 
        setGuestName({title: "", firstname: "", middlename: "", lastname: "",});
        setArrivalDate("");
        setdepartureDate("");
      }
      else if (e.target.value.length === 3) findBookingIDAgainstRoomNo(e.target.value);
    }
    else if (e.target.name == "arrivaldate") { setArrivalDate(e.target.value); }
    else if (e.target.name == "departuredate") { setdepartureDate(e.target.value); }
    else if (e.target.name == "totalitem") { setTotalItem(e.target.value); }
    else if (e.target.name == "totalamount") { setTotalAmount(e.target.value); }
    else if (e.target.name == "paymenttype") { setPaymentType(e.target.value); }
  }

  const changeServiceBtnColor = (whichService) => {
    if (serviceType == whichService) {
      setServiceTypeBtnColor(""); setServiceType(""); return
    }
    setServiceTypeBtnColor(whichService);
    setServiceType(whichService);
  };

  const handleItemAdd = (itmNm, itmCd, price) => {
    setItemCodeArray([...itemCodeArray, { name: itmNm, code: itmCd, price: price }]);
    const codeArr = itemCode.split(",").filter(Boolean);
    codeArr.push(itmCd);
    const str = codeArr.join(',');
    setItemCode(str);
  }

  const submitAction = async(e) => {
    e.preventDefault();
    
    if(!bookingIdL || bookingIdL==""){ alert("Invalid Bookingid!"); return;}

    const nameArr = itemName.split(",").filter(Boolean);
    const codeArr = itemCode.split(",").filter(Boolean);
    const priceArr = cost.split("+").filter(Boolean);

    const result = [];

    for (let i = 0; i < codeArr.length; i++) {
      result.push({
        code: codeArr[i],
        name: nameArr[i],
        price: Number(priceArr[i])
      });
    }


    let res = await settlePayment();
    let res1 = await updateLaundryData(result);
    if(res.success){
      if(res1.success){
        alert("Your Laundry Bill Generated");
        navigate(-1);
      }else{
        alert(res1.msg);
      }
    }else{
      alert(res.msg);
    }
  }

  return (
    <div>
      <div className="bg-light min-height-vh">
        <nav className="navbar sticky-top navbar navbar-expand-lg bg-light">
          <div className="container-fluid">
            <div className="navbar-brand flex-column align-items-center">
              <div className="d-flex align-items-center">
                <NavLink className="text-primary" to="/Home3">
                  <i className="bx bx-chevrons-left font-size-25"></i>
                </NavLink>
                <h5 className="text-primary">House Keeping</h5>
              </div>
              <h5 className="text-primary padding-left-25">Laundry</h5>
            </div>
          </div>
        </nav>
        <div className="d-flex medium-flex-column align-items-center bg-skyblue">
          <div className="flex-column width-20percent medium-width-90percent p-1 height-550 background-white mt-2 mb-2 mx-2 overflow-y-axis-auto">
            <div className="flex-column justify-content-center padding-left-right-20">
              <h5 className="text-primary">Items</h5>
              <div className="accordion accordion-flush" id="accordionFlushExample">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="flush-headingOne">
                    <button className="accordion-button collapsed text-primary" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                      Male
                    </button>
                  </h2>
                  <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                    <div className="accordion-body">
                      <div className="list-style-none">
                        <div className="d-flex hover-gray make-cursor-pointer" onClick={() => { handleItemAdd("Tie", "C1", 15) }}>
                          <li className="col-sm-8">Tie C1</li>
                          <li className="col-sm-4">Rs 15</li>
                        </div>
                        <div className="d-flex hover-gray make-cursor-pointer" onClick={() => { handleItemAdd("Dhoti", "C2", 20) }}>
                          <li className="col-sm-8">Dhoti C2</li>
                          <li className="col-sm-4">Rs 20</li>
                        </div>
                        <div className="d-flex hover-gray make-cursor-pointer" onClick={() => { handleItemAdd("Shorts", "C3", 20) }}>
                          <li className="col-sm-8">Shorts C3</li>
                          <li className="col-sm-4">Rs 20</li>
                        </div>
                        <div className="d-flex hover-gray make-cursor-pointer" onClick={() => { handleItemAdd("Muffler", "C4", 50) }}>
                          <li className="col-sm-8">Muffler C4</li>
                          <li className="col-sm-4">Rs 50</li>
                        </div>
                        <div className="d-flex hover-gray make-cursor-pointer" onClick={() => { handleItemAdd("Vest", "C5", 10) }}>
                          <li className="col-sm-8">Vest C5</li>
                          <li className="col-sm-4">Rs 10</li>
                        </div>
                        <div className="d-flex hover-gray make-cursor-pointer" onClick={() => { handleItemAdd("Jeans", "C6", 60) }}>
                          <li className="col-sm-8">Jeans C6</li>
                          <li className="col-sm-4">Rs 60</li>
                        </div>
                        <div className="d-flex hover-gray make-cursor-pointer" onClick={() => { handleItemAdd("Handkerchief", "C7", 10) }}>
                          <li className="col-sm-8">Handkerchief C7</li>
                          <li className="col-sm-4">Rs 10</li>
                        </div>
                        <div className="d-flex hover-gray make-cursor-pointer" onClick={() => { handleItemAdd("Shirt", "C8", 50) }}>
                          <li className="col-sm-8">Shirt C8</li>
                          <li className="col-sm-4">Rs 50</li>
                        </div>
                        <div className="d-flex hover-gray make-cursor-pointer" onClick={() => { handleItemAdd("Trousers", "C9", 40) }}>
                          <li className="col-sm-8">Trousers C9</li>
                          <li className="col-sm-4">Rs 40</li>
                        </div>
                        <div className="d-flex hover-gray make-cursor-pointer" onClick={() => { handleItemAdd("T-shirt", "C10", 40) }}>
                          <li className="col-sm-8">T-shirt C10</li>
                          <li className="col-sm-4">Rs 40</li>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="flush-headingTwo">
                    <button className="accordion-button collapsed text-primary" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                      Female
                    </button>
                  </h2>
                  <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                    <div className="accordion-body">
                      <div className="list-style-none">
                        <div className="d-flex hover-gray make-cursor-pointer" onClick={() => { handleItemAdd("Saree", "C11", 50) }}>
                          <li className="col-sm-8">Saree C11</li>
                          <li className="col-sm-4">Rs 50</li>
                        </div>
                        <div className="d-flex hover-gray make-cursor-pointer" onClick={() => { handleItemAdd("Blouse", "C12", 20) }}>
                          <li className="col-sm-8">Blouse C12</li>
                          <li className="col-sm-4">Rs 20</li>
                        </div>
                        <div className="d-flex hover-gray make-cursor-pointer" onClick={() => { handleItemAdd("Salwar", "C13", 50) }}>
                          <li className="col-sm-8">Salwar C13</li>
                          <li className="col-sm-4">Rs 50</li>
                        </div>
                        <div className="d-flex hover-gray make-cursor-pointer" onClick={() => { handleItemAdd("Skirt", "C14", 30) }}>
                          <li className="col-sm-8">Skirt C14</li>
                          <li className="col-sm-4">Rs 30</li>
                        </div>
                        <div className="d-flex hover-gray make-cursor-pointer" onClick={() => { handleItemAdd("Top", "C15", 30) }}>
                          <li className="col-sm-8">Top C15</li>
                          <li className="col-sm-4">Rs 30</li>
                        </div>
                        <div className="d-flex hover-gray make-cursor-pointer" onClick={() => { handleItemAdd("Jeans", "C16", 40) }}>
                          <li className="col-sm-8">Jeans C16</li>
                          <li className="col-sm-4">Rs 40</li>
                        </div>
                        <div className="d-flex hover-gray make-cursor-pointer" onClick={() => { handleItemAdd("Pants", "C17", 30) }}>
                          <li className="col-sm-8">Pants C17</li>
                          <li className="col-sm-4">Rs 30</li>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <form className="d-flex width-80percent medium-flex-column reserv-row-gap-2 p-1">
            <div className="flex-column width-50percent height-550 medium-width-full">
              <div className="d-flex align-items-center flex-wrap font-size-14 rev-margin-gap-40">
                <label htmlFor="itemcode" className="col-sm-3 col-form-label medium-width-40percent">
                  Item Code{" "}
                </label>
                <div className="col-sm-7 medium-width-60percent">
                  <input
                    type="text"
                    className="form-control height-30 font-size-14 background-gray"
                    id="inputItemCode"
                    name="itemcode"
                    value={itemCode}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="d-flex align-items-center flex-wrap font-size-14 rev-margin-gap-40">
                <label htmlFor="itemname" className="col-sm-3 col-form-label medium-width-40percent">
                  Item Name{" "}
                </label>
                <div className="col-sm-7 medium-width-60percent">
                  <input
                    type="text"
                    className="form-control height-30 font-size-14 background-gray"
                    id="inputItemName"
                    name="itemname"
                    value={itemName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="d-flex align-items-center font-size-14 flex-wrap rev-margin-gap-40">
                <label htmlFor="cost" className="col-sm-3 col-form-label medium-width-40percent">
                  Cost{" "}
                </label>
                <div className="col-sm-7 medium-width-60percent">
                  <input
                    type="text"
                    className="form-control height-30 font-size-14 background-gray"
                    id="inputCost"
                    name="cost"
                    value={cost}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="d-flex align-items-center flex-wrap font-size-14 rev-margin-gap-40">
                <label htmlFor="discountamount" className="col-sm-3 col-form-label medium-width-40percent">
                  Discount Amt{" "}
                </label>
                <div className="col-sm-7 medium-width-60percent">
                  <input
                    type="number"
                    className="form-control height-30 font-size-14 background-gray"
                    min="0"
                    id="inputDiscountAmount"
                    name="discountamount"
                    value={discountAmount}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="d-flex align-items-center flex-wrap font-size-14 rev-margin-gap-40">
                <label htmlFor="discountpercentage" className="col-sm-3 col-form-label medium-width-40percent">
                  Discount %{" "}
                </label>
                <div className="col-sm-7 medium-width-60percent">
                  <input
                    type="number"
                    className="form-control height-30 font-size-14 background-gray"
                    min="0"
                    id="inputDiscountPercentage"
                    name="discountpercentage"
                    value={discountPercentage}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="d-flex align-items-center flex-wrap rev-margin-gap-40">
                <label htmlFor="servicetype" className="col-sm-3 col-form-label font-size-14 medium-width-40percent">
                  Service Type{" "}
                </label>
                <div className="col-sm-7 medium-width-60percent d-flex justify-content-between flex-wrap reserv-row-gap-1 reserv-col-gap-5p">
                  <button
                    type="button"
                    className={`d-flex align-items-center justify-content-center width-100p text-primary font-size-14 btn button-padding-5 height-30 large-button-width-60 large-button-font-size-12 ${serviceTypeBtnColor === "Pressing"
                      ? "button-color-onHover"
                      : "background-gray"
                      }`}
                    onClick={() => {
                      changeServiceBtnColor("Pressing");
                    }}
                  >
                    Pressing
                  </button>
                  <button
                    type="button"
                    className={`d-flex align-items-center justify-content-center text-primary width-100p font-size-14 btn button-padding-5 height-30 large-button-width-60 large-button-font-size-12 ${serviceTypeBtnColor === "Wash" ? "button-color-onHover" : "background-gray"
                      }`}
                    onClick={() => {
                      changeServiceBtnColor("Wash");
                    }}
                  >
                    Wash
                  </button>
                  <button
                    type="button"
                    className={`d-flex align-items-center justify-content-center width-120 text-primary font-size-14 btn button-padding-5 height-30 large-button-width-60 large-button-font-size-12 ${serviceTypeBtnColor === "Dry Wash"
                      ? "button-color-onHover"
                      : "background-gray"
                      }`}
                    onClick={() => {
                      changeServiceBtnColor("Dry Wash");
                    }}
                  >
                    Dry Wash
                  </button>
                </div>
              </div>
              <div className="d-flex align-items-center flex-wrap rev-margin-gap-40">
                <label
                  htmlFor="date"
                  className="col-sm-3 col-form-label font-size-14 medium-width-40percent"
                >
                  Date{" "}
                </label>
                <div className="col-sm-7 medium-width-60percent">
                  <input
                    type="date"
                    className="form-control height-30 font-size-14 background-gray"
                    id="inputDate"
                    name="date"
                    value={date}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="d-flex flex-wrap rev-margin-gap-40">
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
            </div>
            <div className="flex-column width-50percent height-550 medium-width-full">
              <div className="d-flex align-items-center flex-wrap rev-margin-gap-40">
                <label htmlFor="name" className="col-sm-3 col-form-label font-size-14 medium-width-40percent">
                  Guest Name
                </label>
                <div className="col-sm-7 medium-width-60percent d-flex column-gap-1">
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
              <div className="d-flex align-items-center flex-wrap rev-margin-gap-40">
                <label htmlFor="roomnumber" className="col-sm-3 col-form-label font-size-14 medium-width-40percent">
                  Room No{" "}
                </label>
                <div className="col-sm-7 medium-width-60percent">
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
              <div className="d-flex align-items-center flex-wrap rev-margin-gap-40">
                <label htmlFor="arrivaldate" className="col-sm-3 col-form-label font-size-14 medium-width-40percent">
                  Arrival Date{" "}
                </label>
                <div className="col-sm-7 medium-width-60percent">
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
              </div>
              <div className="d-flex align-items-center flex-wrap rev-margin-gap-40">
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
              <div className="d-flex align-items-center flex-wrap rev-margin-gap-40">
                <label htmlFor="totalitem" className="col-sm-3 col-form-label font-size-14 medium-width-40percent">
                  Total Item{" "}
                </label>
                <div className="col-sm-7 medium-width-60percent">
                  <input
                    type="number"
                    className="form-control height-30 font-size-14 background-gray"
                    id="inputTotalItem"
                    name="totalitem"
                    min="0"
                    value={totalItem}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="d-flex align-items-center rev-margin-gap-40">
                <label htmlFor="totalamount" className="col-sm-3 col-form-label font-size-14 medium-width-40percent">
                  Total Amount{" "}
                </label>
                <div className="col-sm-7 medium-width-60percent">
                  <input
                    type="text"
                    className="form-control height-30 font-size-14 background-gray"
                    id="inputTotalAmount"
                    name="totalamount"
                    value={totalAmount}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="d-flex align-items-center flex-wrap margin-bottom-30">
                <label htmlFor="paymentType" className="col-sm-3 col-form-label font-size-14 medium-width-40percent">
                  Payment{" "}
                </label>
                <div className="col-sm-7 medium-width-60percent">
                  <select
                    id="paymenttype"
                    className="form-select font-size-14 background-gray"
                    name="paymenttype"
                    value={paymentType}
                    onChange={handleInputChange}
                    required
                  >
                    <option value={""}> </option>
                    <option value={"Card"}>Card</option>
                    <option value={"UPI"}>UPI</option>
                    <option value={"Cash"}>Cash</option>
                    <option value={"Postwithroom"}>Post with Room</option>
                  </select>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-center">
                <button
                  type="submit"
                  className="d-flex align-items-center justify-content-center width-150 font-size-14 text-primary btn button-color-onHover height-30 button-padding-5"
                  onClick={(e) => { submitAction(e) }}
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

export default Laundry;
