import React from 'react'
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Localbase from "localbase";
import { useEffect } from "react";
let db = new Localbase("hmctdb");
db.config.debug = false;

const ServiceBill = () => {
    const location = useLocation();

    const [guestName, setGuestName] = useState({ title: "", firstname: "", middlename: "", lastname: "", });
    const [travelAgentName, setTravelAgentName] = useState("");
    const [guestPhoneNumber, setGuestPhoneNumber] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [billNo, setBillNo] = useState("");
    const [roomNumber, setRoomNumber] = useState("");
    const [noOfRooms, setNoOfRooms] = useState("");
    const [roomRate, setRoomRate] = useState("");
    const [arrivalDate, setArrivalDate] = useState("");
    const [arrivalTime, setArrivalTime] = useState("");
    const [departureDate, setdepartureDate] = useState("");
    const [departureTime, setDepartureTime] = useState("");
    const [registrationNo, setregistrationNo] = useState("");

    const [laundryBill, setLaundryBill] = useState([]);
    const [laundryDiscount, setLaundryDiscount] = useState(0);
    const [laundryAmountPaid, setLaundryAmountPaid] = useState(0)
    const [laundryTtlDebit, setLaundryTtlDebit] = useState(0);
    const [laundryTtlCredit, setLaundryTtlCredit] = useState(0);
    const [laundrySettlementAmount, setLaundrySettlementAmount] = useState(0);

    const [fnbBill, setFnbBill] = useState([]);
    const [fnbAmountPaid, setFnbAmountPaid] = useState(0)
    const [fnbSgst, setFnbSgst] = useState(0);
    const [fnbCgst, setFnbCgst] = useState(0);
    const [fnbTtlDebit, setFnbTtlDebit] = useState(0);
    const [fnbTtlCredit, setFnbTtlCredit] = useState(0);
    const [fnbSettlementAmount, setFnbSettlementAmount] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            const query = new URLSearchParams(location.search);
            const bookingid = query.get('bookingid');
            if (bookingid && bookingid.length === 14) { getAndSetUserData(bookingid); }
        }, 1000);
    }, [location])

    // Get :  Get all user data of a booking against bookingid
    // params : bookingid
    // return : 1. {success:true, data: {bookingid:"",name: {..}, phoneno: "", ...} }            IF ALL OK
    //          2. {success: false, msg: 'Something Went Wrong'}                                 IF SERVER ERROR
    //          3. {success:false, msg: "Invalid Booking Details"}                               IF BOOKING DATA NOT FOUND
    const getUserDataAgainstBookingId = async (bookingid) => {
        try {
            let booking = await db.collection('reservation').doc({ bookingid: bookingid, checkedinstatus: "done" }).get();
            if (!booking) { return { success: false, msg: "Invalid Booking Details" } }
            return { success: true, data: booking };
        } catch (e) {
            console.log("CheckinPageError (getUserDataAgainstBookingId) : ", e);
            return { success: false, msg: 'Something Went Wrong' }
        }
    }

    const getAndSetUserData = async (bookingid) => {
        let res = await getUserDataAgainstBookingId(bookingid);

        if (res?.success) {
            let booking = res?.data;
            setGuestName(booking.name);
            setTravelAgentName(booking.travelagentname);
            setGuestPhoneNumber(booking.phoneno);
            setCompanyName(booking.companyname);
            setBillNo(booking.billingno);
            setRoomNumber(booking.roomno);
            setNoOfRooms(booking.noofrooms);
            setRoomRate(booking.roomrate);
            setArrivalDate(booking.arrivaldate);
            setArrivalTime(booking.arrivaltime);
            //   setdepartureDate(booking.departuredate);
            //   setDepartureTime(booking.departuretime);
            setregistrationNo(booking.bookingid);

            let todayDate = new Date();
            let todayDateString = todayDate.toISOString().slice(0, 10);
            const hours = todayDate.getHours().toString().padStart(2, '0');
            const minutes = todayDate.getMinutes().toString().padStart(2, '0');
            const todayTimeString = `${hours}:${minutes}`;
            setdepartureDate(todayDateString); setDepartureTime(todayTimeString);

            await getandSetLaundryBill(bookingid);
            await getandSetFandBBill(bookingid);
        } else {
            setGuestName({ title: "", firstname: "", middlename: "", lastname: "", });
            setTravelAgentName(''); setGuestPhoneNumber(''); setCompanyName(''); setBillNo('');
            setRoomNumber(''); setNoOfRooms(''); setRoomRate(''); setArrivalDate('');
            setArrivalTime(''); setdepartureDate(''); setDepartureTime(''); setregistrationNo('');

            setLaundryBill([]); setLaundryDiscount(0); setLaundryTtlDebit(0);
            setLaundryAmountPaid(0); setLaundryTtlCredit(0); setLaundrySettlementAmount(0);

            setFnbBill([]); setFnbCgst(0); setFnbSgst(0); setFnbTtlDebit(0); setFnbAmountPaid(0); 
            setFnbTtlCredit(0); setFnbSettlementAmount(0);
        }
    }


    const getandSetLaundryBill = async(bookingid)=>{
        try{
            let laundryDb = await db.collection('laundryservice').get();

            if(!laundryDb || laundryDb.length <1) { return {success:false, msg: "No Data Exist in Record!"} };
            
            if (laundryDb && !Array.isArray(laundryDb)) { laundryDb = [laundryDb]; }
            
            laundryDb = laundryDb.filter((booking)=> booking.bookingid === bookingid);
            
            if (laundryDb.length >= 1) {
                let ttlDebt = 0.0;
                let ttlCred = 0.0;
                let ttlDiscount = 0.0;
                let ttlAmountPaid = 0.0;
                const transformedData = laundryDb.reduce((acc, bk) => {
                    let thisbookingdebt = 0.0;
                    bk.orders.forEach((od) => {
                        const existingItemIndex = acc.findIndex(
                            (item) => item["name"] === od.name
                        );
                        if (existingItemIndex !== -1) {
                            acc[existingItemIndex]["quantity"] += 1;
                            acc[existingItemIndex]["price"] += parseFloat(od.price);
                        } else {
                            acc.push({
                                "date": bk.date,
                                "roomno": bk.roomno,
                                "quantity": 1,
                                "name": od.name,
                                "price": parseFloat(od.price),
                            });
                        }

                        ttlDebt += parseFloat(od.price);
                        thisbookingdebt += parseFloat(od.price);
                    });
                    ttlDiscount += parseFloat(bk?.discount);
                    if(bk?.paid === true){ ttlAmountPaid += parseFloat(thisbookingdebt); }
                    if((parseFloat(bk?.discount) > 0.0) && bk?.paid === true) { ttlAmountPaid -= parseFloat(bk?.discount) }
                    return acc;
                }, []);

                if(transformedData.length >= 1) { 
                    setLaundryBill(transformedData) 
                    setLaundryDiscount(parseFloat(ttlDiscount));
                    setLaundryTtlDebit(parseFloat(ttlDebt));
                    setLaundryAmountPaid(parseFloat(ttlAmountPaid));
                    ttlCred += parseFloat(ttlDiscount) + parseFloat(ttlAmountPaid);


                    let sstlamt = 0.0;
                    if(ttlDebt > ttlCred) { sstlamt = parseFloat(ttlDebt) - parseFloat(ttlCred); }
                    ttlCred += parseFloat(sstlamt);
                    setLaundrySettlementAmount(parseFloat(sstlamt));
                    setLaundryTtlCredit(parseFloat(ttlCred));
                }
                else{ 
                    setLaundryBill([]); setLaundryDiscount(0); setLaundryTtlDebit(0);
                    setLaundryAmountPaid(0); setLaundrySettlementAmount(0); setLaundryTtlCredit(0);
                }
            }

            return {success:true};
        }catch(e){
            setLaundryBill([]); setLaundryDiscount(0); setLaundryTtlDebit(0);
            setLaundryAmountPaid(0); setLaundryTtlCredit(0); setLaundrySettlementAmount(0);
            console.log("ServiceBillPageError (getandSetLaundryBill) : ", e);
            return { success: false, msg: 'Something Went Wrong' }
        }
    }

    const getandSetFandBBill = async(bookingid)=>{
        try{
            let fnbDb = await db.collection('fnbservice').get();

            if(!fnbDb || fnbDb.length <1) { return {success:false, msg: "No Data Exist in Record!"} };
            
            if (fnbDb && !Array.isArray(fnbDb)) { fnbDb = [fnbDb]; }
            
            fnbDb = fnbDb.filter((booking)=> booking.bookingid === bookingid);

            if (fnbDb.length >= 1) {
                let ttlDebt = 0.0;
                let ttlCred = 0.0;
                let ttlSgst = 0.0;
                let ttlCgst = 0.0;
                let ttlAmountPaid = 0.0;
                const transformedData = fnbDb.reduce((acc, bk) => {
                    let thisbookingdebt = 0.0;
                    bk.orders.forEach((od) => {
                        const existingItemIndex = acc.findIndex(
                            (item) => item["name"] === od.name
                        );
                        if (existingItemIndex !== -1) {
                            acc[existingItemIndex]["quantity"] += 1;
                            acc[existingItemIndex]["price"] += parseFloat(od.price);
                        } else {
                            acc.push({
                                "date": bk.date,
                                "roomno": bk.roomno,
                                "quantity": 1,
                                "name": od.name,
                                "price": parseFloat(od.price),
                            });
                        }

                        ttlDebt += parseFloat(od.price);
                        thisbookingdebt += parseFloat(od.price);
                    });

                    if(bk?.paid){ ttlAmountPaid += parseFloat(thisbookingdebt) + parseFloat(bk?.sgst) + parseFloat(bk?.cgst); }
                    if(bk?.sgst){ ttlSgst += parseFloat(bk.sgst); }
                    if(bk?.cgst){ ttlCgst += parseFloat(bk.cgst); }
                    return acc;
                }, []);

                if(transformedData.length >= 1) { 
                    setFnbBill(transformedData);
                    
                    setFnbCgst(parseFloat(ttlCgst)); setFnbSgst(parseFloat(ttlSgst)); 
                    let fnlDebit = parseFloat(ttlDebt) + parseFloat(ttlCgst) + parseFloat(ttlSgst);
                    setFnbTtlDebit(parseFloat(fnlDebit));
                    
                    setFnbAmountPaid(parseFloat(ttlAmountPaid));
                    
                    ttlCred += parseFloat(ttlAmountPaid);

                    let sstlamt = 0.0;
                    if(fnlDebit > ttlCred) { sstlamt = parseFloat(fnlDebit) - parseFloat(ttlCred); }
                    setFnbSettlementAmount(parseFloat(sstlamt));
                    ttlCred += parseFloat(sstlamt);
                    setFnbTtlCredit(parseFloat(ttlCred));
                }
                else{ 
                    setFnbBill([]); setFnbCgst(0); setFnbSgst(0); setFnbTtlDebit(0); setFnbAmountPaid(0); 
                    setFnbTtlCredit(0); setFnbSettlementAmount(0);
                }
            }

            return {success:true};
        }catch(e){
            setFnbBill([]); setFnbCgst(0); setFnbSgst(0); setFnbTtlDebit(0); setFnbAmountPaid(0); 
            setFnbTtlCredit(0); setFnbSettlementAmount(0);
            console.log("ServiceBillPageError (getandSetLaundryBill) : ", e);
            return { success: false, msg: 'Something Went Wrong' }
        }
    }


    return (
        <div>
            <div className="bg-light min-height-vh">
                <div className='container mb-1'>
                    <div className='d-flex justify-content-between p-2 border-bottom-blue'>
                        <h1 className='text-primary'>Invoice</h1>
                        <div className='d-flex align-items-center reserv-col-gap-1'>
                            <h6>Siliguri Institute of Technology</h6>
                            <h6>Sukna, Siliguri</h6>
                        </div>
                    </div>
                    <div className='mt-3 d-flex justify-content-between medium-flex-column reserv-col-gap-2'>
                        <div className='col-md-6 medium-full-width'>
                            <div className='d-flex'>
                                <h5 className='font-size-16 col-sm-4'>Guest Name :</h5>
                                <h5 className='font-size-16 col-sm-8'>{`${guestName.title} ${guestName.firstname} ${guestName.middlename} ${guestName.lastname}`}</h5>
                            </div>
                            <div className='d-flex'>
                                <h5 className='font-size-16 col-sm-4'>Phone No :</h5>
                                <h5 className='font-size-16 col-sm-8'>{guestPhoneNumber}</h5>
                            </div>
                            <div className='d-flex'>
                                <h5 className='font-size-16 col-sm-4'>Travel Agent :</h5>
                                <h5 className='font-size-16 col-sm-8'>{travelAgentName}</h5>
                            </div>
                            <div className='d-flex'>
                                <h5 className='font-size-16 col-sm-4'>Company :</h5>
                                <h5 className='font-size-16 col-sm-8'>{companyName}</h5>
                            </div>
                            <div className='d-flex'>
                                <h5 className='font-size-16 col-sm-4'>Bill No :</h5>
                                <h5 className='font-size-16 col-sm-8'>{billNo}</h5>
                            </div>
                            <div className='d-flex'>
                                <h5 className='font-size-16 col-sm-4'>Registration No :</h5>
                                <h5 className='font-size-16 col-sm-8'>{registrationNo}</h5>
                            </div>
                        </div>
                        <div className='col-md-6 medium-full-width'>
                            <div className='d-flex'>
                                <h5 className='font-size-16 col-sm-4'>Room No :</h5>
                                <h5 className='font-size-16 col-sm-8'>{roomNumber}</h5>
                            </div>
                            <div className='d-flex'>
                                <h5 className='font-size-16 col-sm-4'>No of Room:</h5>
                                <h5 className='font-size-16 col-sm-8'>{noOfRooms}</h5>
                            </div>
                            <div className='d-flex'>
                                <h5 className='font-size-16 col-sm-4'>Room Rate :</h5>
                                <h5 className='font-size-16 col-sm-8'>{roomRate}</h5>
                            </div>
                            <div className='d-flex'>
                                <h5 className='font-size-16 col-sm-4'>Arrival Date :</h5>
                                <h5 className='font-size-16 col-sm-3'>{arrivalDate}</h5>
                                <h5 className='font-size-16 col-sm-1'>at</h5>
                                <h5 className='font-size-16 col-sm-4'>{arrivalTime}</h5>
                            </div>
                            <div className='d-flex'>
                                <h5 className='font-size-16 col-sm-4'>Departure Date :</h5>
                                <h5 className='font-size-16 col-sm-3'>{departureDate}</h5>
                                <h5 className='font-size-16 col-sm-1'>at</h5>
                                <h5 className='font-size-16 col-sm-4'>{departureTime}</h5>
                            </div>
                            <div className='d-flex'>
                                <h5 className='font-size-16 col-sm-4'>Original Bill Date :</h5>
                                <h5 className='font-size-16 col-sm-8'>{departureDate}</h5>
                            </div>
                        </div>
                    </div>
                    <div className="table-responsive mt-3">
                        <h4 className='text-primary mb-4 mt-4'>Service Type : Housekeeping</h4>
                        <table className="table table-borderless table-border-collapse text-primary">
                            <thead className="table-head-blue">
                                <tr>
                                    <th scope="col">Date</th>
                                    <th scope="col">Room No</th>
                                    <th scope="col">Item Quantity</th>
                                    <th scope="col">Item Name</th>
                                    <th scope="col">Item Price</th>
                                    <th scope="col">Debit</th>
                                    <th scope="col">Credit</th>
                                </tr>
                            </thead>
                            <tbody className="table-group-divider">
                                {laundryBill && laundryBill.map((item,index)=>{ 
                                    return <tr key={index+1} className='hover-gray make-cursor-pointer' >
                                    <td>{item?.date}</td>
                                    <td>{item?.roomno}</td>
                                    <td>{item?.quantity}</td>
                                    <td>{item?.name}</td>
                                    <td>{item?.price}</td>
                                    <td>{item?.price}</td>
                                    <td></td>
                                </tr>})}
                                {laundryDiscount > 0.0 && <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td className="text-dark">Total Discount</td>
                                    <td></td>
                                    <td className="text-dark">{laundryDiscount}</td>
                                </tr>}
                                {laundryAmountPaid > 0.0 && <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td className="text-dark">Total Amount Paid</td>
                                    <td></td>
                                    <td className="text-dark">{laundryAmountPaid}</td>
                                </tr>}
                                {laundrySettlementAmount > 0.0 && <tr>
                                    <td>{departureDate}</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td className="text-dark">Settlement Amount</td>
                                    <td></td>
                                    <td className="text-dark">{laundrySettlementAmount}</td>
                                </tr>}
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td className="text-dark">Total Amount</td>
                                    <td>{laundryTtlDebit}</td>
                                    <td>{laundryTtlCredit}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="table-responsive mt-3">
                        <h4 className='text-primary mb-4 mt-4'>Service Type : Food & Beverage</h4>
                        <table className="table table-borderless table-border-collapse text-primary">
                            <thead className="table-head-blue">
                                <tr>
                                    <th scope="col">Date</th>
                                    <th scope="col">Room No</th>
                                    <th scope="col">Item Quantity</th>
                                    <th scope="col">Item Name</th>
                                    <th scope="col">Item Price</th>
                                    <th scope="col">Debit</th>
                                    <th scope="col">Credit</th>
                                </tr>
                            </thead>
                            <tbody className="table-group-divider">
                                {fnbBill && fnbBill.map((item,index)=>{ 
                                    return <tr key={index+1} className='hover-gray make-cursor-pointer' >
                                    <td>{item?.date}</td>
                                    <td>{item?.roomno}</td>
                                    <td>{item?.quantity}</td>
                                    <td>{item?.name}</td>
                                    <td>{item?.price}</td>
                                    <td>{item?.price}</td>
                                    <td></td>
                                </tr>})}
                                {fnbCgst > 0.0 && <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td className="text-dark">Total Cgst @2.50</td>
                                    <td>{fnbCgst}</td>
                                    <td className="text-dark"></td>
                                </tr>}
                                {fnbSgst > 0.0 && <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td className="text-dark">Total Sgst @2.50</td>
                                    <td>{fnbSgst}</td>
                                    <td></td>
                                </tr>}
                                {fnbAmountPaid > 0.0 && <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td className="text-dark">Total Amount Paid</td>
                                    <td></td>
                                    <td>{fnbAmountPaid}</td>
                                </tr>}
                                {fnbSettlementAmount > 0.0 && <tr>
                                    <td>{departureDate}</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td className="text-dark">Settlement Amount</td>
                                    <td></td>
                                    <td>{fnbSettlementAmount}</td>
                                </tr>}
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td className="text-dark">Total Amount</td>
                                    <td>{fnbTtlDebit}</td>
                                    <td>{fnbTtlCredit}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ServiceBill;