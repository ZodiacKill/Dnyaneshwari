import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

// Database file path
const DB_PATH = path.join(process.cwd(), 'dnyaneshwari.db');

// Initialize database
export const db = new Database(DB_PATH);

// Enable foreign key constraints
db.pragma('foreign_keys = ON');

// Initialize database schema
export function initializeDatabase() {
  try {
    // Create bhavarth_content table
    db.exec(`
      CREATE TABLE IF NOT EXISTS bhavarth_content (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ovi_id TEXT UNIQUE NOT NULL,
        chapter_number INTEGER NOT NULL,
        ovi_number INTEGER NOT NULL,
        original_marathi TEXT NOT NULL,
        marathi_bhavarth TEXT,
        english_translation TEXT,
        spiritual_insight TEXT,
        ai_provider TEXT DEFAULT 'openai',
        access_count INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        is_generated BOOLEAN DEFAULT FALSE
      )
    `);

    // Create indexes for better performance
    db.exec(`
      CREATE INDEX IF NOT EXISTS idx_bhavarth_ovi_id ON bhavarth_content(ovi_id);
      CREATE INDEX IF NOT EXISTS idx_bhavarth_chapter_ovi ON bhavarth_content(chapter_number, ovi_number);
      CREATE INDEX IF NOT EXISTS idx_bhavarth_created_at ON bhavarth_content(created_at);
    `);

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw error;
  }
}

// Close database connection
export function closeDatabase() {
  try {
    db.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error closing database:', error);
  }
}

// Get database statistics
export function getDatabaseStats() {
  try {
    const stats = db.prepare(`
      SELECT 
        COUNT(*) as total_content,
        SUM(access_count) as total_accesses,
        COUNT(CASE WHEN ai_provider = 'openai' THEN 1 END) as openai_content,
        COUNT(CASE WHEN ai_provider = 'gemini' THEN 1 END) as gemini_content,
        MAX(created_at) as latest_content
      FROM bhavarth_content
    `).get();

    return stats;
  } catch (error) {
    console.error('Error getting database stats:', error);
    return null;
  }
}

// Check if database exists
export function databaseExists(): boolean {
  try {
    return fs.existsSync(DB_PATH);
  } catch (error) {
    console.error('Error checking database existence:', error);
    return false;
  }
}