const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { checkoutSession } = require('../controllers/paymentController');

router.post('/create-checkout-session', protect, checkoutSession);

module.exports = router;