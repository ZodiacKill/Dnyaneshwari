import { initializeDatabase } from './src/database/database';
import { createBhavarthContent } from './src/database/bhavarthService';

console.log('Starting database test...');

try {
  // Initialize database
  initializeDatabase();
  console.log('✅ Database initialized successfully');
  
  // Test creating content
  const testContent = {
    ovi_id: "test.unique.1",
    chapter_number: 1,
    ovi_number: 1,
    original_marathi: "Test verse",
    marathi_bhavarth: "Test bhavarth",
    english_translation: "Test translation",
    spiritual_insight: "Test insight",
    ai_provider: "openai",
    is_generated: true
  };
  
  const result = createBhavarthContent(testContent);
  console.log('✅ Content created successfully:', result.ovi_id);
  
  console.log('🎉 All tests passed!');
} catch (error) {
  console.error('❌ Test failed:', error);
  process.exit(1);
}