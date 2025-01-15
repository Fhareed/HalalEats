const User = require("../models.js/User"); 
const Butcher = require("../models.js/Butcher"); 
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register a new user
const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Validate request body
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already in use" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ message: "User registered successfully", token });
  } catch (err) {
    console.error("Error in registerUser:", err); // Log the error
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Include the role in the response
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role, // Add role here
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Fetch available butchers
const getAvailableButchers = async (req, res) => {
  const { location, criteria } = req.query;

  try {
    const query = {};
    if (location) query.location = location;
    if (criteria) query.products = { $regex: new RegExp(criteria, "i") };

    const butchers = await Butcher.find(query);
    res.status(200).json(butchers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Submit feedback and ratings
const submitFeedback = async (req, res) => {
  const { userId, butcherId, rating, feedback } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const butcher = await Butcher.findById(butcherId);
    if (!butcher)
      return res.status(404).json({ message: "Butcher not found" });

    butcher.reviews.push({ userId, rating, feedback });
    await butcher.save();

    res
      .status(201)
      .json({
        message: "Feedback submitted successfully",
        reviews: butcher.reviews,
      });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getAvailableButchers,
  submitFeedback,
};
