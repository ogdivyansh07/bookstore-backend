require('dotenv').config();

const express = require('express');
const cors = require("cors");
const connectDB = require('./config/database');
const routes = require('./routes');
const uploadRoutes = require('./routes/uploadRoutes');

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Routes
app.use('/', routes);
app.use('/upload', uploadRoutes);

// ✅ Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

// ✅ PORT (IMPORTANT for Render)
const port = process.env.PORT || 3000;

// ✅ START SERVER FIRST (fix for Render)
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// ✅ CONNECT DB AFTER SERVER STARTS
connectDB()
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));