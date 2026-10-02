const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // Sabhi requests allow karne ke liye
app.use(express.json());


require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/db.js');

const PORT = process.env.PORT || 5000;

// Connect to MongoDB Database
connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});