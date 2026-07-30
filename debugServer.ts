import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { initializeDatabase } from './src/database/database';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Starting server...');

const app = express();
const PORT = 3001;

app.use(express.json());

try {
  // Initialize database
  console.log('Initializing database...');
  initializeDatabase();
  console.log('✅ Database initialized successfully');
  
  // Healthcheck API
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", message: "Marathi Dnyaneshwari backend server running" });
  });
  
  console.log(`Starting server on port ${PORT}...`);
  const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(`✅ Server listening on http://0.0.0.0:${PORT}`);
  });
  
  // Handle errors
  server.on('error', (error) => {
    console.error('❌ Server error:', error);
  });
  
  // Handle timeout
  setTimeout(() => {
    console.log(`✅ Server is running successfully on port ${PORT}`);
    process.exit(0);
  }, 5000);
  
} catch (error) {
  console.error('❌ Failed to start server:', error);
  process.exit(1);
}