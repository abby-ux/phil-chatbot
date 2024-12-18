// src/routes/api.js
const express = require('express');
const router = express.Router();  // Create a router instance
const db = require('../config/database');
const crypto = require('crypto');

// Middleware to verify database connection
const checkDbConnection = (req, res, next) => {
    if (!db.open) {
        return res.status(500).json({ error: 'Database connection lost' });
    }
    next();
};

// Apply database check middleware to all routes
router.use(checkDbConnection);

// Endpoint creates a new user session 
// by creating a random session id, creating user record in DB, and returning session details to client
router.post('/sessions', async (req, res) => {
    // Generate a new session ID, make sure it is secure by using crypto
    const sessionId = crypto.randomBytes(32).toString('hex');
    // add a timestamp
    const now = new Date().toISOString(); 

    // check if the ID already exists
    const existingSession = await new Promise((resolve, reject) => {
        db.get(`SELECT session_id FROM users WHERE session_id = ?`, [sessionId], (err, row) => {
            if (err) reject (err);
            resolve(row);
        });
    });
    // if there is already that session ID user should try again
    // future: resolve this in a different way
    if (existingSession) {
        return res.status(409).json({ 
            error: 'Session ID collision. Please try again.' 
        });
    }
    
    try {
        // Insert the new user into the database
        db.run('INSERT INTO users (session_id, created_at) VALUES (?, ?)', [sessionId, now], 
            function(err) {
                if (err) {
                    console.error('Database error:', err);
                    res.status(500).json({ error: err.message });
                    return;
                }
            
            // Send back the session information
            // 201 (Created): indicates a new resource was created -- better than defult 200 (OK)
            res.status(201).json({
                userId: this.lastID,
                sessionId: sessionId,
                createdAt: now,
                message: 'Session created successfully'
            });
        });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: 'Failed to create session' });
    }
});

// pre-chat form responses endpoint
router.post('/pre-chat-responses', async (req, res) => {
    const { userId, responses } = req.body; // extracts userId and responses from the request body

    // validate input
    if (!userId || !responses || Objecy.keys(responses).length === 0) {
        return res.status(400).json({
            error: 'Invalid repsonse',
            details: 'UserID and responses are required.'
        });
    }
    
    try {
        // verify that the user exists
        const user = await new Promise((resolve, reject) => {
            db.get(`SELECT user_id FROM users WHERE user_id = ?`, [userId], (err, row) => {
                if (err) reject (err);
                resolve(row);
            });
        });

        if (!user) {
            return res.status(400).json({
                error: 'User does not exists',
                details: 'Can not save response for non-existent user'
            })
        }

        // wrap multiple inserts inside of a transaction
        //start transaction, if any operation within the transaction fails, all operations will be undone (rolled back)
        await new Promise((resolve, reject) => {
            db.run('BEGIN TRANSACTION', err => {
                if (err) reject(err);
                resolve();
            });
        });

        // Insert each response into the database
        try {
            const stmt = db.prepare(`
                INSERT INTO form_responses (
                    user_id, 
                    form_type, 
                    question_id, 
                    response_value,
                    created_at
                ) VALUES (?, ?, ?, ?, ?)
            `);
            const now = new Date().toISOString();

            // validate and insert each response
            for (const [questionId, value] of Object.entries(responses)) {
                // validate response value
                if (value === null || value === undefined || value === '') {
                    throw new Error(`Invalid value for question ${questionId}`);
                }

                await new Promise((resolve, reject) => {
                    stmt.run(
                        userId,
                        'pre',
                        questionId,
                        value.toString(),
                        now,
                        (err) => {
                            if (err) reject(err);
                            resolve();
                        }
                    );
                });
                
            }
            stmt.finalize(); // close up prepared statement to free up resources

            // Commit transaction
            await new Promise((resolve, reject) => {
                db.run('COMMIT', err => {
                    if (err) reject(err);
                    resolve();
                });
            });

            // Send detailed success response
            res.status(201).json({
                success: true,
                message: 'Pre-chat responses saved successfully',
                timestamp: now,
                responseCount: Object.keys(responses).length
            });

        } catch (error) {
            // Rollback transaction on error
            await new Promise(resolve => {
                db.run('ROLLBACK', () => resolve());
            });
            throw error;

        }  
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


// In api.js

router.post('/post-chat-responses', async (req, res) => {
    console.log('Received post-chat request:', {
        timestamp: new Date().toISOString(),
        headers: req.headers,
        body: req.body
    });

    const { userId, conversationId, responses } = req.body;

    // Validate required fields
    if (!userId || !conversationId || !responses) {
        console.error('Missing required fields:', { userId, conversationId, hasResponses: !!responses });
        return res.status(400).json({
            error: 'Missing required fields',
            details: {
                userId: !userId ? 'missing' : 'present',
                conversationId: !conversationId ? 'missing' : 'present',
                responses: !responses ? 'missing' : 'present'
            }
        });
    }

    try {
        // First verify the user exists
        const user = await new Promise((resolve, reject) => {
            db.get('SELECT * FROM users WHERE user_id = ?', [userId], (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
        });

        if (!user) {
            console.error('User not found:', userId);
            return res.status(404).json({ error: 'User not found' });
        }

        // Then verify the conversation exists
        const conversation = await new Promise((resolve, reject) => {
            db.get('SELECT * FROM conversations WHERE conversation_id = ?', [conversationId], (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
        });

        if (!conversation) {
            console.error('Conversation not found:', conversationId);
            return res.status(404).json({ error: 'Conversation not found' });
        }

        // Begin transaction for saving responses
        await new Promise((resolve, reject) => {
            db.run('BEGIN TRANSACTION', (err) => {
                if (err) reject(err);
                resolve();
            });
        });

        try {
            // Save each response
            for (const [questionId, value] of Object.entries(responses)) {
                await new Promise((resolve, reject) => {
                    db.run(
                        `INSERT INTO form_responses (
                            user_id, conversation_id, form_type, question_id, response_value
                        ) VALUES (?, ?, ?, ?, ?)`,
                        [userId, conversationId, 'post', questionId, value.toString()],
                        (err) => {
                            if (err) reject(err);
                            resolve();
                        }
                    );
                });
            }

            // Commit transaction
            await new Promise((resolve, reject) => {
                db.run('COMMIT', (err) => {
                    if (err) reject(err);
                    resolve();
                });
            });

            console.log('Successfully saved responses for user:', userId);
            res.json({ success: true });

        } catch (error) {
            // Rollback on error
            await new Promise((resolve) => {
                db.run('ROLLBACK', () => resolve());
            });
            throw error;
        }

    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ 
            error: 'Database error',
            details: error.message 
        });
    }
});


// src/routes/api.js

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