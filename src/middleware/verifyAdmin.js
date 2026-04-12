const jwt = require('jsonwebtoken');

function verifyAdmin(req, res, next) {
  const header = req.headers.authorization;
  if (!header || typeof header !== 'string' || !header.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = header.slice(7).trim();
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return res.status(500).json({ message: 'Server configuration error' });
  }

  try {
    jwt.verify(token, secret);
    next();
  } catch {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}

module.exports = verifyAdmin;
