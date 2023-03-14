import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import "../CustomCss/lon.css";

const FandB = () => {
  return (
    <div className="formA">
      <nav className="navbar sticky-top navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <div className="navbar-brand d-flex align-items-center">
            <NavLink className="text-primary" to="/Home3">
              <i className="bx bx-chevrons-left"></i>
            </NavLink>
            <h5 className="text-primary">
              Food and
              <br />
              Beverages
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
                      <p>Russian Salad(Veg/Non-veg)<span style={{marginLeft:"20px"}}>$ 150/170</span></p>
                    </li>
                    <li>
                      <p>Fresh Garden <br/> Salad<span style={{marginLeft:"20px"}}>$ 105</span></p>
                    </li>
                    <li>
                      <p>Mix raita/Kheer Raita <br/>/Boondi Raita<span style={{marginLeft:"20px"}}>$ 135</span></p>
                    </li>
                    <li>
                      <p>Pineapple<br/>Raita<span style={{marginLeft:"20px"}}>$ 170</span></p>
                    </li>
                    <li>
                      <p>Plain dahi<span style={{marginLeft:"20px"}}>$ 105</span></p>
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
                      <p>Vegetable <br/> Pakora<span style={{marginLeft:"20px"}}>$ 150</span></p>
                    </li>
                    <li>
                      <p>Onion Pakora<span style={{marginLeft:"20px"}}>$ 150</span></p>
                    </li>
                    <li>
                      <p>French Fries<span style={{marginLeft:"20px"}}>$ 200</span></p>
                    </li>
                    <li>
                      <p>Cheese balls(6 pcs)<span style={{marginLeft:"20px"}}>$ 200</span></p>
                    </li>
                    <li>
                      <p>Peanut Masala<span style={{marginLeft:"20px"}}>$ 200</span></p>
                    </li>
                    <li>
                      <p>Paneer Tikka<span style={{marginLeft:"20px"}}>$ 200</span></p>
                    </li>
                    <li>
                      <p>Veg Sheek <br/> Kabab<span style={{marginLeft:"20px"}}>$ 200</span></p>
                    </li>
                    <li>
                      <p>Paneer Malai <br/> Tikka<span style={{marginLeft:"20px"}}>$ 200</span></p>
                    </li>
                    <li>
                      <p>Harabhara <br/> Kabab<span style={{marginLeft:"20px"}}>$ 200</span></p>
                    </li>
                    <li>
                      <p>Skkky Kabab <br/> Platter<span style={{marginLeft:"20px"}}>$ 200</span></p>
                    </li>
                    <li>
                      <p>Paneer Aachari Tikka<span style={{marginLeft:"20px"}}>$ 200</span></p>
                    </li>
                    <li>
                      <p>Tandoori Mushroom<span style={{marginLeft:"20px"}}>$ 200</span></p>
                    </li>
                    <li>
                      <p>Tandoori Aloo<span style={{marginLeft:"20px"}}>$ 200</span></p>
                    </li>
                    <li>
                      <p>Tandoori Gobhi<span style={{marginLeft:"20px"}}>$ 200</span></p>
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
                      <p>Chicken <br/> Pakora<span style={{marginLeft:"20px"}}>$ 150</span></p>
                    </li>
                    <li>
                      <p>Murg Lasuni <br/> Tikka<span style={{marginLeft:"20px"}}>$ 150</span></p>
                    </li>
                    <li>
                      <p>Murg Tikka<span style={{marginLeft:"20px"}}>$ 150</span></p>
                    </li>
                    <li>
                      <p>Murg Reshmi Kabab<span style={{marginLeft:"20px"}}>$ 150</span></p>
                    </li>
                    <li>
                      <p>Murg Pahari <br/> Kabab<span style={{marginLeft:"20px"}}>$ 150</span></p>
                    </li>
                    <li>
                      <p>Chicken Sheek kabab<span style={{marginLeft:"20px"}}>$ 150</span></p>
                    </li>
                    <li>
                      <p>Murg Afghani kabab<span style={{marginLeft:"20px"}}>$ 150</span></p>
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
                      <p>Navratna Korma<span style={{marginLeft:"20px"}}>Rs. 150</span></p>
                    </li>
                    <li>
                      <p>Mushroom Butter Masala<span style={{marginLeft:"20px"}}>Rs. 150</span></p>
                    </li>
                    <li>
                      <p>Matar mushroom<span style={{marginLeft:"20px"}}>Rs. 150</span></p>
                    </li>
                    <li>
                      <p>Vegetable Jhalfarenzy<span style={{marginLeft:"20px"}}>Rs. 150</span></p>
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
                 
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col2 container">
          <form>
            <div className="lefta">
              <label className="mb-3">Accounting Date :</label>
              <input className="ms-3" type="date" placeholder="" required />
              <br />
              <label className="mb-3">Session :</label>
              <button type="button" class="btn btn-primary ms-3">Morning</button>
              <button type="button" class="btn btn-primary ms-3">Night</button>
              <br />
              <label className="mb-3">Guest Name:</label>
              <input className="ms-3" type="text" placeholder="" required />
              <br />
              <label className="mb-3">Item Quantity :</label>
              <input className="ms-3" type="Number" min="0" placeholder="" required />
              <br />
              <label className="mb-3">Table No :</label>
              <input className="ms-3" type="text" placeholder="" required />
              <br />
            </div>
            <div className="righta">
              <label className="mb-3">Item Code :</label>
              <input className="ms-3" type="text" placeholder=" Guest Name" required />
              <br />
              <label className="mb-3">Item Name :</label>
              <input className="ms-3" type="text" placeholder="" required />
              <br />
              <label className="mb-3">Plan :</label>
              <button type="button" class="btn btn-primary ms-3">Breakfast</button>
              <button type="button" class="btn btn-primary ms-3">Lunch</button>
              <button type="button" class="btn btn-primary ms-3">Dinner</button>
              <br />
              <label className="mb-3">Rate :</label>
              <input className="ms-3" type="text" />
              <br />
              <label className="mb-3">Room No :</label>
              <input className="ms-3" type="text" placeholder="" required />
              <br />
            </div>
            <div>
            <label className="mb-3">Payment :</label>
              <button type="button" class="btn btn-primary ms-3">Cash</button>
              <button type="button" class="btn btn-primary ms-3">UPI</button>
              <button type="button" class="btn btn-primary ms-3">Card</button>
              <button type="button" class="btn btn-primary ms-3">Post with Room</button>
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
