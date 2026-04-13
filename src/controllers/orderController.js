const mongoose = require('mongoose');
const Order = require('../models/Order');

const ORDER_STATUSES = ['pending', 'confirmed', 'delivered'];

function createOrder(req, res) {
  const { books, totalPrice, customerName, phone, address } = req.body || {};

  if (!Array.isArray(books) || books.length === 0) {
    return res.status(400).json({ message: 'Order must include at least one book' });
  }

  const name = typeof customerName === 'string' ? customerName.trim() : '';
  const addr = typeof address === 'string' ? address.trim() : '';

  if (!name || !addr) {
    return res.status(400).json({ message: 'Name, phone, and address are required' });
  }

  const phoneInput = typeof phone === 'string' ? phone : phone != null ? String(phone) : '';
  const normalizedPhone = phoneInput.replace(/\D/g, '').slice(-10);
  if (!normalizedPhone || normalizedPhone.length !== 10) {
    return res.status(400).json({ message: 'Invalid phone number' });
  }

  const priceNum = Number(totalPrice);
  if (!Number.isFinite(priceNum) || priceNum < 0) {
    return res.status(400).json({ message: 'Invalid total price' });
  }

  Order.create({
    books,
    totalPrice: priceNum,
    customerName: name,
    phone: normalizedPhone,
    address: addr,
  })
    .then((doc) =>
      res.status(201).json({
        message: 'Order placed',
        orderId: doc._id,
        status: doc.status,
      })
    )
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: 'Could not save order' });
    });
}

function getOrders(req, res) {
  Order.find()
    .sort({ createdAt: -1 })
    .lean()
    .then((orders) => res.json(orders))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: 'Could not load orders' });
    });
}

function trackOrdersByPhone(req, res) {
  let raw = req.params.phone;
  try {
    raw = decodeURIComponent(raw == null ? '' : String(raw));
  } catch {
    return res.status(400).json({ message: 'Invalid phone number' });
  }
  const normalizedPhone = String(raw).replace(/\D/g, '').slice(-10);
  if (!normalizedPhone || normalizedPhone.length !== 10) {
    return res.status(400).json({ message: 'Invalid phone number' });
  }

  Order.find({ phone: normalizedPhone })
    .sort({ createdAt: -1 })
    .lean()
    .then((orders) => res.json(orders))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: 'Could not load orders' });
    });
}

function updateOrderStatus(req, res) {
  const { id } = req.params;
  const { status } = req.body || {};

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid order id' });
  }

  if (typeof status !== 'string' || !ORDER_STATUSES.includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  Order.findByIdAndUpdate(id, { $set: { status } }, { new: true, runValidators: true })
    .lean()
    .then((doc) => {
      if (!doc) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.json(doc);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: 'Could not update order' });
    });
}

module.exports = { createOrder, getOrders, trackOrdersByPhone, updateOrderStatus };
