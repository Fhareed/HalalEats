import React from "react";
import "./ButcherCard.css";

const ButcherCard = ({
  name = "Unknown",
  location = "Unknown",
  city = "Unknown",
  phone = "Unknown",
  price = "Unknown",
  products = [],
  reviews = "No Reviews",
}) => {
  // Ensure products is an array; otherwise, provide a fallback message
  const productList = Array.isArray(products)
    ? products.join(", ")
    : products || "No products available";

  return (
    <div className="butcher-card">
      <h3>{name}</h3>
      <p><strong>Location:</strong> {location}</p>
      <p><strong>City:</strong> {city}</p>
      <p><strong>Phone:</strong> {phone}</p>
      <p><strong>Products:</strong> {productList}</p>
      <p><strong>Price:</strong> ${price}</p>
      <p><strong>Reviews:</strong> {reviews}</p>
    </div>
  );
};

export default ButcherCard;