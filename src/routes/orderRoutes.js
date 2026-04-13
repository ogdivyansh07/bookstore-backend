const express = require('express');
const verifyAdmin = require('../middleware/verifyAdmin');
const { createOrder, getOrders, updateOrderStatus } = require('../controllers/orderController');

const router = express.Router();

router.post('/', createOrder);
router.put('/:id/status', verifyAdmin, updateOrderStatus);
router.get('/', verifyAdmin, getOrders);

module.exports = router;
