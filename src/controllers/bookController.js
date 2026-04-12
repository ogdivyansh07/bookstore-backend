const mongoose = require('mongoose');
const Book = require('../models/Book');

function badId(id) {
  return !mongoose.Types.ObjectId.isValid(id);
}

async function createBook(req, res, next) {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
    next(err);
  }
}

async function getBooks(req, res, next) {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.json(books);
  } catch (err) {
    next(err);
  }
}

async function getBookById(req, res, next) {
  try {
    const { id } = req.params;
    if (badId(id)) {
      return res.status(400).json({ message: 'Invalid book id' });
    }

    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (err) {
    next(err);
  }
}

async function updateBook(req, res, next) {
  try {
    const { id } = req.params;
    if (badId(id)) {
      return res.status(400).json({ message: 'Invalid book id' });
    }

    const book = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
    next(err);
  }
}

async function deleteBook(req, res, next) {
  try {
    const { id } = req.params;
    if (badId(id)) {
      return res.status(400).json({ message: 'Invalid book id' });
    }

    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
};
