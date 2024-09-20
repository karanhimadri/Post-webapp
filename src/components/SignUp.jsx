import React, { useState } from "react";
import "../App.css";
import authService from "../AuthService/auth";
import { useNavigate } from "react-router-dom";
import { RxCrossCircled } from "react-icons/rx";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.createAccount(
        formData.email,
        formData.password,
        formData.username
      );
      navigate("/login");
    } catch (error) {
      setError(" Failed to create account. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <div className="form-group">
          <label htmlFor="username"><b>Enter Username</b></label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            aria-label="Username"
            placeholder="username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email"><b>Enter Email ID</b></label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            aria-label="Email"
            placeholder="email id"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password"><b>Create a Password</b></label>
          <input
            type="text"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            aria-label="Password"
            placeholder="password"
          />
        </div>
        <button type="submit" className="signup-button" aria-label="Sign Up">
          Sign Up
        </button>
        {error && (
          <p style={{ marginTop: "10px", marginLeft: "10px" }}>
            <b style={{ color: "red" }}>
              <RxCrossCircled />
              {error}
            </b>
          </p>
        )}
      </form>
    </div>
  );
};

export default SignUp;
