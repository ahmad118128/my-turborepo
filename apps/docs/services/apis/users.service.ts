import { AxiosResponse } from 'axios';

import { BaseAPI } from '../client-api';

export default class User extends BaseAPI {
  constructor() {
    super('/users');
  }
  public async getAll(): Promise<AxiosResponse<any>> {
    return await this.http.get(this.url);
  }
}
