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
<div>
    <nav className="navbar sticky-top navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
            <div className="navbar-brand d-flex align-items-center">
                <NavLink className="text-primary" to="/Home3">
                    <i className="bx bx-chevrons-left"></i>
                </NavLink>
                <div className="nav">
                    <h2 className="checkA">Check Out</h2>
                    <br />
                    <br />
                    <div className="headingA">
                        <h4>Copy Of Invoice</h4>
                    </div>
                </div>
            </div>
        </div>
    </nav>
    <div className="rowA">
        <form action="">
            <div className="columnA-a">
                <label for="guestname">Guest Name:</label>
                <select id="guestname">
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
                <input type="text" id="fullname" name="fullname" required />
                <br />
                <br />

                <label for="agent">Travel Agent</label>
                <input type="text" id="agent" name="agent" required />

                <label for="phn">Phone Number</label>
                <input type="number" id="phn" name="phn" required />
                <br />
                <br />

                <label for="company">Company</label>
                <input type="text" id="company" name="company" required />

                <label for="gstid">GST ID</label>
                <input type="number" id="gstid" name="gstid" required />
                <br />
                <br />

                <label for="billing">Billing</label>
                <input type="text" id="billing" name="billing" required />
                <br />
                <br />

                <label for="bill">Bill No.</label>
                <input type="text" id="bill" name="bill" required />

                <label for="page">Page</label>
                <input type="text" id="page" name="page" value="1 Of 1" required />
                <br />
                <br />

                <label for="confirmation">Confirmation No</label>
                <input type="text" id="confirmation" name="confirmation" required />
                <br />
                <br />

                <label for="billdate">Original Bill Date</label>
                <input type="text" id="billdate" name="billdate" required />
                <br />
                <br />
            </div>
            <div className="columnA-b">
                <label for="roomnumber">Room Number:</label>
                <input type="number" id="roomnumber" name="roomnumber" required />
                <br />
                <br />

                <label for="roomcount">No. of Rooms:</label>
                <input type="number" id="roomcount" name="roomcount" required />
                <br />
                <br />

                <label for="rate">Room Rate</label>
                <input type="number" id="rate" name="rate" required />
                <br />
                <br />

                <label for="guestno">Guests No</label>
                <input type="number" id="guestno" name="guestno" required />
                <br />
                <br />

                <label for="arrivaldate">Arrival Date:</label>
                <input type="date" id="arrivaldate" name="arrivaldate" required />
                <label for="arrivaltime">at</label>
                <input type="time" id="arrivaltime" name="arrivaltime" required />
                <br />
                <br />

                <label for="departuredate">Departure Date:</label>
                <input type="date" id="departuredate" name="departuredate" required />
                <label for="departuretime">at</label>
                <input type="time" id="c" name="departuretime" required />
                <br />
                <br />

                <label for="registration">Registration No.</label>
                <input type="number" id="registration" name="registration" required />
            </div>
        </form>
    </div>

    <table className="descA">
        <div>
            <tr>
                <hr style={{ Border: "1.20468px solid #4763FD" , marginLeft: "40px" , marginRight: "40px" , }} />
                <th>Date</th>
                <th>Description</th>
                <th>Reference</th>
                <th>Debit</th>
                <th>Credit</th>
            </tr>
        </div>
    </table>
    <hr style={{ Border: "1.20468px solid #4763FD" , marginLeft: "40px" , marginRight: "40px" , }} />

    <table className="dataA">
        <div>
            <tr>
                <td>Date</td>
                <td>Accomodation++</td>
                <td>Room</td>
                <td>Amount</td>
                <td></td>
            </tr>

            <tr>
                <td>Date</td>
                <td>Accomodations SGST @9%</td>
                <td></td>
                <td>Amount</td>
                <td></td>
            </tr>

            <tr>
                <td>Date</td>
                <td>Accomodations CGST @9%</td>
                <td></td>
                <td>Amount</td>
                <td></td>
            </tr>

            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>Amount</td>
            </tr>
        </div>
    </table>
    <hr style={{ Width: "25%" , textAlign: "right" , Border: "1.20468px solid #4763FD" , marginLeft: "40px" ,
        marginRight: "40px" , }} />
    <div className="bg-columnA">
        <p style={{ float: "right" , marginRight: "110px;" }}>Amount</p>
        <p style={{ float: "right" , marginRight: "215px;" }}>Total</p>
    </div>
    <div>
        <div className="cash-signA">
            <p style={{ float: "left" }}>Cashier :</p>
            <p style={{ float: "right" , marginRight: "350px" }}>
                Guest's Signature :
            </p>
        </div>
    </div>
    <div className="agreeA">
        <input type="checkbox" name="checkbox" id="checkbox" required />
        <label for="checkbox">
            I agree that I am liable for the following statement .
        </label>
    </div>
</div>
);
};

export default CheckOut;
