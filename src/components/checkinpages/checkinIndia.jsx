import React from "react";
import { useState } from "react";
import "../../CustomCss/Reservation.css"

const India = () => {
  const [aadharNumber, setaadharNumber] = useState("");
  const handleInputChange = (e) => {
    if (e.target.name == "aadharnumber") {
      setaadharNumber(e.target.value);
    }
  }
  return(
    <>
      <div>
      <div className="col-md-6 d-flex align-items-center rev-margin-gap">
              <label
                htmlFor="aadharnumber"
                className="col-sm-7 col-form-label"
              >
                Aadhar Number{" "}
              </label>
              <div className="col-sm-12">
                <input style={{backgroundColor:"#D9DFE1"}}
                  type="text"
                  className="form-control height-30"
                  id="inputaadharnumber"
                  name="aadharnumber"
                  value={aadharNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
      </div>
      <div className="col-md-6 d-flex align-items-center rev-margin-gap">
        <label for="formFile" class="form-label col-sm-8 col-form-label">Guest Aadhar photo upload</label>
        <input style={{backgroundColor:"#D9DFE1"}} class="form-control height-30" type="file" id="formFile"/>
      </div>
      </div>
    </>
  );
};

export default India;