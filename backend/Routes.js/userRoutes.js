const express = require('express');
const {
    registerUser,
    loginUser,
    getAvailableButchers,
    submitFeedback,
} = require('../controllers.js/userController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/available-butchers', getAvailableButchers);
router.post('/feedback', submitFeedback);

module.exports = router;