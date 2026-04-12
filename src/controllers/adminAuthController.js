const jwt = require('jsonwebtoken');

function stripQuotes(s) {
  if (s.length >= 2 && ((s[0] === '"' && s[s.length - 1] === '"') ||
      (s[0] === "'" && s[s.length - 1] === "'"))) {
    return s.slice(1, -1);
  }
  return s;
}

function adminLogin(req, res) {
  const rawEnv = process.env.ADMIN_PASSWORD || '';
  const entered = (req.body?.password || '').trim();
  const actual = stripQuotes(rawEnv.trim());
  const secret = process.env.JWT_SECRET;

  // ⚠️ TEMPORARY debug logs — remove after confirming fix
  console.log('--- ADMIN LOGIN DEBUG ---');
  console.log('RAW ENV VALUE:', JSON.stringify(rawEnv));
  console.log('ENTERED:', JSON.stringify(entered), 'length:', entered.length);
  console.log('ACTUAL :', JSON.stringify(actual), 'length:', actual.length);
  console.log('ENTERED chars:', [...entered].map(c => c.charCodeAt(0)));
  console.log('ACTUAL  chars:', [...actual].map(c => c.charCodeAt(0)));
  console.log('MATCH:', entered === actual);
  console.log('------------------------');

  if (!actual || !secret) {
    return res.status(500).json({ message: 'Server configuration error' });
  }

  if (!entered || entered !== actual) {
    return res.status(401).json({ message: 'Access denied' });
  }

  const token = jwt.sign({ role: 'admin' }, secret, { expiresIn: '1d' });
  return res.json({ token });
}

module.exports = { adminLogin };
