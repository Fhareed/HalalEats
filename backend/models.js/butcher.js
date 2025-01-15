const mongoose = require("mongoose");

const ButcherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  location: { type: String, required: true },
  city: { type: String, required: true },
  products: { type: String, required: true }, // Ensure this field is properly defined
  price: { type: String, required: true },
  role: { type: String, required: true },
  reviews: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      rating: { type: Number, required: true },
      comment: { type: String },
    },
  ],
  rating: { type: Number, default: 0 }, // Average rating
});

module.exports = mongoose.model("Butcher", ButcherSchema);
