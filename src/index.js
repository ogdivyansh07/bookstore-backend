require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/database');
const getCorsOptions = require('./config/corsOptions');
const routes = require('./routes');
const uploadRoutes = require('./routes/uploadRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

app.set('trust proxy', 1);

app.use(helmet());
app.use(cors(getCorsOptions()));

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 400,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many requests' },
});
app.use(generalLimiter);

app.use(express.json({ limit: '1mb' }));

app.use('/', routes);
app.use('/orders', orderRoutes);
app.use('/upload', uploadRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ message: 'Internal server error' });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

connectDB()
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB error:', err));
