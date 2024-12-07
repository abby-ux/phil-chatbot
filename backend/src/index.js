const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./config/database');

// Create the Express application
const app = express();

// Enhanced error handling middleware
const errorHandler = (err, req, res, next) => {
    console.error('Global error:', err);
    res.status(500).json({
        error: 'Internal server error',
        details: err.message
    });
};

// Request logging middleware
const requestLogger = (req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
};
// Define CORS options for secure cross-origin requests
const corsOptions = {
    // Allow requests only from our frontend application
    origin: 'http://localhost:3000',
    
    // Specify which HTTP methods are allowed
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    
    // Allow these headers in requests
    allowedHeaders: ['Content-Type', 'Authorization'],
    
    // Allow credentials (cookies, authorization headers) to be sent
    credentials: true,
    
    // Ensure OPTIONS requests return 200 status for better browser compatibility
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Add error handling middleware specifically for CORS errors
app.use((err, req, res, next) => {
    if (err.name === 'CorsError') {
        console.error('CORS Error:', err);
        res.status(403).json({
            error: 'CORS error',
            details: err.message
        });
    } else {
        next(err);
    }
});

// Configure Express middleware
app.use(express.json());
app.use(requestLogger);

// Import routes
const apiRoutes = require('./routes/api');

// Use the API routes with the /api prefix
app.use('/api', apiRoutes);

// Basic test endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

// Add error handling middleware last
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Server started at: ${new Date().toISOString()}`);
    console.log('Visit http://localhost:3001/health to verify server is running');
});