import { HTTPClient } from './core/http-client';
import { Chat, Images, Embeddings, Files } from './resources';
import { ClientOptions } from './types/client';
import { ZHIPU_AI_BASE_URL, Z_AI_BASE_URL } from './core/constants';
import {
  ChatCompletionCreateParams,
  ChatCompletion,
  ImageCreateParams,
  ImagesResponse,
  EmbeddingCreateParams,
  CreateEmbeddingResponse,
  FileCreateParams,
  FileListParams,
  FileObject,
  FileListResponse,
  FileDeleteResponse,
} from './types';

/**
 * Main ZAI client class
 */
export class ZAI {
  private httpClient: HTTPClient;
  
  // API resource instances
  public chat: Chat;
  public images: Images;
  public embeddings: Embeddings;
  public files: Files;

  constructor(options: ClientOptions = {}) {
    this.httpClient = new HTTPClient(options);
    
    // Initialize API resources
    this.chat = new Chat(this.httpClient);
    this.images = new Images(this.httpClient);
    this.embeddings = new Embeddings(this.httpClient);
    this.files = new Files(this.httpClient);
  }

  // Convenience methods that delegate to the appropriate resource

  /**
   * Creates a chat completion
   */
  async createChatCompletion(
    params: ChatCompletionCreateParams
  ): Promise<ChatCompletion | NodeJS.ReadableStream> {
    return this.chat.create(params);
  }

  /**
   * Creates a streaming chat completion
   */
  async createChatCompletionStream(
    params: Omit<ChatCompletionCreateParams, 'stream'>
  ): Promise<NodeJS.ReadableStream> {
    return this.chat.createStream(params);
  }

  /**
   * Generates images from a prompt
   */
  async createImage(
    params: ImageCreateParams
  ): Promise<ImagesResponse> {
    return this.images.create(params);
  }

  /**
   * Creates embeddings for the input text
   */
  async createEmbedding(
    params: EmbeddingCreateParams
  ): Promise<CreateEmbeddingResponse> {
    return this.embeddings.create(params);
  }

  /**
   * Uploads a file
   */
  async createFile(
    params: FileCreateParams
  ): Promise<FileObject> {
    return this.files.create(params);
  }

  /**
   * Lists files
   */
  async listFiles(
    params?: FileListParams
  ): Promise<FileListResponse> {
    return this.files.list(params);
  }

  /**
   * Retrieves a file
   */
  async retrieveFile(
    fileId: string
  ): Promise<FileObject> {
    return this.files.retrieve(fileId);
  }

  /**
   * Deletes a file
   */
  async deleteFile(
    fileId: string
  ): Promise<FileDeleteResponse> {
    return this.files.delete(fileId);
  }

  /**
   * Gets file content
   */
  async getFileContent(
    fileId: string
  ): Promise<string> {
    return this.files.content(fileId);
  }

  // Static factory methods for environment switching

  /**
   * Creates a ZAI client configured for ZHIPU AI environment
   * @param apiKey API key for authentication
   * @param options Additional client options
   * @returns ZAI client instance configured for ZHIPU AI
   */
  static ofZHIPU(apiKey: string, options: Omit<ClientOptions, 'apiKey' | 'baseURL'> = {}): ZAI {
    return new ZAI({
      ...options,
      apiKey,
      baseURL: ZHIPU_AI_BASE_URL
    });
  }

  /**
   * Creates a ZAI client configured for ZAI environment
   * @param apiKey API key for authentication
   * @param options Additional client options
   * @returns ZAI client instance configured for ZAI
   */
  static ofZAI(apiKey: string, options: Omit<ClientOptions, 'apiKey' | 'baseURL'> = {}): ZAI {
    return new ZAI({
      ...options,
      apiKey,
      baseURL: Z_AI_BASE_URL
    });
  }
}

export default ZAI;