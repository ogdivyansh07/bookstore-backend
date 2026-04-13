const express = require('express');
const verifyAdmin = require('../middleware/verifyAdmin');
const { createOrder, getOrders } = require('../controllers/orderController');

const router = express.Router();

router.post('/', createOrder);
router.get('/', verifyAdmin, getOrders);

module.exports = router;
