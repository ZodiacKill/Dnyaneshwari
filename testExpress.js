import express from 'express';

const app = express();
const PORT = 3004;

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Express test server running' });
});

app.listen(PORT, '127.0.0.1', () => {
  console.log(`Express test server listening on port ${PORT}`);
});

app.on('error', (error) => {
  console.error('Server error:', error);
});

console.log('Express test server started and will keep running');