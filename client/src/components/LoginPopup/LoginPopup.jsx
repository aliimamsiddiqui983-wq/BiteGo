import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);

  const [currState, setCurrState] = useState("Login");

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onLogin = async (event) => {
    event.preventDefault();

    try {
      let endpoint =
        currState === "Login"
          ? "/api/user/login"
          : "/api/user/register";

      const response = await axios.post(
        url + endpoint,
        data
      );

      console.log("User login response:", response.data);

      if (!response.data.success) {
        alert(response.data.message);
        return;
      }

      // Normal USER token
      setToken(response.data.token);

      localStorage.setItem(
        "token",
        response.data.token
      );

      // Close popup
      setShowLogin(false);

      console.log("User login successful");
    } catch (error) {
      console.error("User login error:", error);

      if (error.response) {
        alert(
          error.response.data.message ||
            "Login failed"
        );
      } else {
        alert("Cannot connect to server");
      }
    }
  };

  return (
    <div className="login-popup">
      <form
        onSubmit={onLogin}
        className="login-popup-container"
      >
        <div className="login-popup-title">
          <h2>{currState}</h2>

          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="close"
          />
        </div>

        <div className="login-popup-inputs">
          {currState === "Sign Up" && (
            <input
              onChange={onChangeHandler}
              name="name"
              value={data.name}
              type="text"
              placeholder="Your name"
              required
            />
          )}

          <input
            onChange={onChangeHandler}
            name="email"
            value={data.email}
            type="email"
            placeholder="Your email"
            required
          />

          <input
            onChange={onChangeHandler}
            name="password"
            value={data.password}
            type="password"
            placeholder="Password"
            required
          />
        </div>

        <button type="submit">
          {currState === "Login"
            ? "Login"
            : "Create account"}
        </button>

        <div className="login-popup-condition">
          <input type="checkbox" required />

          <p>
            By continuing, I agree to the terms of use
            and privacy policy
          </p>
        </div>

        {currState === "Login" ? (
          <p>
            Create a new account?
            <span
              onClick={() => setCurrState("Sign Up")}
            >
              {" "}
              Click here
            </span>
          </p>
        ) : (
          <p>
            Already have an account?
            <span
              onClick={() => setCurrState("Login")}
            >
              {" "}
              Login here
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;