import React, { useState } from "react";
import axios from "../utils/api";
import { motion } from "framer-motion"; // Import motion from framer-motion
import "./RegisterPage.css"; // Import your CSS file

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    location: "",
    city: "",
    phone: "",
    products: "",
    price: "",
  });

  const [isButcher, setIsButcher] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (e) => {
    setIsButcher(e.target.value === "butcher");
    setFormData({ ...formData, role: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isButcher ? "/butchers/register" : "/users/register";
      const response = await axios.post(endpoint, formData);
      alert(response.data.message);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="register-page">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="form-container"
      >
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
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
          <label>
            Role:
            <select
              name="role"
              value={formData.role}
              onChange={handleRoleChange}
            >
              <option value="user">User</option>
              <option value="butcher">Butcher</option>
            </select>
          </label>
          {isButcher && (
            <>
              <label>
                Location:
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                City:
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Phone:
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Products:
                <input
                  type="text"
                  name="products"
                  value={formData.products}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Prices:
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </label>
            </>
          )}
          <button type="submit" className="btn-primary">
            Register
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default RegisterPage;