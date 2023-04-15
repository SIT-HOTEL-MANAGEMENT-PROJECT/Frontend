import React from 'react'

const ServiceBill = () => {
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
                                <h5 className='font-size-16 col-sm-8'>Prasun Roy</h5>
                            </div>
                            <div className='d-flex'>
                                <h5 className='font-size-16 col-sm-4'>Phone No :</h5>
                                <h5 className='font-size-16 col-sm-8'>7432857244</h5>
                            </div>
                            <div className='d-flex'>
                                <h5 className='font-size-16 col-sm-4'>Travel Agent :</h5>
                                <h5 className='font-size-16 col-sm-8'>Rajesh</h5>
                            </div>
                            <div className='d-flex'>
                                <h5 className='font-size-16 col-sm-4'>Company :</h5>
                                <h5 className='font-size-16 col-sm-8'>Roy Industries</h5>
                            </div>
                            <div className='d-flex'>
                                <h5 className='font-size-16 col-sm-4'>Bill No :</h5>
                                <h5 className='font-size-16 col-sm-8'>134</h5>
                            </div>
                            <div className='d-flex'>
                                <h5 className='font-size-16 col-sm-4'>Payment :</h5>
                                <h5 className='font-size-16 col-sm-8'>Credit Card</h5>
                            </div>
                        </div>
                        <div className='col-md-6 medium-full-width'>
                            <div className='d-flex'>
                                <h5 className='font-size-16 col-sm-4'>Room No :</h5>
                                <h5 className='font-size-16 col-sm-8'>101,102</h5>
                            </div>
                            <div className='d-flex'>
                                <h5 className='font-size-16 col-sm-4'>No of Room:</h5>
                                <h5 className='font-size-16 col-sm-8'>2</h5>
                            </div>
                            <div className='d-flex'>
                                <h5 className='font-size-16 col-sm-4'>Room Rate :</h5>
                                <h5 className='font-size-16 col-sm-8'>1000</h5>
                            </div>
                            <div className='d-flex'>
                                <h5 className='font-size-16 col-sm-4'>Arrival Date :</h5>
                                <h5 className='font-size-16 col-sm-3'>24/03/2023</h5>
                                <h5 className='font-size-16 col-sm-1'>at</h5>
                                <h5 className='font-size-16 col-sm-4'>08:00 A.M</h5>
                            </div>
                            <div className='d-flex'>
                                <h5 className='font-size-16 col-sm-4'>Departure Date :</h5>
                                <h5 className='font-size-16 col-sm-3'>14/04/2023</h5>
                                <h5 className='font-size-16 col-sm-1'>at</h5>
                                <h5 className='font-size-16 col-sm-4'>08:00 P.M</h5>
                            </div>
                            <div className='d-flex'>
                                <h5 className='font-size-16 col-sm-4'>Original Bill Date :</h5>
                                <h5 className='font-size-16 col-sm-8'>14/04/2023</h5>
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
                                <tr className='hover-gray make-cursor-pointer' >
                                    <td>Date</td>
                                    <td>102</td>
                                    <td>1</td>
                                    <td>Dhoti</td>
                                    <td>30</td>
                                    <td>Debit</td>
                                    <td>Credit</td>
                                </tr>
                                <tr className='hover-gray make-cursor-pointer' >
                                    <td>Date</td>
                                    <td>102</td>
                                    <td>1</td>
                                    <td>Dhoti</td>
                                    <td>30</td>
                                    <td>Debit</td>
                                    <td>Credit</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td className="text-dark">Discount</td>
                                    <td>Debit</td>
                                    <td className="text-dark">Credit</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td className="text-dark">Total Amount</td>
                                    <td>Debit</td>
                                    <td>Credit</td>
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
                                <tr className='hover-gray make-cursor-pointer' >
                                    <td>Date</td>
                                    <td>101</td>
                                    <td>2</td>
                                    <td>Salad</td>
                                    <td>250</td>
                                    <td>Debit</td>
                                    <td>Credit</td>
                                </tr>
                                <tr className='hover-gray make-cursor-pointer' >
                                    <td>Date</td>
                                    <td>102</td>
                                    <td>1</td>
                                    <td>Paneer</td>
                                    <td>350</td>
                                    <td>Debit</td>
                                    <td>Credit</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td className="text-dark">Discount</td>
                                    <td>Debit</td>
                                    <td className="text-dark">Credit</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td className="text-dark">Total Amount</td>
                                    <td>Debit</td>
                                    <td>Credit</td>
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