const express = require('express');
const {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
} = require('../controllers/bookController');
const verifyAdmin = require('../middleware/verifyAdmin');
const {
  validateCreateBook,
  validateUpdateBook,
} = require('../middleware/validateBook');

const router = express.Router();

router.post('/', verifyAdmin, validateCreateBook, createBook);
router.get('/', getBooks);
router.get('/:id', getBookById);
router.put('/:id', verifyAdmin, validateUpdateBook, updateBook);
router.delete('/:id', verifyAdmin, deleteBook);

module.exports = router;
