const jwt = require('jsonwebtoken');

function adminLogin(req, res) {
  const password =
    req.body && typeof req.body.password === 'string' ? req.body.password : '';
  const expected = process.env.ADMIN_PASSWORD;
  const secret = process.env.JWT_SECRET;

  if (!expected || !secret) {
    return res.status(500).json({ message: 'Server configuration error' });
  }

  if (password !== expected) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = jwt.sign({ role: 'admin' }, secret, { expiresIn: '1d' });
  return res.json({ token });
}

module.exports = { adminLogin };
