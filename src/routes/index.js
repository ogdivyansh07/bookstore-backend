const express = require('express');
const rateLimit = require('express-rate-limit');
const { getHealth } = require('../controllers/healthController');
const { adminLogin } = require('../controllers/adminAuthController');
const bookRoutes = require('./bookRoutes');

const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many requests' },
});

router.get('/health', getHealth);
router.post('/admin/login', loginLimiter, adminLogin);
router.use('/books', bookRoutes);

module.exports = router;
