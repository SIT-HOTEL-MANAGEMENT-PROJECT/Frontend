/* eslint-disable eqeqeq */
import React from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import "../CustomCss/Reservation.css";
import Localbase from "localbase";
import { useEffect } from 'react';
let db = new Localbase("hmctdb");
db.config.debug = false;


const GuestHistory = () => {
    const [selectedCheckbox, setSelectedCheckbox] = useState("");
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
      initialFetch();
    }, [])
    
    
    // Get :  Get Guest Reports based on filters
    // params:  checkinfltr, checkoutfltr ('all'/'90days'/'365days'/'5years') (string any one value from this list)
    // return:  1. {success:true, data: [<Array of all reservation data>{},{}]              IF ALL OK
    //          2. {success:false, msg: "Something Went Wrong"}                             IF SERVER ERROR
    //          3. {success:false, msg: "Invalid Input"}                                    IF INVALID INPUT                                                     
    const getGuestHistory = async(checkinfltr, checkoutfltr)=>{
        try{
            if(!checkinfltr || !checkoutfltr) return {success:false, msg: "Invalid Input"};

            let reservationData = await db.collection('reservation').get();

            let resdata = reservationData.sort((a, b) => new Date(b.arrivaldate) - new Date(a.arrivaldate));

            if(checkinfltr==="90days"){
                const today = new Date();
                const daysAgo = new Date(today);
                daysAgo.setDate(today.getDate() - 90);

                resdata = resdata.filter((item) => {
                    const arrivaldate = new Date(item.arrivaldate);
                    return arrivaldate >= daysAgo && arrivaldate <= today;
                })
                .sort((a, b) => new Date(b.arrivaldate) - new Date(a.arrivaldate));
            }
            else if(checkinfltr==="365days"){
                const today = new Date();
                const daysAgo = new Date(today);
                daysAgo.setDate(today.getDate() - 365);

                resdata = resdata.filter((item) => {
                    const arrivaldate = new Date(item.arrivaldate);
                    return arrivaldate >= daysAgo && arrivaldate <= today;
                })
                .sort((a, b) => new Date(b.arrivaldate) - new Date(a.arrivaldate));
            }
            else if(checkinfltr==="5years"){
                const today = new Date();
                const daysAgo = new Date(today);
                daysAgo.setDate(today.getDate() - 365*5);

                resdata = resdata.filter((item) => {
                    const arrivaldate = new Date(item.arrivaldate);
                    return arrivaldate >= daysAgo && arrivaldate <= today;
                })
                .sort((a, b) => new Date(b.arrivaldate) - new Date(a.arrivaldate));
            }


            if(checkoutfltr==="90days"){
                const today = new Date();
                const daysAgo = new Date(today);
                daysAgo.setDate(today.getDate() - 90);

                resdata = resdata.filter((item) => {
                    const departuredate = new Date(item.departuredate);
                    return departuredate >= daysAgo && departuredate <= today;
                })
                .sort((a, b) => new Date(b.arrivaldate) - new Date(a.arrivaldate));
            }
            else if(checkoutfltr==="365days"){
                const today = new Date();
                const daysAgo = new Date(today);
                daysAgo.setDate(today.getDate() - 365);

                resdata = resdata.filter((item) => {
                    const departuredate = new Date(item.departuredate);
                    return departuredate >= daysAgo && departuredate <= today;
                })
                .sort((a, b) => new Date(b.arrivaldate) - new Date(a.arrivaldate));
            }
            else if(checkoutfltr==="5years"){
                const today = new Date();
                const daysAgo = new Date(today);
                daysAgo.setDate(today.getDate() - 365*5);

                resdata = resdata.filter((item) => {
                    const departuredate = new Date(item.departuredate);
                    return departuredate >= daysAgo && departuredate <= today;
                })
                .sort((a, b) => new Date(b.arrivaldate) - new Date(a.arrivaldate));
            }

            return {success:true, data: resdata};
        }catch(e){
            console.log("GuestHistoryPageError (getGuestHistory) : ",e);
            return {success:false, msg: "Something Went Wrong"}
        }   
    }



    const initialFetch = async()=>{
        let res = await getGuestHistory('all','all');
        if(res.success){
            setData(res.data);
        }else{
            alert(res?.msg);
        }
    }
    
    const fetchAndSet = async(fltr1,fltr2)=>{
        let res = await getGuestHistory(fltr1,fltr2);
        if(res.success){
            setData(res.data);
        }
    }

    const handleCheckboxChange = async(e) => {
        const newSelectedCheckboxValue = e.target.value;
        setSelectedCheckbox(newSelectedCheckboxValue);

        if(e.target.value=='checkin90days'){
            await fetchAndSet('90days','');
        }

        else if(e.target.value=='checkout90days'){
            await fetchAndSet('','90days');
        }

        else if(e.target.value=='checkin365days'){
            await fetchAndSet('365days','');
        }

        else if(e.target.value=='checkout365days'){
            await fetchAndSet('','365days');
        }

        else if(e.target.value=='checkin5years'){
            await fetchAndSet('5years','');
        }

        else if(e.target.value=='checkout5years'){
            await fetchAndSet('','5years');
        }

        else if(e.target.value=='checkinall'){
            await fetchAndSet('all','');
        }

        else if(e.target.value=='checkoutall'){
            await fetchAndSet('','all');
        }
    }

    const openCusDetails = (fname,lname,phno)=>{
        navigate(`/AllReservations?firstname=${fname}&lastname=${lname}&phoneno=${phno}`);
    }

    return (
        <div>
            <div className='bg-light min-height-vh'>
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
                                    <input type="checkbox" value="checkin90days" checked={selectedCheckbox === "checkin90days"} onChange={handleCheckboxChange} />
                                    <span className="padding-left-16 text-primary font-size-16">Last 90 days</span>
                                </div>
                                <div className="flex align-items-center margin-col-gap">
                                    <input type="checkbox" value="checkin365days" checked={selectedCheckbox === "checkin365days"} onChange={handleCheckboxChange} />
                                    <span className="padding-left-16 text-primary font-size-16">Last 365 days</span>
                                </div>
                                <div className="flex align-items-center margin-col-gap">
                                    <input type="checkbox" value="checkin5years" checked={selectedCheckbox === "checkin5years"} onChange={handleCheckboxChange} />
                                    <span className="padding-left-16 text-primary font-size-16">Last 5 years</span>
                                </div>
                                <div className="flex align-items-center margin-col-gap">
                                    <input type="checkbox" value="checkinall" checked={selectedCheckbox === "checkinall"} onChange={handleCheckboxChange} />
                                    <span className="padding-left-16 text-primary font-size-16">All History</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex-column gap-2 height-45percent padding-left-right-20">
                            <h5 className="text-primary font-size-14">Filtered by check out dates</h5>
                            <div className="medium-flex-row">
                                <div className="d-flex align-items-center margin-col-gap">
                                    <input type="checkbox" value="checkout90days" checked={selectedCheckbox === "checkout90days"} onChange={handleCheckboxChange} />
                                    <span className="padding-left-16 text-primary font-size-16">Last 90 days</span>
                                </div>
                                <div className="flex align-items-center margin-col-gap">
                                    <input type="checkbox" value="checkout365days" checked={selectedCheckbox === "checkout365days"} onChange={handleCheckboxChange} />
                                    <span className="padding-left-16 text-primary font-size-16">Last 365 days</span>
                                </div>
                                <div className="flex align-items-center margin-col-gap">
                                    <input type="checkbox" value="checkout5years" checked={selectedCheckbox === "checkout5years"} onChange={handleCheckboxChange} />
                                    <span className="padding-left-16 text-primary font-size-16">Last 5 years</span>
                                </div>
                                <div className="flex align-items-center margin-col-gap">
                                    <input type="checkbox" value="checkoutall" checked={selectedCheckbox === "checkoutall"} onChange={handleCheckboxChange} />
                                    <span className="padding-left-16 text-primary font-size-16">All History</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container flex-column">
                        {/* <div className="d-flex width-280 height-30 background-gray search-bar">
                            <input type="search" className="search-input width-280 padding-left-35 background-gray" placeholder="Search" />
                            <button type="search" className="search-icon width-35 height-30 text-align-center d-flex align-items-center justify-content-center"><i className='bx bx-search-alt search-boxicon text-primary'></i></button>
                        </div> */}
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
                                    {data && data.map((item,index)=>{
                                    return <tr key={index+1}>
                                        <th scope="row">{index+1}</th>
                                        <td className="table-tdata">{item.name.title + " " + item.name.firstname + " " + item.name.middlename +  " " + item.name.lastname}</td>
                                        <td className="table-tdata">{item.phoneno}</td>
                                        <td className="table-tdata">{item.arrivaldate}</td>
                                        <td className="table-tdata">{item.departuredate}</td>
                                        <td className="table-tdata">{item.checkcountry =='India' ? item.aadhaarno : item.passportno}</td>
                                        <td className="table-tdata"><button className="font-size-14 btn btn-primary" onClick={()=>{openCusDetails(item.name.firstname,item.name.lastname,item.phoneno)}}>Check History</button></td>
                                    </tr>
                                    })}
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