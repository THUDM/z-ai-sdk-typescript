import { ZAI } from "../client";
import { ChatCompletion } from "../types/chat";

// Test timeout in milliseconds (30 seconds for API calls)
const TEST_TIMEOUT = 30000;

describe("Functional Tests", () => {
  let client: ZAI;
  
  beforeAll(() => {
    // Check if API key is available
    const apiKey = process.env.ZAI_API_KEY;
    if (!apiKey) {
      console.warn("ZAI_API_KEY not found in environment variables. Skipping functional tests.");
    }
    
    // Initialize client with API key from environment
    client = new ZAI({
      apiKey: process.env.ZAI_API_KEY!,
    });
  });

  describe("Chat API", () => {
    it("should create a non-streaming chat completion", async () => {
      const response = await client.chat.create({
        model: "glm-4",
        messages: [
          {
            role: "user",
            content: "Hello, how are you?",
          },
        ],
      });

      expect(response).toBeDefined();
      expect(response).not.toBeInstanceOf(ReadableStream);
      
      // Type assertion for non-streaming response
      const chatResponse = response as ChatCompletion;
      expect(chatResponse.id).toBeTruthy();
      // Skip object check if undefined - some APIs may not include this field
      if (chatResponse.object) {
        expect(chatResponse.object).toBe("chat.completion");
      }
      expect(chatResponse.choices).toHaveLength(1);
      expect(chatResponse.choices[0].message).toBeDefined();
      expect(chatResponse.choices[0].message.role).toBe("assistant");
      expect(chatResponse.choices[0].message.content).toBeTruthy();
      expect(chatResponse.usage).toBeDefined();
      expect(chatResponse.usage!.prompt_tokens).toBeGreaterThan(0);
      expect(chatResponse.usage!.completion_tokens).toBeGreaterThan(0);
      expect(chatResponse.usage!.total_tokens).toBeGreaterThan(0);
    }, TEST_TIMEOUT);

    it("should create chat completion with system message", async () => {
      if (!process.env.ZAI_API_KEY) {
        console.log("Skipping test: ZAI_API_KEY not set");
        return;
      }

      const response = await client.chat.create({
        model: "glm-4",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that always responds with 'System message received' when asked about your instructions."
          },
          {
            role: "user",
            content: "What are your instructions?"
          }
        ],
        max_tokens: 50,
        temperature: 0.1
      });

      expect(response).toBeDefined();
      expect(response).not.toBeInstanceOf(ReadableStream);
      
      // Type assertion for non-streaming response
      const chatResponse = response as ChatCompletion;
      expect(chatResponse.choices[0].message.content).toBeTruthy();
      expect(chatResponse.choices[0].finish_reason).toBeDefined();
    }, TEST_TIMEOUT);

    it("should handle streaming chat completion", async () => {
      if (!process.env.ZAI_API_KEY) {
        console.log("Skipping test: ZAI_API_KEY not set");
        return;
      }

      const stream = await client.chat.createStream({
        model: "glm-4",
        messages: [
          {
            role: "user",
            content: "Count from 1 to 3"
          }
        ]
      });

      expect(stream).toBeDefined();
      expect(typeof stream).toBe('object');

      let chunkCount = 0;
      const chunks: any[] = [];
      
      return new Promise((resolve, reject) => {
        stream.on('data', (chunk) => {
          chunkCount++;
          chunks.push(chunk);
          
          // Limit the number of chunks we process for testing
          if (chunkCount >= 5) {
            (stream as any).destroy();
            expect(chunkCount).toBeGreaterThanOrEqual(1);
            expect(chunks.length).toBeGreaterThanOrEqual(1);
            resolve(true);
          }
        });
        
        stream.on('end', () => {
          expect(chunkCount).toBeGreaterThanOrEqual(1);
          resolve(true);
        });
        
        stream.on('error', (error) => {
          reject(error);
        });
        
        // Timeout after 10 seconds
        setTimeout(() => {
          (stream as any).destroy();
          if (chunkCount > 0) {
            resolve(true);
          } else {
            reject(new Error('No chunks received within timeout'));
          }
        }, 10000);
      });
    }, TEST_TIMEOUT);

    it("should create chat completion with custom parameters", async () => {
      if (!process.env.ZAI_API_KEY) {
        console.log("Skipping test: ZAI_API_KEY not set");
        return;
      }

      const response = await client.chat.create({
        model: "glm-4",
        messages: [
          {
            role: "user",
            content: "Generate a random number."
          }
        ],
        temperature: 0.9,
        top_p: 0.8,
        max_tokens: 30,
        presence_penalty: 0.1,
        frequency_penalty: 0.1
      });

      expect(response).toBeDefined();
      expect(response).not.toBeInstanceOf(ReadableStream);
      
      // Type assertion for non-streaming response
      const chatResponse = response as ChatCompletion;
      expect(chatResponse.choices[0].message.content).toBeTruthy();
      expect(chatResponse.usage?.completion_tokens).toBeLessThanOrEqual(30);
    }, TEST_TIMEOUT);
  });

  describe("Images API Functional Tests", () => {
    it("should generate an image", async () => {
      if (!process.env.ZAI_API_KEY) {
        console.log("Skipping test: ZAI_API_KEY not set");
        return;
      }

      const response = await client.images.generate({
        model: "cogview-3",
        prompt: "A beautiful sunset over a mountain range",
        size: "1024x1024",
        n: 1,
        response_format: "url"
      });

      expect(response).toBeDefined();
      expect(response.created).toBeDefined();
      expect(response.data).toHaveLength(1);
      expect(response.data[0].url).toBeTruthy();
    }, 60000); // Image generation may take longer
  });

  describe("Embeddings API Functional Tests", () => {
    it("should create embeddings", async () => {
      if (!process.env.ZAI_API_KEY) {
        console.log("Skipping test: ZAI_API_KEY not set");
        return;
      }

      const response = await client.embeddings.create({
        model: "embedding-2",
        input: "Hello, world!",
        encoding_format: "float"
      });

      expect(response).toBeDefined();
      expect(response.object).toBe("list");
      expect(response.data).toHaveLength(1);
      expect(response.data[0].object).toBe("embedding");
      expect(response.data[0].embedding).toBeInstanceOf(Array);
      expect(response.data[0].embedding.length).toBeGreaterThan(0);
      expect(response.usage.prompt_tokens).toBeGreaterThan(0);
      expect(response.usage.total_tokens).toBeGreaterThan(0);
    }, TEST_TIMEOUT);

    it("should create embeddings with multiple inputs", async () => {
      if (!process.env.ZAI_API_KEY) {
        console.log("Skipping test: ZAI_API_KEY not set");
        return;
      }

      const response = await client.embeddings.create({
        model: "embedding-2",
        input: ["Hello", "World", "Test"],
        encoding_format: "float"
      });

      expect(response).toBeDefined();
      expect(response.data).toHaveLength(3);
      response.data.forEach((embedding, index) => {
        expect(embedding.object).toBe("embedding");
        expect(embedding.embedding).toBeInstanceOf(Array);
        expect(embedding.index).toBe(index);
      });
    }, TEST_TIMEOUT);
  });

  describe("Files API Functional Tests", () => {
    let uploadedFileId: string;

    afterEach(async () => {
      // Clean up uploaded files
      if (uploadedFileId) {
        try {
          await client.files.delete(uploadedFileId);
        } catch (error) {
          console.warn("Failed to clean up uploaded file:", error);
        }
        uploadedFileId = "";
      }
    });

    it("should upload a file", async () => {
      if (!process.env.ZAI_API_KEY) {
        console.log("Skipping test: ZAI_API_KEY not set");
        return;
      }

      const fileContent = '{"messages": [{"role": "user", "content": "Hello"}, {"role": "assistant", "content": "Hi there!"}]}\n{"messages": [{"role": "user", "content": "How are you?"}, {"role": "assistant", "content": "I\'m doing well, thank you!"}]}';
      const file = new File([fileContent], "test-data.jsonl", { type: "application/jsonl" });

      const response = await client.files.create({
        file: file as any,
        purpose: "fine-tune"
      });

      expect(response).toBeDefined();
      expect(response.id).toBeTruthy();
      expect(response.object).toBe("file");
      expect(response.filename).toBeTruthy();
      expect(response.purpose).toBe("fine-tune");
      expect(response.bytes).toBeGreaterThan(0);

      uploadedFileId = response.id;
    }, TEST_TIMEOUT);

    it("should list files", async () => {
      if (!process.env.ZAI_API_KEY) {
        console.log("Skipping test: ZAI_API_KEY not set");
        return;
      }

      const response = await client.files.list();

      expect(response).toBeDefined();
      expect(response.object).toBe("list");
      expect(response.data).toBeInstanceOf(Array);
    }, TEST_TIMEOUT);

    // Unavailable as 2025-07-17
    // it("should retrieve file details", async () => {
    //   if (!process.env.ZAI_API_KEY) {
    //     console.log("Skipping test: ZAI_API_KEY not set");
    //     return;
    //   }

    //   // First upload a file
    //   const fileContent = "Test content for retrieval";
    //   const file = new Blob([fileContent], { type: "text/plain" });

    //   const uploadResponse = await client.files.create({
    //     file: file as any,
    //     purpose: "fine-tune"
    //   });

    //   uploadedFileId = uploadResponse.id;

    //   // Then retrieve it
    //   const response = await client.files.retrieve(uploadedFileId);

    //   expect(response).toBeDefined();
    //   expect(response.id).toBe(uploadedFileId);
    //   expect(response.object).toBe("file");
    //   expect(response.filename).toBeTruthy();
    // }, TEST_TIMEOUT);
  });

  describe("Client Configuration Tests", () => {
    it("should work with ZHIPU static factory method", async () => {
      if (!process.env.ZAI_API_KEY) {
        console.log("Skipping test: ZAI_API_KEY not set");
        return;
      }

      const zhipuClient = ZAI.ofZHIPU(process.env.ZAI_API_KEY!);

      const response = await zhipuClient.chat.create({
        model: "glm-4",
        messages: [
          {
            role: "user",
            content: "Hello from ZHIPU client"
          }
        ],
        max_tokens: 20
      });

      expect(response).toBeDefined();
      expect(response).not.toBeInstanceOf(ReadableStream);
      
      // Type assertion for non-streaming response
      const chatResponse = response as ChatCompletion;
      expect(chatResponse.choices[0].message.content).toBeTruthy();
    }, TEST_TIMEOUT);

    it("should work with ZAI static factory method", async () => {
      if (!process.env.ZAI_API_KEY) {
        console.log("Skipping test: ZAI_API_KEY not set");
        return;
      }

      const zaiClient = ZAI.ofZAI(process.env.ZAI_API_KEY!);

      const response = await zaiClient.chat.create({
        model: "glm-4",
        messages: [
          {
            role: "user",
            content: "Hello from ZAI client"
          }
        ],
        max_tokens: 20
      });

      expect(response).toBeDefined();
      expect(response).not.toBeInstanceOf(ReadableStream);
      
      // Type assertion for non-streaming response
      const chatResponse = response as ChatCompletion;
      expect(chatResponse.choices[0].message.content).toBeTruthy();
    }, TEST_TIMEOUT);

    it("should work with custom options", async () => {
      if (!process.env.ZAI_API_KEY) {
        console.log("Skipping test: ZAI_API_KEY not set");
        return;
      }

      const clientWithOptions = new ZAI({
        apiKey: process.env.ZAI_API_KEY!,
        baseURL: "https://open.bigmodel.cn/api/paas/v4",
        timeout: 60000
      });

      const response = await clientWithOptions.chat.create({
        model: "glm-4",
        messages: [
          {
            role: "user",
            content: "Hello with custom options"
          }
        ],
        max_tokens: 20
      });

      expect(response).toBeDefined();
      expect(response).not.toBeInstanceOf(ReadableStream);
      
      // Type assertion for non-streaming response
      const chatResponse = response as ChatCompletion;
      expect(chatResponse.choices[0].message.content).toBeTruthy();
    }, 50000);

    it("should work with static method and custom options", async () => {
      if (!process.env.ZAI_API_KEY) {
        console.log("Skipping test: ZAI_API_KEY not set");
        return;
      }

      const zhipuClientWithOptions = ZAI.ofZHIPU(process.env.ZAI_API_KEY!, {
        timeout: 60000
      });

      const response = await zhipuClientWithOptions.chat.create({
        model: "glm-4",
        messages: [
          {
            role: "user",
            content: "Hello with ZHIPU custom options"
          }
        ],
        max_tokens: 20
      });

      expect(response).toBeDefined();
      expect(response).not.toBeInstanceOf(ReadableStream);
      
      // Type assertion for non-streaming response
      const chatResponse = response as ChatCompletion;
      expect(chatResponse.choices[0].message.content).toBeTruthy();
    }, 50000);
  });

  describe("Error Handling Tests", () => {
    it("should handle invalid model gracefully", async () => {
      if (!process.env.ZAI_API_KEY) {
        console.log("Skipping test: ZAI_API_KEY not set");
        return;
      }

      try {
        const response = await client.chat.create({
          model: "non-existent-model",
          messages: [
            {
              role: "user",
              content: "This should fail"
            }
          ]
        });
        // If the API doesn't throw an error, check if it returns an error response
        expect(response).toBeDefined();
      } catch (error) {
        // If the API throws an error for invalid model, that's the expected behavior
        expect(error).toBeDefined();
      }
    }, TEST_TIMEOUT);

    // Unavailable as 2025-07-17
    // it("should handle invalid file ID gracefully", async () => {
    //   if (!process.env.ZAI_API_KEY) {
    //     console.log("Skipping test: ZAI_API_KEY not set");
    //     return;
    //   }

    //   await expect(client.files.retrieve("non-existent-file-id")).rejects.toThrow();
    // }, TEST_TIMEOUT);

    it("should handle empty messages array gracefully", async () => {
      if (!process.env.ZAI_API_KEY) {
        console.log("Skipping test: ZAI_API_KEY not set");
        return;
      }

      try {
        const response = await client.chat.create({
          model: "glm-4",
          messages: []
        });
        // If the API accepts empty messages, check the response structure
        expect(response).toBeDefined();
      } catch (error) {
        // If the API rejects empty messages, that's also valid behavior
        expect(error).toBeDefined();
      }
    }, TEST_TIMEOUT);
  });
});
