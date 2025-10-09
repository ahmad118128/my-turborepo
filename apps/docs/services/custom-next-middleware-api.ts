import type { IMiddleware } from '@repo/api-config';
import type { AxiosError, AxiosRequestHeaders, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';

import { destroyCookie, parseCookies, setCookie } from 'nookies';

type FailedRequest = {
  resolve: (value: InternalAxiosRequestConfig | PromiseLike<InternalAxiosRequestConfig>) => void;
  reject: (error: AxiosError) => void;
  config: InternalAxiosRequestConfig;
};

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export default class AuthMiddleware implements IMiddleware {
  private isRefreshing = false;
  private failedQueue: FailedRequest[] = [];

  private processQueue(error: AxiosError | null, token: string | null = null): void {
    this.failedQueue.forEach(({ resolve, reject, config }) => {
      if (error) {
        reject(error);
      } else if (token) {
        const updatedConfig = { ...config };
        updatedConfig.headers = {
          ...updatedConfig.headers,
          Authorization: `Bearer ${token}`,
        } as AxiosRequestHeaders;
        resolve(updatedConfig);
      }
    });
    this.failedQueue = [];
  }

  async onRequest(config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> {
    try {
      const cookies = parseCookies();
      const token = cookies.token;

      if (token) {
        const updatedConfig = { ...config } as InternalAxiosRequestConfig;
        updatedConfig.headers = {
          ...updatedConfig.headers,
          Authorization: `Bearer ${token}`,
        } as AxiosRequestHeaders;
        return updatedConfig;
      }

      return config;
    } catch (error) {
      return config;
    }
  }

  async onResponseError(error: AxiosError): Promise<InternalAxiosRequestConfig | void> {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (!originalRequest) {
      throw error;
    }

    const fallback = process.env.NEXT_PUBLIC_FALLBACK || '/';

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const cookies = parseCookies();
      const refreshToken = cookies.refreshToken;

      if (!refreshToken) {
        destroyCookie(null, 'token');
        if (typeof window !== 'undefined') {
          window.location.replace(`${window.location.origin}${fallback}`);
        }
        return;
      }

      if (this.isRefreshing) {
        return new Promise<InternalAxiosRequestConfig>((resolve, reject) => {
          this.failedQueue.push({ resolve, reject, config: originalRequest });
        });
      }

      this.isRefreshing = true;

      try {
        const refreshTokenRoute = process.env.NEXT_PUBLIC_REFRESH_TOKEN_ROUTE;
        if (!refreshTokenRoute) {
          throw new Error('Refresh token route not configured');
        }

        const resp = await axios.post(
          refreshTokenRoute,
          {},
          {
            headers: { Authorization: `Bearer ${refreshToken}` },
            withCredentials: true,
          },
        );

        const newToken = resp.data.token;
        setCookie(null, 'token', newToken, { path: '/' });

        this.processQueue(null, newToken);

        const updatedConfig = { ...originalRequest };
        updatedConfig.headers = {
          ...updatedConfig.headers,
          Authorization: `Bearer ${newToken}`,
        } as AxiosRequestHeaders;

        return updatedConfig;
      } catch (refreshError) {
        this.processQueue(refreshError as AxiosError, null);
        destroyCookie(null, 'token');
        destroyCookie(null, 'refreshToken');

        if (typeof window !== 'undefined') {
          window.location.replace(`${window.location.origin}${fallback}`);
        }
        return;
      } finally {
        this.isRefreshing = false;
      }
    }

    throw error;
  }
}
