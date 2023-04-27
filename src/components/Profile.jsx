/* eslint-disable eqeqeq */
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../CustomCss/Reservation.css";
import Cookies from 'js-cookie'
import Localbase from "localbase";
import { useEffect } from "react";
let db = new Localbase("hmctdb");
db.config.debug = false;

const Profile = () => {  
  const [userdata, setUserdata] = useState({});
  

  useEffect(() => {
    getAndSetUserData();
  }, [])
  

  // Get : Get all data of logged-in user using username
  // params : none         (In Background it take Cookies to get data)
  // return : 1. {success: true, data: {role: "",  username: "",  password: "", name:"",  email:"", 
  //                                    phoneno: "", designation:"", usersince: "", shift: ""}  }            IF ALL OK
  //          2. {success: false, msg: 'Something went wrong'}                                               IF SERVER ERROR
  //          3. {success: false, msg: 'User not found!'}                                                    IF USER NOT FOUND
  const getUserData = async()=>{
    try{
      let username = Cookies.get('username');
      let user = await db.collection("users").doc({ username: username }).get();

      if(!user) return {success:false, msg: 'User not found!' }

      return {success:true, data:user};
    }catch(e){
      console.log("ProfilePageError (getUserData) : ",e);
      return {success:false, msg: 'Something Went Wrong' }
    }
  }


  // Update : Update user data based on username(const)
  // params : role,username,password,name,email,phoneno,designation,usersince,shift
  // return : 1. {success: true}                                                                   IF ALL OK
  //          2. {success: false, msg: 'Invalid Username'}                                         IF USERNAME NOT FOUND
  //          3. {success: false, msg: 'Something Went Wrong'}                                     IF SERVER ERROR
  const updateUserData = async(role,username,password,name,email,phoneno,designation,usersince,shift)=>{
    try{
      if(!username) return {success:false, msg: "Invalid Username"};
      
      let user = await db.collection("users").doc({ username: username }).get();
      if(!user) return {success:false, msg: 'Invalid Username' }

      await db.collection("users").doc({ username: username }).update({
        role: role,  username: username,  password: password, name: name,  email: email, 
        phoneno: phoneno,  designation:designation, usersince: usersince, shift: shift
      });

      return {success: true}
    }catch(e){
      console.log("ProfilePageError (updateUserData) : ",e);
      return {success:false, msg: 'Something Went Wrong' }
    }
  }



  const getAndSetUserData = async()=>{
    let res = await getUserData();
    if(res.success){
      setUserdata(res?.data);
    }
  }
  

  return (
    <div className="bg-light min-height-vh">
      <nav className="navbar sticky-top navbar navbar-expand-lg">
        <div className="container-fluid">
          <div className="navbar-brand d-flex align-items-center">
            <NavLink className="text-primary" to="/Home4">
              <i className="bx bx-chevrons-left font-size-25"></i>
            </NavLink>
            <h5 className="text-primary">Profile</h5>
          </div>
        </div>
      </nav>
      <div className="profile-box container">
        <div className="row">
          <div className="col-sm">
            <i className="fa fa-user-o" aria-hidden="true" id="iconfix"></i>
            <br />
            <p className="mx-4" style={{ color: "rgba(71, 99, 253, 1)" }}>
              Edit Picture
            </p>
            <div className="profile-details">
              <p>
                <b>Name:</b> {userdata.name}
              </p>
              <p>
                <b>Username:</b> {userdata.username}
              </p>
              <p>
                <b>Password:</b> ********
              </p>
            </div>
          </div>
          <div className="col-sm mt-5">
            <div className="profile-details">
              <p>
                <b>Email ID:</b> {userdata.email}
              </p>
              <p>
                <b>Phone No:</b> {userdata.phoneno}
              </p>
              <p>
                <b>Designation:</b> {userdata.designation}
              </p>
              <p>
                <b>Use As:</b> {userdata.role}
              </p>
              <p>
                <b>User Since:</b> {userdata.usersince}
              </p>
              <p>
                <b>Shift:</b> {userdata.shift}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
