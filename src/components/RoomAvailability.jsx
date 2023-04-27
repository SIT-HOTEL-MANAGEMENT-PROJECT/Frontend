/* eslint-disable eqeqeq */
import React from "react";
import { useState, useEffect } from "react";
import {Link, NavLink} from "react-router-dom";
import Localbase from "localbase";
let db = new Localbase("hmctdb");
db.config.debug = false;

// function hoverimg1
// {

// }

const RoomAvailability = ({initializeDatabase}) => {
  const [roomData, setRoomData] = useState({});
  const [roomDataPart1, setRoomDataPart1] = useState({});
  const [roomDataPart2, setRoomDataPart2] = useState({});
  const [roomDataPart3, setRoomDataPart3] = useState({});

  useEffect(() => {
    async function fetchInitialData() {
      let roomResData = await getRoomsData("standard");
      if(roomResData.success){
        setRoomData(roomResData.data);
      }
    }
    setTimeout(() => {
      fetchInitialData();
    }, 3000);
  }, []);


  useEffect(() => { divideDataAccordingToRow(); }, [roomData])
  


  // Get : Get room no and their availability status
  // params : roomType ->  ('standard', 'delux', 'executive') only
  // return : 1. {success: true, data: {101: {av: '0', bookingid: ""}, 
  //                                    102: {av:'1',bookingid:""}, 
  //                                    103: {av:'2',bookingid:""}}              IF ALL OK
  //          2. {success: false, msg: 'Invalid Input'}                          IF INVALID INPUT
  //          3. {success: false, msg: 'Something went wrong'}                   IF INTERNAL SERVER ERROR
  const getRoomsData = async (roomType) => {
    let collectionExist = await db.collection("roomavailability").get();

    if (!collectionExist.length) {
      return { success: false, msg: "Something Went Wrong" };
    }

    let data = await db.collection("roomavailability").get();
    let roomData = data[0][roomType];

    if (!roomData) {
      return { success: false, msg: "Invalid Input" };
    }

    return { success: true, data: roomData };
  };

  // Reset : delete collection then reinitialize collection
  // params : none             return : none
  // eslint-disable-next-line
  const resetDatabase = async () => {
    let collectionExist = await db.collection("roomavailability").get();
    if (collectionExist.length) {
      await db.collection("roomavailability").delete();
    }
    await initializeDatabase();
  };


  const divideDataAccordingToRow = ()=>{
    const objectKeys = Object.keys(roomData);
    const objectValues = Object.values(roomData);

    const divIndex = Math.ceil(objectKeys.length / 3);

    const keys1 = objectKeys.slice(0, divIndex);
    const keys2 = objectKeys.slice(divIndex, divIndex * 2);
    const keys3 = objectKeys.slice(divIndex * 2);

    const values1 = objectValues.slice(0, divIndex);
    const values2 = objectValues.slice(divIndex, divIndex * 2);
    const values3 = objectValues.slice(divIndex * 2);

    const part1Obj = keys1.reduce(  (acc, curr, index) => ({ ...acc, [curr]: values1[index] }), {}  );
    const part2Obj = keys2.reduce(  (acc, curr, index) => ({ ...acc, [curr]: values2[index] }), {}  );
    const part3Obj = keys3.reduce(  (acc, curr, index) => ({ ...acc, [curr]: values3[index] }), {}  );

    setRoomDataPart1(part1Obj);
    setRoomDataPart2(part2Obj);
    setRoomDataPart3(part3Obj);
  }


  
  return (
    <>
      <nav className="navbar sticky-top navbar navbar-expand-lg">
        <div className="container-fluid">
          <div className="navbar-brand d-flex align-items-center">
            <NavLink className="text-primary" to="/Home4">
              <i className="bx bx-chevrons-left font-size-25"></i>
            </NavLink>
            <h5 className="text-primary">Room Availaibility</h5>
          </div>
        </div>
      </nav>
      <div className="container">
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <center>
              <div className="navbar-nav">
                <NavLink
                  className="nav-link active text-primary"
                  aria-current="page"
                  to="/RoomAvailability"
                >
                  <u>Standard</u>
                </NavLink>
                <NavLink className="nav-link text-primary" to="/Duluxe">
                  Duluxe
                </NavLink>
                <NavLink className="nav-link text-primary" to="/Executive">
                  Executive
                </NavLink>
              </div>
            </center>
          </div>
        </nav>
        <div className="image-slider">
          {/* Rooms icons */}
          {/* <div className="row">
          {roomDataPart1 && Object.entries(roomDataPart1).map(([roomno, roomav]) => {
            return <div key={roomno} className="col-sm">
              <div className={`${roomav.av == '0' ? 'roomcircleyellow' : ''} ${roomav.av == '1' ? 'roomcirclegreen' : ''} ${roomav.av == '2' ? 'roomcirclered' : ''}`} >
                {roomno}
              </div>
            </div>
          })}
        </div> */}
          <div className="row">
            {roomDataPart1 &&
              Object.entries(roomDataPart1).map(([roomno, roomav]) => {
                const isRoomAvailable = roomav.av === "1";
                return (
                  <div key={roomno} className="col-sm">
                    <div
                      className={`${
                        roomav.av == "0" ? "roomcircleyellow" : ""
                      } ${roomav.av == "1" ? "roomcirclegreen" : ""} ${
                        roomav.av == "2" ? "roomcirclered" : ""
                      }`}
                      onClick={() => {
                        if (isRoomAvailable) {
                          window.location.href = `/Reservation?roomtype=Standard&roomnumber=${roomno}`;
                        }
                      }}
                    >
                      {roomno}
                    </div>
                  </div>
                );
              })}
          </div>

          {/* <div className="row">
            {roomDataPart2 &&
              Object.entries(roomDataPart2).map(([roomno, roomav]) => {
                return (
                  <div key={roomno} className="col-sm">
                    <div
                      className={`${
                        roomav.av == "0" ? "roomcircleyellow" : ""
                      } ${roomav.av == "1" ? "roomcirclegreen" : ""} ${
                        roomav.av == "2" ? "roomcirclered" : ""
                      }`}
                    >
                      {roomno}
                    </div>
                  </div>
                );
              })}
          </div> */}

          <div className="row">
            {roomDataPart2 &&
              Object.entries(roomDataPart2).map(([roomno, roomav]) => {
                const isRoomAvailable = roomav.av === "1";
                return (
                  <div key={roomno} className="col-sm">
                    <div
                      className={`${
                        roomav.av == "0" ? "roomcircleyellow" : ""
                      } ${roomav.av == "1" ? "roomcirclegreen" : ""} ${
                        roomav.av == "2" ? "roomcirclered" : ""
                      }`}
                      onClick={() => {
                        if (isRoomAvailable) {
                          window.location.href = `/Reservation?roomtype=Standard&roomnumber=${roomno}`;
                        }
                      }}
                    >
                      {roomno}
                    </div>
                  </div>
                );
              })}
          </div>

          {/* <div className="row">
            {roomDataPart3 &&
              Object.entries(roomDataPart3).map(([roomno, roomav]) => {
                return (
                  <div key={roomno} className="col-sm">
                    <div
                      className={`${
                        roomav.av == "0" ? "roomcircleyellow" : ""
                      } ${roomav.av == "1" ? "roomcirclegreen" : ""} ${
                        roomav.av == "2" ? "roomcirclered" : ""
                      }`}
                    >
                      {roomno}
                    </div>
                  </div>
                );
              })}
          </div> */}

          <div className="row">
            {roomDataPart3 &&
              Object.entries(roomDataPart3).map(([roomno, roomav]) => {
                const isRoomAvailable = roomav.av === "1";
                return (
                  <div key={roomno} className="col-sm">
                    <div
                      className={`${
                        roomav.av == "0" ? "roomcircleyellow" : ""
                      } ${roomav.av == "1" ? "roomcirclegreen" : ""} ${
                        roomav.av == "2" ? "roomcirclered" : ""
                      }`}
                      onClick={() => {
                        if (isRoomAvailable) {
                          window.location.href = `/Reservation?roomtype=Standard&roomnumber=${roomno}`;
                        }
                      }}
                    >
                      {roomno}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <br />
        <center>
          <div className="row">
            <div className="col-sm">
              <div className="roomcirclered keyvar"></div>
              <b>Dirty</b>
            </div>
            <div className="col-sm">
              <div className="roomcircleyellow keyvar"></div>
              <b>Occupied</b>
            </div>
            <div className="col-sm">
              <div className="roomcirclegreen keyvar"></div>
              <b>Available</b>
            </div>
          </div>
        </center>
      </div>
    </>
  );
};

export default RoomAvailability;
