const Butcher = require("../models.js/Butcher");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const NodeGeocoder = require("node-geocoder");

// Configure geocoder
const geocoder = NodeGeocoder({
  provider: "openstreetmap",
});

// Function to register a butcher
const registerButcher = async (req, res) => {
  const {
    name,
    email,
    password,
    location,
    city,
    phone,
    products,
    price,
    role,
  } = req.body;

  try {
    if (!name || !email || !password || !role || !location || !city || !phone || !products || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Geocode location
    const geoData = await geocoder.geocode(location);
    if (!geoData.length) {
      return res.status(400).json({ message: "Invalid address" });
    }

    const { latitude, longitude } = geoData[0];

    const newButcher = new Butcher({
      name,
      email,
      password: hashedPassword,
      phone,
      location,
      city,
      products,
      price,
      role,
      latitude,
      longitude,
    });

    await newButcher.save();
    res.status(201).json({ message: "Butcher registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// New map route to fetch butcher locations
const getButcherLocations = async (req, res) => {
  try {
    const butchers = await Butcher.find({}, "name latitude longitude location");
    res.status(200).json(butchers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Function to get list of butchers
const getButchers = async (req, res) => {
  const { city, products } = req.query;

  try {
    const query = {};
    if (city) query.city = { $regex: new RegExp(city, "i") };

    // Process services query
    if (products) {
      // Split by comma and trim whitespace
      const productsArray = products
        .split(",")
        .map((product) => product.trim());
      query.products = { $in: productsArray };
      query.products = { $regex: new RegExp(products, "i") }; // Case-insensitive search
    }

    const butchers = await Butcher.find(query);
    res.status(200).json(butchers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Function to log in a butcher
const loginButcher = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find butcher by email
    const butcher = await Butcher.findOne({ email });
    if (!butcher) {
      return res.status(404).json({ message: "Butcher not found" });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, butcher.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: butcher._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Return token and butcher data
    res.status(200).json({
      token,
      butcher: {
        id: butcher._id,
        name: butcher.name,
        email: butcher.email,
        phone: butcher.phone,
        location: butcher.location,
        city: butcher.city,
        products: butcher.products, // Ensure this matches your schema
        price: butcher.price,
      },
    });
  } catch (err) {
    console.error(err); // Log error for debugging
    res.status(500).json({ error: err.message });
  }
};

// Export all functions
module.exports = {
  registerButcher,
  getButchers,
  loginButcher,
  getButcherLocations
};
