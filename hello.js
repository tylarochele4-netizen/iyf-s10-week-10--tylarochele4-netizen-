// hello.js
console.log("Hello from Node.js!");

// The 'process' object gives us info about the environment
console.log("Node version:", process.version);
console.log("Current directory:", process.cwd());
console.log("Platform:", process.platform);

// process.argv captures command line arguments
// Try running: node hello.js coffee code
console.log("Arguments:", process.argv);
