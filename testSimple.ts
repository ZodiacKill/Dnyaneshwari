import { db } from './src/database/database';

// Simple test with the actual data
console.log('Testing with actual data...');

try {
  const insert = db.prepare(`
    INSERT OR IGNORE INTO ovi_content (
      ovi_id, chapter_number, ovi_number, original_marathi,
      marathi_bhavarth, english_translation, spiritual_insight,
      ai_provider, is_generated
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const result = insert.run(
    '1.1',
    1,
    1,
    'Test verse',
    null,
    null,
    null,
    'openai',
    1
  );

  console.log('Insert result:', result);

  const query = db.prepare('SELECT * FROM ovi_content WHERE ovi_id = ?');
  const data = query.get('1.1');
  console.log('Query result:', data);

  console.log('Test completed successfully');
} catch (error) {
  console.error('Test failed:', error);
}