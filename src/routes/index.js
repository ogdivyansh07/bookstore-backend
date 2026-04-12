const express = require('express');
const { getHealth } = require('../controllers/healthController');
const bookRoutes = require('./bookRoutes');

const router = express.Router();

router.get('/health', getHealth);
router.use('/books', bookRoutes);

module.exports = router;
