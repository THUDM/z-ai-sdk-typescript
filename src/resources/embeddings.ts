import { BaseAPI } from "../core/base-api";
import {
  EmbeddingCreateParams,
  CreateEmbeddingResponse,
} from "../types/embeddings";
import { RequestOptions } from "../types/client";

/**
 * Embeddings API
 */
export class Embeddings extends BaseAPI {
  /**
   * Creates an embedding vector representing the input text
   */
  async create(
    params: EmbeddingCreateParams,
    options?: RequestOptions,
  ): Promise<CreateEmbeddingResponse> {
    const requestBody = {
      input: params.input,
      model: params.model,
      encoding_format: params.encoding_format,
      user: params.user,
      sensitive_word_check: params.sensitive_word_check,
    };

    // Remove undefined values
    Object.keys(requestBody).forEach((key) => {
      if (requestBody[key as keyof typeof requestBody] === undefined) {
        delete requestBody[key as keyof typeof requestBody];
      }
    });

    const mergedOptions = this.mergeOptions(options, {
      timeout: params.timeout,
      headers: params.extraHeaders,
    });

    try {
      return await this.client.post<CreateEmbeddingResponse>(
        "/embeddings",
        requestBody,
        mergedOptions,
      );
    } catch (error) {
      this.handleError(error);
    }
  }
}
