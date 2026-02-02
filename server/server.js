const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { v4: uuidv4 } = require('uuid');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(helmet());
app.use(express.json());

// --- API ROUTES ---

// 1. FORUM ROUTES

// Get all posts (excluding deleted, unless admin)
app.get('/api/posts', (req, res) => {
    try {
        const isAdmin = req.query.admin === 'true';
        let query = 'SELECT * FROM posts';

        if (!isAdmin) {
            query += ' WHERE is_deleted = 0';
        }

        query += ' ORDER BY created_at DESC';

        const posts = db.prepare(query).all();

        // Parse tags from JSON string
        const parsedPosts = posts.map(post => ({
            ...post,
            tags: JSON.parse(post.tags || '[]'),
            is_locked: !!post.is_locked,
            is_deleted: !!post.is_deleted
        }));

        res.json(parsedPosts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a new post
app.post('/api/posts', (req, res) => {
    try {
        const { title, content, tags, author } = req.body;
        const stmt = db.prepare('INSERT INTO posts (title, content, tags, author) VALUES (?, ?, ?, ?)');
        const info = stmt.run(title, content, JSON.stringify(tags || []), author || 'Anonymous');
        res.json({ id: info.lastInsertRowid, success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Admin: Delete (Soft Delete)
app.delete('/api/posts/:id', (req, res) => {
    try {
        // In a real app, verify admin token here
        const stmt = db.prepare('UPDATE posts SET is_deleted = 1 WHERE id = ?');
        stmt.run(req.params.id);
        res.json({ success: true, message: 'Post deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Admin: Lock
app.post('/api/posts/:id/lock', (req, res) => {
    try {
        const stmt = db.prepare('UPDATE posts SET is_locked = 1 WHERE id = ?');
        stmt.run(req.params.id);
        res.json({ success: true, message: 'Post locked' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2. CHAT ROUTES (Persistent)

// Initialize or Recover Chat Session
app.post('/api/chat/session', (req, res) => {
    try {
        const { recovery_key } = req.body;

        if (recovery_key) {
            // Try to find existing session
            const session = db.prepare('SELECT * FROM chat_sessions WHERE recovery_key = ?').get(recovery_key);
            if (session) {
                // Return history
                const messages = db.prepare('SELECT * FROM messages WHERE recovery_key = ? ORDER BY timestamp ASC').all(recovery_key);
                return res.json({ success: true, recovery_key, messages });
            }
            return res.status(404).json({ error: 'Session not found' });
        } else {
            // Create new session
            const newKey = uuidv4(); // Generate unique recovery key
            db.prepare('INSERT INTO chat_sessions (recovery_key) VALUES (?)').run(newKey);

            // Initial AI Message
            db.prepare('INSERT INTO messages (recovery_key, content, is_user) VALUES (?, ?, ?)').run(newKey, "Hi, I'm here to listen. How are you feeling today?", 0);

            const messages = db.prepare('SELECT * FROM messages WHERE recovery_key = ?').all(newKey);
            return res.json({ success: true, recovery_key: newKey, messages });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Send Message (Mock AI Response)
app.post('/api/chat/message', (req, res) => {
    try {
        const { recovery_key, content } = req.body;

        // 1. Save User Message
        db.prepare('INSERT INTO messages (recovery_key, content, is_user) VALUES (?, ?, ?)').run(recovery_key, content, 1);

        // 2. Generate Mock AI Response (Simple Logic)
        let aiResponse = "I hear you. That sounds difficult. Can you tell me more?";
        if (content.toLowerCase().includes('anxiety')) aiResponse = "It's understandable to feel anxious. Have you tried any grounding techniques today?";
        if (content.toLowerCase().includes('happy')) aiResponse = "I'm glad to hear that! What made you feel this way?";
        if (content.toLowerCase().includes('help')) aiResponse = "If you're in danger, please call 988 immediately. I'm here to listen, but I'm an AI.";

        // 3. Save AI Message
        db.prepare('INSERT INTO messages (recovery_key, content, is_user) VALUES (?, ?, ?)').run(recovery_key, aiResponse, 0);

        // 4. Return Updated History
        const messages = db.prepare('SELECT * FROM messages WHERE recovery_key = ? ORDER BY timestamp ASC').all(recovery_key);
        res.json({ success: true, messages });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
