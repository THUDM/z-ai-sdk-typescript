import ZAI from '../src';

// Method 1: Initialize the client with constructor
const client = new ZAI({
  apiKey: process.env.ZAI_API_KEY,
});

// Method 2: Use static factory method for ZHIPU AI environment
const zhipuClient = ZAI.ofZHIPU(process.env.ZAI_API_KEY || '');

// Method 3: Use static factory method for ZAI environment
 const zaiClient = ZAI.ofZAI(process.env.ZAI_API_KEY || 'your-api-key.secret');

async function basicChatExample() {
  console.log('=== Basic Chat Example ===');
  
  try {
    const completion = await client.chat.create({
      model: 'glm-4',
      messages: [
        { role: 'user', content: 'What is the relationship between ZAI and ChatGLM?' }
      ],
    });
    
    const chatResponse = completion as any;
    console.log('Response:', chatResponse.choices[0].message.content);
    console.log('Usage:', chatResponse.usage);
  } catch (error) {
    console.error('Error:', error);
  }
}

async function streamingChatExample() {
  console.log('\n=== Streaming Chat Example ===');
  
  try {
    const stream = await client.chat.createStream({
      model: 'glm-4',
      messages: [
        { role: 'user', content: 'Tell me a short story about AI' }
      ],
    });
    
    console.log('Streaming response:');
    stream.on('data', (chunk) => {
      process.stdout.write(chunk.toString());
    });
    
    stream.on('end', () => {
      console.log('\nStream ended.');
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

async function imageGenerationExample() {
  console.log('\n=== Image Generation Example ===');
  
  try {
    const image = await client.images.create({
      model: 'cogview-3',
      prompt: 'A futuristic city with flying cars and neon lights',
      n: 1,
      size: '1024x1024',
    });
    
    console.log('Generated image URL:', image.data[0].url);
  } catch (error) {
    console.error('Error:', error);
  }
}

async function embeddingExample() {
  console.log('\n=== Embedding Example ===');
  
  try {
    const embedding = await client.embeddings.create({
      model: 'embedding-2',
      input: 'Hello, world! This is a test sentence for embedding.',
    });
    
    console.log('Embedding dimensions:', embedding.data[0].embedding.length);
    console.log('First 5 values:', embedding.data[0].embedding.slice(0, 5));
    console.log('Usage:', embedding.usage);
  } catch (error) {
    console.error('Error:', error);
  }
}

async function functionCallingExample() {
  console.log('\n=== Function Calling Example ===');
  
  try {
    const completion = await client.chat.create({
      model: 'glm-4',
      messages: [
        { role: 'user', content: 'What\'s the weather like in Beijing?' }
      ],
      tools: [
        {
          type: 'function',
          function: {
            name: 'get_weather',
            description: 'Get the current weather in a given location',
            parameters: {
              type: 'object',
              properties: {
                location: {
                  type: 'string',
                  description: 'The city and state, e.g. San Francisco, CA',
                },
                unit: {
                  type: 'string',
                  enum: ['celsius', 'fahrenheit'],
                  description: 'The unit of temperature',
                },
              },
              required: ['location'],
            },
          },
        },
      ],
      tool_choice: 'auto',
    });
    
    const functionResponse = completion as any;
    const message = functionResponse.choices[0].message;
    console.log('Response:', message.content);
    
    if (message.tool_calls) {
      console.log('Tool calls:', JSON.stringify(message.tool_calls, null, 2));
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

async function runAllExamples() {
  await basicChatExample();
  await streamingChatExample();
  
  // Wait a bit for streaming to complete
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  await imageGenerationExample();
  await embeddingExample();
  await functionCallingExample();
}

// Run examples if this file is executed directly
if (require.main === module) {
  runAllExamples().catch(console.error);
}

export {
  basicChatExample,
  streamingChatExample,
  imageGenerationExample,
  embeddingExample,
  functionCallingExample,
};