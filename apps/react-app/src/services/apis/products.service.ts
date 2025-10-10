import type { AxiosResponse } from 'axios';

import { BaseAPI } from '../client-api.js';

export interface Products {
  id: string;
  title: string;
  price: string;
}

export default class ProductsService extends BaseAPI {
  constructor() {
    super('/products');
  }
  public async getAll(): Promise<AxiosResponse<Products[]>> {
    return await this.http.get(this.url);
  }
}
