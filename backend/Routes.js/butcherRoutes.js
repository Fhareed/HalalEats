const express = require('express');
const { registerButcher, loginButcher, getButchers } = require('../controllers.js/butcherController');
const router = express.Router();

router.post('/register', registerButcher);
router.post('/login', loginButcher); // Add login route
router.get('/', getButchers);

module.exports = router;