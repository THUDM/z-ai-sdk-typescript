import { ZAI } from "../client";
import { HTTPClient } from "../core/http-client";

// Mock HTTPClient
jest.mock("../core/http-client");
const MockedHTTPClient = HTTPClient as jest.MockedClass<typeof HTTPClient>;

describe("ZAI Client", () => {
  let client: ZAI;

  beforeEach(() => {
    MockedHTTPClient.mockClear();
    client = new ZAI({ apiKey: "test-api-key" });
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
