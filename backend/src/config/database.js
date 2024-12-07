// src/config/database.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Construct the database file path
const dbPath = path.join(__dirname, '../db/chatbot.db');

console.log('Attempting to create/connect to database at:', dbPath);

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error connecting to database:', err);
    } else {
        console.log('Successfully connected to SQLite database');
        initializeDatabase();
    }
});

function initializeDatabase() {
    console.log('Initializing database tables...');
    
    // Use promises to ensure proper table creation order
    const createTables = async () => {
        try {
            // Create users table first
            await new Promise((resolve, reject) => {
                db.run(`
                    CREATE TABLE IF NOT EXISTS users (
                        user_id INTEGER PRIMARY KEY AUTOINCREMENT,
                        session_id TEXT UNIQUE,
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                    )
                `, (err) => {
                    if (err) reject(err);
                    else {
                        console.log('Users table initialized successfully');
                        resolve();
                    }
                });
            });

            // Create conversations table second
            await new Promise((resolve, reject) => {
                db.run(`
                    CREATE TABLE IF NOT EXISTS conversations (
                        conversation_id INTEGER PRIMARY KEY AUTOINCREMENT,
                        user_id INTEGER,
                        philosophical_perspective TEXT,
                        topic TEXT,
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        completed_at TIMESTAMP,
                        FOREIGN KEY (user_id) REFERENCES users(user_id)
                    )
                `, (err) => {
                    if (err) reject(err);
                    else {
                        console.log('Conversations table initialized successfully');
                        resolve();
                    }
                });
            });

            // Create form_responses table third (depends on both users and conversations)
            await new Promise((resolve, reject) => {
                db.run(`
                    CREATE TABLE IF NOT EXISTS form_responses (
                        response_id INTEGER PRIMARY KEY AUTOINCREMENT,
                        user_id INTEGER,
                        conversation_id INTEGER,
                        form_type TEXT,
                        question_id TEXT,
                        response_value TEXT,
                        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        FOREIGN KEY (user_id) REFERENCES users(user_id),
                        FOREIGN KEY (conversation_id) REFERENCES conversations(conversation_id)
                    )
                `, (err) => {
                    if (err) reject(err);
                    else {
                        console.log('Form responses table initialized successfully');
                        resolve();
                    }
                });
            });

            // Create messages table last
            await new Promise((resolve, reject) => {
                db.run(`
                    CREATE TABLE IF NOT EXISTS messages (
                        message_id INTEGER PRIMARY KEY AUTOINCREMENT,
                        conversation_id INTEGER,
                        is_bot BOOLEAN,
                        message_text TEXT,
                        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        FOREIGN KEY (conversation_id) REFERENCES conversations(conversation_id)
                    )
                `, (err) => {
                    if (err) reject(err);
                    else {
                        console.log('Messages table initialized successfully');
                        resolve();
                    }
                });
            });

            console.log('All database tables initialized successfully');

        } catch (error) {
            console.error('Error initializing database tables:', error);
            throw error;
        }
    };

    // Run the table creation
    createTables().catch(err => {
        console.error('Failed to initialize database:', err);
    });
}

module.exports = db;