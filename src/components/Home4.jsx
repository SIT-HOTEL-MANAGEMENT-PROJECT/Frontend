import React from "react";
import SIT from "../img/SIT.jpeg";
import "../CustomCss/Reservation.css";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import menu_icon from "../img/menu_icon.png";
import Cookies from "js-cookie";

const Home4 = ({resetAppData}) => {

    const navigate = useNavigate();


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
        <div>
            <div className="bg-skyblue min-height-vh">
                <div className="d-flex mx-5">
                    <div className="d-flex flex-column justify-content-center reserv-row-gap-point5 p-3 vh-100 col-md-6">
                        <div>
                            <button className="btn menu_btn mx-4" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions" ><img className="imgfix" src={menu_icon} /></button>
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
                                    <NavLink to="/Home3" className="NavLinks">
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
                                    <br /><br />
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
                        </div>
                        <h3 className="text-primary px-5">Welcome to</h3>
                        <h3 className="text-primary px-5">Siliguri Institute Of Technology</h3>
                        <h4 className="text-primary px-5">College Of Hotel Management & Catering Technology</h4>
                        <h5 className="text-primary px-5">Let&apos;s make ourself best <br />& make ordinary, extraordinary</h5>
                    </div>
                    <div className="d-flex flex-column align-items-end justify-content-between p-4 col-md-6 vh-100">
                        <div className="d-flex w-100 justify-content-end reserv-col-gap-1 margin-top-20p">
                            <button type="button" className="d-flex align-items-center justify-content-center reserv-col-gap-1 col-sm-3 text-primary font-size-16 btn btn button-color-onHover button-padding-5 height-40 large-button-width-60 large-button-font-size-12" onClick={()=>{navigate("/Team")}}><i className="fa fa-users" aria-hidden="true"></i>By Team</button>
                            <button type="button" className="d-flex align-items-center justify-content-center col-sm-3 text-primary font-size-16 btn btn button-color-onHover button-padding-5 height-40 large-button-width-60 large-button-font-size-12" onClick={()=>{signuout()}}>Sign Out</button>
                        </div>
                        <img src={SIT} alt="SIT" className="width-85perent height-450 margin-bottom-50 border-radius-10" />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Home4