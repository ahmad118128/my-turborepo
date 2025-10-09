import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults,
} from 'axios';

import { IMiddleware } from './middlewares/interface';

/**
 * A customizable HTTP client built on Axios with middleware support
 * Provides request/response interception, environment-specific middleware, and RESTful methods
 */
export class ApiClient {
  private readonly adapter: AxiosInstance;
  private readonly _middlewares: Set<IMiddleware> = new Set();
  private isBooted = false;

  /**
   * Creates a new ApiClient instance
   * @param config - Axios configuration options for the underlying instance
   */
  constructor(config: CreateAxiosDefaults) {
    this.adapter = axios.create(config);
  }

  /**
   * Provides access to the middleware collection
   * @throws Error if attempting to add middleware after boot
   * @returns Set of registered middlewares
   */
  public get middlewares(): Set<IMiddleware> {
    if (this.isBooted) throw new Error('Cannot add middleware after boot!');
    return this._middlewares;
  }

  /**
   * Initializes the client by registering all middlewares with Axios interceptors
   * Middlewares are only registered if their environment matches the current NODE_ENV
   * @throws Error if boot is called multiple times
   */
  public boot() {
    this._middlewares.forEach((mw) => {
      const env = mw.environment || process.env.NODE_ENV;
      // Only register middleware if environment matches
      if (env === process.env.NODE_ENV) {
        // Register request interceptors (transform request config, handle request errors)
        this.adapter.interceptors.request.use(mw.onRequest, mw.onRequestError);
        // Register response interceptors (transform response, handle response errors)
        this.adapter.interceptors.response.use(mw.onResponse, mw.onResponseError);
      }
    });
    this.isBooted = true;
  }

  /**
   * Makes an HTTP request using the configured Axios instance
   * @template T - Response data type
   * @template R - Full response type (defaults to AxiosResponse<T>)
   * @param config - Axios request configuration
   * @returns Promise resolving to the response
   * @throws Error if client hasn't been booted
   */
  public request<T = unknown, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R> {
    if (!this.isBooted) throw new Error('HttpClient not yet booted!');
    return this.adapter.request(config);
  }

  // ============ HTTP METHOD HELPERS ============

  /**
   * Performs a GET request
   * @param url - The request URL
   * @param config - Optional Axios request configuration
   * @returns Promise resolving to response data
   */
  public get<T = unknown>(url: string, config?: AxiosRequestConfig) {
    return this.request<T>({ ...config, method: 'GET', url });
  }

  /**
   * Performs a POST request
   * @param url - The request URL
   * @param data - The request payload
   * @param config - Optional Axios request configuration
   * @returns Promise resolving to response data
   */
  public post<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return this.request<T>({ ...config, method: 'POST', url, data });
  }

  /**
   * Performs a PUT request
   * @param url - The request URL
   * @param data - The request payload
   * @param config - Optional Axios request configuration
   * @returns Promise resolving to response data
   */
  public put<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return this.request<T>({ ...config, method: 'PUT', url, data });
  }

  /**
   * Performs a DELETE request
   * @param url - The request URL
   * @param config - Optional Axios request configuration
   * @returns Promise resolving to response data
   */
  public delete<T = unknown>(url: string, config?: AxiosRequestConfig) {
    return this.request<T>({ ...config, method: 'DELETE', url });
  }
}
