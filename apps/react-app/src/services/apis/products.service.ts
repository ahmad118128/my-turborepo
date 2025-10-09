import type { AxiosResponse } from 'axios';

import { BaseAPI } from '../client-api.js';

export default class ProductsService extends BaseAPI {
  constructor() {
    super('/products');
  }
  public async getAll(): Promise<AxiosResponse<any>> {
    return await this.http.get(this.url);
  }
}
