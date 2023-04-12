import React from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import "../CustomCss/Reservation.css";
import { useEffect } from 'react';
import Localbase from "localbase";
let db = new Localbase("hmctdb");
db.config.debug = false;

const HistoryReports = () => {
    const [selectedCheckbox, setSelectedCheckbox] = useState("");
    const [data, setData] = useState([])
    // const [reservationData, setReservationData] = useState([]);
    // const [reportsData, setReportsData] = useState([]);
    // const [prevdatedata, setPrevdatedata] = useState([]);
    
    useEffect(() => {
      initialFetch();
    }, [])
    
    
    // Get :  Get Reports based on filters
    // params:  fltr ('all'/'90days'/'365days'/'5years') (string any one value from this list)
    // return:  1. {success:true, data:[{ date: '', totalcheckin: '', checkinrem: '', totalcheckout: '', 
    //                                  checkoutrem: '', noofoccupiedrooms:'', roomoccupiedpercentage: '', rupeesadr: '', 
    //                                  noofavailableroom: '', noofroomsbooked: '',noofroomsmaintainance: '', noofroomsdirty: '' },{..},{..}]}      IF ALL OK
    //          2. {success:false, msg: 'Internal Server Error'}                                                                                    IF SERVER ERROR
    const getReport = async(fltr)=>{
        try{
            let reservationData = await db.collection('reservation').get();
            let reportsData = await db.collection('reports').orderBy('date', 'desc').get();

            // if(reservationDt) setReservationData(reservationDt);
            // if(reportsDt) setReportsData(reportsDt);

            let reportDate = new Date();
            let reportDateString = reportDate.toISOString().slice(0, 10);


            // ======================   Check for total checkin and rem checkin   ===============================
            let checkinData = reservationData.filter((booking) => booking.arrivaldate === reportDateString); 

            let checkedInPercentage = 0;
            let notCheckedInPercentage = 0;
            if(checkinData.length){
                const numCheckedIn = checkinData.reduce((count, booking) => {
                    return count + (booking.checkedinstatus==="done" ? 1 : 0);
                }, 0);

                const numNotCheckedIn = checkinData.length - numCheckedIn;
                checkedInPercentage = (numCheckedIn / checkinData.length) * 100;
                notCheckedInPercentage = (numNotCheckedIn / checkinData.length) * 100;
            }
            // -----------------------   End of Check for total checkin and rem checkin   ------------------------



            // ======================   Check for total checkout and rem checkout   ===============================
            let checkoutData = reservationData.filter((booking) => booking.departuredate === reportDateString); 

            let checkedOutPercentage = 0;
            let notCheckedOutPercentage = 0;
            if(checkoutData.length){
                const numCheckedOut = checkoutData.reduce((count, booking) => {
                    return count + (booking.checkedoutstatus==="done" ? 1 : 0);
                }, 0);

                const numNotCheckedOut = checkoutData.length - numCheckedOut;
                checkedOutPercentage = (numCheckedOut / checkoutData.length) * 100;
                notCheckedOutPercentage = (numNotCheckedOut / checkoutData.length) * 100;
            }
            // -----------------------   End of Check for total checkout and rem checkout   ------------------------



            // ===============================   Total Number of rooms booked   ======================================
            let totalBookedRooms = 0;
        
            for (let booking of reservationData) {
                if (booking.bookingdate === reportDateString) {
                    const numRoomsBooked = parseInt(booking.noofrooms, 10);
                    totalBookedRooms += numRoomsBooked;
                }
            }
            // ------------------------------   End of Total Number of rooms booked   ---------------------------------



            //  ==============================   No of room available and occupied    ====================================
            let totalRooms = 54;
            let dirtyrm = 5;
            let avrooms = totalRooms - dirtyrm;
            
            const filteredCheckinBookings = reservationData.filter(booking =>
                ((booking.arrivaldate === reportDateString && booking.checkinstatus  === "done"))
            );
            
            let checkinoccupiedRooms = 0;
            for (let i = 0; i < filteredCheckinBookings.length; i++) {
              checkinoccupiedRooms += parseInt(filteredCheckinBookings[i].noofrooms);
            }
            
            const filteredCheckoutBookings = reservationData.filter(booking =>
                ((booking.departuredate === reportDateString && booking.checkedoutstatus === "done"))
            );
            
            let checkoutreleaseRooms = 0;
            for (let i = 0; i < filteredCheckoutBookings.length; i++) {
              checkoutreleaseRooms += parseInt(filteredCheckoutBookings[i].noofrooms);
            }

            let totaloccupied = checkinoccupiedRooms - checkoutreleaseRooms;
            let occupiedpercentage = (totaloccupied/totalRooms)*100;
            avrooms = avrooms - totaloccupied;


            let prevdate = new Date();
            prevdate.setDate(reportDate.getDate()-1);
            let prevdatestring = prevdate.toISOString().slice(0, 10);
            let prevdatedata = await db.collection("reports").doc({date: prevdatestring}).get();
            // if(prevdatedt) setPrevdatedata(prevdatedt);
            if(prevdatedata){
                avrooms = prevdatedata.noofavailableroom; 
                totaloccupied = totaloccupied + prevdatedata.noofoccupiedrooms;
                occupiedpercentage = (totaloccupied/totalRooms)*100;
                avrooms = avrooms - checkinoccupiedRooms + checkoutreleaseRooms;
            }

            const totalRoomOccupied = totaloccupied;
            const roomoccupiedPercentage = occupiedpercentage;
            const availableRooms = avrooms;
            //  -------------------------------   End of No of room available and occupied    --------------------------------



            //   =============================  No of rooms dirty and in maintainance   ========================================
            //   As there is no such method yet to mark a room dirty or maintainance so this value will be hard coded 
            let roomsinMaintainance = 0;
            let roomsDirty = 5;
            //   ------------------------------  End of No of rooms dirty and in maintainance   --------------------------------



            //  ===============================   Rupees 100 ADR   ==============================================
            let rupeesadr = 0;
            let rupeesadrData = await db.collection('rupeesadr').doc({ date: reportDateString }).get();
            if(rupeesadrData){
                rupeesadr = rupeesadrData.value;
            }
            //  -------------------------------  End of Rupees 100 ADR   ----------------------------------------


            let resdata = [{ date: reportDateString, totalcheckin: checkedInPercentage, checkinrem: notCheckedInPercentage,
                totalcheckout: checkedOutPercentage, checkoutrem: notCheckedOutPercentage, noofoccupiedrooms:totalRoomOccupied, roomoccupiedpercentage: roomoccupiedPercentage,
                rupeesadr: rupeesadr, noofavailableroom: availableRooms, noofroomsbooked: totalBookedRooms,
                noofroomsmaintainance: roomsinMaintainance, noofroomsdirty: roomsDirty }]

            
            if(reportsData){
                resdata = resdata.concat(reportsData)
            }


            if(fltr==="90days"){
                const today = new Date();
                const daysAgo = new Date(today);
                daysAgo.setDate(today.getDate() - 90);

                resdata = resdata.filter((item) => {
                            const itemDate = new Date(item.date);
                            return itemDate >= daysAgo && itemDate <= today;
                        })
                        .sort((a, b) => new Date(b.date) - new Date(a.date));
            }
            else if(fltr==="365days"){
                const today = new Date();
                const daysAgo = new Date(today);
                daysAgo.setDate(today.getDate() - 365);

                resdata = resdata.filter((item) => {
                            const itemDate = new Date(item.date);
                            return itemDate >= daysAgo && itemDate <= today;
                        })
                        .sort((a, b) => new Date(b.date) - new Date(a.date));
            }
            else if(fltr==="5years"){
                const today = new Date();
                const daysAgo = new Date(today);
                daysAgo.setDate(today.getDate() - 365*5);

                resdata = resdata.filter((item) => {
                            const itemDate = new Date(item.date);
                            return itemDate >= daysAgo && itemDate <= today;
                        })
                        .sort((a, b) => new Date(b.date) - new Date(a.date));
            }
            // else {
            //     resdata = resdata.sort((a, b) => new Date(b.date) - new Date(a.date));
            // }
            return {success:true, data: resdata}
        }catch(e){
            console.log("HistoryReports (getReport) : ",e);
            return {success:false, msg: 'Internal Server Error'}
        }
    }


    const initialFetch = async()=>{
        let res = await getReport('90days');
        if(res.success){
            setData(res.data);
        }else{
            alert(res?.msg);
        }
    }


    const fetchAndSet = async(fltr)=>{
        let res = await getReport(fltr);
        if(res.success){
            setData(res.data);
        }
    }

    const handleCheckboxChange = async(e) => {
        const newSelectedCheckboxValue = e.target.value;
        setSelectedCheckbox(newSelectedCheckboxValue);

        if(e.target.value=='checkin90days' || e.target.value=='checkout90days'){
            await fetchAndSet('90days');
        }

        else if(e.target.value=='checkin365days' || e.target.value=='checkout365days'){
            await fetchAndSet('365days');
        }

        else if(e.target.value=='checkin5years' || e.target.value=='checkout5years'){
            await fetchAndSet('5years');
        }

        else if(e.target.value=='checkinall' || e.target.value=='checkoutall'){
            await fetchAndSet('all');
        }
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
                        <div className="d-flex width-280 height-30 background-gray search-bar">
                            <input type="search" className="search-input width-280 padding-left-35" placeholder="Search" />
                            <button type="search" className="search-icon width-35 height-30 text-align-center d-flex align-items-center justify-content-center"><i className='bx bx-search-alt search-boxicon text-primary'></i></button>
                        </div>
                        <div className='container mt-5 height-450 overflow-y-axis-auto'>
                            {data && data.map((item,index)=>{
                                return <div key={index+1} className="container">
                                <h5 className="padding-left-90 font-size-14 text-primary margin-bottom-30">Date {item.date}</h5>
                                <div className="row padding-left-right-40 margin-bottom-30 grid-col-gap grid-row-gap align-items-center justify-content-center">
                                    <div className="width-150 height-150 bg-skyblue border-radius-10 text-primary flex-column align-items-center justify-content-center">
                                        <h3 className="d-flex align-items-center justify-content-center padding-top-bottom-50">{item.totalcheckin}%</h3>
                                        <h5 className="font-size-11 d-flex align-items-center justify-content-center">Check In Total</h5>
                                    </div>
                                    <div className="width-150 height-150 bg-skyblue border-radius-10 text-primary flex-column align-items-center justify-content-center">
                                        <h3 className="d-flex align-items-center justify-content-center padding-top-bottom-50">{item.checkinrem}%</h3>
                                        <h5 className="font-size-11 d-flex align-items-center justify-content-center">Check In Remaining</h5>
                                    </div>
                                    <div className="width-150 height-150 bg-skyblue border-radius-10 text-primary flex-column align-items-center justify-content-center">
                                        <h3 className="d-flex align-items-center justify-content-center padding-top-bottom-50">{item.totalcheckout}%</h3>
                                        <h5 className="font-size-11 d-flex align-items-center justify-content-center">Check Out Total</h5>
                                    </div>
                                    <div className="width-150 height-150 bg-skyblue border-radius-10 text-primary flex-column align-items-center justify-content-center">
                                        <h3 className="d-flex align-items-center justify-content-center padding-top-bottom-50">{item.checkoutrem}%</h3>
                                        <h5 className="font-size-11 d-flex align-items-center justify-content-center">Check Out Remaining</h5>
                                    </div>
                                    <div className="width-150 height-150 bg-skyblue border-radius-10 text-primary flex-column align-items-center justify-content-center">
                                        <h3 className="d-flex align-items-center justify-content-center padding-top-bottom-50">{item.roomoccupiedpercentage}%</h3>
                                        <h5 className="font-size-11 d-flex align-items-center justify-content-center">% of Occupancy</h5>
                                    </div>
                                    <div className="width-150 height-150 bg-skyblue border-radius-10 text-primary flex-column align-items-center justify-content-center">
                                        <h3 className="d-flex align-items-center justify-content-center padding-top-bottom-50">{item.rupeesadr}</h3>
                                        <h5 className="font-size-11 d-flex align-items-center justify-content-center">Rupees 100 ADR</h5>
                                    </div>
                                    <div className="width-150 height-150 bg-skyblue border-radius-10 text-primary flex-column align-items-center justify-content-center">
                                        <h3 className="d-flex align-items-center justify-content-center padding-top-bottom-50">{item.noofavailableroom}</h3>
                                        <h5 className="font-size-11 d-flex align-items-center justify-content-center">No of room available</h5>
                                    </div>
                                    <div className="width-150 height-150 bg-skyblue border-radius-10 text-primary flex-column align-items-center justify-content-center">
                                        <h3 className="d-flex align-items-center justify-content-center padding-top-bottom-50">{item.noofoccupiedrooms}</h3>
                                        <h5 className="font-size-11 d-flex align-items-center justify-content-center">No of room booked</h5>
                                    </div>
                                    <div className="width-150 height-150 bg-skyblue border-radius-10 text-primary flex-column align-items-center justify-content-center">
                                        <h3 className="d-flex align-items-center justify-content-center padding-top-50-bottom-25">{item.noofroomsmaintainance}</h3>
                                        <h5 className="font-size-11 d-flex align-items-center justify-content-center padding-left-30">No of room Maintenance</h5>
                                    </div>
                                    <div className="width-150 height-150 bg-skyblue border-radius-10 text-primary flex-column align-items-center justify-content-center">
                                        <h3 className="d-flex align-items-center justify-content-center padding-top-bottom-50">{item.noofroomsdirty}</h3>
                                        <h5 className="font-size-11 d-flex align-items-center justify-content-center">No of rooms Dirty</h5>
                                    </div>
                                </div>
                            </div>})}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HistoryReports