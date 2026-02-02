const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.resolve(__dirname, 'menta_anon.db');
const db = new Database(dbPath);

// Initialize Database Schema
db.exec(`
    -- Posts Table
    CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        tags TEXT, -- JSON array of tags
        author TEXT DEFAULT 'Anonymous',
        likes INTEGER DEFAULT 0,
        is_locked BOOLEAN DEFAULT 0,
        is_deleted BOOLEAN DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- Comments Table
    CREATE TABLE IF NOT EXISTS comments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        post_id INTEGER NOT NULL,
        content TEXT NOT NULL,
        author TEXT DEFAULT 'Anonymous',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (post_id) REFERENCES posts (id) ON DELETE CASCADE
    );

    -- Chat Sessions (for Persistence)
    CREATE TABLE IF NOT EXISTS chat_sessions (
        recovery_key TEXT PRIMARY KEY,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- Chat Messages
    CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        recovery_key TEXT NOT NULL,
        content TEXT NOT NULL,
        is_user BOOLEAN NOT NULL, -- 1 = User, 0 = AI
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (recovery_key) REFERENCES chat_sessions (recovery_key) ON DELETE CASCADE
    );
`);

console.log('Database initialized at', dbPath);

module.exports = db;
