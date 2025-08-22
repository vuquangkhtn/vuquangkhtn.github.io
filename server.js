const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8000;

// MIME type mapping
const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.json': 'application/json',
  '.txt': 'text/plain'
};

const server = http.createServer((req, res) => {
  // Handle root path
  const requestPath = req.url === '/' ? '/index.html' : req.url;
  const filePath = path.join(__dirname, requestPath);
  
  // Get file extension and content type
  const ext = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[ext] || 'text/plain';
  
  // Read and serve file
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<h1>404 - File Not Found</h1>');
      console.log(`404: ${requestPath}`);
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
      console.log(`Served: ${requestPath}`);
    }
  });
});

server.listen(PORT, () => {
  console.log(`\n🚀 Server running at http://localhost:${PORT}`);
  console.log('Press Ctrl+C to stop the server\n');
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n👋 Server shutting down gracefully...');
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
});