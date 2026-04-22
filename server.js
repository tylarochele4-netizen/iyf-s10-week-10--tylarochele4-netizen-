const express = require('express'); // Imports the Express framework
const app = express();              // Creates the Express application
const PORT = 3000;                  // Sets the door (port) the server will listen on

// 1. Home route - What users see at http://localhost:3000/
app.get('/', (req, res) => {
    res.send('Welcome to CommunityHub API');
});

// 2. About route - What users see at http://localhost:3000/about
app.get('/about', (req, res) => {
    res.send('CommunityHub - A community platform for sharing ideas.');
});

// 3. API Health Check - A common practice to check if the server is alive
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        message: 'Server is running smoothly'
    });
});

// 4. 404 Handler - This MUST be at the bottom of your routes
// It catches anything that doesn't match the routes above
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// 5. Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log('Press Ctrl+C to stop the server');
});
