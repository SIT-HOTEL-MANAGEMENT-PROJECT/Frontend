import React from "react";
import "../CustomCss/lon.css";

const Laundry = () => {
  return (
    <div className="formA">
      <h2 className="launh2">
        House Keeping <br />
        Laundry
      </h2>
      <div class="containerAS">
        <div class="col1"></div>
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
              <select class="form" aria-label="Default select example">
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
              <select class="form" aria-label="Default select example">
                <option selected></option>
                <option value="1">Card</option>
                <option value="2">UPI</option>
                <option value="3">Cash</option>
                <option value="3">Pay Later</option>
              </select>
            </div>
            <div class="submita">
              <button type="button" class="btn btn-primary">
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
