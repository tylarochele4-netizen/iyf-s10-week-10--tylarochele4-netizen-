const express = require('express');
const app = express();
const PORT = 3000;

// --- LESSON 19.2: BASIC ROUTES ---

// Home route
app.get('/', (req, res) => {
    res.send('Welcome to CommunityHub API');
});

// About route
app.get('/about', (req, res) => {
    res.send('CommunityHub - A community platform');
});

// API health check
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString() 
    });
});


// --- LESSON 19.3: REQUEST & RESPONSE EXERCISES ---

// Exercise 1: Response Methods (JSON and Errors)
app.get('/api/json-test', (req, res) => {
    res.json({ message: 'JSON response successful', success: true });
});

app.get('/api/error-test', (req, res) => {
    res.status(400).json({ error: 'This is a simulated Bad Request' });
});

// Exercise 2: Route Parameters (Dynamic IDs)
// Example: visit /api/users/123
app.get('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    res.json({ message: `Getting info for user ${userId}`, id: userId });
});

// Nested parameters
// Example: visit /api/posts/5/comments/10
app.get('/api/posts/:postId/comments/:commentId', (req, res) => {
    const { postId, commentId } = req.params;
    res.json({ postId, commentId });
});

// Exercise 3: Query Strings (Searching and Filtering)
// Example: visit /api/search?term=node&sort=asc
app.get('/api/search', (req, res) => {
    const { term, sort } = req.query;
    res.json({
        results: `Searching for ${term || 'nothing'}`,
        sortedBy: sort || 'default',
        fullQuery: req.query
    });
});


// --- ERROR HANDLING (MUST BE AT THE END) ---

// 404 handler for any route that doesn't exist
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`Check health: http://localhost:${PORT}/api/health`);
});
