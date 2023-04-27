// ==========================================     Archived File    ==========================================

import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import "../CustomCss/Reservation.css";

const Application = () => {
    const [receiverName, setReceiverName] = useState("");
    const [message, setMessage] = useState("");
    const [senderName, setSenderName] = useState("");

    const [buttonText, setButtonText] = useState("Send");
    const [isSendDisabled, setIsSendDisabled] = useState(false);

    const handleInputChange = (e) => {
        if(e.target.name == "receivername"){ setReceiverName(e.target.value) }
        else if(e.target.name == "message"){ setMessage(e.target.value) }
        else if(e.target.name == "sendername"){ setSenderName(e.target.value) }
    }    

    return (
        <div>
            <div className="bg-light vh-100">
                <nav className="navbar sticky-top navbar navbar-expand-lg bg-light">
                    <div className="container-fluid">
                        <div className="navbar-brand d-flex align-items-center">
                            <NavLink className="text-primary" to="/Home4">
                                <i className="bx bx-chevrons-left font-size-25"></i>
                            </NavLink>
                            <h5 className="text-primary">Application</h5>
                        </div>
                    </div>
                </nav>
                <div className="container">
                    <div className="d-flex align-items-center">
                        <h3 className="pe-1 text-primary">To,</h3>
                        <input
                            type="text"
                            className="form-control background-gray h-30 width-280 small-width-180"
                            name="receivername" value={receiverName} onChange={handleInputChange}
                        />
                    </div>
                    <div className="mt-3">
                        <textarea className="form-control bg-skyblue w-75 height-350 margin-left-180" name="message" value={message} onChange={handleInputChange}></textarea>
                    </div>
                    <div className="d-flex justify-content-end mt-4 padding-right-50">
                        <div className="flex-column">
                            <h5 className="text-primary">Thankfully</h5>
                            <input
                                type="text"
                                className="form-control background-gray h-30 width-200 small-width-180"
                                placeholder="@username"
                                name="sendername" value={senderName} onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                        <button className="width-150 btn btn-primary hover-transform-button" disabled={isSendDisabled} onClick={()=>{setButtonText("Sent"); setIsSendDisabled(true);}}>{buttonText}</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Application;
