import { BaseAPI } from '../core/base-api';
import { ImageCreateParams, ImagesResponse } from '../types/images';
import { RequestOptions } from '../types/client';

/**
 * Images API
 */
export class Images extends BaseAPI {
  /**
   * Creates an image given a prompt
   */
  async generate(
    params: ImageCreateParams,
    options?: RequestOptions
  ): Promise<ImagesResponse> {
    const requestBody = {
      model: params.model,
      prompt: params.prompt,
      n: params.n,
      quality: params.quality,
      response_format: params.response_format,
      size: params.size,
      style: params.style,
      user: params.user,
    };

    // Remove undefined values
    Object.keys(requestBody).forEach(key => {
      if (requestBody[key as keyof typeof requestBody] === undefined) {
        delete requestBody[key as keyof typeof requestBody];
      }
    });

    const mergedOptions = this.mergeOptions(options, {
      timeout: params.timeout,
      headers: params.extraHeaders,
    });

    try {
      return await this.client.post<ImagesResponse>('/images/generations', requestBody, mergedOptions);
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Alias for generate method to match OpenAI SDK naming
   */
  create = this.generate;
}