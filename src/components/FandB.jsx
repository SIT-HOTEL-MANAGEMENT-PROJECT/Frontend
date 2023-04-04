import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import "../CustomCss/fnb.css";
import menus from "../fnbdata";


const FandB = () => {
  const [datas] = useState([...menus]);


  const [accountingdate, setaccountingdate] = useState("");
  const [guestname, setguestname] = useState("");
  const [itemquantity, setitemquantity] = useState("");
  const [tableno, settableno] = useState("");
  const [itemcode, setitemcode] = useState("");
  const [itemname, setitemname] = useState("");
  const [rate, setrate] = useState("");
  const [roomno, setroomno] = useState("");
  const [sessiontype, setsessiontype] = useState("");
  const [paymenttype, setpaymenttype] = useState("");
  const [plantype, setplantype] = useState("");

  const changeSelectItemHandler = (name, price,id) => {
    setitemcode(id);
    setitemname(name);
    setrate(price);
    console.log(name);
    console.log(price);
    console.log(id);
  }

  const [sessionBtnColourType, setsessionBtnColourType] = useState("");
  const [paymentBtnColourType, setpaymentBtnColourType] = useState("");
  const [planBtnColourType, setplanBtnColourType] = useState("");

  const changesessionBtnColour = (sessiontype) => {
    setsessionBtnColourType(sessiontype);
    setsessiontype(sessiontype);
  };

  const changepaymentBtnColour = (paymenttype) => {
    setpaymentBtnColourType(paymenttype);
    setpaymenttype(paymenttype);
  };

  const changeplanBtnColour = (plantype) => {
    setplanBtnColourType(plantype);
    setplantype(plantype);
  };



  

  const handleInputChange = (e) => {
    if(e.target.name == "accountingdate"){
      setaccountingdate(e.target.value);
    }else if(e.target.name == "guestname"){
      setguestname(e.target.value);
    }else if(e.target.name == "itemquantity"){
      setitemquantity(e.target.value);
    }else if(e.target.name == "tableno"){
      settableno(e.target.value);
    }else if(e.target.name == "roomno"){
      setroomno(e.target.value);
    }
  };


  return (
    <div className="formA">
      <nav className="navbar sticky-top navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <div className="navbar-brand d-flex align-items-center">
            <NavLink className="text-primary" to="/Home3">
              <i className="bx bx-chevrons-left"></i>
            </NavLink>
            <h5 className="text-primary">
              Food and Beverages
            </h5>
          </div>
        </div>
      </nav>
      <div className="containerAS">
        <div className="col1" id="customgap">
          <p style={{ color: "#2545F8", fontSize: "29.95px" }}>
            Items<span>Cost</span>
          </p>
          <div class="accordion" id="accordionExample">
          {datas.length > 0 && datas.map((data) =>(
            <div class="accordion-item">
            <h2 class="accordion-header" key={data.id} id="heading">
              <i className="fa fa-chevron-down" style={{fontSize: "21.78px",color: "#2545F8"}} type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${data.collapse}`} aria-expanded="true" aria-controls={`collapse${data.collapse}`}>
                {data.itemName}
              </i>
            </h2>
            <div id={`collapse${data.collapse}`} class="accordion-collapse collapse" aria-labelledby={`heading${data.collapse}`} data-bs-parent="#accordionExample">
              <div class="accordion-body">
                <ul style={{listStyleType: "none"}}>
                {data.children.length > 0 &&
                    data.children.map((child) => (
                      <li key={child.id} 
                          onClick={() => {changeSelectItemHandler(child.childName, child.price, child.id)}}>
                      <p>{child.childName} {child.id}<span style={{marginLeft:"20px"}}>Rs.{child.price}</span></p>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
          ))}
            
            
          </div>
        </div>
        <div className="col2 container">
          <form>
            <div className="lefta">
              <label className="mb-3">Accounting Date :</label>
              <input 
                className="ms-3 background-gray rounded-1 border border-light p-1" 
                type="date" 
                placeholder="" 
                name="accountingdate"
                value={accountingdate}
                onChange={handleInputChange}
                required />
              <br />
              <label className="mb-3" htmlFor="sessiontype">Session :</label>
              <button 
                type="button" 
                class={`btn ms-4 text-primary background-gray rounded-1 ${
                  sessionBtnColourType === "Morning"
                  ? "button-color-onHover"
                  : "background-gray"
                }`}
                onClick={() => {
                  changesessionBtnColour("Morning");
                }}
              >
                Morning
              </button>
              <button 
                type="button" 
                class={`btn ms-4 text-primary background-gray rounded-1 ${
                  sessionBtnColourType === "Night"
                  ? "button-color-onHover"
                  : "background-gray"
                }`}
                onClick={() => {
                  changesessionBtnColour("Night");
                }}
              >
                Night
              </button>
              <br />
              <label className="mb-3">Guest Name:</label>
              <input 
                className="ms-3 background-gray rounded-1 border border-light p-2" 
                type="text" 
                placeholder=""
                name="guestname"
                value={guestname}
                onChange={handleInputChange}
                required />
              <br />
              <label className="mb-3">Item Quantity :</label>
              <input 
                className="ms-3 background-gray rounded-1 border border-light p-2" 
                type="Number" 
                min="0" 
                name="itemquantity"
                value={itemquantity}
                onChange={handleInputChange}
                placeholder=""
                required />
              <br />
              <label className="mb-3">Table No :</label>
              <input 
                className="ms-3 background-gray rounded-1 border border-light p-2" 
                type="text" 
                name="tableno"
                value={tableno}
                onChange={handleInputChange}
                placeholder="" 
                required />
              <br />
            </div>
            <div className="righta">
              <label className="mb-3">Item Code :</label>
              <input 
                className="ms-3 background-gray rounded-1 border border-light p-1" 
                type="text"
                name="itemcode"
                value={itemcode}
                onChange={changeSelectItemHandler}
                placeholder="" 
                required 
                disabled />
              <br />
              <label className="mb-3">Item Name :</label>
              <input 
                className="ms-3 background-gray rounded-1 border border-light p-1 w-50" 
                type="text" 
                name="itemname"
                value={itemname}
                onChange={changeSelectItemHandler}
                placeholder="" 
                required 
                disabled />
              <br />
              <label className="mb-3">Plan :</label>
              <button 
                type="button" 
                class={`btn text-primary background-gray rounded-1 ms-3 ${
                  planBtnColourType === "breakfast"
                  ? "button-color-onHover"
                  : "background-gray"
                }`}
                onClick={() => {
                  changeplanBtnColour("breakfast");
                }}
              >
                Breakfast 
              </button>
              <button 
                type="button" 
                class={`btn text-primary background-gray rounded-1 ms-3 ${
                  planBtnColourType === "lunch"
                  ? "button-color-onHover"
                  : "background-gray"
                }`}
                onClick={() => {
                  changeplanBtnColour("lunch");
                }}
              >
                Lunch
              </button>
              <button 
                type="button" 
                class={`btn text-primary background-gray rounded-1 ms-3 ${
                  planBtnColourType === "dinner"
                  ? "button-color-onHover"
                  : "background-gray"
                }`}
                onClick={() => {
                  changeplanBtnColour("dinner");
                }}
              >
                Dinner
              </button>
              <br />
              <label className="mb-3">Rate :</label>
              <input 
                className="ms-3 background-gray rounded-1 border border-light p-2" 
                name="rate"
                value={rate}
                onChange={changeSelectItemHandler}
                type="text" 
                disabled />
              <br />
              <label className="mb-3">Room No :</label>
              <input 
                className="ms-3 background-gray rounded-1 border border-light p-1" 
                type="text"
                name="roomno"
                value={roomno}
                onChange={handleInputChange}
                placeholder="" 
                required />
              <br />
            </div>
            <div>
            <label className="mb-3" htmlFor="paymenttype">Payment :</label>
              <button 
                type="button" 
                class={`btn text-primary background-gray rounded-1 ms-3 ${
                  paymentBtnColourType === "Cash"
                  ? "button-color-onHover"
                  : "background-gray"
                }`}
                onClick={() => {
                  changepaymentBtnColour("Cash");
                }}
              >
                Cash
              </button>
              <button 
                type="button" 
                class={`btn text-primary background-gray rounded-1 ms-3 ${
                  paymentBtnColourType === "UPI"
                  ? "button-color-onHover"
                  : "background-gray"
                }`}
                onClick={() => {
                  changepaymentBtnColour("UPI");
                }}
              >
                UPI
              </button>
              <button 
                type="button" 
                class={`btn text-primary background-gray rounded-1 ms-3 ${
                  paymentBtnColourType === "Card"
                  ? "button-color-onHover"
                  : "background-gray"
                }`}
                onClick={() => {
                  changepaymentBtnColour("Card");
                }}
              >
                Card
              </button>
              <button 
               type="button" 
               class={`btn text-primary background-gray rounded-1 ms-3 ${
                 paymentBtnColourType === "pwr"
                 ? "button-color-onHover"
                 : "background-gray"
               }`}
               onClick={() => {
                 changepaymentBtnColour("pwr");
               }}
              >
                Post with Room
              </button>
            </div>
            <br/>
            <div>
              <table style={{width:"100%"}} className="table table-borderless">
                <tr>
                  <th style={{width:"25%",textAlign:"center"}}>Quantity</th>
                  <th style={{width:"25%",textAlign:"center"}}>Facility</th>
                  <th style={{width:"25%",textAlign:"center"}}>Item name</th>
                  <th style={{width:"25%",textAlign:"center"}}>Value</th>
                </tr>
                <tr>
                  <td style={{textAlign:"center", color:"#4763FD"}}>{itemquantity}</td>
                  <td style={{textAlign:"center", color:"#4763FD"}}>opt</td>
                  <td style={{textAlign:"center", color:"#4763FD"}}>{itemname} {itemcode}</td>
                  <td style={{textAlign:"center", color:"#4763FD"}}>{rate} Rs</td>
                </tr>
                <tr>
                  <td style={{textAlign:"center", color:"#4763FD"}}>2</td>
                  <td style={{textAlign:"center", color:"#4763FD"}}>opt</td>
                  <td style={{textAlign:"center", color:"#4763FD"}}>Vanilla Ice Cream G1</td>
                  <td style={{textAlign:"center", color:"#4763FD"}}>180 Rs</td>
                </tr>
              </table>
            </div>
            <div className="righta">
              <table style={{width:"100%"}} className="table table-borderless">
                <tr>
                  <th style={{width:"25%",textAlign:"center"}}>Total Amount</th>
                  <th style={{width:"25%",textAlign:"center", color:"#4763FD"}}>200 Rs</th>
                </tr>
                <tr>
                  <td style={{textAlign:"center"}}>Central GST @ 2.50</td>
                  <td style={{textAlign:"center"}}>38.50</td>
                </tr>
                <tr>
                  <td style={{textAlign:"center"}}>State GST @ 2.50</td>
                  <td style={{textAlign:"center"}}>38.50</td>
                </tr>
                <tr>
                  <th style={{width:"25%",textAlign:"center"}}>Net Amount</th>
                  <th style={{width:"25%",textAlign:"center", color:"#4763FD"}}>250 Rs</th>
                </tr>
              </table>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FandB;
