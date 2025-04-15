const express = require('express');
const { protect, refreshAccessToken } = require('../middleware/auth');
const { register, login, logout, getCurrentUser } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/refresh-token', refreshAccessToken);
router.get('/me', protect, getCurrentUser);

module.exports = router;