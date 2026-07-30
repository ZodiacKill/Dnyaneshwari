// Test API endpoints
const testApi = async () => {
  console.log('Testing API endpoints...');
  
  try {
    // Test 1: Check if content exists
    console.log('\n1. Testing content check for ovi 1.1...');
    const existsResponse = await fetch('http://localhost:3000/api/bhavarth/1.1/exists', {
      method: 'HEAD'
    });
    console.log('Content exists:', existsResponse.status === 204);
    
    // Test 2: Get content
    console.log('\n2. Getting content for ovi 1.1...');
    const getContentResponse = await fetch('http://localhost:3000/api/bhavarth/1.1');
    if (getContentResponse.ok) {
      const content = await getContentResponse.json();
      console.log('Content retrieved:', {
        marathiBhavarth: content.marathiBhavarth,
        englishTranslation: content.englishTranslation,
        spiritualInsight: content.spiritualInsight
      });
    } else {
      console.log('Error getting content:', getContentResponse.status);
    }
    
    // Test 3: Generate new content
    console.log('\n3. Generating content for new ovi...');
    const generateResponse = await fetch('http://localhost:3000/api/generate-ovi-content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        originalMarathi: 'Test new verse for generation',
        chapterNumber: 1,
        oviNumber: 3,
        oviId: '1.3'
      })
    });
    
    if (generateResponse.ok) {
      const generated = await generateResponse.json();
      console.log('Content generated:', {
        marathiBhavarth: generated.marathiBhavarth,
        englishTranslation: generated.englishTranslation,
        aiProvider: generated.aiProvider
      });
    } else {
      console.log('Error generating content:', generateResponse.status);
      const error = await generateResponse.json();
      console.log('Error details:', error);
    }
    
    // Test 4: Get statistics
    console.log('\n4. Getting content statistics...');
    const statsResponse = await fetch('http://localhost:3000/api/bhavarth/stats');
    if (statsResponse.ok) {
      const stats = await statsResponse.json();
      console.log('Statistics:', stats);
    }
    
  } catch (error) {
    console.error('API test failed:', error);
  }
};

// Run the test
testApi();