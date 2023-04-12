import React from "react";
import { NavLink } from "react-router-dom";
import "../CustomCss/Reservation.css";
import Cookies from 'js-cookie'
import Localbase from "localbase";
let db = new Localbase("hmctdb");
db.config.debug = false;

const Profile = () => {  

  
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



  
  return (
    <div className="bg-light min-height-vh">
      <nav className="navbar sticky-top navbar navbar-expand-lg">
        <div className="container-fluid">
          <div className="navbar-brand d-flex align-items-center">
            <NavLink className="text-primary" to="/Home3">
              <i className="bx bx-chevrons-left"></i>
            </NavLink>
            <h5 className="text-primary">Profile</h5>
          </div>
        </div>
      </nav>
      <div className="profile-box">
        <div className="row">
          <div className="col-sm">
            <i className="fa fa-user-o" aria-hidden="true" id="iconfix"></i>
            <br />
            <p className="mx-4" style={{ color: "rgba(71, 99, 253, 1)" }}>
              Edit Picture
            </p>
            <div className="profile-details">
              <p>
                <b>Name:</b> SIT HMCT
              </p>
              <p>
                <b>Username:</b> SITHMCT
              </p>
              <p>
                <b>Password:</b> ********
              </p>
            </div>
          </div>
          <div className="col-sm mt-5">
            <div className="profile-details">
              <p>
                <b>Email ID:</b> sithmctweb@gmail.com
              </p>
              <p>
                <b>Phone No:</b> 1234567890
              </p>
              <p>
                <b>Designation:</b> Manager
              </p>
              <p>
                <b>Use As:</b> Admin
              </p>
              <p>
                <b>User Since:</b> 2022
              </p>
              <p>
                <b>Shift:</b> Morning
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
