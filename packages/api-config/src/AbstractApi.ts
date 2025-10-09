import { ApiClient } from './ApiClient';

/**
 * Abstract base class for API service classes
 * Provides common infrastructure for API endpoints with consistent URL and HTTP client usage
 *
 * @abstract
 * @example
 * class UserAPI extends AbstractAPI {
 *   constructor(http: ApiClient) {
 *     super('/users', http);
 *   }
 *
 *   async getUsers() {
 *     return this.http.get(this.url);
 *   }
 * }
 */
export default abstract class AbstractAPI {
  /**
   * Creates a new AbstractAPI instance
   * @param url - The base URL endpoint for this API service (e.g., '/users', '/products')
   * @param http - The HTTP client instance for making API requests
   */
  protected url: string;
  protected http: ApiClient;

  constructor(url: string, http: ApiClient) {
    this.url = url;
    this.http = http;
  }
}
