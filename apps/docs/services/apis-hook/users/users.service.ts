import { AxiosResponse } from 'axios';

import { BaseAPI } from '../../client-api';

export interface User {
  id: string;
  name: string;
  email: string;
}

export class UserService extends BaseAPI {
  constructor() {
    super('/users');
  }
  public async getAll(): Promise<AxiosResponse<User[]>> {
    return await this.http.get(this.url);
  }
}
