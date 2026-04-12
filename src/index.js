require('dotenv').config();

const express = require('express');
const cors = require("cors");
const connectDB = require('./config/database');
const routes = require('./routes');
const uploadRoutes = require('./routes/uploadRoutes'); // ✅ added

const app = express();
app.use(cors());

app.use(express.json());
app.use('/', routes);
app.use('/upload', uploadRoutes); // ✅ added

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

const port = Number(process.env.PORT) || 3000;

async function start() {
  await connectDB();
  app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});