import React from "react";
import { NavLink } from "react-router-dom";
import "../CustomCss/lon.css";

const Laundry = () => {
  return (
    <div className="formA">
      <nav className="navbar sticky-top navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <div className="navbar-brand d-flex align-items-center">
            <NavLink className="text-primary" to="/Home3">
              <i className="bx bx-chevrons-left"></i>
            </NavLink>
            <h5 className="text-primary">
              House Keeping
              <br />
              Laundry
            </h5>
          </div>
        </div>
      </nav>
      <div className="containerAS">
        <div className="col1" id="customgap">
          <p style={{ color: "#2545F8" }}>
            Items<span>&nbsp;&nbsp;&nbsp;&nbsp;Cost</span>
          </p>
          <div class="accordion" id="accordionExample">
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingOne">
                <i
                  className="fa fa-chevron-down"
                  style={{ fontSize: "21.78px", color: "#2545F8" }}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  &nbsp;Male
                </i>
              </h2>
              <div
                id="collapseOne"
                class="accordion-collapse collapse show"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body" id="ul-li">
                  <ul style={{ listStyleType: "none" }}>
                    <li>
                      <p>
                        Tie C1<span style={{ marginLeft: "20px" }}>Rs. 15</span>
                      </p>
                    </li>
                    <li>
                      <p>
                        Dhoti/Lungi C2
                        <span style={{ marginLeft: "20px" }}>Rs. 10</span>
                      </p>
                    </li>
                    <li>
                      <p>
                        Shorts C3
                        <span style={{ marginLeft: "20px" }}>Rs. 20</span>
                      </p>
                    </li>
                    <li>
                      <p>
                        Muffler C4
                        <span style={{ marginLeft: "20px" }}>Rs. 50</span>
                      </p>
                    </li>
                    <li>
                      <p>
                        Vest C5
                        <span style={{ marginLeft: "20px" }}>Rs. 10</span>
                      </p>
                    </li>
                    <li>
                      <p>
                        Under Garments C6
                        <span style={{ marginLeft: "20px" }}>Rs. 50</span>
                      </p>
                    </li>
                    <li>
                      <p>
                        Handkerchif C7
                        <span style={{ marginLeft: "20px" }}>Rs. 20</span>
                      </p>
                    </li>
                    <li>
                      <p>
                        Shirt C8
                        <span style={{ marginLeft: "20px" }}>Rs. 10</span>
                      </p>
                    </li>
                    <li>
                      <p>
                        Trousers C9
                        <span style={{ marginLeft: "20px" }}>Rs. 15</span>
                      </p>
                    </li>
                    <li>
                      <p>
                        T-Shirt C10
                        <span style={{ marginLeft: "20px" }}>Rs. 15</span>
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingTwo">
                <i
                  className="fa fa-chevron-down"
                  style={{ fontSize: "20px", color: "#2545F8" }}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  &nbsp;Female
                </i>
              </h2>
              <div
                id="collapseTwo"
                class="accordion-collapse collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body" id="ul-li">
                  <ul style={{ listStyleType: "none" }}>
                    <li>
                      <p>
                          Saree C11
                          <span style={{ marginLeft: "20px" }}>Rs. 30</span>
                      </p>
                    </li>
                    <li>
                      <p>
                        Blouse C12
                        <span style={{ marginLeft: "20px" }}>Rs. 20</span>
                      </p>
                    </li>
                    <li>
                      <p>
                        Salwar C13
                        <span style={{ marginLeft: "20px" }}>Rs. 50</span>
                      </p>
                    </li>
                    <li>
                      <p>
                        Skirt C14
                        <span style={{ marginLeft: "20px" }}>Rs. 30</span>
                      </p>
                    </li>
                    <li>
                      <p>
                        Towel C15
                        <span style={{ marginLeft: "20px" }}>Rs. 40</span>
                      </p>
                    </li>
                    <li>
                      <p>
                        Appron C16
                        <span style={{ marginLeft: "20px" }}>Rs. 50</span>
                      </p>
                    </li>
                    <li>
                      <p>
                        Trousers/Plazo C17
                        <span style={{ marginLeft: "20px" }}>Rs. 20</span>
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col2">
          <form>
            <div className="lefta">
              <label>Item Code :</label>
              <input type="text" placeholder="" required />
              <br />
              <br />
              <label>Item Name :</label>
              <input type="text" placeholder="" required />
              <br />
              <br />
              <label>Cost :</label>
              <input type="Number" placeholder="" required />
              <br />
              <br />
              <label>Discount :</label>
              <input type="Number" placeholder="" required />
              <br />
              <br />
              <label>Service Type :</label>
              <select className="form" aria-label="Default select example">
                <option selected></option>
                <option value="1">Pressing</option>
                <option value="2">Wash</option>
                <option value="3">Dry Wash</option>
              </select>
              <br />
              <br />
              <label>Date :</label>
              <input type="date" />
              <br />
              <br />
              <label>Special Request :</label>
              <input type="text" placeholder="" required />
            </div>
            <div className="righta">
              <label>Guest Name :</label>
              <input type="text" placeholder=" Guest Name" required />
              <br />
              <br />
              <label>Room No :</label>
              <input type="Number" placeholder="" required />
              <br />
              <br />
              <label>Arrival Date :</label>
              <input type="date" />
              <br />
              <br />
              <label>Depart Date :</label>
              <input type="date" />
              <br />
              <br />
              <label>Total Item :</label>
              <input type="Number" placeholder="" required />
              <br />
              <br />
              <label>Total Amount :</label>
              <input type="Number" placeholder="" required />
              <br />
              <br />
              <label>Payment : </label>
              <select className="form" aria-label="Default select example">
                <option selected></option>
                <option value="1">Card</option>
                <option value="2">UPI</option>
                <option value="3">Cash</option>
                <option value="3">Pay Later</option>
              </select>
            </div>
            <div className="submita">
              <button type="button" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Laundry;
