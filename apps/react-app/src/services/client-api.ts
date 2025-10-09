import { AbstractAPI, createDefaultClient } from '@repo/api-config';

const baseURL = 'https://fakestoreapi.com';

const clientApi = createDefaultClient(baseURL);

class BaseAPI extends AbstractAPI {
  constructor(path: string) {
    super(path, clientApi);
  }
}

export { BaseAPI, baseURL, clientApi };
