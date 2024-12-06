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

// Add new conversations table initialization to your database.js
router.post('/conversations', (req, res) => {
    const { userId, philosophical_perspective, topic } = req.body;
    
    try {
        // First, create the conversations table if it doesn't exist
        db.run(`
            CREATE TABLE IF NOT EXISTS conversations (
                conversation_id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER,
                philosophical_perspective TEXT,
                topic TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(user_id)
            )
        `, (err) => {
            if (err) {
                console.error('Error creating conversations table:', err);
                res.status(500).json({ error: 'Failed to initialize conversations table' });
                return;
            }

            // Then insert the new conversation
            db.run(
                'INSERT INTO conversations (user_id, philosophical_perspective, topic) VALUES (?, ?, ?)',
                [userId, philosophical_perspective, topic],
                function(err) {
                    if (err) {
                        console.error('Error creating conversation:', err);
                        res.status(500).json({ error: 'Failed to create conversation' });
                        return;
                    }

                    res.json({
                        conversationId: this.lastID,
                        message: 'Conversation created successfully'
                    });
                }
            );
        });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: 'Failed to process conversation creation' });
    }
});

// Add new endpoint to handle chat completion
router.post('/conversations/:conversationId/complete', (req, res) => {
    const { conversationId } = req.params;
    
    try {
        // First, verify the conversation exists
        db.get(
            'SELECT * FROM conversations WHERE conversation_id = ?',
            [conversationId],
            (err, conversation) => {
                if (err) {
                    console.error('Error finding conversation:', err);
                    res.status(500).json({ error: 'Database error while finding conversation' });
                    return;
                }

                if (!conversation) {
                    res.status(404).json({ error: 'Conversation not found' });
                    return;
                }

                // Update the conversation to mark it as completed
                db.run(
                    'UPDATE conversations SET completed_at = CURRENT_TIMESTAMP WHERE conversation_id = ?',
                    [conversationId],
                    function(err) {
                        if (err) {
                            console.error('Error completing conversation:', err);
                            res.status(500).json({ error: 'Failed to complete conversation' });
                            return;
                        }

                        res.json({
                            message: 'Conversation completed successfully',
                            conversationId: conversationId
                        });
                    }
                );
            }
        );
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: 'Failed to process conversation completion' });
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