import React, { useState } from "react";
import "./AdminLogin.css";
import { toast } from "react-toastify";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
              "http://localhost:4000/api/user/admin-login",

        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      console.log("Login response:", data);

      if (!data.success) {
        toast.error(data.message);
        return;
      }

      if (!data.isAdmin) {
        toast.error("You are not an admin");
        return;
      }

      localStorage.setItem("adminToken", data.token);

      toast.success("Admin login successful");

      window.location.href = "http://localhost:5174";
    } catch (error) {
      console.log("Login error:", error);
      toast.error("Server connection failed");
    }
  };

  return (
    <div className="admin-login">
      <form
        onSubmit={handleLogin}
        className="admin-login-form"
      >
        <h2>Admin Login</h2>

        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;