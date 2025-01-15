const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');

const userRoutes = require('./Routes.js/userRoutes');
const butcherRoutes = require('./Routes.js/butcherRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(cors({
    origin: ['http://localhost:5173'], // Replace with your frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/butchers', butcherRoutes);

// MongoDB Connection
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Handle 404 Routes
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Start the Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));