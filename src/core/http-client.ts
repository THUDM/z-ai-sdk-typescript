import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ClientOptions, RequestOptions } from '../types/client';
import { generateToken } from './auth';
import { Z_AI_BASE_URL, ENV_API_KEY, ENV_BASE_URL } from './constants';

/**
 * HTTP client for making requests to the ZAI API
 */
export class HTTPClient {
  private client: AxiosInstance;
  private apiKey: string;
  private cacheToken: boolean;

  constructor(options: ClientOptions) {
    this.apiKey = options.apiKey || process.env[ENV_API_KEY] || '';
    this.cacheToken = options.cacheToken ?? true;

    if (!this.apiKey) {
      throw new Error(`API key is required. Provide it via options.apiKey or ${ENV_API_KEY} environment variable.`);
    }

    const baseURL = options.baseURL || process.env[ENV_BASE_URL] || Z_AI_BASE_URL;

    this.client = axios.create({
      baseURL,
      timeout: options.timeout || 60000,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'z-ai-sdk-typescript/1.0.0',
        ...options.defaultHeaders,
      },
    });

    // Add request interceptor for authentication
    this.client.interceptors.request.use((config) => {
      const token = generateToken(this.apiKey, this.cacheToken);
      config.headers.Authorization = token;
      return config;
    });

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.data) {
          return Promise.reject(error.response.data);
        }
        return Promise.reject(error);
      }
    );
  }

  /**
   * Make a GET request
   */
  async get<T = any>(
    url: string,
    config?: AxiosRequestConfig & RequestOptions
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.client.get(url, config);
    return response.data;
  }

  /**
   * Make a POST request
   */
  async post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig & RequestOptions
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.client.post(url, data, config);
    return response.data;
  }

  /**
   * Make a PUT request
   */
  async put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig & RequestOptions
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.client.put(url, data, config);
    return response.data;
  }

  /**
   * Make a DELETE request
   */
  async delete<T = any>(
    url: string,
    config?: AxiosRequestConfig & RequestOptions
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.client.delete(url, config);
    return response.data;
  }

  /**
   * Make a POST request with form data
   */
  async postForm<T = any>(
    url: string,
    data: FormData,
    config?: AxiosRequestConfig & RequestOptions
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.client.post(url, data, {
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data',
        ...config?.headers,
      },
    });
    return response.data;
  }

  /**
   * Make a streaming request
   */
  async stream(
    url: string,
    data?: any,
    config?: AxiosRequestConfig & RequestOptions
  ): Promise<NodeJS.ReadableStream> {
    const response = await this.client.post(url, data, {
      ...config,
      responseType: 'stream',
    });
    return response.data;
  }
}