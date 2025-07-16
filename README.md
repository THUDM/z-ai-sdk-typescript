# ZAI TypeScript SDK

[![npm version](https://img.shields.io/npm/v/zai-sdk.svg)](https://www.npmjs.com/package/zai-sdk)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)

[中文文档](README_CN.md) | English

**Not yet released.**

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
npm install zai-sdk
# or
yarn add zai-sdk
# or
pnpm add zai-sdk
```

## 🚀 Quick Start

### Basic Setup

```typescript
import { ZAI } from 'zai-sdk';

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

- Visit [Z.ai Platform](https://z.ai/)
- Visit [ZHIPU AI Open Platform](http://open.bigmodel.cn/)
- [GitHub Repository](https://github.com/zai/z-ai-sdk-typescript)