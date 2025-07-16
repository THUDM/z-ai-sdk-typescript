# ZAI TypeScript SDK

[![npm version](https://img.shields.io/npm/v/z-ai-sdk-typescript.svg)](https://www.npmjs.com/package/z-ai-sdk-typescript)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)

A modern, type-safe TypeScript SDK for the ZAI API, inspired by the OpenAI SDK design patterns.

## ✨ Features

- 🚀 **Full TypeScript Support**: Complete type definitions for all API endpoints
- 🔧 **OpenAI-Style API**: Familiar interface for developers coming from OpenAI
- ⚡ **Modern Architecture**: Built with modern JavaScript/TypeScript best practices
- 🛡️ **Type Safety**: Comprehensive type checking and IntelliSense support
- 📦 **Tree Shakeable**: Import only what you need
- 🌊 **Streaming Support**: Full support for streaming responses
- 🔐 **Secure**: Built-in JWT authentication with token caching

## 📦 Installation

```bash
npm install z-ai-sdk-typescript
# or
yarn add z-ai-sdk-typescript
# or
pnpm add z-ai-sdk-typescript
```

## 🚀 Quick Start

### Basic Setup

```typescript
import { ZAI } from 'z-ai-sdk-typescript';

// Method 1: Initialize with constructor
const client = new ZAI({
  apiKey: 'your-api-key.secret', // or set ZAI_API_KEY environment variable
});

// Method 2: Use static factory method for ZHIPU AI environment
const zhipuClient = ZAI.ofZHIPU('your-api-key.secret');

// Method 3: Use static factory method for ZAI environment
const zaiClient = ZAI.ofZAI('your-api-key.secret');

// Or with additional options
const client = new ZAI({
  apiKey: 'your-api-key.secret',
  baseURL: 'https://api.z.ai/api/paas/v4/', // optional
  timeout: 30000, // optional
  maxRetries: 3, // optional
});

// Static methods also support additional options
const zhipuClientWithOptions = ZAI.ofZHIPU('your-api-key.secret', {
  timeout: 30000,
  maxRetries: 3,
});
```

### Chat Completions

```typescript
// Basic chat completion
const completion = await client.chat.create({
  model: 'glm-4',
  messages: [
    { role: 'user', content: 'Hello, how are you?' }
  ],
});

console.log(completion.choices[0].message.content);

// Streaming chat completion
const stream = await client.chat.createStream({
  model: 'glm-4',
  messages: [
    { role: 'user', content: 'Tell me a story' }
  ],
});

stream.on('data', (chunk) => {
  process.stdout.write(chunk.toString());
});
```

### Image Generation

```typescript
const image = await client.images.create({
  model: 'cogview-3',
  prompt: 'A beautiful sunset over mountains',
  n: 1,
  size: '1024x1024',
});

console.log(image.data[0].url);
```

### Embeddings

```typescript
const embedding = await client.embeddings.create({
  model: 'embedding-2',
  input: 'Hello world',
});

console.log(embedding.data[0].embedding);
```

### File Operations

```typescript
// Upload a file
const file = await client.files.create({
  file: fileBuffer, // or File object
  purpose: 'fine-tune',
  filename: 'training-data.jsonl',
});

// List files
const files = await client.files.list();

// Get file info
const fileInfo = await client.files.retrieve(file.id);

// Delete file
await client.files.delete(file.id);
```

## 🔧 Advanced Usage

### Custom Headers and Timeouts

```typescript
const completion = await client.chat.create(
  {
    model: 'glm-4',
    messages: [{ role: 'user', content: 'Hello' }],
  },
  {
    timeout: 10000,
    headers: {
      'Custom-Header': 'value',
    },
  }
);
```

### Function Calling

```typescript
const completion = await client.chat.create({
  model: 'glm-4',
  messages: [{ role: 'user', content: 'What\'s the weather like?' }],
  tools: [
    {
      type: 'function',
      function: {
        name: 'get_weather',
        description: 'Get the current weather',
        parameters: {
          type: 'object',
          properties: {
            location: {
              type: 'string',
              description: 'The city name',
            },
          },
          required: ['location'],
        },
      },
    },
  ],
  tool_choice: 'auto',
});
```

### Error Handling

```typescript
try {
  const completion = await client.chat.create({
    model: 'glm-4',
    messages: [{ role: 'user', content: 'Hello' }],
  });
} catch (error) {
  if (error.error?.type === 'invalid_request_error') {
    console.error('Invalid request:', error.error.message);
  } else {
    console.error('Unexpected error:', error);
  }
}
```

## 📚 API Reference

### Client Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `apiKey` | `string` | `process.env.ZAI_API_KEY` | Your ZAI API key |
| `baseURL` | `string` | `https://api.z.ai/api/paas/v4/` | API base URL |
| `timeout` | `number` | `60000` | Request timeout in milliseconds |
| `maxRetries` | `number` | `2` | Maximum number of retries |
| `defaultHeaders` | `object` | `{}` | Default headers for all requests |
| `cacheToken` | `boolean` | `true` | Whether to cache JWT tokens |

### Available Models

- **Chat**: `glm-4`, `glm-4v`, `glm-3-turbo`
- **Images**: `cogview-3`
- **Embeddings**: `embedding-2`

## 🔗 Compatibility

This SDK is designed to be compatible with:

- Node.js 14+
- TypeScript 4.5+
- Modern browsers (with bundlers)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [ZAI Open Platform](https://open.bigmodel.cn/)
- [API Documentation](https://open.bigmodel.cn/dev/api)
- [GitHub Repository](https://github.com/zai/z-ai-sdk-typescript)