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
    
    db.serialize(() => {
        // Create users table
        db.run(`
            CREATE TABLE IF NOT EXISTS users (
                user_id INTEGER PRIMARY KEY AUTOINCREMENT,
                session_id TEXT UNIQUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `, (err) => {
            if (err) {
                console.error('Error creating users table:', err);
            } else {
                console.log('Users table initialized successfully');
            }
        });

        // Create form_responses table
        db.run(`
            CREATE TABLE IF NOT EXISTS form_responses (
                response_id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER,
                form_type TEXT CHECK(form_type IN ('pre', 'post')),
                question_id TEXT,
                response_value TEXT,
                timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(user_id)
            )
        `, (err) => {
            if (err) {
                console.error('Error creating form_responses table:', err);
            } else {
                console.log('Form responses table initialized successfully');
            }
        });

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
            if (err) {
                console.error('Error creating messages table:', err);
            } else {
                console.log('Messages table initialized successfully');
            }
        });
        
    });
}

module.exports = db;