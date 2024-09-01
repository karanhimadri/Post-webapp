import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "../App.css";
import authService from "../AuthService/auth";
import { login } from "../store/AuthSlice";
import { useNavigate } from "react-router-dom";
import { RxCrossCircled } from "react-icons/rx";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await authService.login(formData.email, formData.password);
      setError(`${res}`);
      const user = await authService.getCurrentUser();
      if (user) {
        dispatch(login({ userData: user.$id, userName: user.name }));
        navigate("/");
      }
      setLoading(false);
    } catch (error) {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="text"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="login-button">
          {loading ? "Loading..." : "Login"}
        </button>
        {error && (
          <p style={{ marginTop: "10px", marginLeft: "10px" }}>
            <b style={{ color: "red" }}>
              <RxCrossCircled />
              {error.split("AppwriteException:")}
            </b>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
