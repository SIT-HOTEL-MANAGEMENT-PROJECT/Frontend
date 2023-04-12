import React from "react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../CustomCss/Reservation.css";
import Localbase from "localbase";
let db = new Localbase("hmctdb");
db.config.debug = false;

const FandB = () => {
  let navigate = useNavigate();
  const [sessionTypeBtnColor, setSessionTypeBtnColor] = useState("");
  const [paymentTypeBtnColor, setPaymentTypeBtnColor] = useState("");
  const [planTypeBtnColor, setPlanTypeBtnColor] = useState("");

  const [guestName, setGuestName] = useState({
    title: "",
    firstname: "",
    middlename: "",
    lastname: "",
  });
  const [accountingDate, setAccountingDate] = useState("");
  const [modeOfsession, setModeOfSession] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");
  const [tableNo, setTableNo] = useState("");
  const [modeOfPayment, setModeOfPayment] = useState("");
  const [itemCode, setItemCode] = useState("");
  const [itemName, setItemName] = useState("");
  const [modeOfPlan, setModeOfPlan] = useState("");
  const [rate, setRate] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [stateGst, setStateGst] = useState(0);
  const [centralGst, setCentralGst] = useState(0);
  const [netAmount, setNetAmount] = useState(0);
  const [bookingIdFB, setBookingIdFB] = useState("");
  const [itemCodeArray, setItemCodeArray] = useState([]);

  const itemData = [
    { code: "A1", name: "American Salad", price: 250 },
    { code: "A2", name: "Indian Salad", price: 150 },
    { code: "B1", name: "Paneer Chilli", price: 300 },
    { code: "B2", name: "Potato Swirl", price: 150 },
    { code: "C1", name: "Chicken Lollipop", price: 400 },
    { code: "C2", name: "Mutton Cutlet", price: 550 },
    { code: "D1", name: "Tomato Soup", price: 150 },
    { code: "D2", name: "Chicken Soup", price: 350 },
    { code: "E1", name: "Basanti Pulao", price: 300 },
    { code: "E2", name: "Chicken Biriyani", price: 350 },
    { code: "F1", name: "Chocolate Mousse", price: 250 },
    { code: "F2", name: "Rasgulla", price: 150 },
    { code: "G1", name: "Limca", price: 100 },
    { code: "G2", name: "Fanta", price: 80 },
    { code: "H1", name: "Mutton Kasha", price: 650 },
    { code: "H2", name: "Mutton Biriyani", price: 750 },
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
      reservations = roomData[0]['standard'][rmno]['activeBookings'];
    }

    if (rmno.charAt(0) == '2') {
      reservations = roomData[0]['delux'][rmno]['activeBookings'];
    }

    if (rmno.charAt(0) == '3') {
      reservations = roomData[0]['executive'][rmno]['activeBookings'];
    }

    const reservationToday = reservations.find(reservation => {
      return reservation.arrivaldate <= today && reservation.departuredate >= today;
    });

    const bookingId = reservationToday ? reservationToday.bookingid : '';

    if (bookingId) {
      setBookingIdFB(bookingId);
      let reservationData = await db.collection('reservation').doc({ bookingid: bookingId }).get();
      if (!reservationData) return { success: false, msg: "Reservation Not Found!" }

      setGuestName(reservationData.name);
    }
  }


  const settlePayment = async () => {
    try {
      let reservationData = await db.collection('reservation').doc({ bookingid: bookingIdFB }).get();
      if (!reservationData) return { success: false, msg: "Reservation Not Found!" }

      let updatedpaymenthistory = reservationData.paymenthistory;
      const todaydateforpayment = new Date();
      const todaydateforpaymentstring = todaydateforpayment.toISOString().slice(0, 10);

      if (!updatedpaymenthistory.some((item) => item.name === "f&b")) {
        updatedpaymenthistory.push({
          name: "f&b",
          description: "F&B time payment",
          date: todaydateforpaymentstring,
          debit: netAmount,
          credit: netAmount,
        });
      } else {
        updatedpaymenthistory = updatedpaymenthistory.map((item) => {
          if (item.name === "f&b") {
            return {
              ...item,
              date: todaydateforpaymentstring,
              debit: netAmount,
              credit: netAmount
            };
          } else {
            return item;
          }
        });
      }

      await db.collection('reservation').doc({ bookingid: bookingIdFB }).update({
        paymenthistory: updatedpaymenthistory
      })

      await updateRupeesAdrValue(netAmount.toString());

      return { success: true }
    } catch (e) {
      console.log("LaundryPageError (settlePayment) : ",e);
      return {success: false, msg: 'Something Went Wrong'}
    }
  }



  useEffect(() => {
    const commaSeparatedNames = itemCodeArray?.map(item => item?.name).join(",");
    const commaSeparatedPrice = itemCodeArray?.map(item => item?.price).join(",");
    setItemName(commaSeparatedNames);
    setRate(commaSeparatedPrice);
    setItemQuantity(itemCodeArray.length);
    const prices = rate.split(",").map(price => parseInt(price.trim()));
    const total = prices.reduce((accumulator, currentValue) => accumulator + currentValue);
    setTotalAmount(total);
    const stgst = (2.50/100)*total;
    const ctgst = (2.50/100)*total;
    const netamt = total + ctgst + stgst;
    setStateGst(stgst);
    setCentralGst(ctgst);
    setNetAmount(netamt);
  }, [itemCodeArray])

  
  const handleInputChange = (e) => {
    if (e.target.name == "title") { setGuestName({ ...guestName, title: e.target.value }); }
    else if (e.target.name == "firstname") { setGuestName({ ...guestName, firstname: e.target.value }); }
    else if (e.target.name == "middlename") { setGuestName({ ...guestName, middlename: e.target.value }); }
    else if (e.target.name == "lastname") { setGuestName({ ...guestName, lastname: e.target.value }); }
    else if (e.target.name == "accountingdate") { setAccountingDate(e.target.value); }
    else if (e.target.name == "itemquantity") { setItemQuantity(e.target.value); }
    else if (e.target.name == "tablenumber") { setTableNo(e.target.value); }
    else if (e.target.name == "itemcode") { 
      setItemCode(e.target.value);
      const arr = e.target.value.split(",");
      const resultArr = [];
      arr.forEach((code) => {
        const obj = itemData.find((item) => item.code === code);
        if(obj){
          resultArr.push(obj);
        }
      });
      setItemCodeArray(resultArr); 
    }
    else if (e.target.name == "itemname") { setItemName(e.target.value); }
    else if (e.target.name == "rate") { 
      setRate(e.target.value);
      const prices = e.target.value.split(",").map(price => parseInt(price.trim()));
      const total = prices.reduce((accumulator, currentValue) => accumulator + currentValue);
      setTotalAmount(total);
      const stgst = (2.50/100)*total;
      const ctgst = (2.50/100)*total;
      const netamt = total + ctgst + stgst;
      setStateGst(stgst);
      setCentralGst(ctgst);
      setNetAmount(netamt);
    }
    else if (e.target.name == "roomnumber") { 
      setRoomNumber(e.target.value); 
      if (e.target.value.length === 3) findBookingIDAgainstRoomNo(e.target.value);
    }
  }

  const handleItemAdd = (itmNm, itmCd, price) => {
    setItemCodeArray([...itemCodeArray, { name: itmNm, code: itmCd, price: price }]);
    const codeArr = itemCode.split(",").filter(Boolean);
    codeArr.push(itmCd);
    const str = codeArr.join(',');
    setItemCode(str);
  }

  const changePaymentBtnColor = (paymentType) => {
    setPaymentTypeBtnColor(paymentType);
    setModeOfPayment(paymentType);
  };

  const changePlanBtnColor = (planType) => {
    setPlanTypeBtnColor(planType);
    setModeOfPlan(planType);
  };

  const changeSessionBtnColor = (sessionType) => {
    setSessionTypeBtnColor(sessionType);
    setModeOfSession(sessionType);
  };

  const submitAction = async(e)=>{
    e.preventDefault();
    let res = await settlePayment();
    if(res.success){
      setTimeout(() => { 
        navigate(-1);
      }, 5000);
      alert("Food & Beverage Bill generated!")
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
              <h5 className="text-primary">F&B Service</h5>
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
                      Salad & Raita
                    </button>
                  </h2>
                  <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                    <div className="accordion-body">
                      <div className="list-style-none">
                        <div className="d-flex hover-gray make-cursor-pointer" onClick={() => { handleItemAdd("American Salad", "A1", 250) }}>
                          <li className="col-sm-8">American Salad A1</li>
                          <li className="col-sm-4">Rs 250</li>
                        </div>
                        <div className="d-flex hover-gray make-cursor-pointer" onClick={() => { handleItemAdd("Indian Salad", "A2", 150) }}>
                          <li className="col-sm-8">Indian Salad A2</li>
                          <li className="col-sm-4">Rs 150</li>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="flush-headingTwo">
                    <button className="accordion-button collapsed text-primary" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                      Veg Starters
                    </button>
                  </h2>
                  <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                    <div className="accordion-body">
                      <div className="list-style-none">
                        <div className="d-flex hover-gray make-cursor-pointer" onClick={() => { handleItemAdd("Paneer Chilli", "B1", 300) }}>
                          <li className="col-sm-8">Paneer Chilli B1</li>
                          <li className="col-sm-4">Rs 300</li>
                        </div>
                        <div className="d-flex hover-gray make-cursor-pointer" onClick={() => { handleItemAdd("Potato Swirl", "B2", 150) }}>
                          <li className="col-sm-8">Potato Swirl B2</li>
                          <li className="col-sm-4">Rs 150</li>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="flush-headingThree">
                    <button className="accordion-button collapsed text-primary" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                      Non-veg Starters
                    </button>
                  </h2>
                  <div id="flush-collapseThree" className="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                    <div className="accordion-body">
                      <div className="list-style-none">
                        <div className="d-flex hover-gray make-cursor-pointer" onClick={() => { handleItemAdd("Chicken Lollipop", "C1", 400) }}>
                          <li className="col-sm-8">Chicken Lollipop C1</li>
                          <li className="col-sm-4">Rs 400</li>
                        </div>
                        <div className="d-flex hover-gray make-cursor-pointer" onClick={() => { handleItemAdd("Mutton Cutlet", "C2", 550) }}>
                          <li className="col-sm-8">Mutton Cutlet C2</li>
                          <li className="col-sm-4">Rs 550</li>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="flush-headingFour">
                    <button className="accordion-button collapsed text-primary" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
                      Soup Bowls
                    </button>
                  </h2>
                  <div id="flush-collapseFour" className="accordion-collapse collapse" aria-labelledby="flush-headingFour" data-bs-parent="#accordionFlushExample">
                    <div className="accordion-body">
                      <div className="list-style-none">
                        <div className="d-flex hover-gray make-cursor-pointer" onClick={() => { handleItemAdd("Tomato Soup", "D1", 150) }}>
                          <li className="col-sm-8">Tomato Soup D1</li>
                          <li className="col-sm-4">Rs 150</li>
                        </div>
                        <div className="d-flex hover-gray make-cursor-pointer" onClick={() => { handleItemAdd("Chicken Soup", "D2", 350) }}>
                          <li className="col-sm-8">Chicken Soup D2</li>
                          <li className="col-sm-4">Rs 350</li>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="flush-headingFive">
                    <button className="accordion-button collapsed text-primary" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFive" aria-expanded="false" aria-controls="flush-collapseFive">
                      Rice Item
                    </button>
                  </h2>
                  <div id="flush-collapseFive" className="accordion-collapse collapse" aria-labelledby="flush-headingFive" data-bs-parent="#accordionFlushExample">
                    <div className="accordion-body">
                      <div className="list-style-none">
                        <div className="d-flex hover-gray make-cursor-pointer" onClick={() => { handleItemAdd("Basanti Pulao", "E1", 300) }}>
                          <li className="col-sm-8">Basanti Pulao E1</li>
                          <li className="col-sm-4">Rs 300</li>
                        </div>
                        <div className="d-flex hover-gray make-cursor-pointer" onClick={() => { handleItemAdd("Chicken Biriysni", "E2", 350) }}>
                          <li className="col-sm-8">Chicken Biriyani E2</li>
                          <li className="col-sm-4">Rs 350</li>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="accordion-item"> 
                  <h2 className="accordion-header" id="flush-headingSix">
                    <button className="accordion-button collapsed text-primary" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseSix" aria-expanded="false" aria-controls="flush-collapseSix">
                      Desserts
                    </button>
                  </h2>
                  <div id="flush-collapseSix" className="accordion-collapse collapse" aria-labelledby="flush-headingSix" data-bs-parent="#accordionFlushExample">
                    <div className="accordion-body">
                      <div className="list-style-none">
                        <div className="d-flex hover-gray make-cursor-pointer" onClick={() => { handleItemAdd("Chocolate Mousse", "F1", 250) }}>
                          <li className="col-sm-8">Chocolate Mousse F1</li>
                          <li className="col-sm-4">Rs 250</li>
                        </div>
                        <div className="d-flex hover-gray make-cursor-pointer" onClick={() => { handleItemAdd("Rasgulla", "F2", 150) }}>
                          <li className="col-sm-8">Rasgulla F2</li>
                          <li className="col-sm-4">Rs 150</li>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="flush-headingSeven">
                    <button className="accordion-button collapsed text-primary" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseSeven" aria-expanded="false" aria-controls="flush-collapseSeven">
                      Beverages
                    </button>
                  </h2>
                  <div id="flush-collapseSeven" className="accordion-collapse collapse" aria-labelledby="flush-headingSeven" data-bs-parent="#accordionFlushExample">
                    <div className="accordion-body">
                      <div className="list-style-none">
                        <div className="d-flex hover-gray make-cursor-pointer" onClick={() => { handleItemAdd("Limca", "G1", 100) }}>
                          <li className="col-sm-8">Limca G1</li>
                          <li className="col-sm-4">Rs 100</li>
                        </div>
                        <div className="d-flex hover-gray make-cursor-pointer" onClick={() => { handleItemAdd("Fanta", "G2", 80) }}>
                          <li className="col-sm-8">Fanta G2</li>
                          <li className="col-sm-4">Rs 80</li>
                        </div>                        
                      </div>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="flush-headingEight">
                    <button className="accordion-button collapsed text-primary" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseEight" aria-expanded="false" aria-controls="flush-collapseEight">
                      Lunch
                    </button>
                  </h2>
                  <div id="flush-collapseEight" className="accordion-collapse collapse" aria-labelledby="flush-headingEight" data-bs-parent="#accordionFlushExample">
                    <div className="accordion-body">
                      <div className="list-style-none">
                        <div className="d-flex hover-gray make-cursor-pointer" onClick={() => { handleItemAdd("Mutton Kasha", "H1", 650) }}>
                          <li className="col-sm-8">Mutton Kasha H1</li>
                          <li className="col-sm-4">Rs 650</li>
                        </div>
                        <div className="d-flex hover-gray make-cursor-pointer" onClick={() => { handleItemAdd("Mutton Biriyani", "H2", 750) }}>
                          <li className="col-sm-8">Mutton Biriyani H2</li>
                          <li className="col-sm-4">Rs 750</li>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-column width-80percent">
            <form className="flex-column p-1">
              <div className="d-flex medium-flex-column justify-content-between">
                <div className="flex-column width-48percent medium-width-full">
                  <div className="d-flex align-items-center flex-wrap rev-margin-gap">
                    <label
                      htmlFor="accountingdate"
                      className="col-sm-4 col-form-label font-size-14 medium-width-40percent"
                    >
                      Accounting Date{" "}
                    </label>
                    <div className="col-sm-8 medium-width-60percent">
                      <input
                        type="date"
                        className="form-control height-30 font-size-14 background-gray"
                        id="inputAccountingDate"
                        name="accountingdate"
                        value={accountingDate}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="d-flex align-items-center flex-wrap rev-margin-gap">
                    <label
                      htmlFor="session"
                      className="col-sm-4 col-form-label font-size-14 medium-width-40percent"
                    >
                      Session{" "}
                    </label>
                    <div className="col-sm-8 d-flex justify-content-between medium-width-60percent">
                      <button
                        type="button"
                        className={`width-120 medium-width-90 height-30 d-flex align-items-center justify-content-center font-size-14 text-primary btn button-padding-5 large-button-width-60 large-button-font-size-12 ${sessionTypeBtnColor === "Morning"
                          ? "button-color-onHover"
                          : "background-gray"
                          }`}
                        onClick={() => {
                          changeSessionBtnColor("Morning");
                        }}
                      >
                        Morning
                      </button>
                      <button
                        type="button"
                        className={`width-120 medium-width-90 height-30 d-flex align-items-center justify-content-center font-size-14 text-primary btn button-padding-5 large-button-width-60 large-button-font-size-12 ${sessionTypeBtnColor === "Night"
                          ? "button-color-onHover"
                          : "background-gray"
                          }`}
                        onClick={() => {
                          changeSessionBtnColor("Night");
                        }}
                      >
                        Night
                      </button>
                    </div>
                  </div>
                  <div className="d-flex align-items-center flex-wrap rev-margin-gap">
                    <label htmlFor="name" className="col-sm-4 col-form-label font-size-14 medium-width-40percent">
                      Guest Name
                    </label>
                    <div className="col-sm-8 d-flex column-gap-1 reserv-row-gap-1 medium-width-60percent">
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
                  <div className="d-flex align-items-center flex-wrap rev-margin-gap">
                    <label
                      htmlFor="itemquantity"
                      className="col-sm-4 col-form-label font-size-14 medium-width-40percent"
                    >
                      Item Quantity{" "}
                    </label>
                    <div className="col-sm-8 medium-width-60percent">
                      <input
                        type="number"
                        className="form-control height-30 font-size-14 background-gray"
                        id="inputitemquantity"
                        name="itemquantity"
                        min="0"
                        value={itemQuantity}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="d-flex align-items-center flex-wrap rev-margin-gap">
                    <label
                      htmlFor="tablenumber"
                      className="col-sm-4 col-form-label font-size-14 medium-width-40percent"
                    >
                      Table No{" "}
                    </label>
                    <div className="col-sm-8 medium-width-60percent">
                      <input
                        type="number"
                        className="form-control height-30 font-size-14 background-gray"
                        id="inputTableNumber"
                        name="tablenumber"
                        min="0"
                        value={tableNo}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="flex-column width-48percent medium-width-full">
                  <div className="d-flex align-items-center flex-wrap font-size-14 rev-margin-gap">
                    <label htmlFor="itemcode" className="col-sm-3 col-form-label medium-width-40percent">
                      Item Code{" "}
                    </label>
                    <div className="col-sm-8 medium-width-60percent">
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
                  <div className="d-flex align-items-center flex-wrap font-size-14 rev-margin-gap">
                    <label htmlFor="itemname" className="col-sm-3 col-form-label medium-width-40percent">
                      Item Name{" "}
                    </label>
                    <div className="col-sm-8 medium-width-60percent">
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
                  <div className="d-flex align-items-center flex-wrap rev-margin-gap">
                    <label
                      htmlFor="plan"
                      className="col-sm-3 col-form-label font-size-14 medium-width-40percent"
                    >
                      Plan{" "}
                    </label>
                    <div className="col-sm-8 medium-width-60percent d-flex justify-content-between flex-wrap reserv-row-gap-1">
                      <button
                        type="button"
                        className={`width-100p height-30 d-flex align-items-center justify-content-center font-size-14 text-primary btn button-padding-5 large-button-width-60 large-button-font-size-12 ${planTypeBtnColor === "Breakfast"
                          ? "button-color-onHover"
                          : "background-gray"
                          }`}
                        onClick={() => {
                          changePlanBtnColor("Breakfast");
                        }}
                      >
                        Breakfast
                      </button>
                      <button
                        type="button"
                        className={`width-100p height-30 d-flex align-items-center justify-content-center font-size-14 text-primary btn button-padding-5 large-button-width-60 large-button-font-size-12 ${planTypeBtnColor === "Lunch"
                          ? "button-color-onHover"
                          : "background-gray"
                          }`}
                        onClick={() => {
                          changeSessionBtnColor("Lunch");
                        }}
                      >
                        Lunch
                      </button>
                      <button
                        type="button"
                        className={`width-100p height-30 d-flex align-items-center justify-content-center font-size-14 text-primary btn button-padding-5 large-button-width-60 large-button-font-size-12 ${planTypeBtnColor === "Dinner"
                          ? "button-color-onHover"
                          : "background-gray"
                          }`}
                        onClick={() => {
                          changeSessionBtnColor("Dinner");
                        }}
                      >
                        Dinner
                      </button>
                    </div>
                  </div>
                  <div className="d-flex align-items-center flex-wrap rev-margin-gap">
                    <label
                      htmlFor="rate"
                      className="col-sm-3 col-form-label font-size-14 medium-width-40percent"
                    >
                      Rate{" "}
                    </label>
                    <div className="col-sm-8 medium-width-60percent">
                      <input
                        type="text"
                        className="form-control height-30 font-size-14 background-gray"
                        id="inputRate"
                        name="rate"
                        value={rate}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="d-flex align-items-center flex-wrap rev-margin-gap">
                    <label htmlFor="roomnumber" className="col-sm-3 col-form-label font-size-14 medium-width-40percent">
                      Room No{" "}
                    </label>
                    <div className="col-sm-8 medium-width-60percent">
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
                </div>
              </div>
              <div className="d-flex align-items-center flex-wrap rev-margin-gap">
                <label
                  htmlFor="modeofpayment"
                  className="col-sm-2 col-form-label font-size-14"
                >
                  Mode of Payment{" "}
                </label>
                <div className="col-sm-9 d-flex justify-content-between flex-wrap reserv-row-gap-1">
                  <button
                    type="button"
                    className={`width-150 height-30 d-flex align-items-center justify-content-center font-size-14 text-primary btn button-padding-5 large-button-width-60 large-button-font-size-12 ${paymentTypeBtnColor === "Cash"
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
                    className={`width-150 height-30 d-flex align-items-center justify-content-center font-size-14 text-primary btn button-padding-5 large-button-width-60 large-button-font-size-12 ${paymentTypeBtnColor === "Card"
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
                    className={`width-150 height-30 d-flex align-items-center justify-content-center font-size-14 text-primary btn button-padding-5 large-button-width-60 large-button-font-size-12 ${paymentTypeBtnColor === "UPI"
                      ? "button-color-onHover"
                      : "background-gray"
                      }`}
                    onClick={() => {
                      changePaymentBtnColor("UPI");
                    }}
                  >
                    UPI
                  </button>
                  <button
                    type="button"
                    className={`width-150 height-30 d-flex align-items-center justify-content-center font-size-14 text-primary btn button-padding-5 large-button-width-60 large-button-font-size-12 ${paymentTypeBtnColor === "Post with room"
                      ? "button-color-onHover"
                      : "background-gray"
                      }`}
                    onClick={() => {
                      changePaymentBtnColor("Post with room");
                    }}
                  >
                    Post with room
                  </button>
                </div>
              </div>
            </form>
            <div className="table-responsive mt-3">
              <table className="table table-borderless table-border-collapse">
                <thead>
                  <tr>
                    <th scope="col">Quantity</th>
                    <th scope="col">Facility</th>
                    <th scope="col">Item Name</th>
                    <th scope="col">Value</th>
                  </tr>
                </thead>
                <tbody className="table-group-divider text-primary">
                  {itemCodeArray && itemCodeArray.map((item,index)=>{
                    return <tr key={index+1}>
                    <td>1</td>
                    <td>Opt</td>
                    <td>{item.name + " " + item.code}</td>
                    <td>{item.price}</td>
                  </tr>})}
                  <tr>
                    <td></td>
                    <td></td>
                    <td className="text-dark">Total Amount</td>
                    <td>{totalAmount}</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td className="text-dark">Central GST @2.50</td>
                    <td className="text-dark">{centralGst}</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td className="text-dark">State GST @2.50</td>
                    <td className="text-dark">{stateGst}</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td className="text-dark">Net Amount</td>
                    <td>{netAmount}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="d-flex align-items-center justify-content-end mb-4 padding-right-40">
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

export default FandB;
