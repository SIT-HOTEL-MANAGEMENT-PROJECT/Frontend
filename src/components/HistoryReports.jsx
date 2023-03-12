import React from 'react';
import { NavLink } from 'react-router-dom';
import "../CustomCss/Reservation.css";

const HistoryReports = () => {
    return (
        <div>
            <div className='bg-light vh-100'>
                <nav className="navbar sticky-top navbar navbar-expand-lg bg-light">
                    <div className="container-fluid">
                        <div className="navbar-brand d-flex align-items-center">
                            <NavLink className="text-primary" to="/Home3">
                                <i className="bx bx-chevrons-left font-size-25"></i>
                            </NavLink>
                            <h5 className="text-primary">Hotel Reports</h5>
                        </div>
                    </div>
                </nav>
                <div className="d-flex medium-flex-column">
                    <div className="flex-column gap-2 width-200 medium-width-full p-1 h-100">
                        <div className="flex-column justify-content-center gap-2 height-45percent padding-left-right-20">
                            <h5 className="text-primary font-size-14">Filtered by check in dates</h5>
                            <div className="medium-flex-row">
                                <div className="d-flex align-items-center margin-col-gap">
                                    <input type="checkbox" />
                                    <span className="padding-left-16 text-primary font-size-14">Last 90 days</span>
                                </div>
                                <div className="flex align-items-center margin-col-gap">
                                    <input type="checkbox" />
                                    <span className="padding-left-16 text-primary font-size-14">Last 365 days</span>
                                </div>
                                <div className="flex align-items-center margin-col-gap">
                                    <input type="checkbox" />
                                    <span className="padding-left-16 text-primary font-size-14">Last 5 years</span>
                                </div>
                                <div className="flex align-items-center margin-col-gap">
                                    <input type="checkbox" />
                                    <span className="padding-left-16 text-primary font-size-14">All History</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex-column gap-2 height-45percent padding-left-right-20">
                            <h5 className="text-primary font-size-14">Filtered by check out dates</h5>
                            <div className="medium-flex-row">
                                <div className="d-flex align-items-center margin-col-gap">
                                    <input type="checkbox" />
                                    <span className="padding-left-16 text-primary font-size-14">Last 90 days</span>
                                </div>
                                <div className="flex align-items-center margin-col-gap">
                                    <input type="checkbox" />
                                    <span className="padding-left-16 text-primary font-size-14">Last 365 days</span>
                                </div>
                                <div className="flex align-items-center margin-col-gap">
                                    <input type="checkbox" />
                                    <span className="padding-left-16 text-primary font-size-14">Last 5 years</span>
                                </div>
                                <div className="flex align-items-center margin-col-gap">
                                    <input type="checkbox" />
                                    <span className="padding-left-16 text-primary font-size-14">All History</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container flex-column">
                        <div className="d-flex width-280 height-30 background-gray search-bar">
                            <input type="search" className="search-input width-280 padding-left-35" placeholder="Search" />
                            <button type="search" className="search-icon width-35 height-30 text-align-center d-flex align-items-center justify-content-center"><i className='bx bx-search-alt search-boxicon text-primary'></i></button>
                        </div>
                        <div className='container mt-5 height-450 overflow-y-axis-auto'>
                            <div className="container">
                                <h5 className="padding-left-90 font-size-14 text-primary margin-bottom-30">Date 24-02-2023</h5>
                                <div className="row padding-left-right-40 margin-bottom-30 grid-col-gap grid-row-gap align-items-center justify-content-center">
                                    <div className="width-150 height-150 bg-skyblue border-radius-10 text-primary flex-column align-items-center justify-content-center">
                                        <h3 className="d-flex align-items-center justify-content-center padding-top-bottom-50">75%</h3>
                                        <h5 className="font-size-11 d-flex align-items-center justify-content-center">Check In Total</h5>
                                    </div>
                                    <div className="width-150 height-150 bg-skyblue border-radius-10 text-primary flex-column align-items-center justify-content-center">
                                        <h3 className="d-flex align-items-center justify-content-center padding-top-bottom-50">15%</h3>
                                        <h5 className="font-size-11 d-flex align-items-center justify-content-center">Check In Remaining</h5>
                                    </div>
                                    <div className="width-150 height-150 bg-skyblue border-radius-10 text-primary flex-column align-items-center justify-content-center">
                                        <h3 className="d-flex align-items-center justify-content-center padding-top-bottom-50">65%</h3>
                                        <h5 className="font-size-11 d-flex align-items-center justify-content-center">Check Out Total</h5>
                                    </div>
                                    <div className="width-150 height-150 bg-skyblue border-radius-10 text-primary flex-column align-items-center justify-content-center">
                                        <h3 className="d-flex align-items-center justify-content-center padding-top-bottom-50">25%</h3>
                                        <h5 className="font-size-11 d-flex align-items-center justify-content-center">Check Out Remaining</h5>
                                    </div>
                                    <div className="width-150 height-150 bg-skyblue border-radius-10 text-primary flex-column align-items-center justify-content-center">
                                        <h3 className="d-flex align-items-center justify-content-center padding-top-bottom-50">86%</h3>
                                        <h5 className="font-size-11 d-flex align-items-center justify-content-center">% of Occupancy</h5>
                                    </div>
                                    <div className="width-150 height-150 bg-skyblue border-radius-10 text-primary flex-column align-items-center justify-content-center">
                                        <h3 className="d-flex align-items-center justify-content-center padding-top-bottom-50">750</h3>
                                        <h5 className="font-size-11 d-flex align-items-center justify-content-center">Rupees 100 ADR</h5>
                                    </div>
                                    <div className="width-150 height-150 bg-skyblue border-radius-10 text-primary flex-column align-items-center justify-content-center">
                                        <h3 className="d-flex align-items-center justify-content-center padding-top-bottom-50">75</h3>
                                        <h5 className="font-size-11 d-flex align-items-center justify-content-center">No of room available</h5>
                                    </div>
                                    <div className="width-150 height-150 bg-skyblue border-radius-10 text-primary flex-column align-items-center justify-content-center">
                                        <h3 className="d-flex align-items-center justify-content-center padding-top-bottom-50">250</h3>
                                        <h5 className="font-size-11 d-flex align-items-center justify-content-center">No of room booked</h5>
                                    </div>
                                    <div className="width-150 height-150 bg-skyblue border-radius-10 text-primary flex-column align-items-center justify-content-center">
                                        <h3 className="d-flex align-items-center justify-content-center padding-top-50-bottom-25">15</h3>
                                        <h5 className="font-size-11 d-flex align-items-center justify-content-center padding-left-30">No of room Maintenance</h5>
                                    </div>
                                    <div className="width-150 height-150 bg-skyblue border-radius-10 text-primary flex-column align-items-center justify-content-center">
                                        <h3 className="d-flex align-items-center justify-content-center padding-top-bottom-50">35</h3>
                                        <h5 className="font-size-11 d-flex align-items-center justify-content-center">No of rooms Dirty</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HistoryReports