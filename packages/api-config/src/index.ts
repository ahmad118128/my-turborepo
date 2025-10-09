import AbstractAPI from './AbstractApi';
import { ApiClient } from './ApiClient';
import AuthMiddleware from './middlewares/AuthMiddleware';
import type { IMiddleware } from './middlewares/interface';

/**
 * Creates a base URL for API requests
 * @param externalURL - Optional external URL to use instead of environment variable
 * @returns The base URL string for API endpoints
 */
export function createBaseURL(externalURL?: string) {
  return externalURL || '';
}

/**
 * Creates and configures a default API client with authentication middleware
 * @param externalURL - Optional external URL to override the default base URL
 * @returns A configured ApiClient instance ready to use
 */
export function createDefaultClient(externalURL?: string) {
  const baseURL = createBaseURL(externalURL);
  // Initialize API client with the base URL
  const client = new ApiClient({ baseURL });
  // Add authentication middleware to handle token refresh and auth headers
  client.middlewares.add(new AuthMiddleware());
  // Boot the client to activate all middlewares
  client.boot();
  return client;
}

// Export the base URL and default client for immediate use
export const baseURL = createBaseURL();
export const defaultClient = createDefaultClient();

// Export core classes and interfaces for custom implementations
export { AbstractAPI, ApiClient, AuthMiddleware };
export type { IMiddleware };
