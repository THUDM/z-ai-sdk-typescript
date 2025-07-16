/**
 * Configuration options for the ZAI client
 */
export interface ClientOptions {
  /**
   * API key for authentication. If not provided, will look for ZAI_API_KEY environment variable
   */
  apiKey?: string;
  
  /**
   * Base URL for the API. Defaults to https://api.z.ai/api/paas/v4/
   */
  baseURL?: string;
  
  /**
   * Request timeout in milliseconds. Defaults to 60000 (60 seconds)
   */
  timeout?: number;
  
  /**
   * Maximum number of retries for failed requests. Defaults to 2
   */
  maxRetries?: number;
  
  /**
   * Custom headers to include with every request
   */
  defaultHeaders?: Record<string, string>;
  
  /**
   * Whether to cache authentication tokens. Defaults to true
   */
  cacheToken?: boolean;
  
  /**
   * Custom HTTP agent for requests
   */
  httpAgent?: any;
}

/**
 * Request configuration that can be passed to individual API calls
 */
export interface RequestOptions {
  /**
   * Request timeout in milliseconds
   */
  timeout?: number;
  
  /**
   * Additional headers for this specific request
   */
  headers?: Record<string, string>;
  
  /**
   * Maximum number of retries for this specific request
   */
  maxRetries?: number;
  
  /**
   * AbortSignal to cancel the request
   */
  signal?: AbortSignal;
}