import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
/**
 * Interface for defining middleware to be used with Axios instances.
 * Allows for intercepting requests and responses to perform custom operations, such as logging or modifying requests/responses.
 *
 * @template R The type of the response data expected in Axios responses.
 */
export interface IMiddleware<R = {}> {
  /**
   * Optional property to specify the environment where the middleware should be active.
   * Could be used to enable/disable middleware in development, staging, or production environments.
   *
   * @type {?string}
   */
  environment?: string;

  /**
   * Optional method to process and potentially modify the Axios request configuration before the request is sent.
   * Can be used to log request details, add headers, etc.
   *
   * @param {InternalAxiosRequestConfig} value The original request configuration.
   * @returns {InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>} The potentially modified request configuration or a promise that resolves to it.
   */
  onRequest?(
    value: InternalAxiosRequestConfig,
  ): InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>;

  /**
   * Optional method to handle errors that occur during the request creation process.
   * This can include errors in setting up the request, such as in interceptors, before the request is sent.
   *
   * @param {any} error The error object caught during the request setup.
   * @returns {any} The processed error object or a promise that resolves to an error handling strategy.
   */
  onRequestError?(error: any): any;

  /**
   * Optional method to process and potentially modify the Axios response before it is passed to then/catch.
   * Can be used to log response details, modify the response structure, etc.
   *
   * @param {AxiosResponse<R>} response The original response from the Axios request.
   * @returns {AxiosResponse<R> | Promise<AxiosResponse<R>>} The potentially modified response or a promise that resolves to it.
   */
  onResponse?(response: AxiosResponse<R>): AxiosResponse<R> | Promise<AxiosResponse<R>>;

  /**
   * Optional method to handle errors that occur after the request has been made, such as server errors or network issues.
   *
   * @param {any} error The error object caught during the response phase.
   * @returns {any} The processed error object or a promise that resolves to an error handling strategy.
   */
  onResponseError?(error: AxiosError): any;
}
