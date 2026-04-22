// src/app.js
const express = require('express');
const app = express();
const postsRoutes = require('./routes/posts');

// 1. Middleware
app.use(express.json());

// 2. Routes
app.use('/api/posts', postsRoutes);

// 3. 404 Handler (If no routes match)
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// 4. Export the app so server.js can use it
module.exports = app;
