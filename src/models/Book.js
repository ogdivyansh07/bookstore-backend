const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    title:   { type: String, required: true },
    author:  { type: String, required: true },
    price:   { type: Number },
    class:   { type: String, default: '' },
    subject: { type: String, default: '' },
    image:   { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Book', bookSchema);
