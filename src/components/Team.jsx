import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import shreya from "../img/shreya.jpeg";
import soumwadeep from "../img/soumwadeep.png";
import prittha from "../img/prittha.jpeg";
import prasun from "../img/prasun.jpeg";
import sagnik from "../img/sagnik.jpeg";
import diya from "../img/diya.jpeg";
const Team = () => {
  return (
    <>
      <div className="bg-light">
        <nav className="navbar sticky-top navbar navbar-expand-lg bg-light">
          <div className="container-fluid">
            <div className="navbar-brand d-flex align-items-center">
              <NavLink className="text-primary" to="/Home4">
                <i className="bx bx-chevrons-left font-size-25"></i>
              </NavLink>
              <h5 className="text-primary">Team</h5>
            </div>
          </div>
        </nav>
        <div className="container mb-1">
          <h4 className="text-center text-primary">
            This Web Application has been created by department of Computer
            Science and Engineering batch 2024 for Hotel Management Department
            of Siliguri Institute of Technology.
          </h4>
          <br />
          <h5>
            Here are Team of CSE department of Siliguri Institute of Technology
            :
          </h5>
          <br />
          <h6 className="text-primary">UI/UX team :</h6>
          <div className="card teamcard">
            <img src={shreya} className="card-img-top" alt="..." />
            <div className="card-body">
              <center>
                <p className="card-text">Shreya Roy</p>
                <a href="https://www.linkedin.com/in/shreya-roy-3147881b7/">
                  <i
                    className="fa fa-linkedin-square"
                    aria-hidden="true"
                    id="socialiconfix"
                  ></i>
                </a>
                &nbsp;&nbsp;
                <a href="https://twitter.com/ShreyaR19458856">
                  <i
                    className="fa fa-twitter-square"
                    aria-hidden="true"
                    id="socialiconfix"
                  ></i>
                </a>
                &nbsp;&nbsp;
                <a href="https://www.instagram.com/i_am_shreya_roy/">
                  <i
                    className="fa fa-instagram"
                    aria-hidden="true"
                    id="socialiconfix"
                  ></i>
                </a>
                &nbsp;&nbsp;
              </center>
            </div>
          </div>
          <br />
          <h6 className="text-primary">Front-End Team :</h6>
          <div className="row">
            <div className="col-sm">
              <div className="card teamcard">
                <img src={prittha} className="card-img-top" alt="..." />
                <div className="card-body">
                  <center>
                    <p className="card-text">Prittha Dutta</p>
                    <a href="https://www.linkedin.com/in/prittha-datta-2679ba1b7">
                      <i
                        className="fa fa-linkedin-square"
                        aria-hidden="true"
                        id="socialiconfix"
                      ></i>
                    </a>
                    &nbsp;&nbsp;
                    {/* <a href="#">
                      <i
                        className="fa fa-github-square"
                        aria-hidden="true"
                        id="socialiconfix"
                      ></i>
                    </a>
                    &nbsp;&nbsp; */}
                    <a href="https://instagram.com/the.pritthadatta?utm_medium=copy_link">
                      <i
                        className="fa fa-instagram"
                        aria-hidden="true"
                        id="socialiconfix"
                      ></i>
                    </a>
                    &nbsp;&nbsp;
                  </center>
                </div>
              </div>
            </div>
            <div className="col-sm">
              <div className="card teamcard">
                <img src={soumwadeep} className="card-img-top" alt="..." />
                <div className="card-body">
                  <center>
                    <p className="card-text">Soumwadeep Guha</p>
                    <a href="https://www.linkedin.com/in/soumwadeepguha/">
                      <i
                        className="fa fa-linkedin-square"
                        aria-hidden="true"
                        id="socialiconfix"
                      ></i>
                    </a>
                    &nbsp;&nbsp;
                    <a href="https://github.com/soumwadeep">
                      <i
                        className="fa fa-github-square"
                        aria-hidden="true"
                        id="socialiconfix"
                      ></i>
                    </a>
                    &nbsp;&nbsp;
                    <a href="https://www.instagram.com/soumwadeep/">
                      <i
                        className="fa fa-instagram"
                        aria-hidden="true"
                        id="socialiconfix"
                      ></i>
                    </a>
                    &nbsp;&nbsp;
                  </center>
                </div>
              </div>
            </div>
          </div>
          <br />
          <h6 className="text-primary">Back-End Team :</h6>
          <div className="row">
            <div className="col-sm">
                <div className="card teamcard">
                  <img src={diya} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <center>
                      <p className="card-text">Diya Sarkar</p>
                      <a href="#">
                        <i
                          className="fa fa-linkedin-square"
                          aria-hidden="true"
                          id="socialiconfix"
                        ></i>
                      </a>
                      {/* // &nbsp;&nbsp;
                     // <a href="#">
                       // <i
                         // className="fa fa-twitter-square"
                          //aria-hidden="true"
                          //id="socialiconfix"
                        //></i>
                      //</a>
                     // &nbsp;&nbsp; */}
                      <a href="#">
                        <i
                          className="fa fa-instagram"
                          aria-hidden="true"
                          id="socialiconfix"
                        ></i>
                      </a>
                      &nbsp;&nbsp;
                    </center>
                  </div>
                </div>
            </div>
            <div className="col-sm">
              <div className="card teamcard">
                <img src={prasun} className="card-img-top" alt="..." />
                <div className="card-body">
                  <center>
                    <p className="card-text">Prasun Roy</p>
                    <a href="https://www.linkedin.com/in/prasun-roy-/">
                      <i
                        className="fa fa-linkedin-square"
                        aria-hidden="true"
                        id="socialiconfix"
                      ></i>
                    </a>
                    &nbsp;&nbsp;
                    <a href="https://twitter.com/Prasun_Roy_">
                      <i
                        className="fa fa-twitter-square"
                        aria-hidden="true"
                        id="socialiconfix"
                      ></i>
                    </a>
                    &nbsp;&nbsp;
                    <a href="https://www.instagram.com/_prasun_roy_/">
                      <i
                        className="fa fa-instagram"
                        aria-hidden="true"
                        id="socialiconfix"
                      ></i>
                    </a>
                    &nbsp;&nbsp;
                  </center>
                </div>
              </div>
            </div>
            <div className="col-sm">
              <div className="card teamcard">
                <img src={sagnik} className="card-img-top" alt="..." />
                <div className="card-body">
                  <center>
                    <p className="card-text">Sagnik Saha</p>
                    <a href="https://www.linkedin.com/in/sagnik-saha-6a1764206/">
                      <i
                        className="fa fa-linkedin-square"
                        aria-hidden="true"
                        id="socialiconfix"
                      ></i>
                    </a>
                    &nbsp;&nbsp;
                    <a href="https://twitter.com/SagnikS37101340">
                      <i
                        className="fa fa-twitter-square"
                        aria-hidden="true"
                        id="socialiconfix"
                      ></i>
                    </a>
                    &nbsp;&nbsp;
                    <a href="#">
                      <i
                        className="fa fa-instagram"
                        aria-hidden="true"
                        id="socialiconfix"
                      ></i>
                    </a>
                    &nbsp;&nbsp;
                  </center>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Team;
