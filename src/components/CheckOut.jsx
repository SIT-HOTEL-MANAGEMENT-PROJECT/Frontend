import React from "react";
import { NavLink } from "react-router-dom";
import "../CustomCss/out.css";
import Localbase from "localbase";
let db = new Localbase("hmctdb");
db.config.debug = false;

const CheckOut = () => {
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

  return (
    <div className="checkoutbody">
      <nav className="navbar sticky-top navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <div className="navbar-brand d-flex align-items-center">
            <NavLink className="text-primary" to="/Home3">
              <i className="bx bx-chevrons-left"></i>
            </NavLink>
            <h5 className="text-primary">Check-Out</h5>
          </div>
        </div>
      </nav>
      <div className="headingA">
        <center>
          <h4 className="copyof mb-3">Copy Of Invoice</h4>
        </center>
      </div>
      <div className="rowA mt-3">
        <form action="">
          <div className="columnA-a">
            <label for="guestname">Guest Name:</label>
            <select
              id="guestname"
              className="ms-3 border border-white"
              style={{
                width: "70px",
                borderRadius: "7px",
                backgroundColor: "#D9DFE1",
              }}
            >
              <option value="Ms" name="guestname">
                Ms.
              </option>
              <option value="Mrs" name="guestname">
                Mrs.
              </option>
              <option value="Miss" name="guestname">
                Miss
              </option>
              <option value="Mr" name="guestname">
                Mr.
              </option>
            </select>
            <input
              className="ms-2 border border-white"
              type="text"
              id="fullname"
              name="fullname"
              required
              style={{
                width: "400px",
                borderRadius: "7px",
                backgroundColor: "#D9DFE1",
              }}
            />
            <br />
            <br />

            <label for="agent">Travel Agent:</label>
            <input
              className="ms-2 border border-white"
              type="text"
              id="agent"
              name="agent"
              required
              style={{
                width: "160px",
                borderRadius: "7px",
                backgroundColor: "#D9DFE1",
              }}
            />

            <label className="ms-3" for="phn">
              Phone Number:
            </label>
            <input
              className="ms-2 border border-white"
              type="number"
              id="phn"
              name="phn"
              required
              style={{
                width: "170px",
                borderRadius: "7px",
                backgroundColor: "#D9DFE1",
              }}
            />
            <br />
            <br />

            <label for="company">Company:</label>
            <input
              className="ms-2 border border-white"
              type="text"
              id="company"
              name="company"
              required
              style={{
                width: "200px",
                borderRadius: "7px",
                backgroundColor: "#D9DFE1",
              }}
            />

            <label className="ms-3" for="gstid">
              GST ID:
            </label>
            <input
              className="ms-2 border border-white"
              type="number"
              id="gstid"
              name="gstid"
              required
              style={{
                width: "200px",
                borderRadius: "7px",
                backgroundColor: "#D9DFE1",
              }}
            />
            <br />
            <br />

            <label for="billing">Billing:</label>
            <input
              className="ms-3 border border-white"
              type="text"
              id="billing"
              name="billing"
              required
              style={{
                width: "400px",
                borderRadius: "7px",
                backgroundColor: "#D9DFE1",
              }}
            />
            <br />
            <br />

            <label for="bill">Bill No.:</label>
            <input
              className="ms-2 border border-white"
              type="text"
              id="bill"
              name="bill"
              required
              style={{
                width: "200px",
                borderRadius: "7px",
                backgroundColor: "#D9DFE1",
              }}
            />

            <label className="ms-3" for="page">
              Page:
            </label>
            <input
              className="ms-2 border border-white"
              type="text"
              id="page"
              name="page"
              value=""
              required
              style={{
                width: "200px",
                borderRadius: "7px",
                backgroundColor: "#D9DFE1",
              }}
            />
            <br />
            <br />

            <label for="confirmation">Confirmation No:</label>
            <input
              className="ms-2 border border-white"
              type="text"
              id="confirmation"
              name="confirmation"
              required
              style={{
                width: "400px",
                borderRadius: "7px",
                backgroundColor: "#D9DFE1",
              }}
            />
            <br />
            <br />

            <label for="billdate">Original Bill Date:</label>
            <input
              className="ms-2 border border-white"
              type="text"
              id="billdate"
              name="billdate"
              required
              style={{
                width: "400px",
                borderRadius: "7px",
                backgroundColor: "#D9DFE1",
              }}
            />
            <br />
            <br />
          </div>
          <div className="columnA-b">
            <label for="roomnumber">Room Number:</label>
            <input
              className="ms-2 border border-white"
              type="number"
              id="roomnumber"
              name="roomnumber"
              required
              style={{
                width: "400px",
                borderRadius: "7px",
                backgroundColor: "#D9DFE1",
              }}
            />
            <br />
            <br />

            <label for="roomcount">No. of Rooms:</label>
            <input
              className="ms-2 border border-white"
              type="number"
              id="roomcount"
              name="roomcount"
              required
              style={{
                width: "400px",
                borderRadius: "7px",
                backgroundColor: "#D9DFE1",
              }}
            />
            <br />
            <br />

            <label for="rate">Room Rate</label>
            <input
              className="ms-2 border border-white"
              type="number"
              id="rate"
              name="rate"
              required
              style={{
                width: "400px",
                borderRadius: "7px",
                backgroundColor: "#D9DFE1",
              }}
            />
            <br />
            <br />

            <label for="guestno">Guests No</label>
            <input
              className="ms-2 border border-white"
              type="number"
              id="guestno"
              name="guestno"
              required
              style={{
                width: "400px",
                borderRadius: "7px",
                backgroundColor: "#D9DFE1",
              }}
            />
            <br />
            <br />

            <label for="arrivaldate">Arrival Date:</label>
            <input
              className="ms-2 border border-white"
              type="date"
              id="arrivaldate"
              name="arrivaldate"
              required
              style={{
                width: "200px",
                borderRadius: "7px",
                backgroundColor: "#D9DFE1",
              }}
            />

            <label className="ms-3" for="arrivaltime">
              at
            </label>
            <input
              className="ms-2 border border-white"
              type="time"
              id="arrivaltime"
              name="arrivaltime"
              required
              style={{
                width: "200px",
                borderRadius: "7px",
                backgroundColor: "#D9DFE1",
              }}
            />
            <br />
            <br />

            <label for="departuredate">Departure Date:</label>
            <input
              type="date"
              id="departuredate"
              name="departuredate"
              required
              style={{
                width: "200px",
                borderRadius: "7px",
                backgroundColor: "#D9DFE1",
              }}
              className="ms-2 border border-white"
            />

            <label className="ms-3" for="departuretime">
              at
            </label>
            <input
              className="ms-2 border border-white"
              type="time"
              id="c"
              name="departuretime"
              required
              style={{
                width: "200px",
                borderRadius: "7px",
                backgroundColor: "#D9DFE1",
              }}
            />
            <br />
            <br />

            <label for="registration">Registration No.</label>
            <input
              type="number"
              id="registration"
              name="registration"
              required
              className="ms-2 border border-white"
              style={{
                width: "400px",
                borderRadius: "7px",
                backgroundColor: "#D9DFE1",
              }}
            />
          </div>
        </form>
      </div>
      <hr
        style={{
          border: " 1.20468px solid #4763FD",
          marginLeft: " 40px",
          marginRight: "40px",
        }}
      />
      <table className="descA">
        <div className="ms-5">
          <tr>
            <th>Date</th>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <th>Description</th>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <th>Reference</th>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <th>Debit</th>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <th>Credit</th>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </tr>
        </div>
      </table>
      <hr
        style={{
          border: "1.20468px solid #4763FD",
          marginLeft: "40px",
          marginRight: "40px",
        }}
      />

      <table className="dataA ms-5">
        <div>
          <tr>
            <td>Date</td>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <td>Accomodation++</td>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <td>Room</td>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <td>Amount</td>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <td></td>
          </tr>

          <tr>
            <td>Date</td>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <td>Accomodations SGST @9%</td>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <td></td>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <td>Amount</td>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <td></td>
          </tr>

          <tr>
            <td>Date</td>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <td>Accomodations CGST @9%</td>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <td></td>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <td>Amount</td>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <td></td>
          </tr>

          <tr>
            <td></td>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <td></td>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <td></td>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <td></td>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <td>Amount</td>
          </tr>
        </div>
      </table>
      <hr
        style={{
          width: "25%",
          textAlign: "right",
          // marginRight: "40px",
          border: "1.20468px solid #4763FD",
        }}
      />
      <div className="bg-columnA">
        <p style={{ float: "right", marginRight: "110px" }}>Amount</p>
        <p style={{ float: "right", marginRight: "215px" }}>Total</p>
      </div>

      <br />
      <br />
      <div>
        <div className="cash-signA d-flex">
          <div className="d-flex ">
            <p style={{ float: "left", width: "150px" }}>Cashier :</p>
            <input
              type="text"
              id="cash-sign"
              name="cash-sign"
              required
              className="ms-2 border-bottom border-primary"
              style={{ width: "400px", height: "40px" }}
            />
          </div>

          <div className="d-flex ms-3 ">
            <p style={{ float: "left", width: "300px" }}>Guest's Signature :</p>
            <input
              type="text"
              id="guest-sign"
              name="guest-sign"
              required
              className="border-bottom border-primary"
              style={{ width: "400px", height: "40px" }}
            />
          </div>
        </div>
      </div>
      <div className="agreeA">
        <input type="checkbox" name="checkbox" id="checkbox" required />
        <label className="ms-2" for="checkbox">
          I agree that I am liable for the following statement .
        </label>
      </div>
    </div>
  );
};

export default CheckOut;
