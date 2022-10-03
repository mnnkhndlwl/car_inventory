import React, { useState } from "react";
import "./header.css";
import { nav } from "../../data/Data";
import { Link,useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/userSlice";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [navList, setNavList] = useState(false);
  const navigate = useHistory();
  const dispatch = useDispatch();

  const handleLogout = async (e) => {
    e.preventDefault();
    dispatch(logout());
    localStorage.clear();
    navigate.push(`/`);
  };


  return (
    <>
      <header>
        <div className="container flex">
          <div className="logo">
            <img src="./images/logo.png" alt=""  />
          </div>
          <div className="nav">
            <ul className={navList ? "small" : "flex"}>
              {nav.map((list, index) => (
                <li key={index}>
                  <Link to={list.path}>{list.text}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="button flex">
            {/* <h4>
              <span>2</span> My List
            </h4> */}
            {currentUser ? (
              <>
                 <div>
                <div>
                  <button className="btn1" onClick={handleLogout}>
                  <i className="fa fa-sign-out"></i> Log Out
                </button>
                </div>
              </div>
              </>
            ) : (
              <Link to="/Login">
                <button className="btn1">
                  <i className="fa fa-sign-out"></i> Sign In
                </button>
              </Link>
            )}

          </div>

          <div className="toggle">
            <button onClick={() => setNavList(!navList)}>
              {navList ? (
                <i className="fa fa-times"></i>
              ) : (
                <i className="fa fa-bars"></i>
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
