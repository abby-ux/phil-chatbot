// src/routes/api.js
const express = require('express');
const router = express.Router();  // Create a router instance
const db = require('../config/database');

// Change 'app.post' to 'router.post'
router.post('/sessions', (req, res) => {
    // Generate a new session ID
    const sessionId = Math.random().toString(36).substring(7);
    const userId = Math.floor(Math.random() * 1000000);
    
    try {
        // Insert the new user into the database
        db.run('INSERT INTO users (session_id) VALUES (?)', [sessionId], function(err) {
            if (err) {
                console.error('Database error:', err);
                res.status(500).json({ error: err.message });
                return;
            }
            
            // Send back the session information
            res.json({
                userId: this.lastID,
                sessionId: sessionId,
                message: 'Session created successfully'
            });
        });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: 'Failed to create session' });
    }
});

// Add the pre-chat form responses endpoint
router.post('/pre-chat-responses', (req, res) => {
    const { userId, responses } = req.body;
    
    try {
        // Insert each response into the database
        const stmt = db.prepare('INSERT INTO form_responses (user_id, form_type, question_id, response_value) VALUES (?, ?, ?, ?)');
        
        Object.entries(responses).forEach(([questionId, value]) => {
            stmt.run(userId, 'pre', questionId, value);
        });
        
        stmt.finalize();
        res.json({ success: true });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Failed to save responses' });
    }
});

// Handle chat messages
router.post('/messages', async (req, res) => {
    const { conversationId, is_bot, message_text } = req.body;
    
    try {
        // Insert the message into the database
        db.run(
            'INSERT INTO messages (conversation_id, is_bot, message_text) VALUES (?, ?, ?)',
            [conversationId, is_bot, message_text],
            function(err) {
                if (err) {
                    console.error('Error saving message:', err);
                    res.status(500).json({ error: 'Failed to save message' });
                    return;
                }
                
                res.json({
                    messageId: this.lastID,
                    message: 'Message saved successfully'
                });
            }
        );
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: 'Failed to process message' });
    }
});



// src/routes/api.js
// Add these new test endpoints to your existing router

// Test endpoint to create a sample user
// http://localhost:3001/api/test/create-user 
router.get('/test/create-user', (req, res) => {
    const testSessionId = 'test-' + Math.random().toString(36).substring(7);
    
    db.run('INSERT INTO users (session_id) VALUES (?)', [testSessionId], function(err) {
        if (err) {
            console.error('Error creating test user:', err);
            res.status(500).json({ error: err.message });
            return;
        }
        
        res.json({
            message: 'Test user created successfully',
            userId: this.lastID,
            sessionId: testSessionId
        });
    });
});

// Test endpoint to view all users
// http://localhost:3001/api/test/users
router.get('/test/users', (req, res) => {
    db.all('SELECT * FROM users', [], (err, rows) => {
        if (err) {
            console.error('Error fetching users:', err);
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Test endpoint to add a sample form response
// http://localhost:3001/api/test/add-responsesqlite
router.get('/test/add-response', (req, res) => {
    // We'll use user ID 1 for testing - make sure you have at least one user first
    const testResponse = {
        user_id: 1,
        form_type: 'pre',
        question_id: 'test_question',
        response_value: '5'
    };
    
    db.run(
        'INSERT INTO form_responses (user_id, form_type, question_id, response_value) VALUES (?, ?, ?, ?)',
        [testResponse.user_id, testResponse.form_type, testResponse.question_id, testResponse.response_value],
        function(err) {
            if (err) {
                console.error('Error adding test response:', err);
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({
                message: 'Test response added successfully',
                responseId: this.lastID
            });
        }
    );
});

// Test endpoint to view all form responses
// http://localhost:3001/api/test/responses
router.get('/test/responses', (req, res) => {
    db.all('SELECT * FROM form_responses', [], (err, rows) => {
        if (err) {
            console.error('Error fetching responses:', err);
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Export the router
module.exports = router;