import http from 'http';

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ status: 'ok', message: 'Test server running' }));
});

const PORT = 3002;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Test server listening on port ${PORT}`);
});

server.on('error', (error) => {
  console.error('Server error:', error);
});

setTimeout(() => {
  console.log('Test server started successfully');
  process.exit(0);
}, 3000);