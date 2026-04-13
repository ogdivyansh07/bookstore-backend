const express = require('express');
const verifyAdmin = require('../middleware/verifyAdmin');
const {
  createOrder,
  getOrders,
  trackOrdersByPhone,
  updateOrderStatus,
} = require('../controllers/orderController');

const router = express.Router();

router.post('/', createOrder);
router.get('/track/:phone', trackOrdersByPhone);
router.put('/:id/status', verifyAdmin, updateOrderStatus);
router.get('/', verifyAdmin, getOrders);

module.exports = router;
