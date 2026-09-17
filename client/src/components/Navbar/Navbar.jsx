import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");

  const { getTotalCartAmount, token, setToken, buttonRef } =
    useContext(StoreContext);

  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  // Check if current page is Admin Login
  const isAdminLoginPage = location.pathname === "/admin-login";

  return (
    <>
      <div className="navbar">
        <Link to="/">
          <img className="logo" src={assets.logo} alt="BiteGo" />
        </Link>

        <ul className="navbar-menu">
          <Link
            to="/"
            onClick={() => setMenu("home")}
            className={menu === "home" ? "active" : ""}
          >
            home
          </Link>

          <a
            href="#explore-menu"
            onClick={() => setMenu("menu")}
            className={menu === "menu" ? "active" : ""}
          >
            menu
          </a>

          <a
            href="#app-download"
            onClick={() => setMenu("mobile-app")}
            className={menu === "mobile-app" ? "active" : ""}
          >
            mobile-app
          </a>

          <a
            href="#footer"
            onClick={() => setMenu("contact-us")}
            className={menu === "contact-us" ? "active" : ""}
          >
            contact us
          </a>

          {/* <Link
            to="/admin-login"
            onClick={() => setMenu("admin")}
            className={`admin-button ${menu === "admin" ? "active" : ""}`}
          >
            Admin
          </Link> */}
          <Link
            to="/admin-login"
            onClick={() => {
              setMenu("admin");
              setShowLogin(false);
            }}
            className={`admin-button ${menu === "admin" ? "active" : ""}`}
          >
            Admin
          </Link>
        </ul>

        <div className="navbar-right">
          <img src={assets.search_icon} alt="" />

          <div className="navbar-search-icon">
            <Link to="/cart">
              <img src={assets.basket_icon} alt="" />
            </Link>

            <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
          </div>

          {/* Normal user login/profile */}
          {!isAdminLoginPage &&
            (!token ? (
              <button
                ref={buttonRef}
                className="signup-button"
                onClick={() => setShowLogin(true)}
              >
                sign in
              </button>
            ) : (
              <div className="navbar-profile">
                <img src={assets.profile_icon} alt="" />

                <ul className="nav-profile-dropdown">
                  <li
                    onClick={() => {
                      navigate("/myorders");
                    }}
                  >
                    <img src={assets.bag_icon} alt="" />
                    <p>Orders</p>
                  </li>

                  <hr />

                  <li onClick={logout}>
                    <img src={assets.logout_icon} alt="" />
                    <p>Logout</p>
                  </li>
                </ul>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;
