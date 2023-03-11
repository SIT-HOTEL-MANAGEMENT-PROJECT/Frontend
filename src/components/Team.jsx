import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import shreya from "../img/shreya.jpeg";
import alik from "../img/alik.jpeg";
import srishti from "../img/srishti.jpeg";
import soumwadeep from "../img/soumwadeep.png";
import prittha from "../img/prittha.jpeg";
import sayantani from "../img/sayantani.jpeg";
import prasun from "../img/prasun.jpeg";
import sagnik from "../img/sagnik.jpeg";
import subham from "../img/subham.jpeg";
import arnab from "../img/arnab.png";
import diya from "../img/diya.jpeg";
const Team = () => {
  return (
    <>
      <div className="bg-light">
        <nav className="navbar sticky-top navbar navbar-expand-lg bg-light">
          <div className="container-fluid">
            <div className="navbar-brand d-flex align-items-center">
              <NavLink className="text-primary" to="/Home3">
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
                    class="fa fa-linkedin-square"
                    aria-hidden="true"
                    id="socialiconfix"
                  ></i>
                </a>
                &nbsp;&nbsp;
                <a href="https://twitter.com/ShreyaR19458856">
                  <i
                    class="fa fa-twitter-square"
                    aria-hidden="true"
                    id="socialiconfix"
                  ></i>
                </a>
                &nbsp;&nbsp;
                <a href="https://www.instagram.com/i_am_shreya_roy/">
                  <i
                    class="fa fa-instagram"
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
                <img src={alik} className="card-img-top" alt="..." />
                <div className="card-body">
                  <center>
                    <p className="card-text">Alik Sarkar</p>
                    <a href="https://www.linkedin.com/in/alik-sarkar-901346225">
                      <i
                        class="fa fa-linkedin-square"
                        aria-hidden="true"
                        id="socialiconfix"
                      ></i>
                    </a>
                    &nbsp;&nbsp;
                    <a href="https://twitter.com/AlikSarkar16?t=wO12PN_jFAR1SSt
E0tQlCg&s=09">
                      <i
                        class="fa fa-twitter-square"
                        aria-hidden="true"
                        id="socialiconfix"
                      ></i>
                    </a>
                    &nbsp;&nbsp;
                    <a href="https://instagram.com/alik_sarkar_18?igshid=ZDdkNTZ
iNTM=">
                      <i
                        class="fa fa-instagram"
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
                <img src={srishti} className="card-img-top" alt="..." />
                <div className="card-body">
                  <center>
                    <p className="card-text">Srishti Majumder</p>
                    <a href="https://www.linkedin.com/in/srishti-majumder-6560bb200/">
                      <i
                        class="fa fa-linkedin-square"
                        aria-hidden="true"
                        id="socialiconfix"
                      ></i>
                    </a>
                    &nbsp;&nbsp;
                    <a href="https://twitter.com/MajumderSrishti">
                      <i
                        class="fa fa-twitter-square"
                        aria-hidden="true"
                        id="socialiconfix"
                      ></i>
                    </a>
                    &nbsp;&nbsp;
                    <a href="https://www.instagram.com/srishti.majumder.7074/">
                      <i
                        class="fa fa-instagram"
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
                        class="fa fa-linkedin-square"
                        aria-hidden="true"
                        id="socialiconfix"
                      ></i>
                    </a>
                    &nbsp;&nbsp;
                    <a href="https://github.com/soumwadeep">
                      <i
                        class="fa fa-github-square"
                        aria-hidden="true"
                        id="socialiconfix"
                      ></i>
                    </a>
                    &nbsp;&nbsp;
                    <a href="https://www.instagram.com/soumwadeep/">
                      <i
                        class="fa fa-instagram"
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
                <img src={prittha} className="card-img-top" alt="..." />
                <div className="card-body">
                  <center>
                    <p className="card-text">Prittha Dutta</p>
                    <a href="#">
                      <i
                        class="fa fa-linkedin-square"
                        aria-hidden="true"
                        id="socialiconfix"
                      ></i>
                    </a>
                    &nbsp;&nbsp;
                    {/* <a href="#">
                      <i
                        class="fa fa-github-square"
                        aria-hidden="true"
                        id="socialiconfix"
                      ></i>
                    </a>
                    &nbsp;&nbsp; */}
                    <a href="#">
                      <i
                        class="fa fa-instagram"
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
                <img src={sayantani} className="card-img-top" alt="..." />
                <div className="card-body">
                  <center>
                    <p className="card-text">Sayantani Sarkar</p>
                    <a href="#">
                      <i
                        class="fa fa-linkedin-square"
                        aria-hidden="true"
                        id="socialiconfix"
                      ></i>
                    </a>
                    &nbsp;&nbsp;
                    <a href="#">
                      <i
                        class="fa fa-twitter-square"
                        aria-hidden="true"
                        id="socialiconfix"
                      ></i>
                    </a>
                    &nbsp;&nbsp;
                    <a href="#">
                      <i
                        class="fa fa-instagram"
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
                    <a href="#">
                      <i
                        class="fa fa-linkedin-square"
                        aria-hidden="true"
                        id="socialiconfix"
                      ></i>
                    </a>
                    &nbsp;&nbsp;
                    <a href="#">
                      <i
                        class="fa fa-twitter-square"
                        aria-hidden="true"
                        id="socialiconfix"
                      ></i>
                    </a>
                    &nbsp;&nbsp;
                    <a href="#">
                      <i
                        class="fa fa-instagram"
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
                    <a href="#">
                      <i
                        class="fa fa-linkedin-square"
                        aria-hidden="true"
                        id="socialiconfix"
                      ></i>
                    </a>
                    &nbsp;&nbsp;
                    <a href="#">
                      <i
                        class="fa fa-twitter-square"
                        aria-hidden="true"
                        id="socialiconfix"
                      ></i>
                    </a>
                    &nbsp;&nbsp;
                    <a href="#">
                      <i
                        class="fa fa-instagram"
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
                <img src={subham} className="card-img-top" alt="..." />
                <div className="card-body">
                  <center>
                    <p className="card-text">Subham</p>
                    <a href="#">
                      <i
                        class="fa fa-linkedin-square"
                        aria-hidden="true"
                        id="socialiconfix"
                      ></i>
                    </a>
                    &nbsp;&nbsp;
                    <a href="#">
                      <i
                        class="fa fa-twitter-square"
                        aria-hidden="true"
                        id="socialiconfix"
                      ></i>
                    </a>
                    &nbsp;&nbsp;
                    <a href="#">
                      <i
                        class="fa fa-instagram"
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
          <center>
            <div className="row">
              <div className="col-sm">
                <div className="card teamcard">
                  <img src={arnab} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <center>
                      <p className="card-text">Arnab Saha</p>
                      <a href="#">
                        <i
                          class="fa fa-linkedin-square"
                          aria-hidden="true"
                          id="socialiconfix"
                        ></i>
                      </a>
                      &nbsp;&nbsp;
                      <a href="#">
                        <i
                          class="fa fa-twitter-square"
                          aria-hidden="true"
                          id="socialiconfix"
                        ></i>
                      </a>
                      &nbsp;&nbsp;
                      <a href="#">
                        <i
                          class="fa fa-instagram"
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
                  <img src={diya} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <center>
                      <p className="card-text">Diya Sarkar</p>
                      <a href="#">
                        <i
                          class="fa fa-linkedin-square"
                          aria-hidden="true"
                          id="socialiconfix"
                        ></i>
                      </a>
                      &nbsp;&nbsp;
                      <a href="#">
                        <i
                          class="fa fa-twitter-square"
                          aria-hidden="true"
                          id="socialiconfix"
                        ></i>
                      </a>
                      &nbsp;&nbsp;
                      <a href="#">
                        <i
                          class="fa fa-instagram"
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
          </center>
        </div>
      </div>
    </>
  );
};

export default Team;
