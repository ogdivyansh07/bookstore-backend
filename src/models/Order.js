const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    books: { type: [mongoose.Schema.Types.Mixed], default: [] },
    totalPrice: { type: Number, required: true },
    customerName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

module.exports = mongoose.model('Order', orderSchema);
