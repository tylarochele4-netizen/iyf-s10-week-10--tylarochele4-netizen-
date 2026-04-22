const express = require('express');
const app = express();
const PORT = 3000;

// CRITICAL: This middleware allows your server to read JSON sent in the request body
app.use(express.json());

// --- TEMPORARY DATABASE (Array) ---
let posts = [
    { 
        id: 1, 
        title: "Hello World", 
        content: "My first post on the CommunityHub!",
        author: "Admin",
        createdAt: new Date().toISOString()
    },
    { 
        id: 2, 
        title: "Node.js is cool", 
        content: "Learning backend is exciting.",
        author: "CodeLearner",
        createdAt: new Date().toISOString()
    }
];

let nextId = 3; // To keep track of the next available ID

// --- ROUTES ---

// 1. Home
app.get('/', (req, res) => {
    res.send('Welcome to CommunityHub API');
});

// 2. GET all posts (Read)
// Test: http://localhost:3000/api/posts
app.get('/api/posts', (req, res) => {
    res.json(posts);
});

// 3. GET a single post (Read)
// Test: http://localhost:3000/api/posts/1
app.get('/api/posts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find(p => p.id === id);
    
    if (!post) {
        return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
});

// 4. POST a new post (Create)
// Note: You must use a tool like Postman to test this!
app.post('/api/posts', (req, res) => {
    const { title, content, author } = req.body;
    
    // Simple validation
    if (!title || !content || !author) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    
    const newPost = {
        id: nextId++,
        title,
        content,
        author,
        createdAt: new Date().toISOString()
    };
    
    posts.push(newPost);
    res.status(201).json(newPost); // 201 means "Created"
});

// --- ERROR HANDLING ---

app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
