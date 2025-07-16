import { ZAI } from "../client";
import { HTTPClient } from "../core/http-client";

// Mock HTTPClient
jest.mock("../core/http-client");
const MockedHTTPClient = HTTPClient as jest.MockedClass<typeof HTTPClient>;

describe("ZAI Client", () => {
  let client: ZAI;
  let mockHttpClient: jest.Mocked<HTTPClient>;

  beforeEach(() => {
    MockedHTTPClient.mockClear();
    client = new ZAI({ apiKey: "test-api-key" });
    mockHttpClient = MockedHTTPClient.mock
      .instances[0] as jest.Mocked<HTTPClient>;
  });

  describe("initialization", () => {
    it("should create a new ZAI instance", () => {
      expect(client).toBeInstanceOf(ZAI);
      expect(MockedHTTPClient).toHaveBeenCalledWith({ apiKey: "test-api-key" });
    });

    it("should initialize all resource instances", () => {
      expect(client.chat).toBeDefined();
      expect(client.images).toBeDefined();
      expect(client.embeddings).toBeDefined();
      expect(client.files).toBeDefined();
    });
  });

  describe("convenience methods", () => {
    it("should have createChatCompletion method", () => {
      expect(typeof client.createChatCompletion).toBe("function");
    });

    it("should have createChatCompletionStream method", () => {
      expect(typeof client.createChatCompletionStream).toBe("function");
    });

    it("should have createImage method", () => {
      expect(typeof client.createImage).toBe("function");
    });

    it("should have createEmbedding method", () => {
      expect(typeof client.createEmbedding).toBe("function");
    });

    it("should have file management methods", () => {
      expect(typeof client.createFile).toBe("function");
      expect(typeof client.listFiles).toBe("function");
      expect(typeof client.retrieveFile).toBe("function");
      expect(typeof client.deleteFile).toBe("function");
      expect(typeof client.getFileContent).toBe("function");
    });
  });

  describe("static factory methods", () => {
    it("should create ZAI instance with ofZHIPU method", () => {
      const zhipuClient = ZAI.ofZHIPU("test-api-key");
      expect(zhipuClient).toBeInstanceOf(ZAI);
      expect(MockedHTTPClient).toHaveBeenCalledWith({
        apiKey: "test-api-key",
        baseURL: "https://open.bigmodel.cn/api/paas/v4/",
      });
    });

    it("should create ZAI instance with ofZAI method", () => {
      const zaiClient = ZAI.ofZAI("test-api-key");
      expect(zaiClient).toBeInstanceOf(ZAI);
      expect(MockedHTTPClient).toHaveBeenCalledWith({
        apiKey: "test-api-key",
        baseURL: "https://api.z.ai/api/paas/v4/",
      });
    });

    it("should support additional options in static methods", () => {
      const options = {
        timeout: 30000,
        maxRetries: 3,
      };
      const zhipuClient = ZAI.ofZHIPU("test-api-key", options);
      expect(zhipuClient).toBeInstanceOf(ZAI);
      expect(MockedHTTPClient).toHaveBeenCalledWith({
        ...options,
        apiKey: "test-api-key",
        baseURL: "https://open.bigmodel.cn/api/paas/v4/",
      });
    });
  });
});
