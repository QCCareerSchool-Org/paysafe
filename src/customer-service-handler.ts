import { PaysafeAPIClient } from './paysafe-api-client';

export class CustomerServiceHandler {

  private paysafeApiClient: PaysafeAPIClient;

  constructor(p: PaysafeAPIClient) {
    this.paysafeApiClient = p;
  }

}
