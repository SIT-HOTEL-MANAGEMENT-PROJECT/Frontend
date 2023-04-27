/* eslint-disable eqeqeq */
import React from "react";
import { NavLink } from "react-router-dom";
import homeimg from "../img/homeimg.png";
import Cookies from "js-cookie";
import Localbase from "localbase";
let db = new Localbase("hmctdb");
db.config.debug = false;

const Home = () => {
  // Check :  Login into App
  // params : role(Admin/Employee),username,password                                          (Case Sensitive)
  // return :   1.  {success:true} + Set Cookie('isLoggedIn','name','username','role')        IF CORRECT Credentials
  //            2.  {success:false, msg: 'Invalid Credentials! Try Again!'}                   IF INCORRECT Credentials
  //            3.  {success:false, msg: 'Something Went Wrong!'}                             IF DB Error
  const LoginAction = async (role, username, password) => {
    try {
      LogoutAction();

      let user = await db.collection("users").doc({ role: role }).get();

      if (!user) return { success: false, msg: "Something Went Wrong!" };

      if (
        user.role === role &&
        user.username === username &&
        user.password === password
      ) {
        Cookies.set("isLoggedIn", "true", { expires: 0.5 });
        Cookies.set("name", `${user.name}`, { expires: 0.5 });
        Cookies.set("username", `${user.username}`, { expires: 0.5 });
        Cookies.set("role", `${user.role}`, { expires: 0.5 });
        return { success: true };
      } else {
        return { success: false, msg: "Invalid Credentials! Try Again!" };
      }
    } catch (e) {
      console.log("LoginPageError (loginAction) : ", e);
      return { success: false, msg: "Something Went Wrong" };
    }
  };

  // Check :  Logout from App
  // params : none
  // return :   1.  {success:true} + Remove Cookie('isLoggedIn','name','username','role')     IF CORRECT Credentials
  //            2.  {success:false, msg: 'Something Went Wrong!'}                             IF DB Error
  const LogoutAction = () => {
    try {
      if (Cookies.get("isLoggedIn")) {
        Cookies.remove("isLoggedIn");
      }
      if (Cookies.get("name")) {
        Cookies.remove("name");
      }
      if (Cookies.get("username")) {
        Cookies.remove("username");
      }
      if (Cookies.get("role")) {
        Cookies.remove("role");
      }
      return { success: true };
    } catch (e) {
      console.log("LoginPageError (logoutAction) : ", e);
      return { success: false, msg: "Something Went Wrong" };
    }
  };

  const [role, setRole] = React.useState("Employee");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await LoginAction(role, username, password);
    if (result.success) {
      window.location.href = "/Home4";
    } else {
      alert(result.msg);
    }
  };

  return (
    <div className="container" id="HomeCss">
      <div className="row">
        <div className="col-sm" id="homeimgcss">
          <img src={homeimg} className="imgformfix" />
        </div>
        <div className="col-sm">
          <form className="formcss" onSubmit={handleSubmit}>
            <div className="mb-3">
              <div className="row">
                <div className="col-sm">
                  {" "}
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    <h4>Role:</h4>
                  </label>
                </div>
                <div className="col-sm">
                  <select
                    name="roles"
                    id="roles"
                    className="selectcss"
                    onChange={(e) => setRole(e.target.value)}
                    defaultValue="Employee"
                  >
                    <option value="Admin">Admin</option>
                    <option value="Employee">
                      Employee
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <div className="row">
                <div className="col-sm">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    <h4>Username:</h4>
                  </label>
                </div>
                <div className="col-sm">
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={username}
                    aria-describedby="emailHelp"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="mb-3">
              <div className="row">
                <div className="col-sm">
                  <h4>
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Password:
                    </label>
                  </h4>
                </div>
                <div className="col-sm">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    aria-describedby="emailHelp"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <center>
              <button type="submit" className="btn btn-primary">
                Sign In
              </button>
            </center>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
