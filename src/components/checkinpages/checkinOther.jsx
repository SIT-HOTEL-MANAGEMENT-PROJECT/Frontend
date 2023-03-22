import React from "react";
import { useState } from "react";
import "../../CustomCss/Reservation.css";

const Other = () => {
  const [passportNumber, setpassportNumber] = useState("");
  const [visaNumber, setvisaNumber] = useState("");
  const [visaDate, setvisaDate] = useState("");
  const [passportDate, setpassportDate] = useState("");
  const [arrivedFrom, setarrivedFrom] = useState("");
  const [placeofIssue, setplaceofIssue] = useState("");
  const [Purpose, setPurpose] = useState("");

  const handleInputChange = (e) => {
    if (e.target.name == "passportnumber") {
      setpassportNumber(e.target.value);
    } else if (e.target.name == "visanumber") {
      setvisaNumber(e.target.value);
    } else if (e.target.name == "visadate") {
      setvisaDate(e.target.value);
    } else if (e.target.name == "passport") {
      setpassportDate(e.target.value);
    } else if (e.target.name == "arrivedfrom") {
      setarrivedFrom(e.target.value);
    } else if (e.target.name == "placeofissue") {
      setplaceofIssue(e.target.value);
    } else if (e.target.name == "purpose") {
      setPurpose(e.target.value);
    }
  };
  return (
    <>
      <div className="row">
        <div className="col-md-12 row d-flex align-items-center rev-margin-gap">
          <div className="col-md-6 d-flex align-items-center rev-margin-gap">
            <label htmlFor="passportnumber" className="col-sm-6 col-form-label">
              Passport Number{" "}
            </label>
            <div className="col-sm-6">
              <input
                type="text"
                className="form-control height-30"
                id="inputpassportnumber"
                name="passportnumber"
                value={passportNumber}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="col-md-6 d-flex align-items-center rev-margin-gap">
            <label htmlFor="visanumber" className="col-sm-6 col-form-label">
              Visa Number{" "}
            </label>
            <div className="col-sm-6">
              <input
                type="text"
                className="form-control height-30"
                id="visanumber"
                name="visanumber"
                value={visaNumber}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>
        <div className="col-md-12 d-flex row align-items-center rev-margin-gap">
          <div className="col-md-6 d-flex align-items-center rev-margin-gap">
            <label htmlFor="passportdate" className="col-sm-6 col-form-label">
              Passport Date of issue{" "}
            </label>
            <div className="col-sm-6">
              <input
                type="date"
                className="form-control height-30"
                id="inputpassportDate"
                name="passportdate"
                value={passportDate}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="col-md-6 d-flex align-items-center rev-margin-gap">
            <label htmlFor="visadate" className="col-sm-6 col-form-label">
              Visa Date of issue{" "}
            </label>
            <div className="col-sm-5">
              <input
                type="date"
                className="form-control height-30"
                id="inputvisaDate"
                name="visadate"
                value={visaDate}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>
        <div className="col-md-12 d-flex row align-items-center rev-margin-gap">
          <div className="col-md-6 d-flex align-items-center rev-margin-gap">
            <label htmlFor="arrivedfrom" className="col-sm-6 col-form-label">
              Arrived From{" "}
            </label>
            <div className="col-sm-6">
              <input
                type="text"
                className="form-control height-30"
                id="inputarrivedfrom"
                name="arrivedfrom"
                value={arrivedFrom}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="col-md-6 d-flex align-items-center rev-margin-gap">
            <label htmlFor="placeofissue" className="col-sm-6 col-form-label">
              Visa Place of issue{" "}
            </label>
            <div className="col-sm-6">
              <input
                type="text"
                className="form-control height-30"
                id="inputplaceofissue"
                name="placeofissue"
                value={placeofIssue}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>
        <div className="col-md-12 d-flex row align-items-center rev-margin-gap">
          <label htmlFor="purpose" className="col-sm-6 col-form-label">
            Puporse duration of stay of hotel{" "}
          </label>
          <div className="col-sm-6">
            <input
              type="text"
              className="form-control height-30"
              id="inputpurpose"
              name="purpose"
              value={Purpose}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Other;
