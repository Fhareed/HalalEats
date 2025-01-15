import React, { useState, useEffect } from "react";
import axios from "../utils/api";
import ButcherCard from "../components/ButcherCard";
import "./ButcherListPage.css";

const ButcherListPage = () => {
  const [butchers, setButchers] = useState([]);
  const [filters, setFilters] = useState({ city: "", products: "" });

  const fetchButchers = async () => {
    try {
      const response = await axios.get("/butchers", { params: filters });
      console.log("Fetched Butchers:", response.data);
      setButchers(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchButchers();
  };

  useEffect(() => {
    fetchButchers();
  }, []);

  return (
    <div className="butcher-list-page">
      <h1>Available Butchers </h1>
      <form onSubmit={handleSearch} className="filter-form">
        <label>
          city:
          <input
            type="text"
            name="city"
            value={filters.city}
            onChange={handleFilterChange}
          />
        </label>
        <label>
          Services:
          <input
            type="text"
            name="products"
            onChange={handleFilterChange}
            value={filters.products}
          />
        </label>
        <button type="submit">Search</button>
      </form>
      <div className="butcher-list">
        {butchers.length > 0 ? (
          butchers.map((butcher) => (
            <ButcherCard
              key={butcher._id || Math.random()} // Fallback for missing key
              name={butcher.name || "Unknown"}
              location={butcher.location || "Unknown"}
              city={butcher.city || "Unknown"}
              phone={butcher.phone || "Unknown"}
              price={butcher.price || "Unknown"}
              products={butcher.products || []}
              reviews={butcher.reviews || "No Reviews"}
            />
          ))
        ) : (
          <p>No Butchers available.</p>
        )}
      </div>
    </div>
  );
};

export default ButcherListPage;
