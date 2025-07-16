import { HTTPClient } from "./http-client";
import { RequestOptions } from "../types/client";

/**
 * Base class for all API resource classes
 */
export abstract class BaseAPI {
  protected client: HTTPClient;

  constructor(client: HTTPClient) {
    this.client = client;
  }

  /**
   * Merge request options with default options
   */
  protected mergeOptions(
    options?: RequestOptions,
    defaults?: RequestOptions,
  ): RequestOptions {
    return {
      ...defaults,
      ...options,
      headers: {
        ...defaults?.headers,
        ...options?.headers,
      },
    };
  }

  /**
   * Handle API errors consistently
   */
  protected handleError(error: any): never {
    if (error.response?.data) {
      throw error.response.data;
    }
    throw error;
  }
}
