const express = require('express');
const app = express();
const PORT = 3000;

// --- 1. GLOBAL MIDDLEWARE (The "Factory Entrance") ---
// These run on EVERY request before anything else.

// Translator: Allows the server to read JSON data sent by users
app.use(express.json());

// Logger: Prints every request to your terminal so you can see what's happening
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`);
    next(); // "next()" tells Express to move to the next section
});


// --- 2. TEMPORARY DATABASE (The "Warehouse") ---
let posts = [
    { id: 1, title: "Hello World", content: "Welcome to my API!", author: "Admin" },
    { id: 2, title: "Middleware Tips", content: "Order matters in Express!", author: "Dev" }
];
let nextId = 3;


// --- 3. ROUTES (The "Workstations") ---

// Home Page
app.get('/', (req, res) => {
    res.send('Welcome to CommunityHub API');
});

// GET all posts
app.get('/api/posts', (req, res) => {
    res.json(posts);
});

// GET a single post by ID
app.get('/api/posts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find(p => p.id === id);
    
    if (!post) {
        return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
});

// POST a new post (Create)
app.post('/api/posts', (req, res) => {
    const { title, content, author } = req.body;
    
    if (!title || !content || !author) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const newPost = { id: nextId++, title, content, author };
    posts.push(newPost);
    res.status(201).json(newPost);
});


// --- 4. 404 HANDLER (The "Security Guard") ---
// This must be BELOW all your routes. If the request didn't match 
// any route above, this will catch it.
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});


// --- 5. SERVER START (The "Power Switch") ---
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
