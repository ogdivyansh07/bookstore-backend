function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function isOptionalString(value) {
  if (value === undefined || value === null) return true;
  return typeof value === 'string';
}

function validatePriceField(price) {
  if (price === undefined || price === null || price === '') return true;
  const n = Number(price);
  return Number.isFinite(n) && n >= 0;
}

function validateCreateBook(req, res, next) {
  const b = req.body;
  if (!b || typeof b !== 'object') {
    return res.status(400).json({ message: 'Invalid request body' });
  }

  if (!isNonEmptyString(b.title)) {
    return res.status(400).json({ message: 'Title is required' });
  }
  if (!isNonEmptyString(b.author)) {
    return res.status(400).json({ message: 'Author is required' });
  }
  if (!validatePriceField(b.price)) {
    return res.status(400).json({ message: 'Invalid price' });
  }

  for (const key of ['class', 'subject', 'category', 'image']) {
    if (!isOptionalString(b[key])) {
      return res.status(400).json({ message: 'Invalid request data' });
    }
  }

  next();
}

function validateUpdateBook(req, res, next) {
  const b = req.body;
  if (!b || typeof b !== 'object') {
    return res.status(400).json({ message: 'Invalid request body' });
  }

  if (b.title !== undefined && !isNonEmptyString(b.title)) {
    return res.status(400).json({ message: 'Invalid title' });
  }
  if (b.author !== undefined && !isNonEmptyString(b.author)) {
    return res.status(400).json({ message: 'Invalid author' });
  }
  if (b.price !== undefined && !validatePriceField(b.price)) {
    return res.status(400).json({ message: 'Invalid price' });
  }

  for (const key of ['class', 'subject', 'category', 'image']) {
    if (b[key] !== undefined && !isOptionalString(b[key])) {
      return res.status(400).json({ message: 'Invalid request data' });
    }
  }

  next();
}

module.exports = {
  validateCreateBook,
  validateUpdateBook,
};
