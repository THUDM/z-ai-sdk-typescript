import { HTTPClient } from './core';
import { Chat, Images, Embeddings, Files } from './resources';
import { ClientOptions } from './types';
import { ZHIPU_AI_BASE_URL, Z_AI_BASE_URL } from './core';

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