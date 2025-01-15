import React, { useState } from "react";
import axios from "../utils/api";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { motion } from "framer-motion";
import "./loginPage.css";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("/users/login", formData); // Adjusted endpoint
      const { user, token } = response.data;
      console.log(response.data);

      if (!user || !user.role) {
        setError("Role not defined in server response");
        return;
      }

      // Save token in local storage
      localStorage.setItem("token", token);

      // Debugging: Log the role to ensure it's defined
      console.log("User Role:", user.role);

      // Redirect based on role
      if (user.role === "user") {
        navigate("/butchers");
      } else if (user.role === "mechanic") {
        navigate("/mechanic-dashboard");
      } else {
        setError("Invalid role. Unable to redirect.");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-page">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="form-container"
      >
        <h1>Login</h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit" className="btn-primary">
            Login
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginPage;
