// ==========================================     Archived File    ==========================================

import React from 'react';
import { NavLink } from 'react-router-dom';
import "../CustomCss/Reservation.css";

const Notice = () => {
    return (
        <div>
            <div className='bg-light vh-100'>
                <nav className="navbar sticky-top navbar navbar-expand-lg bg-light">
                    <div className="container-fluid">
                        <div className="navbar-brand d-flex align-items-center">
                            <NavLink className="text-primary" to="/Home4">
                                <i className="bx bx-chevrons-left font-size-25"></i>
                            </NavLink>
                            <h5 className="text-primary">Notice</h5>
                        </div>
                    </div>
                </nav>
                <div className="container bg-skyblue border-radius-10 height-550 p-2">
                    <div className="d-flex align-items-center justify-content-center">
                        <h3 className="text-primary align-text-center">Notices</h3>
                    </div>
                    <div className="flex-column px-5">
                        <div className="height-50 background-gray border-radius-10 mt-4"></div>
                        <div className="height-50 background-gray border-radius-10 mt-4"></div>
                        <div className="height-50 background-gray border-radius-10 mt-4"></div>
                        <div className="height-50 background-gray border-radius-10 mt-4"></div>
                        <div className="height-50 background-gray border-radius-10 mt-4"></div>
                        <div className="height-50 background-gray border-radius-10 mt-4"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Notice