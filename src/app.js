const express = require('express');
const app = express();
const postsRoutes = require('./routes/posts');

// Middleware
app.use(express.json());

// Routes
app.use('/api/posts', postsRoutes);

module.exports = app;
