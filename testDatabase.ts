import { db } from './src/database/database';

// Test database connection
console.log('Testing database connection...');

try {
  // Test basic query
  const result = db.prepare('SELECT sqlite_version()').get();
  console.log('SQLite version:', result);
  
  // Test table creation
  const tableInfo = db.prepare('PRAGMA table_info(ovi_content)').all();
  console.log('Table info:', tableInfo);
  
  // Test inserting simple data
  const insert = db.prepare('INSERT OR IGNORE INTO ovi_content (ovi_id, chapter_number, ovi_number, original_marathi) VALUES (?, ?, ?, ?)');
  const result1 = insert.run('test.1', 1, 1, 'Test verse');
  console.log('Insert result:', result1);
  
  // Test querying
  const query = db.prepare('SELECT * FROM ovi_content WHERE ovi_id = ?');
  const data = query.get('test.1');
  console.log('Query result:', data);
  
  console.log('Database test completed successfully');
} catch (error) {
  console.error('Database test failed:', error);
}