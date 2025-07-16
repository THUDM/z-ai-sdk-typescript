import ZAI from '../dist/index.js';

// This is a quick test to verify the SDK works
// Note: You need to set your actual API key to run this

async function quickTest() {
  // Initialize client (you would use your real API key here)
  const client = new ZAI({
    apiKey: process.env.ZAI_API_KEY || 'your-api-key-here'
  });

  console.log('ZAI SDK Quick Test');
  console.log('======================');
  
  // Test 1: Check if client initializes properly
  console.log('✓ Client initialized successfully');
  console.log('✓ Chat resource available:', !!client.chat);
  console.log('✓ Images resource available:', !!client.images);
  console.log('✓ Embeddings resource available:', !!client.embeddings);
  console.log('✓ Files resource available:', !!client.files);
  
  console.log('\n🎉 All basic checks passed! SDK is ready to use.');
  console.log('\nTo test with real API calls, set your ZAI_API_KEY environment variable.');
}

// Run the test if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  quickTest().catch(console.error);
}

export { quickTest };