const Order = require('../models/Order');

function createOrder(req, res) {
  const { books, totalPrice, customerName, phone, address } = req.body || {};

  if (!Array.isArray(books) || books.length === 0) {
    return res.status(400).json({ message: 'Order must include at least one book' });
  }

  const name = typeof customerName === 'string' ? customerName.trim() : '';
  const phoneStr = typeof phone === 'string' ? phone.trim() : '';
  const addr = typeof address === 'string' ? address.trim() : '';

  if (!name || !phoneStr || !addr) {
    return res.status(400).json({ message: 'Name, phone, and address are required' });
  }

  const priceNum = Number(totalPrice);
  if (!Number.isFinite(priceNum) || priceNum < 0) {
    return res.status(400).json({ message: 'Invalid total price' });
  }

  Order.create({
    books,
    totalPrice: priceNum,
    customerName: name,
    phone: phoneStr,
    address: addr,
  })
    .then((doc) =>
      res.status(201).json({
        message: 'Order placed',
        orderId: doc._id,
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

module.exports = { createOrder, getOrders };
