// Simple test using curl commands
import { exec } from 'child_process';

const tests = [
  {
    name: 'Check if content exists for ovi 1.1',
    command: 'curl -I http://localhost:3000/api/bhavarth/1.1/exists'
  },
  {
    name: 'Get content for ovi 1.1',
    command: 'curl http://localhost:3000/api/bhavarth/1.1'
  },
  {
    name: 'Generate new content for ovi 1.3',
    command: `curl -X POST http://localhost:3000/api/generate-ovi-content \\
      -H "Content-Type: application/json" \\
      -d '{"originalMarathi":"Test new verse for generation","chapterNumber":1,"oviNumber":3,"oviId":"1.3"}'`
  },
  {
    name: 'Get content statistics',
    command: 'curl http://localhost:3000/api/bhavarth/stats'
  }
];

// Run tests sequentially
const runTests = async () => {
  for (const test of tests) {
    console.log(`\n🧪 Testing: ${test.name}`);
    console.log(`📝 Command: ${test.command}`);
    
    try {
      await new Promise((resolve, reject) => {
        exec(test.command, (error, stdout, stderr) => {
          if (error) {
            console.log(`❌ Error: ${error.message}`);
            if (stderr) console.log(`📤 Error output: ${stderr}`);
            reject(error);
          } else {
            console.log(`✅ Success! Response:`);
            console.log(stdout);
            resolve(stdout);
          }
        });
      });
    } catch (error) {
      console.log(`Test failed: ${error.message}`);
    }
  }
  
  console.log('\n🎉 All tests completed!');
};

runTests();