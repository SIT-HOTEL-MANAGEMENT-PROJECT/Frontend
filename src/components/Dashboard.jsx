import React from 'react';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "../CustomCss/Reservation.css";
import { useLocation } from 'react-router-dom';


const Dashboard = () => {
    const navigate = useNavigate();

    const [checkinFrom, setCheckinFrom] = useState("");
    const [checkinTo, setCheckinTo] = useState("");
    const [checkoutFrom, setCheckoutFrom] = useState("");
    const [checkoutTo, setCheckoutTo] = useState("");

    const handleInputChange = (e) => {
        if (e.target.name == "fromcheckindate") { setCheckinFrom(e.target.value); }
        else if (e.target.name == "tocheckindate") { setCheckinTo(e.target.value); }
        else if (e.target.name == "fromcheckoutdate") { setCheckoutFrom(e.target.value); }
        else if (e.target.name == "tocheckoutdate") { setCheckoutTo(e.target.value); }
    }

    const applyCheckinAction = (e)=>{
        e.preventDefault();
        alert(checkinFrom);
        alert(checkinTo);
    }

    const applyCheckoutAction = (e)=>{
        e.preventDefault();
        alert(checkoutFrom);
        alert(checkoutTo);
    }

    return (
        <div>
            <div className="bg-light min-height-vh">
                <nav className="navbar sticky-top navbar navbar-expand-lg bg-light">
                    <div className="container-fluid">
                        <div className="navbar-brand flex-column justify-content-center align-items-center make-cursor-pointer">
                            <div className="text-primary d-flex justify-content-center align-items-center border-none" onClick={()=>{navigate("/Home3")}}>
                                <i class="fa fa-angle-double-left font-size-40" aria-hidden="true"></i>
                            </div>
                            <h5 className="text-primary font-size-14">Back</h5>
                        </div>
                        <div className="navbar-brand flex-column justify-content-center align-items-center make-cursor-pointer">
                            <div className="text-primary d-flex justify-content-center align-items-center" onClick={()=>{navigate("/Reservation")}}>
                                <i id="iconcolor" className="fa fa-id-card-o font-size-40" aria-hidden="true"></i>
                            </div>
                            <h5 className="text-primary font-size-14">Reservation</h5>
                        </div>
                        <div className="navbar-brand flex-column justify-content-center align-items-center make-cursor-pointer">
                            <div className="text-primary d-flex justify-content-center align-items-center" onClick={()=>{navigate("/AllReservations")}}>
                                <i id="iconcolor" className="fa fa-id-card-o font-size-40" aria-hidden="true"></i>
                            </div>
                            <h5 className="text-primary font-size-14">All Reservation</h5>
                        </div>
                        <div className="navbar-brand flex-column justify-content-center align-items-center make-cursor-pointer">
                            <div className="text-primary d-flex justify-content-center align-items-center" onClick={()=>{navigate("/CheckIn")}}>
                                <i id="iconcolor" className="fa fa-sign-in font-size-40" aria-hidden="true"></i>
                            </div>
                            <h5 className="text-primary font-size-14">Check In</h5>
                        </div>
                        <div className="navbar-brand flex-column justify-content-center align-items-center make-cursor-pointer">
                            <div className="text-primary d-flex justify-content-center align-items-center" onClick={()=>{navigate("/CheckOut")}}>
                                <i id="iconcolor" className="fa fa-sign-out font-size-40" aria-hidden="true"></i>
                            </div>
                            <h5 className="text-primary font-size-14">Check Out</h5>
                        </div>
                        <div className="navbar-brand flex-column justify-content-center align-items-center make-cursor-pointer">
                            <div className="text-primary d-flex justify-content-center align-items-center" onClick={()=>{navigate("/RoomAvailability")}}>
                                <i id="iconcolor" className="fa fa-bed font-size-40" aria-hidden="true"></i>
                            </div>
                            <h5 className="text-primary font-size-14">Room Availability</h5>
                        </div>
                        <div className="navbar-brand flex-column justify-content-center align-items-center cur-pointer make-cursor-pointer">
                            <div className="text-primary d-flex justify-content-center align-items-center" onClick={()=>{navigate("/Laundry")}}>
                                <i id="iconcolor" className="fa fa-user font-size-40" aria-hidden="true"></i>
                            </div>
                            <h5 className="text-primary font-size-14">Housekeeping</h5>
                        </div>
                        <div className="navbar-brand flex-column justify-content-center align-items-center cur-pointer make-cursor-pointer">
                            <div className="text-primary d-flex justify-content-center align-items-center" onClick={()=>{navigate("/FandB")}}>
                                <i id="iconcolor" className="fa fa-cutlery font-size-40" aria-hidden="true"></i>
                            </div>
                            <h5 className="text-primary font-size-14">F & B Service</h5>
                        </div>
                        <div className="navbar-brand flex-column justify-content-center align-items-center cur-pointer make-cursor-pointer">
                            <div className="text-primary d-flex justify-content-center align-items-center" onClick={()=>{navigate("/GuestHistory")}}>
                                <i id="iconcolor" className="fa fa-book font-size-40" aria-hidden="true"></i>
                            </div>
                            <h5 className="text-primary font-size-14">Guest History</h5>
                        </div>
                        <div className="navbar-brand flex-column justify-content-center align-items-center cur-pointer make-cursor-pointer">
                            <div className="text-primary d-flex justify-content-center align-items-center" onClick={()=>{navigate("/Reports")}}>
                                <i id="iconcolor" className="fa fa-file-text font-size-40" aria-hidden="true"></i>
                            </div>
                            <h5 className="text-primary font-size-14">Reports</h5>
                        </div>
                        <div className="navbar-brand flex-column justify-content-center align-items-center cur-pointer make-cursor-pointer">
                            <div className="text-primary d-flex justify-content-center align-items-center" onClick={()=>{navigate("/Profile")}}>
                                <i id="iconcolor" className="fa fa-user-circle font-size-40" aria-hidden="true" ></i>
                            </div>
                            <h5 className="text-primary font-size-14">Profile</h5>
                        </div>
                    </div>
                </nav>
                <div className="container mt-3 mb-1">
                    <div className='d-flex medium-flex-column justify-content-between reserv-col-gap-10p'>
                        <div className='flex-column col-md-6 mt-2 mb-2'>
                            <div className='d-flex justify-content-center align-items-center reserv-col-gap-1'>
                                <h5>From</h5>
                                <input type='date' className="form-control height-30 width-150 font-size-14 background-gray" id="inputDate" name="fromcheckindate" onChange={handleInputChange}></input>
                                <h5>To</h5>
                                <input type='date' className="form-control height-30 width-150 font-size-14 background-gray" id="inputDate" name="tocheckindate" onChange={handleInputChange}></input>
                                <button type="button" className="d-flex align-items-center justify-content-center text-primary font-size-16 btn btn button-color-onHover button-padding-5 height-40 large-button-width-60 large-button-font-size-12" onClick={(e)=>{applyCheckinAction(e)}}>Apply</button>
                            </div>
                            <div className='flex-column height-450 overflow-y-axis-auto border-full-blue border-radius-10 p-2 mt-3'>
                                <h5 className='border-bottom-blue p-1'>Check In</h5>
                                <div className='d-flex align-items-center border-bottom-dashed-blue'>
                                    <div className='col-sm-8 flex-column align-items-center reserv-col-gap-1'>
                                        <h2 className='font-size-18 t-overflow-ellipsis white-sp-nowrap overflow-hidden'>Maya Sen</h2>
                                        <div className='d-flex align-items-center justify-content-between padding-right-10'>
                                            <h4 className='font-size-14 col-sm-6'>Phone : 7856945698</h4>
                                            <h4 className='font-size-14 col-sm-6'>Room No : 101</h4>
                                        </div>
                                    </div>
                                    <button type="button" className="d-flex align-items-center justify-content-center col-sm-4 text-primary font-size-16 btn btn button-color-onHover button-padding-5 height-40 large-button-width-60 large-button-font-size-12">Check In</button>
                                </div>
                                {/* <div className='d-flex align-items-center justify-content-center h-75'>
                                    <h5 className='font-size-18'>No Check In Data  found!</h5>
                                </div> */}
                            </div>
                        </div>
                        <div className='flex-column col-md-6 mt-2 mb-2'>
                            <div className='d-flex justify-content-center align-items-center reserv-col-gap-1'>
                                <h5>From</h5>
                                <input type='date' className="form-control height-30 width-150 font-size-14 background-gray" id="inputDate" name="fromcheckoutdate" onChange={handleInputChange}></input>
                                <h5>To</h5>
                                <input type='date' className="form-control height-30 width-150 font-size-14 background-gray" id="inputDate" name="tocheckoutdate" onChange={handleInputChange}></input>
                                <button type="button" className="d-flex align-items-center justify-content-center text-primary font-size-16 btn btn button-color-onHover button-padding-5 height-40 large-button-width-60 large-button-font-size-12" onClick={(e)=>{applyCheckoutAction(e)}}>Apply</button>
                            </div>
                            <div className='flex-column height-450 overflow-y-axis-auto border-full-blue border-radius-10 p-2 mt-3'>
                                <h5 className='border-bottom-blue p-1'>Check Out</h5>
                                <div className='d-flex align-items-center border-bottom-dashed-blue'>
                                    <div className='col-sm-8 small-width-70percent flex-column align-items-center reserv-col-gap-1'>
                                        <h2 className='font-size-18 t-overflow-ellipsis white-sp-nowrap overflow-hidden'>Maya Sen</h2>
                                        <div className='d-flex align-items-center justify-content-between padding-right-10'>
                                            <h4 className='font-size-14 col-sm-6'>Phone : 7856945698</h4>
                                            <h4 className='font-size-14 col-sm-6'>Room No : 101,102,104,105</h4>
                                        </div>
                                    </div>
                                    <button type="button" className="d-flex align-items-center justify-content-center col-sm-4 small-width-30percent text-primary font-size-16 btn btn button-color-onHover button-padding-5 height-40 large-button-width-60 large-button-font-size-12">Check Out</button>
                                </div>
                                {/* <div className='d-flex align-items-center justify-content-center h-75'>
                                    <h5 className='font-size-18'>No Check In Data  found!</h5>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard