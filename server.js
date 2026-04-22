// 1. Load environment variables FIRST
require('dotenv').config(); 

// 2. Import the "app" logic from your src folder
const app = require('./src/app');

// 3. Define the PORT (using the .env value OR defaulting to 3000)
const PORT = process.env.PORT || 3000;

// 4. Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode`);
    console.log(`📡 Listening at http://localhost:${PORT}`);
});
