const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const schedulingRoutes = require('./routes/schedulingRoutes');
const noteRoutes = require('./routes/noteRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/scheduling', schedulingRoutes);
app.use('/api/notes', noteRoutes);

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Unfazed API service is running smoothly!' });
});

module.exports = app;