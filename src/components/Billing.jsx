import React from 'react'
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Localbase from "localbase";
import { useEffect } from "react";
let db = new Localbase("hmctdb");
db.config.debug = false;


const Billing = () => {
    const location = useLocation();
    
    const [guestName, setGuestName] = useState({title: "", firstname: "", middlename: "", lastname: "", });
    const [travelAgentName, setTravelAgentName] = useState("");
    const [guestPhoneNumber, setGuestPhoneNumber] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [gstId, setGstId] = useState("");
    const [billing, setBilling] = useState("");
    const [billNo, setBillNo] = useState("");
    const [confirmationNo, setConfirmationNo] = useState("");
    const [roomNumber, setRoomNumber] = useState("");
    const [noOfRooms, setNoOfRooms] = useState("");
    const [roomRate, setRoomRate] = useState("");
    const [guestsNo, setGuestsNo] = useState("");
    const [arrivalDate, setArrivalDate] = useState("");
    const [arrivalTime, setArrivalTime] = useState("");
    const [departureDate, setdepartureDate] = useState("");
    const [departureTime, setDepartureTime] = useState("");
    const [registrationNo, setregistrationNo] = useState("");
    const [paymentData, setPaymentData] = useState([]);
    const [ttlDebit, setTtlDebit] = useState(0);
    const [ttlCredit, setTtlCredit] = useState(0);

      
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
            let booking = await db.collection('reservation').doc({ bookingid: bookingid, checkedinstatus: "done", checkedoutstatus: "pending" }).get();
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
          setGstId(booking.gst);
          setBilling(booking.billing);
          setBillNo(booking.billingno);
          setConfirmationNo(booking.confno);
          setRoomNumber(booking.roomno);
          setNoOfRooms(booking.noofrooms);
          setRoomRate(booking.roomrate);
          setGuestsNo(booking.phoneno);
          setArrivalDate(booking.arrivaldate);
          setArrivalTime(booking.arrivaltime);
        //   setdepartureDate(booking.departuredate);
        //   setDepartureTime(booking.departuretime);
          setPaymentData(booking.paymenthistory);
          setregistrationNo(booking.bookingid);

          let todayDate = new Date();
          let todayDateString = todayDate.toISOString().slice(0, 10);
          const hours = todayDate.getHours().toString().padStart(2, '0');
          const minutes = todayDate.getMinutes().toString().padStart(2, '0');
          const todayTimeString = `${hours}:${minutes}`;
          setdepartureDate(todayDateString); setDepartureTime(todayTimeString); 

          let totalDebit = 0;
          let totalCredit = 0;
    
          for (const transaction of booking.paymenthistory) {
            if (transaction.debit !== '') {
              totalDebit += parseFloat(transaction.debit);
            }
            if (transaction.credit !== '') {
              totalCredit += parseFloat(transaction.credit);
            }
          }
    
          setTtlDebit(totalDebit);
          setTtlCredit(totalCredit);
        } else {
          setGuestName({ title: "", firstname: "", middlename: "", lastname: "", });
          setTravelAgentName(''); setGuestPhoneNumber(''); setCompanyName(''); setGstId(''); setBilling(''); setBillNo('');
          setConfirmationNo(''); setRoomNumber(''); setNoOfRooms(''); setRoomRate(''); setGuestsNo(''); setArrivalDate('');
          setArrivalTime(''); setdepartureDate(''); setDepartureTime(''); setPaymentData([]); setregistrationNo('');
    
          setTtlDebit(0);
          setTtlCredit(0);
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
                                <h5 className='font-size-16 col-sm-4'>GST :</h5>
                                <h5 className='font-size-16 col-sm-8'>{gstId}</h5>
                            </div>
                            <div className='d-flex'>
                                <h5 className='font-size-16 col-sm-4'>Billing :</h5>
                                <h5 className='font-size-16 col-sm-8'>{billing}</h5>
                            </div>
                            <div className='d-flex'>
                                <h5 className='font-size-16 col-sm-4'>Bill No :</h5>
                                <h5 className='font-size-16 col-sm-8'>{billNo}</h5>
                            </div>
                            <div className='d-flex'>
                                <h5 className='font-size-16 col-sm-4'>Confirmation No :</h5>
                                <h5 className='font-size-16 col-sm-8'>{confirmationNo}</h5>
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
                                <h5 className='font-size-16 col-sm-4'>Guests No :</h5>
                                <h5 className='font-size-16 col-sm-8'>{guestPhoneNumber}</h5>
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
                                <h5 className='font-size-16 col-sm-4'>Registration No :</h5>
                                <h5 className='font-size-16 col-sm-8'>{registrationNo}</h5>
                            </div>
                            <div className='d-flex'>
                                <h5 className='font-size-16 col-sm-4'>Original Bill Date :</h5>
                                <h5 className='font-size-16 col-sm-8'>{departureDate}</h5>
                            </div>
                        </div>
                    </div>
                    <div className="table-responsive mt-3">
                        <table className="table table-borderless table-border-collapse text-primary">
                            <thead className="table-head-blue">
                                <tr>
                                    <th scope="col">Date</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Reference</th>
                                    <th scope="col">Debit</th>
                                    <th scope="col">Credit</th>
                                </tr>
                            </thead>
                            <tbody className="table-group-divider">
                                {paymentData && paymentData.map((item, index) => {
                                    return <tr key={index + 1} className='hover-gray make-cursor-pointer' >
                                    <td>{item.date}</td>
                                    <td>{item.description}</td>
                                    <td>{item.name}</td>
                                    <td>{item.debit}</td>
                                    <td>{item.credit}</td>
                                  </tr>
                                })}
                                <tr className='hover-gray make-cursor-pointer table-br-last-blue' >
                                    <td className="table-tdata"></td>
                                    <td className="table-tdata"></td>
                                    <td className="table-tdata"></td>
                                    <td className="table-tdata">{ttlDebit}</td>
                                    <td className="table-tdata">{ttlCredit}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Billing