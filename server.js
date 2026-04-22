const express = require('express');
const app = express();
const PORT = 3000;

// --- 1. GLOBAL MIDDLEWARE ---
app.use(express.json());

// Simple Logger
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`);
    next();
});

// --- 2. CUSTOM ERROR CLASS ---
// This helps us define the message and the status code (like 400 or 500)
class ApiError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

// --- 3. DATABASE ---
let posts = [
    { id: 1, title: "Hello World", content: "Welcome to my API!", author: "Admin" }
];

// --- 4. ROUTES ---

app.get('/', (req, res) => {
    res.send('Welcome to CommunityHub API');
});

// Route that intentionally triggers an error for testing
app.get('/api/error-test', (req, res, next) => {
    try {
        // We "throw" an error on purpose
        throw new ApiError('This is a simulated server error!', 500);
    } catch (error) {
        next(error); // This sends the error to the handler at the bottom
    }
});

app.get('/api/posts', (req, res) => {
    res.json(posts);
});

// --- 5. 404 HANDLER (NOT FOUND) ---
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// --- 6. GLOBAL ERROR HANDLER (MUST BE LAST) ---
// Note the 4 arguments: (err, req, res, next)
app.use((err, req, res, next) => {
    console.error(err.stack); // Still log the error for the developer to see

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        error: {
            message: message,
            status: statusCode
        }
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
