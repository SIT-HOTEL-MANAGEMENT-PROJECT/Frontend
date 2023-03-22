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
    }else if(e.target.name == "itemcode"){
      setitemcode(e.target.value);
    }else if(e.target.name == "itemname"){
      setitemname(e.target.value);
    }else if(e.target.name == "rate"){
      setrate(e.target.value);
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
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingOne">
                <i className="fa fa-chevron-down" style={{fontSize: "21.78px",color: "#2545F8"}} type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  &nbsp;Salads and Raita
                </i>
              </h2>
              <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                  <ul style={{listStyleType: "none"}}>
                    <li>
                      <p>Russian Salad(Veg/Non-veg)<span style={{marginLeft:"20px"}}>Rs. 150/170</span></p>
                    </li>
                    <li>
                      <p>Fresh Garden <br/> Salad<span style={{marginLeft:"20px"}}>Rs. 105</span></p>
                    </li>
                    <li>
                      <p>Mix raita/Kheer Raita <br/>/Boondi Raita<span style={{marginLeft:"20px"}}>Rs. 135</span></p>
                    </li>
                    <li>
                      <p>Pineapple<br/>Raita<span style={{marginLeft:"20px"}}>Rs. 170</span></p>
                    </li>
                    <li>
                      <p>Plain dahi<span style={{marginLeft:"20px"}}>Rs. 105</span></p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingTwo">
                <i  className="fa fa-chevron-down" style={{fontSize: "20px",color: "#2545F8"}} type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                &nbsp;Veg Starter
                </i>
              </h2>
              <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                <ul style={{listStyleType: "none"}}>
                    <li>
                      <p><a href="#">Vegetable <br/> Pakora<span style={{marginLeft:"20px"}}>Rs. 150</span></a></p>
                    </li>
                    <li>
                      <p>Onion Pakora<span style={{marginLeft:"20px"}}>Rs. 150</span></p>
                    </li>
                    <li>
                      <p>French Fries<span style={{marginLeft:"20px"}}>Rs. 200</span></p>
                    </li>
                    <li>
                      <p>Cheese balls(6 pcs)<span style={{marginLeft:"20px"}}>Rs. 200</span></p>
                    </li>
                    <li>
                      <p>Peanut Masala<span style={{marginLeft:"20px"}}>Rs. 200</span></p>
                    </li>
                    <li>
                      <p>Paneer Tikka<span style={{marginLeft:"20px"}}>Rs. 200</span></p>
                    </li>
                    <li>
                      <p>Veg Sheek <br/> Kabab<span style={{marginLeft:"20px"}}>Rs. 200</span></p>
                    </li>
                    <li>
                      <p>Paneer Malai <br/> Tikka<span style={{marginLeft:"20px"}}>Rs. 200</span></p>
                    </li>
                    <li>
                      <p>Harabhara <br/> Kabab<span style={{marginLeft:"20px"}}>Rs. 200</span></p>
                    </li>
                    <li>
                      <p>Skkky Kabab <br/> Platter<span style={{marginLeft:"20px"}}>Rs. 200</span></p>
                    </li>
                    <li>
                      <p>Paneer Aachari Tikka<span style={{marginLeft:"20px"}}>Rs. 200</span></p>
                    </li>
                    <li>
                      <p>Tandoori Mushroom<span style={{marginLeft:"20px"}}>Rs. 200</span></p>
                    </li>
                    <li>
                      <p>Tandoori Aloo<span style={{marginLeft:"20px"}}>Rs. 200</span></p>
                    </li>
                    <li>
                      <p>Tandoori <br/> Gobhi<span style={{marginLeft:"20px"}}>Rs. 200</span></p>
                    </li>
                    
                  </ul>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingThree">
                <i className="fa fa-chevron-down" style={{fontSize: "20px",color: "#2545F8"}}  type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                &nbsp;Non-Veg Starter
                </i>
              </h2>
              <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                <ul style={{listStyleType: "none"}}>
                    <li>
                      <p>Chicken <br/> Pakora<span style={{marginLeft:"20px"}}>Rs. 150</span></p>
                    </li>
                    <li>
                      <p>Murg Lasuni <br/> Tikka<span style={{marginLeft:"20px"}}>Rs. 150</span></p>
                    </li>
                    <li>
                      <p>Murg Tikka<span style={{marginLeft:"20px"}}>Rs. 150</span></p>
                    </li>
                    <li>
                      <p>Murg Reshmi Kabab<span style={{marginLeft:"20px"}}>Rs. 150</span></p>
                    </li>
                    <li>
                      <p>Murg Pahari <br/> Kabab<span style={{marginLeft:"20px"}}>Rs. 150</span></p>
                    </li>
                    <li>
                      <p>Chicken Sheek kabab<span style={{marginLeft:"20px"}}>Rs. 150</span></p>
                    </li>
                    <li>
                      <p>Murg Afghani kabab<span style={{marginLeft:"20px"}}>Rs. 150</span></p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingfour">
                <i className="fa fa-chevron-down" style={{fontSize: "20px",color: "#2545F8"}}  type="button" data-bs-toggle="collapse" data-bs-target="#collapsefour" aria-expanded="false" aria-controls="collapsefour">
                &nbsp;Soup Bowl
                </i>
              </h2>
              <div id="collapsefour" class="accordion-collapse collapse" aria-labelledby="headingfour" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                <ul style={{listStyleType: "none"}}>
                    <li>
                      <p>Choice of Cream Soup<span style={{marginLeft:"20px"}}>Rs. 140</span></p>
                    </li>
                    <li>
                      <p>Lemon Coriander Soup(veg/non-veg)<span style={{marginLeft:"20px"}}>Rs. 140/160</span></p>
                    </li>
                    <li>
                      <p>Cream of Chicken Soup<span style={{marginLeft:"20px"}}>Rs. 160</span></p>
                    </li>
                    <li>
                      <p>Clear Soup(veg/non-veg)<span style={{marginLeft:"20px"}}>Rs. 140/160</span></p>
                    </li>
                    <li>
                      <p>Sweet Corn(veg/non-veg)<span style={{marginLeft:"20px"}}>Rs. 140/160</span></p>
                    </li>
                    <li>
                      <p>Hot and Sour(veg/non-veg)<span style={{marginLeft:"20px"}}>Rs. 150/160</span></p>
                    </li>
                    <li>
                      <p>Manchow(veg/non-veg)<span style={{marginLeft:"20px"}}>Rs. 150/160</span></p>
                    </li>
                </ul>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingfive">
                <i className="fa fa-chevron-down" style={{fontSize: "20px",color: "#2545F8"}}  type="button" data-bs-toggle="collapse" data-bs-target="#collapsefive" aria-expanded="false" aria-controls="collapsefive">
                &nbsp;Rice Item
                </i>
              </h2>
              <div id="collapsefive" class="accordion-collapse collapse" aria-labelledby="headingfive" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                <ul style={{listStyleType: "none"}}>
                    <li>
                      <p>Steamed Rice<span style={{marginLeft:"20px"}}>Rs. 115</span></p>
                    </li>
                    <li>
                      <p>Jeera Rice<span style={{marginLeft:"20px"}}>Rs. 160</span></p>
                    </li>
                    <li>
                      <p>Veg Biryani<span style={{marginLeft:"20px"}}>Rs. 210</span></p>
                    </li>
                    <li>
                      <p>Chicken <br/> Biryani<span style={{marginLeft:"20px"}}>Rs. 270</span></p>
                    </li>
                    <li>
                      <p>Mutton <br/> Biryani<span style={{marginLeft:"20px"}}>Rs. 290</span></p>
                    </li>
                    <li>
                      <p>Skkky Special Biryani <br/>(non-veg)<span style={{marginLeft:"20px"}}>Rs. 316</span></p>
                    </li>
                    <li>
                      <p>Peas Pulao<span style={{marginLeft:"20px"}}>Rs. 160</span></p>
                    </li>
                    <li>
                      <p>Veg Pulao<span style={{marginLeft:"20px"}}>Rs. 160</span></p>
                    </li>
                    <li>
                      <p>Corn Pulao<span style={{marginLeft:"20px"}}>Rs. 160</span></p>
                    </li>
                    <li>
                      <p>Paneer Pulao<span style={{marginLeft:"20px"}}>Rs. 180</span></p>
                    </li>
                    <li>
                      <p>Kashmiri <br/> Pulao<span style={{marginLeft:"20px"}}>Rs. 200</span></p>
                    </li>
                    <li>
                      <p>Chicken Pulao<span style={{marginLeft:"20px"}}>Rs. 270</span></p>
                    </li>
                </ul>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingsix">
                <i className="fa fa-chevron-down" style={{fontSize: "20px",color: "#2545F8"}}  type="button" data-bs-toggle="collapse" data-bs-target="#collapsesix" aria-expanded="false" aria-controls="collapsesix">
                &nbsp;South Indian Taste
                </i>
              </h2>
              <div id="collapsesix" class="accordion-collapse collapse" aria-labelledby="headingsix" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                <ul style={{listStyleType: "none"}}>
                    <li>
                      <p>Plain Dosa<span style={{marginLeft:"20px"}}>Rs. 129</span></p>
                    </li>
                    <li>
                      <p>Butter Plain <br/> Dosa<span style={{marginLeft:"20px"}}>Rs. 139</span></p>
                    </li>
                    <li>
                      <p>Masala Dosa<span style={{marginLeft:"20px"}}>Rs. 149</span></p>
                    </li>
                    <li>
                      <p>Onion Masala Dosa<span style={{marginLeft:"20px"}}>Rs. 149</span></p>
                    </li>
                    <li>
                      <p>Butter Dosa<span style={{marginLeft:"20px"}}>Rs. 169</span></p>
                    </li>
                    <li>
                      <p>Butter Masala Dosa<span style={{marginLeft:"20px"}}>Rs. 169</span></p>
                    </li>
                    <li>
                      <p>Cheese Dosa<span style={{marginLeft:"20px"}}>Rs. 239</span></p>
                    </li>
                    <li>
                      <p>Plain Uttapam<span style={{marginLeft:"20px"}}>Rs. 139</span></p>
                    </li>
                    <li>
                      <p>Onion/Tomato Uttapam<span style={{marginLeft:"20px"}}>Rs. 149</span></p>
                    </li>
                    <li>
                      <p>Mix Veg <br/> Uttapam<span style={{marginLeft:"20px"}}>Rs. 169</span></p>
                    </li>
                    <li>
                      <p>Paneer <br/> Uttapam<span style={{marginLeft:"20px"}}>Rs. 179</span></p>
                    </li>
                    <li>
                      <p>Idly Sambar/Vada Sambar<span style={{marginLeft:"20px"}}>Rs. 139</span></p>
                    </li>
                    <li>
                      <p>Curd Rice<span style={{marginLeft:"20px"}}>Rs. 179</span></p>
                    </li>
                </ul>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingseven">
                <i className="fa fa-chevron-down" style={{fontSize: "20px",color: "#2545F8"}}  type="button" data-bs-toggle="collapse" data-bs-target="#collapseseven" aria-expanded="false" aria-controls="collapseseven">
                &nbsp;Sweet
                </i>
              </h2>
              <div id="collapseseven" class="accordion-collapse collapse" aria-labelledby="headingseven" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                <ul style={{listStyleType: "none"}}>
                    <li>
                      <p>Gulab Jamun<span style={{marginLeft:"20px"}}>Rs. 50</span></p>
                    </li>
                    <li>
                      <p>Rasgulla<span style={{marginLeft:"20px"}}>Rs. 70</span></p>
                    </li>
                    <li>
                      <p>Raj Bhoj<span style={{marginLeft:"20px"}}>Rs. 60</span></p>
                    </li>
                    <li>
                      <p>Gazar Ka <br/> Halwa<span style={{marginLeft:"20px"}}>Rs. 80</span></p>
                    </li>
                </ul>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingeight">
                <i className="fa fa-chevron-down" style={{fontSize: "20px",color: "#2545F8"}}  type="button" data-bs-toggle="collapse" data-bs-target="#collapseeight" aria-expanded="false" aria-controls="collapseeight">
                &nbsp;Ice Cream
                </i>
              </h2>
              <div id="collapseeight" class="accordion-collapse collapse" aria-labelledby="headingeight" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                <ul style={{listStyleType: "none"}}>
                    <li>
                      <p>Vanilla Ice-Cream<span style={{marginLeft:"20px"}}>Rs. 49</span></p>
                    </li>
                    <li>
                      <p>Butter Scotch<span style={{marginLeft:"20px"}}>Rs. 65</span></p>
                    </li>
                    <li>
                      <p>Chocolate Ice-Cream<span style={{marginLeft:"20px"}}>Rs. 99</span></p>
                    </li>
                    <li>
                      <p>Kesar Pista Ice-Cream<span style={{marginLeft:"20px"}}>Rs. 99</span></p>
                    </li>
                </ul>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingnine">
                <i className="fa fa-chevron-down" style={{fontSize: "20px",color: "#2545F8"}}  type="button" data-bs-toggle="collapse" data-bs-target="#collapsenine" aria-expanded="false" aria-controls="collapsenine">
                &nbsp;Momos
                </i>
              </h2>
              <div id="collapsenine" class="accordion-collapse collapse" aria-labelledby="headingnine" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                <ul style={{listStyleType: "none"}}>
                    <li>
                      <p>Veg Steamed Momos<span style={{marginLeft:"20px"}}>Rs. 150</span></p>
                    </li>
                    <li>
                      <p>Veg Fried <br/>Momos<span style={{marginLeft:"20px"}}>Rs. 180</span></p>
                    </li>
                    <li>
                      <p>Veg Chili <br/> Momos<span style={{marginLeft:"20px"}}>Rs. 220</span></p>
                    </li>
                    <li>
                      <p>Veg momo in schezwan <br/>sauce<span style={{marginLeft:"20px"}}>Rs. 220</span></p>
                    </li>
                    <li>
                      <p>Chicken steamed momo<span style={{marginLeft:"20px"}}>Rs. 165</span></p>
                    </li>
                    <li>
                      <p>Chicken Fried momo<span style={{marginLeft:"20px"}}>Rs. 200</span></p>
                    </li>
                    <li>
                      <p>Chicken chili momo<span style={{marginLeft:"20px"}}>Rs. 250</span></p>
                    </li>
                    <li>
                      <p>Chicken momo in schezwan <br/> sauce<span style={{marginLeft:"20px"}}>Rs. 250</span></p>
                    </li>
                </ul>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingten">
                <i className="fa fa-chevron-down" style={{fontSize: "20px",color: "#2545F8"}}  type="button" data-bs-toggle="collapse" data-bs-target="#collapseten" aria-expanded="false" aria-controls="collapseten">
                &nbsp;Beverages
                </i>
              </h2>
              <div id="collapseten" class="accordion-collapse collapse" aria-labelledby="headingten" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                <ul style={{listStyleType: "none"}}>
                    <li>
                      <p>Strawberry/Vanilla/<br/>Chocolate<br/> Shake<span style={{marginLeft:"20px"}}>Rs. 170</span></p>
                    </li>
                    <li>
                      <p>Cold Coffee<span style={{marginLeft:"20px"}}>Rs. 110</span></p>
                    </li>
                    <li>
                      <p>Cold Coffee with Ice-Cream<span style={{marginLeft:"20px"}}>Rs. 130</span></p>
                    </li>
                    <li>
                      <p>Lemon Ice Tea<span style={{marginLeft:"20px"}}>Rs. 115</span></p>
                    </li>
                    <li>
                      <p>Juice of Choice<span style={{marginLeft:"20px"}}>Rs. 75</span></p>
                    </li>
                    <li>
                      <p>Masala Cold drinks<span style={{marginLeft:"20px"}}>Rs. 75</span></p>
                    </li>
                    <li>
                      <p>Fresh Lime <br/> Soda<span style={{marginLeft:"20px"}}>Rs. 65</span></p>
                    </li>
                    <li>
                      <p>Fresh Lime <br/> Water<span style={{marginLeft:"20px"}}>Rs. 40</span></p>
                    </li>
                    <li>
                      <p>Lassi<span style={{marginLeft:"20px"}}>Rs. 85</span></p>
                    </li>
                    <li>
                      <p>Skkky Special Lassi<span style={{marginLeft:"20px"}}>Rs. 110</span></p>
                    </li>
                    <li>
                      <p>Choice of Special Drinks(Soda,Sprite,<br/>Coke,Fanta,<br/>Thums-up)<span style={{marginLeft:"20px"}}>Rs. 60</span></p>
                    </li>
                    <li>
                      <p>Packaged Drinking water<span style={{marginLeft:"20px"}}>Rs. 28</span></p>
                    </li>
                    <li>
                      <p>Masala Tea<span style={{marginLeft:"20px"}}>Rs. 55</span></p>
                    </li>
                    <li>
                      <p>Milk/Black Tea<span style={{marginLeft:"20px"}}>Rs. 55</span></p>
                    </li>
                    <li>
                      <p>Milk/Black Tea<span style={{marginLeft:"20px"}}>Rs. 65</span></p>
                    </li>
                    <li>
                      <p>Hot Chocolate<span style={{marginLeft:"20px"}}>Rs. 110</span></p>
                    </li>
                </ul>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingeleven">
                <i className="fa fa-chevron-down" style={{fontSize: "20px",color: "#2545F8"}}  type="button" data-bs-toggle="collapse" data-bs-target="#collapseeleven" aria-expanded="false" aria-controls="collapseeleven">
                &nbsp;Veg-Main Course
                </i>
              </h2>
              <div id="collapseeleven" class="accordion-collapse collapse" aria-labelledby="headingeleven" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                <ul style={{listStyleType: "none"}}>
                    <li>
                      <p>Navratna <br/>Korma<span style={{marginLeft:"20px"}}>Rs. 190</span></p>
                    </li>
                    <li>
                      <p>Mushroom Butter Masala<span style={{marginLeft:"20px"}}>Rs. 190</span></p>
                    </li>
                    <li>
                      <p>Matar <br/>mushroom<span style={{marginLeft:"20px"}}>Rs. 190</span></p>
                    </li>
                    <li>
                      <p>Vegetable Jhalfarenzy<span style={{marginLeft:"20px"}}>Rs. 180</span></p>
                    </li>
                    <li>
                      <p>Skkky Special Paneer<span style={{marginLeft:"20px"}}>Rs. 240</span></p>
                    </li>
                    <li>
                      <p>Shahi Paneer<span style={{marginLeft:"20px"}}>Rs. 200</span></p>
                    </li>
                    <li>
                      <p>Paneer Tikka Masala<span style={{marginLeft:"20px"}}>Rs. 200</span></p>
                    </li>
                    <li>
                      <p>Corn Palak<span style={{marginLeft:"20px"}}>Rs. 180</span></p>
                    </li>
                    <li>
                      <p>Palak Paneer<span style={{marginLeft:"20px"}}>Rs. 190</span></p>
                    </li>
                    <li>
                      <p>Malai Kofta<span style={{marginLeft:"20px"}}>Rs. 190</span></p>
                    </li>
                    <li>
                      <p>Veg Jaipuri<span style={{marginLeft:"20px"}}>Rs. 180</span></p>
                    </li>
                    <li>
                      <p>Veg Kolapuri<span style={{marginLeft:"20px"}}>Rs. 160</span></p>
                    </li>
                    <li>
                      <p>Mix Veg<span style={{marginLeft:"20px"}}>Rs. 160</span></p>
                    </li>
                    <li>
                      <p>Gobi matar<span style={{marginLeft:"20px"}}>Rs. 150</span></p>
                    </li>
                    <li>
                      <p>Aloo Gobi<span style={{marginLeft:"20px"}}>Rs. 150</span></p>
                    </li>
                    <li>
                      <p>Aloo Jeera<span style={{marginLeft:"20px"}}>Rs. 105</span></p>
                    </li>
                    <li>
                      <p>Paneer <br/>Pasanda<span style={{marginLeft:"20px"}}>Rs. 200</span></p>
                    </li>
                    <li>
                      <p>Kadhai <br/>Paneer<span style={{marginLeft:"20px"}}>Rs. 200</span></p>
                    </li>
                    <li>
                      <p>Corn Capsicum Masala<span style={{marginLeft:"20px"}}>Rs. 190</span></p>
                    </li>
                    <li>
                      <p>Methi malai <br/>Matar<span style={{marginLeft:"20px"}}>Rs. 190</span></p>
                    </li>
                    <li>
                      <p>Veg Angoori<br/> Kofta<span style={{marginLeft:"20px"}}>Rs. 200</span></p>
                    </li>
                    <li>
                      <p>Skkky Special Kofta<span style={{marginLeft:"20px"}}>Rs. 200</span></p>
                    </li>
                    <li>
                      <p>Aloo Bhaja<span style={{marginLeft:"20px"}}>Rs. 105</span></p>
                    </li>
                    <li>
                      <p>Paneer Butter Masala<span style={{marginLeft:"20px"}}>Rs. 200</span></p>
                    </li>
                    <li>
                      <p>Paneer Do <br/>Pyaza<span style={{marginLeft:"20px"}}>Rs. 180</span></p>
                    </li>
                    <li>
                      <p>Matar Paneer<span style={{marginLeft:"20px"}}>Rs. 190</span></p>
                    </li>
                    <li>
                      <p>Green Peas Masala<span style={{marginLeft:"20px"}}>Rs. 190</span></p>
                    </li>
                    <li>
                      <p>Kashmiri Aloo Dum<span style={{marginLeft:"20px"}}>Rs. 160</span></p>
                    </li>
                    <li>
                      <p>Aloo Dum<span style={{marginLeft:"20px"}}>Rs. 105</span></p>
                    </li>
                </ul>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingtwelve">
                <i className="fa fa-chevron-down" style={{fontSize: "20px",color: "#2545F8"}}  type="button" data-bs-toggle="collapse" data-bs-target="#collapsetwelve" aria-expanded="false" aria-controls="collapsetwelve">
                &nbsp;Non-Veg Main Course
                </i>
              </h2>
              <div id="collapsetwelve" class="accordion-collapse collapse" aria-labelledby="headingtwelve" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                <ul style={{listStyleType: "none"}}>
                    <li>
                      <p>Chicken Curry<span style={{marginLeft:"20px"}}>Rs. 240</span></p>
                    </li>
                    <li>
                      <p>Chicken Kasa<span style={{marginLeft:"20px"}}>Rs. 250</span></p>
                    </li>
                    <li>
                      <p>Chicken Do <br/> pyaza<span style={{marginLeft:"20px"}}>Rs. 250</span></p>
                    </li>
                    <li>
                      <p>Chicken<br/> Moghlai<span style={{marginLeft:"20px"}}>Rs. 270</span></p>
                    </li>
                    <li>
                      <p>Chicken<br/> Bharta<span style={{marginLeft:"20px"}}>Rs. 300</span></p>
                    </li>
                    <li>
                      <p>Chicken Tikka Masala<span style={{marginLeft:"20px"}}>Rs. 350</span></p>
                    </li>
                    <li>
                      <p>Chicken Sahi Korma<span style={{marginLeft:"20px"}}>Rs. 350</span></p>
                    </li>
                    <li>
                      <p>Kadai Chicken<span style={{marginLeft:"20px"}}>Rs. 315</span></p>
                    </li>
                    <li>
                      <p>Chicken<br/> Masala<span style={{marginLeft:"20px"}}>Rs. 270</span></p>
                    </li>
                    <li>
                      <p>Butter Chicken (half/full)<span style={{marginLeft:"20px"}}>Rs. 630/370</span></p>
                    </li>
                    <li>
                      <p>Skkky Special Chicken (half/full)<span style={{marginLeft:"20px"}}>Rs. 740/425</span></p>
                    </li>
                    <li>
                      <p>Fish Curry<span style={{marginLeft:"20px"}}>Rs. 290</span></p>
                    </li>
                    <li>
                      <p>Fish Masala<span style={{marginLeft:"20px"}}>Rs. 300</span></p>
                    </li>
                    <li>
                      <p>Fish Tikka<br/> Masala<span style={{marginLeft:"20px"}}>Rs. 325</span></p>
                    </li>
                    <li>
                      <p>Prawn<br/> Masala<span style={{marginLeft:"20px"}}>Rs. 500</span></p>
                    </li>
                    <li>
                      <p>Prawn Malai<br/> Curry<span style={{marginLeft:"20px"}}>Rs. 500</span></p>
                    </li>
                    <li>
                      <p>Mutton Kasa<span style={{marginLeft:"20px"}}>Rs. 300</span></p>
                    </li>
                    <li>
                      <p>Mutton Korma<span style={{marginLeft:"20px"}}>Rs. 370</span></p>
                    </li>
                    <li>
                      <p>Mutton Keema Matar<span style={{marginLeft:"20px"}}>Rs. 390</span></p>
                    </li>
                    <li>
                      <p>Mutton <br/>Roganjosh<span style={{marginLeft:"20px"}}>Rs. 370</span></p>
                    </li>
                    <li>
                      <p>Mutton <br/>Mughlai<span style={{marginLeft:"20px"}}>Rs. 390</span></p>
                    </li>
                    <li>
                      <p>Skkky Mutton<span style={{marginLeft:"20px"}}>Rs. 410</span></p>
                    </li>
                    <li>
                      <p>Egg Masala<span style={{marginLeft:"20px"}}>Rs. 140</span></p>
                    </li>
                    <li>
                      <p>Egg Curry<span style={{marginLeft:"20px"}}>Rs. 135</span></p>
                    </li>
                </ul>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingthirteen">
                <i className="fa fa-chevron-down" style={{fontSize: "20px",color: "#2545F8"}}  type="button" data-bs-toggle="collapse" data-bs-target="#collapsethirteen" aria-expanded="false" aria-controls="collapsethirteen">
                &nbsp;Indian Breads
                </i>
              </h2>
              <div id="collapsethirteen" class="accordion-collapse collapse" aria-labelledby="headingthirteen" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                <ul style={{listStyleType: "none"}}>
                    <li>
                      <p>Tandoori Roti (Plain/Butter)<br/><span style={{marginLeft:"20px"}}>Rs. 40/50</span></p>
                    </li>
                    <li>
                      <p>Naan (Plain/Butter)<br/><span style={{marginLeft:"20px"}}>Rs. 65/75</span></p>
                    </li>
                    <li>
                      <p>Kulcha (Onion/Masala/Paneer)<br/><span style={{marginLeft:"20px"}}>Rs. 85</span></p>
                    </li>
                    <li>
                      <p>Cheese Naan<span style={{marginLeft:"20px"}}>Rs. 100</span></p>
                    </li>
                    <li>
                      <p>Missi Roti/Bajra Roti<span style={{marginLeft:"20px"}}>Rs. 65</span></p>
                    </li>
                    <li>
                      <p>Kashmiri Naan<span style={{marginLeft:"20px"}}>Rs. 120</span></p>
                    </li>
                    <li>
                      <p>Parantha (Lacha/Pudhina/Methi) <br/><span style={{marginLeft:"20px"}}>Rs. 85</span></p>
                    </li>
                    <li>
                      <p>Parantha (Aloo/Muli/Gobhi)<br/><span style={{marginLeft:"20px"}}>Rs. 95</span></p>
                    </li>
                    <li>
                      <p>Masala Garlic Naan<span style={{marginLeft:"20px"}}>Rs. 85</span></p>
                    </li>
                </ul>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingfourteen">
                <i className="fa fa-chevron-down" style={{fontSize: "20px",color: "#2545F8"}}  type="button" data-bs-toggle="collapse" data-bs-target="#collapsefourteen" aria-expanded="false" aria-controls="collapsefourteen">
                &nbsp;Dal
                </i>
              </h2>
              <div id="collapsefourteen" class="accordion-collapse collapse" aria-labelledby="headingfourteen" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                <ul style={{listStyleType: "none"}}>
                    <li>
                      <p>Dal Makhani<span style={{marginLeft:"20px"}}>Rs. 170</span></p>
                    </li>
                    <li>
                      <p>Dal Lasuni <br/>Tarka<span style={{marginLeft:"20px"}}>Rs. 160</span></p>
                    </li>
                    <li>
                      <p>Dal Mughlai<span style={{marginLeft:"20px"}}>Rs. 180</span></p>
                    </li>
                    <li>
                      <p>Dal Plain<span style={{marginLeft:"20px"}}>Rs. 105</span></p>
                    </li>
                    <li>
                      <p>Dal Fry Yellow<span style={{marginLeft:"20px"}}>Rs. 135</span></p>
                    </li>
                </ul>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingfifteen">
                <i className="fa fa-chevron-down" style={{fontSize: "20px",color: "#2545F8"}}  type="button" data-bs-toggle="collapse" data-bs-target="#collapsefifteen" aria-expanded="false" aria-controls="collapsefifteen">
                &nbsp;Pasta
                </i>
              </h2>
              <div id="collapsefifteen" class="accordion-collapse collapse" aria-labelledby="headingfifteen" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                <ul style={{listStyleType: "none"}}>
                    <li>
                      <p>Pasta in Arabiata Sauce (Veg/Non-veg)<span style={{marginLeft:"20px"}}>Rs. 260/305</span></p>
                    </li>
                    <li>
                      <p>Pasta in Cheese Sauce (Veg/Non-veg)<br/><span style={{marginLeft:"20px"}}>Rs. 275/315</span></p>
                    </li>
                    <li>
                      <p>Pasta in Mixed Sauce (Veg/Non-veg)<br/><span style={{marginLeft:"20px"}}>Rs. 295/345</span></p>
                    </li>
                    <li>
                      <p>Au gratin (Veg/Non-veg)<span style={{marginLeft:"20px"}}>Rs. 265/295</span></p>
                    </li>
                </ul>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingsixteen">
                <i className="fa fa-chevron-down" style={{fontSize: "20px",color: "#2545F8"}}  type="button" data-bs-toggle="collapse" data-bs-target="#collapsesixteen" aria-expanded="false" aria-controls="collapsesixteen">
                &nbsp;Noodles
                </i>
              </h2>
              <div id="collapsesixteen" class="accordion-collapse collapse" aria-labelledby="headingsixteen" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                <ul style={{listStyleType: "none"}}>
                    <li>
                      <p>Veg Noodles<span style={{marginLeft:"20px"}}>Rs. 150</span></p>
                    </li>
                    <li>
                      <p>Chilli Garlic Noodles<span style={{marginLeft:"20px"}}>Rs. 180</span></p>
                    </li>
                    <li>
                      <p>Hakka <br/>Noodles<span style={{marginLeft:"20px"}}>Rs. 210</span></p>
                    </li>
                    <li>
                      <p>Egg Hakka Noodles<span style={{marginLeft:"20px"}}>Rs. 250</span></p>
                    </li>
                    <li>
                      <p>Chicken Hakka Noodles<span style={{marginLeft:"20px"}}>Rs. 300</span></p>
                    </li>
                    <li>
                      <p>Mixed<br/> Noodles<span style={{marginLeft:"20px"}}>Rs. 350</span></p>
                    </li>
                </ul>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingseventeen">
                <i className="fa fa-chevron-down" style={{fontSize: "20px",color: "#2545F8"}}  type="button" data-bs-toggle="collapse" data-bs-target="#collapseseventeen" aria-expanded="false" aria-controls="collapseseventeen">
                &nbsp;Thali
                </i>
              </h2>
              <div id="collapseseventeen" class="accordion-collapse collapse" aria-labelledby="headingseventeen" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                <ul style={{listStyleType: "none"}}>
                    <li>
                      <p>Veg Thali<span style={{marginLeft:"20px"}}>Rs. 200</span></p>
                    </li>
                    <li>
                      <p>Fish Thali<span style={{marginLeft:"20px"}}>Rs. 260</span></p>
                    </li>
                </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col2 container">
          <form>
            <div className="lefta">
              <label className="mb-3">Accounting Date :</label>
              <input 
                className="ms-3 background-gray rounded-1" 
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
                className="ms-3 background-gray rounded-1" 
                type="text" 
                placeholder=""
                name="guestname"
                value={guestname}
                onChange={handleInputChange}
                required />
              <br />
              <label className="mb-3">Item Quantity :</label>
              <input 
                className="ms-3 background-gray rounded-1" 
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
                className="ms-3 background-gray rounded-1" 
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
                className="ms-3 background-gray rounded-1" 
                type="text"
                name="itemcode"
                value={itemcode}
                onChange={handleInputChange}
                placeholder="" 
                required />
              <br />
              <label className="mb-3">Item Name :</label>
              <input 
                className="ms-3 background-gray rounded-1" 
                type="text" 
                name="itemname"
                value={itemname}
                onChange={handleInputChange}
                placeholder="" 
                required />
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
                className="ms-3 background-gray rounded-1" 
                name="rate"
                value={rate}
                onChange={handleInputChange}
                type="text" />
              <br />
              <label className="mb-3">Room No :</label>
              <input 
                className="ms-3 background-gray rounded-1" 
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
                  <td style={{textAlign:"center", color:"#4763FD"}}>2</td>
                  <td style={{textAlign:"center", color:"#4763FD"}}>opt</td>
                  <td style={{textAlign:"center", color:"#4763FD"}}>Plain Dosa F1</td>
                  <td style={{textAlign:"center", color:"#4763FD"}}>120 Rs</td>
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
