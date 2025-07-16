import { BaseAPI } from "../core/base-api";
import {
  ChatCompletionCreateParams,
  ChatCompletion,
} from "../types/chat";
import { RequestOptions } from "../types/client";

/**
 * Chat completions API
 */
export class Chat extends BaseAPI {
  /**
   * Creates a model response for the given chat conversation
   */
  async create(
    params: ChatCompletionCreateParams,
    options?: RequestOptions,
  ): Promise<ChatCompletion | NodeJS.ReadableStream> {
    const requestBody = {
      model: params.model,
      messages: params.messages,
      stream: params.stream || false,
      temperature: params.temperature,
      top_p: params.top_p,
      max_tokens: params.max_tokens,
      presence_penalty: params.presence_penalty,
      frequency_penalty: params.frequency_penalty,
      stop: params.stop,
      tools: params.tools,
      tool_choice: params.tool_choice,
      seed: params.seed,
      user: params.user,
      do_sample: params.do_sample,
      request_id: params.request_id,
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
      if (params.stream) {
        return this.client.stream(
          "/chat/completions",
          requestBody,
          mergedOptions,
        );
      }

      return await this.client.post<ChatCompletion>(
        "/chat/completions",
        requestBody,
        mergedOptions,
      );
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Creates a streaming chat completion
   */
  async createStream(
    params: Omit<ChatCompletionCreateParams, "stream">,
    options?: RequestOptions,
  ): Promise<NodeJS.ReadableStream> {
    const streamParams = { ...params, stream: true };
    return this.create(streamParams, options) as Promise<NodeJS.ReadableStream>;
  }
}

/**
 * Chat completions namespace
 */
export namespace Chat {
  export class Completions extends Chat {
    /**
     * Creates a model response for the given chat conversation
     */
    create = super.create;

    /**
     * Creates a streaming chat completion
     */
    createStream = super.createStream;
  }
}
