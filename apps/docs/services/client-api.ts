import { AbstractAPI, ApiClient } from '@repo/api-config';

import AuthMiddleware from './custom-next-middleware-api';

const baseURL = 'https://jsonplaceholder.typicode.com';

const clientApi = new ApiClient({ baseURL });
clientApi.middlewares.add(new AuthMiddleware());
clientApi.boot();

class BaseAPI extends AbstractAPI {
  constructor(path: string) {
    super(path, clientApi);
  }
}

export { BaseAPI, baseURL, clientApi };
