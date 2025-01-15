const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Basic email validation regex
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ["user", "butcher"] }, // Ensure 'role' exists
    
  },
  { timestamps: true }
); // Automatically add createdAt and updatedAt fields

module.exports = mongoose.model("User", UserSchema);
