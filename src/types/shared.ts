/**
 * Base request options that can be applied to any API call
 */
export interface BaseRequestOptions {
  /**
   * Additional headers to include in the request
   */
  extraHeaders?: Record<string, string>;
  
  /**
   * Request timeout in milliseconds
   */
  timeout?: number;
}

/**
 * Usage statistics for API responses
 */
export interface Usage {
  /**
   * Number of tokens in the prompt
   */
  prompt_tokens: number;
  
  /**
   * Number of tokens in the completion
   */
  completion_tokens: number;
  
  /**
   * Total number of tokens used
   */
  total_tokens: number;
}

/**
 * Error response from the API
 */
export interface APIError {
  error: {
    message: string;
    type: string;
    code?: string;
  };
}

/**
 * Function call definition
 */
export interface FunctionCall {
  /**
   * The name of the function to call
   */
  name: string;
  
  /**
   * The arguments to pass to the function, as a JSON object
   */
  arguments: string;
}

/**
 * Tool call definition
 */
export interface ToolCall {
  /**
   * The ID of the tool call
   */
  id: string;
  
  /**
   * The type of the tool call (currently only 'function')
   */
  type: 'function';
  
  /**
   * The function that the model called
   */
  function: FunctionCall;
}

/**
 * Function definition for tools
 */
export interface FunctionDefinition {
  /**
   * The name of the function
   */
  name: string;
  
  /**
   * A description of what the function does
   */
  description?: string;
  
  /**
   * The parameters the function accepts, described as a JSON Schema object
   */
  parameters?: Record<string, any>;
}

/**
 * Tool definition
 */
export interface Tool {
  /**
   * The type of the tool (currently only 'function')
   */
  type: 'function';
  
  /**
   * The function definition
   */
  function: FunctionDefinition;
}