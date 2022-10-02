import React from "react";
import "./login.css";
import login from "../../img/login.svg";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config";
import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../../redux/userSlice";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axiosInstance.post("/api/authentication/signin", {
        name,
        password,
      });
      dispatch(loginSuccess(res.data));
      navigate("/");
    } catch (error) {
      dispatch(loginFailure());
    }
  };

  return (
    <div className="wrap">
      <div className="containerlogin" id="container">
        <div className="form-container log-in-container">
          <form className="loginform" action="#">
            <h1 className="hr2">Login</h1>
            <div className="social-container">
              <a href="#" className="social">
                <i className=" fab fa fa-google fa-2x"></i>
              </a>
            </div>
            <span className="loginspan">or use your account details</span>
            <input
              className="logininput"
              type="text"
              placeholder="username"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="logininput"
              type="password"
              placeholder="Password"
			  onChange={(e) => setPassword(e.target.value)}
            />
            <Link to="/home" style={{ textDecoration: "none" }}>
              <button className="loginbutton" onClick={handleLogin}>Log In</button>
            </Link>
            <h5 className="hr1"> Don't have account? </h5>
            <Link to="/Signup">
              <button className="p1">Please Sign In</button>
            </Link>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-right">
              <img className="signinimg" src={login} alt="logo" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
