const jwt = require('jsonwebtoken');

function adminLogin(req, res) {
  const entered = req.body?.password?.trim() || '';
  const actual = (process.env.ADMIN_PASSWORD || '').trim();
  const secret = process.env.JWT_SECRET;

  // ⚠️ TEMPORARY debug logs — remove before production
  console.log('ENTERED:', JSON.stringify(entered), 'length:', entered.length);
  console.log('ACTUAL:', JSON.stringify(actual), 'length:', actual.length);
  console.log('MATCH:', entered === actual);

  if (!actual || !secret) {
    return res.status(500).json({ message: 'Server configuration error' });
  }

  if (entered !== actual) {
    return res.status(401).json({ message: 'Access denied' });
  }

  const token = jwt.sign({ role: 'admin' }, secret, { expiresIn: '1d' });
  return res.json({ token });
}

module.exports = { adminLogin };
