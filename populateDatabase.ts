import { initializeDatabase } from './src/database/database';
import { createBhavarthContent } from './src/database/bhavarthService';
import { readFileSync } from 'fs';
import { join } from 'path';

// Initialize database first
initializeDatabase();

// Sample bhavarth content for testing
const sampleContent = [
  {
    ovi_id: "1.1",
    chapter_number: 1,
    ovi_number: 1,
    original_marathi: "Jnana Dehi Nama Tujhe Jnana Vanche Jnan Dene.",
    marathi_bhavarth: "O Jnaneshwar Mauli, your name is Jnana Dehi, meaning one who gives knowledge to the wise. You are the embodiment of knowledge and through your grace, knowledge is revealed.",
    english_translation: "O Jnanadehi, your name is that which gives knowledge to the wise. You are the embodiment of knowledge and through your grace, wisdom is revealed.",
    spiritual_insight: "This verse reminds us that true knowledge is not just information but a divine grace that flows from enlightened beings. When we approach wisdom with reverence, we open ourselves to receive spiritual understanding.",
    ai_provider: "gemini",
    is_generated: true
  },
  {
    ovi_id: "1.2",
    chapter_number: 1,
    ovi_number: 2,
    original_marathi: "Jnana Maya Tujhe Nama Jnachi Maya Dene.",
    marathi_bhavarth: "O Jnanamaye, your name is that which bestows the illusion of knowledge. You are the form of knowledge and through your grace, the cosmic illusion of wisdom manifests.",
    english_translation: "O Jnanamaye, your name is that which bestows the illusion of knowledge. You are the form of knowledge and through your grace, the cosmic illusion of wisdom manifests.",
    spiritual_insight: "This verse teaches us that knowledge, when combined with divine grace, transforms into wisdom. The 'maya' here refers to the divine play that makes spiritual understanding accessible to devotees.",
    ai_provider: "gemini",
    is_generated: true
  }
];

// Function to populate database with sample content
function populateSampleContent() {
  try {
    console.log('Populating database with sample content...');
    
    for (const content of sampleContent) {
      try {
        createBhavarthContent(content);
        console.log(`✅ Created content for ovi ${content.ovi_id}`);
      } catch (error) {
        console.log(`⚠️ Content for ovi ${content.ovi_id} already exists or error occurred`);
      }
    }
    
    console.log('Sample content population completed');
  } catch (error) {
    console.error('Error populating sample content:', error);
  }
}

// Populate the database
populateSampleContent();