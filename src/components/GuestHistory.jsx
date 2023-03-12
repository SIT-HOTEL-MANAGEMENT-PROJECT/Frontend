import React from 'react';
import { NavLink } from 'react-router-dom';
import "../CustomCss/Reservation.css";

const GuestHistory = () => {
    return (
        <div>
            <div className='bg-light vh-100'>
                <nav className="navbar sticky-top navbar navbar-expand-lg bg-light">
                    <div className="container-fluid">
                        <div className="navbar-brand d-flex align-items-center">
                            <NavLink className="text-primary" to="/Home3">
                                <i className="bx bx-chevrons-left font-size-25"></i>
                            </NavLink>
                            <h5 className="text-primary">Guest History</h5>
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
                            <input type="search" className="search-input width-280 padding-left-35 background-gray" placeholder="Search" />
                            <button type="search" className="search-icon width-35 height-30 text-align-center d-flex align-items-center justify-content-center"><i className='bx bx-search-alt search-boxicon text-primary'></i></button>
                        </div>
                        <div className="table-responsive height-450 bg-skyblue mt-5">
                            <table className="table table-borderless table-border-collapse text-primary">
                                <thead className="table-head">
                                    <tr>
                                        <th scope="col">Sl</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Phone No</th>
                                        <th scope="col">Check In</th>
                                        <th scope="col">Check Out</th>
                                        <th scope="col">Aadhar No</th>
                                        <th scope="col">Reservation History</th>
                                    </tr>
                                </thead>
                                <tbody className="table-group-divider">
                                    <tr>
                                        <th scope="row">1</th>
                                        <td className="table-tdata">Mark</td>
                                        <td className="table-tdata">Otto</td>
                                        <td className="table-tdata">@mdo</td>
                                        <td className="table-tdata">@mdo</td>
                                        <td className="table-tdata">@mdo</td>
                                        <td className="table-tdata"><button className="font-size-14 btn btn-primary">Check History</button></td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td className="table-tdata">Jacob</td>
                                        <td className="table-tdata">Thornton</td>
                                        <td className="table-tdata">@fat</td>
                                        <td className="table-tdata">@mdo</td>
                                        <td className="table-tdata">@mdo</td>
                                        <td className="table-tdata"><button className="font-size-14 btn btn-primary">Check History</button></td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td className="table-tdata">Larry the Bird</td>
                                        <td className="table-tdata">fat</td>
                                        <td className="table-tdata">@twitter</td>
                                        <td className="table-tdata">@mdo</td>
                                        <td className="table-tdata">@mdo</td>
                                        <td className="table-tdata"><button className="font-size-14 btn btn-primary">Check History</button></td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td className="table-tdata">Larry the Bird</td>
                                        <td className="table-tdata">fat</td>
                                        <td className="table-tdata">@twitter</td>
                                        <td className="table-tdata">@mdo</td>
                                        <td className="table-tdata">@mdo</td>
                                        <td className="table-tdata"><button className="font-size-14 btn btn-primary">Check History</button></td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td className="table-tdata">Larry the Bird</td>
                                        <td className="table-tdata">fat</td>
                                        <td className="table-tdata">@twitter</td>
                                        <td className="table-tdata">@mdo</td>
                                        <td className="table-tdata">@mdo</td>
                                        <td className="table-tdata"><button className="font-size-14 btn btn-primary">Check History</button></td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td className="table-tdata">Larry the Bird</td>
                                        <td className="table-tdata">fat</td>
                                        <td className="table-tdata">@twitter</td>
                                        <td className="table-tdata">@mdo</td>
                                        <td className="table-tdata">@mdo</td>
                                        <td className="table-tdata"><button className="font-size-14 btn btn-primary">Check History</button></td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td className="table-tdata">Larry the Bird</td>
                                        <td className="table-tdata">fat</td>
                                        <td className="table-tdata">@twitter</td>
                                        <td className="table-tdata">@mdo</td>
                                        <td className="table-tdata">@mdo</td>
                                        <td className="table-tdata"><button className="font-size-14 btn btn-primary">Check History</button></td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td className="table-tdata">Larry the Bird</td>
                                        <td className="table-tdata">fat</td>
                                        <td className="table-tdata">@twitter</td>
                                        <td className="table-tdata">@mdo</td>
                                        <td className="table-tdata">@mdo</td>
                                        <td className="table-tdata"><button className="font-size-14 btn btn-primary">Check History</button></td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td className="table-tdata">Larry the Bird</td>
                                        <td className="table-tdata">fat</td>
                                        <td className="table-tdata">@twitter</td>
                                        <td className="table-tdata">@mdo</td>
                                        <td className="table-tdata">@mdo</td>
                                        <td className="table-tdata"><button className="font-size-14 btn btn-primary">Check History</button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GuestHistory