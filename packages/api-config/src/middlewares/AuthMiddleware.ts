import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { destroyCookie, parseCookies, setCookie } from 'nookies';

import { IMiddleware } from './interface';

/**
 * Authentication middleware for handling JWT token refresh and authentication headers
 * Implements automatic token refresh on 401 errors and manages request queuing during refresh
 */
export default class AuthMiddleware implements IMiddleware {
  private isRefreshing = false;
  private failedQueue: Array<{
    resolve: (config?: InternalAxiosRequestConfig) => void;
    reject: (error: any) => void;
    config: InternalAxiosRequestConfig;
  }> = [];

  /**
   * Processes all queued failed requests after token refresh
   * @param error - Error to reject queued requests with, or null if refresh succeeded
   * @param token - New access token to use for queued requests, or null if refresh failed
   */
  private processQueue(error: any, token: string | null = null) {
    this.failedQueue.forEach(({ resolve, reject, config }) => {
      if (error) {
        // Reject all queued requests with the refresh error
        reject(error);
      } else if (token) {
        // Update authorization header and resolve queued requests with new token
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
        resolve(config);
      }
    });
    // Clear the queue after processing
    this.failedQueue = [];
  }

  /**
   * Request interceptor: Adds Authorization header with JWT token to outgoing requests
   * @param config - The Axios request configuration
   * @returns Modified request configuration with Authorization header
   */
  async onRequest(config: InternalAxiosRequestConfig) {
    const cookies = parseCookies();
    const token = cookies.token;
    // Add Bearer token to request header if available
    if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
    return config;
  }

  /**
   * Response error interceptor: Handles 401 Unauthorized errors by refreshing tokens
   * @param error - The Axios error object
   * @returns Retried request with new token or redirects to fallback URL on failure
   * @throws Original error if it's not a 401 error that can be handled
   */
  async onResponseError(error: AxiosError) {
    const originalRequest = error.config as InternalAxiosRequestConfig;
    const fallback = process.env[`NEXT_PUBLIC_FALLBACK`] || '/';

    // Check if error is 401 Unauthorized and request hasn't been retried yet
    if (error.response?.status === 401 && !(originalRequest as any)._retry) {
      (originalRequest as any)._retry = true;
      const cookies = parseCookies();
      const refreshToken = cookies.refreshToken;

      // If no refresh token available, clear tokens and redirect to fallback
      if (!refreshToken) {
        destroyCookie(null, 'token');
        window.location.replace(`${window.location.origin}${fallback}`);
        return;
      }

      // If token refresh is already in progress, queue this request
      if (this.isRefreshing) {
        return new Promise((resolve, reject) => {
          this.failedQueue.push({ resolve, reject, config: originalRequest });
        });
      }

      // Start token refresh process
      this.isRefreshing = true;
      try {
        // Attempt to refresh access token using refresh token
        const resp = await axios.post(
          process.env[`NEXT_PUBLIC_REFRESH_TOKEN_ROUTE`] as string,
          {},
          {
            headers: { Authorization: `Bearer ${refreshToken}` },
            withCredentials: true,
          },
        );
        const newToken = resp.data.token;

        // Store new token in cookies
        setCookie(null, 'token', newToken, { path: '/' });

        // Process all queued requests with the new token
        this.processQueue(null, newToken);

        // Update original request with new token and retry
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return originalRequest;
      } catch (refreshError) {
        // If refresh fails, clear all tokens and redirect to fallback
        this.processQueue(refreshError, null);
        destroyCookie(null, 'token');
        destroyCookie(null, 'refreshToken');
        window.location.replace(`${window.location.origin}${fallback}`);
        return;
      } finally {
        // Reset refreshing flag regardless of success/failure
        this.isRefreshing = false;
      }
    }

    // Re-throw error if it's not a 401 or request has already been retried
    throw error;
  }
}
