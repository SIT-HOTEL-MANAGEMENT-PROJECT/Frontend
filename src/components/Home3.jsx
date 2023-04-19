/* eslint-disable eqeqeq */
import React from "react";
import homeimg from "../img/homeimg.png";
// import "../CustomCss/Reservation.css";
import "../CustomCss/home3css.css";
import { NavLink } from "react-router-dom";
import menu_icon from "../img/menu_icon.png";
import Cookies from "js-cookie";

const Home3 = ({ resetAppData }) => {

  // Check :  Logout from App
  // params : none
  // return :   1.  {success:true} + Remove Cookie('isLoggedIn','name','username','role')     IF LOGOUT ACTION DONE
  //            2.  {success:false, msg: 'Something Went Wrong!'}                             IF SERVER Error
  const LogoutAction = () => {
    try {
      if (Cookies.get("isLoggedIn")) {  Cookies.remove("isLoggedIn"); }
      if (Cookies.get("name")) {  Cookies.remove("name"); }
      if (Cookies.get("username")) {  Cookies.remove("username"); }
      if (Cookies.get("role")) {  Cookies.remove("role"); }
      return { success: true };
    } catch (e) {
      console.log("DashboardError (logoutAction) : ", e);
      return { success: false, msg: "Something Went Wrong" };
    }
  };




  const signuout = ()=>{
    let res = LogoutAction();
    if(res.success){
      window.location.href = "/Home";
    }else{
      alert(res?.msg);
    }
  }


  const clearApp = async()=>{
    let res = await resetAppData();
    if(res.success){
      window.location.reload();
    }else{
      alert(res?.msg);
    }
  }

  return (
    <div className="containerhome3" id="fixheight">
      <div className="left">
        <div>
          <button
            className="btn menu_btn"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasWithBothOptions"
            aria-controls="offcanvasWithBothOptions"
          >
            <img className="imgfix" src={menu_icon} />
          </button>

          <div
            className="offcanvas offcanvas-start"
            data-bs-scroll="true"
            tabIndex="-1"
            id="offcanvasWithBothOptions"
            aria-labelledby="offcanvasWithBothOptionsLabel"
          >
            <div className="offcanvas-header">
              <h5
                className="offcanvas-title"
                id="offcanvasWithBothOptionsLabel"
                style={{ color: "black" }}
              >
                <i
                  id="iconcolor"
                  className="fa fa-angle-double-right"
                  aria-hidden="true"
                  style={{ color: "#4763FD" }}
                ></i>{" "}&nbsp;
                Getting Started
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <NavLink to="/Dashboard" className="NavLinks">
                <i id="iconcolor" className="fa fa-bar-chart" aria-hidden="true"></i>
                &nbsp; Dashboard
              </NavLink>
              <br />
              <br />
              <NavLink to="/Home4" className="NavLinks">
                <i id="iconcolor" className="fa fa-home" aria-hidden="true"></i>
                &nbsp; Home
              </NavLink>
              <br />
              <br />
              <NavLink to="/Reservation" className="NavLinks">
                <i
                  id="iconcolor"
                  className="fa fa-id-card-o"
                  aria-hidden="true"
                ></i>
                &nbsp; Reservation
              </NavLink>
              <br />
              <br />
              <NavLink to="/AllReservations" className="NavLinks">
                <i
                  id="iconcolor"
                  className="fa fa-table"
                  aria-hidden="true"
                ></i>
                &nbsp; All Reservation
              </NavLink>
              <br />
              <br />
              <NavLink to="/CheckIn" className="NavLinks">
                <i id="iconcolor" className="fa fa-sign-in" aria-hidden="true"></i>
                &nbsp; Check In
              </NavLink>
              <br />
              <br />
              <NavLink to="/CheckOut" className="NavLinks">
                <i id="iconcolor" className="fa fa-sign-out" aria-hidden="true"></i>
                &nbsp; Check Out
              </NavLink>
              <br />
              <br />
              <NavLink to="/RoomAvailability" className="NavLinks">
                <i id="iconcolor" className="fa fa-bed" aria-hidden="true"></i>
                &nbsp; Room Availability
              </NavLink>
              <br />
              <br />
              <NavLink to="/Laundry" className="NavLinks">
                <i id="iconcolor" className="fa fa-user" aria-hidden="true"></i>
                &nbsp; House Keeping
              </NavLink>
              <br />
              <br />
              <NavLink to="/FandB" className="NavLinks">
                <i id="iconcolor" className="fa fa-cutlery" aria-hidden="true"></i>
                &nbsp; F & B Service
              </NavLink>
              <br /><br/>
              <NavLink to="/GuestHistory" className="NavLinks">
                <i id="iconcolor" className="fa fa-book" aria-hidden="true"></i>
                &nbsp; Guest History
              </NavLink>
              <br />
              <br />
              <NavLink to="/Reports" className="NavLinks">
                <i
                  id="iconcolor"
                  className="fa fa-file-text"
                  aria-hidden="true"
                ></i>
                &nbsp; Reports
              </NavLink>
              <br />
              <br />
              <NavLink to="/FandBAdmin" className="NavLinks">
                <i id="iconcolor" className="fa fa-cutlery" aria-hidden="true"></i>
                &nbsp; F & B Admin Panel
              </NavLink>
              <br /><br/>
              <NavLink to="/LaundryAdmin" className="NavLinks">
                <i id="iconcolor" className="fa fa-cutlery" aria-hidden="true"></i>
                &nbsp; Laundry Admin Panel
              </NavLink>
              <br /><br/>
              {/* <NavLink to="/Application" className="NavLinks">
                <i id="iconcolor" className="fa fa-pencil" aria-hidden="true"></i>
                &nbsp; Application
              </NavLink>
              <br />
              <br />
              <NavLink to="/Notice" className="NavLinks">
                <i
                  id="iconcolor"
                  className="fa fa-calendar-check-o"
                  aria-hidden="true"
                ></i>
                &nbsp; Notice
              </NavLink>
              <br />
              <br /> */}
              <NavLink to="/Profile" className="NavLinks">
                <i
                  id="iconcolor"
                  className="fa fa-user-circle"
                  aria-hidden="true"
                ></i>
                &nbsp; Profile
              </NavLink>
              <br />
              <br />
              <NavLink to="#" className="NavLinks" onClick={clearApp}>
                <i
                  id="iconcolor"
                  className="fa fa-window-close"
                  aria-hidden="true"
                ></i>
                &nbsp; Clear History
              </NavLink>
              <br />
              <br />
            </div>
          </div>
          <h1 className="px-4">
            Welcome to <br />
            Siliguri Hotel Management Association
          </h1>
          <h3 className="px-4">
            Let’s make ourself best <br />& make ordinary, extraordinary
          </h3>
        </div>
      </div>
      <div className="right flex-column align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <button className="btn btn-primary" style={{float:"right",marginRight:"10px",marginTop:"30px"}} onClick={signuout}>Sign Out</button>
        <img
          src={homeimg}
          alt="homeimg"
          style={{ minHeight: "80vh" }}
          className="imgfix"
        />
        <br/>
        <NavLink to="/Team" className="btn btn-primary "style={{float:"right",marginRight:"10px",background:"transparent",color:"orange"}}>
        <i className="fa fa-users" 
        aria-hidden="true"></i> &nbsp; <span style={{color:"#4763fd"}}>By</span> Team
        </NavLink>
      </div>
    </div>
  );
};

export default Home3;
