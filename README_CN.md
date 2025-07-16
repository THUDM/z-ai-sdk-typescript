# ZAI TypeScript SDK

[![npm version](https://img.shields.io/npm/v/zai-sdk.svg)](https://www.npmjs.com/package/zai-sdk)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)

一个现代化、类型安全的 ZAI API TypeScript SDK，设计灵感来源于 OpenAI SDK。

## ✨ 特性

- 🚀 **完整的 TypeScript 支持**：为所有 API 端点提供完整的类型定义
- 🔧 **OpenAI 风格的 API**：为来自 OpenAI 的开发者提供熟悉的接口
- ⚡ **现代化架构**：采用现代 JavaScript/TypeScript 最佳实践构建
- 🛡️ **类型安全**：全面的类型检查和 IntelliSense 支持
- 📦 **支持 Tree Shaking**：只导入你需要的部分
- 🌊 **流式响应支持**：完整支持流式响应
- 🔐 **安全**：内置 JWT 认证和令牌缓存

## 📦 安装

```bash
npm install zai-sdk
# 或者
yarn add zai-sdk
# 或者
pnpm add zai-sdk
```

## 🚀 快速开始

### 基础设置

```typescript
import { ZAI } from 'zai-sdk';

// 方法 1：使用构造函数初始化
const client = new ZAI({
  apiKey: 'your-api-key.secret', // 或者设置 ZAI_API_KEY 环境变量
});

// 方法 2：使用静态工厂方法创建 ZHIPU AI 环境客户端
const zhipuClient = ZAI.ofZHIPU('your-api-key.secret');

// 方法 3：使用静态工厂方法创建 ZAI 环境客户端
const zaiClient = ZAI.ofZAI('your-api-key.secret');

// 或者使用额外选项
const client = new ZAI({
  apiKey: 'your-api-key.secret',
  baseURL: 'https://api.z.ai/api/paas/v4/', // 可选
  timeout: 30000, // 可选
  maxRetries: 3, // 可选
});

// 静态方法也支持额外选项
const zhipuClientWithOptions = ZAI.ofZHIPU('your-api-key.secret', {
  timeout: 30000,
  maxRetries: 3,
});
```

### 聊天补全

```typescript
// 基础聊天补全
const completion = await client.chat.create({
  model: 'glm-4',
  messages: [
    { role: 'user', content: '你好，你怎么样？' }
  ],
});

console.log(completion.choices[0].message.content);

// 流式聊天补全
const stream = await client.chat.createStream({
  model: 'glm-4',
  messages: [
    { role: 'user', content: '给我讲个故事' }
  ],
});

stream.on('data', (chunk) => {
  process.stdout.write(chunk.toString());
});
```

## 🔧 高级用法

### 自定义请求头和超时

```typescript
const completion = await client.chat.create(
  {
    model: 'glm-4',
    messages: [{ role: 'user', content: '你好' }],
  },
  {
    timeout: 10000,
    headers: {
      'Custom-Header': 'value',
    },
  }
);
```

## 🔗 兼容性

此 SDK 设计兼容：

- Node.js 14+
- TypeScript 4.5+
- 现代浏览器（配合打包工具）

## 🤝 贡献

欢迎贡献！请随时提交 Pull Request。

## 📄 许可证

本项目采用 MIT 许可证 - 详情请查看 [LICENSE](LICENSE) 文件。

## 🔗 链接

- 访问 [Z.ai 平台](https://z.ai/)
- 访问 [智谱 AI 开放平台](http://open.bigmodel.cn/)
- [GitHub 仓库](https://github.com/zai/z-ai-sdk-typescript)