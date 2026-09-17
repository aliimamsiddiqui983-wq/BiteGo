import React from "react";
import { FaGithub } from "react-icons/fa";
import "./Footer.css";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <>
      <div id="footer" className="footer">
        <div className="footer-content">
          <div className="footer-content-left">
            <img src={assets.logo} alt="" />
            <p>
            A good food delivery platform.
            </p>
            <div className="footer-social-icons">
              <img src={assets.facebook_icon} alt="" />
              <img src={assets.twitter_icon} alt="" />
              <a href="https://www.linkedin.com/in/ali-imam-95a317295/" target="blank"><img src={assets.linkedin_icon} alt="" /></a>
            </div>
          </div>
          <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
              <li>Home</li>
              <li>About us</li>
              <li>Delivery</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
              <li>+91-79xxxxxx56</li>
              <li>contact@bitego.com</li>
            </ul>
          </div>
        </div>
        <hr />
        <p className="footer-copyright">
          Copyright 2026 © BiteGo - All Rights Reserved.
        </p>
      </div>
    </>
  );
};

export default Footer;
