// src/index.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./config/database');

// Create the Express application
const app = express();

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Import routes
const apiRoutes = require('./routes/api');

// Use the API routes with the /api prefix
app.use('/api', apiRoutes);

// Basic test endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log('Visit http://localhost:3001/health to verify server is running');
});