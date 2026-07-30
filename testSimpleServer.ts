import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { initializeDatabase } from './src/database/database';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize database
initializeDatabase();

// Healthcheck API
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", message: "Marathi Dnyaneshwari backend server running" });
});

app.listen(PORT, "127.0.0.1", () => {
  console.log(`Test server listening on http://127.0.0.1:${PORT}`);
});