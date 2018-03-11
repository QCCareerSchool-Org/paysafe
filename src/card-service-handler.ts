import { PaysafeAPIClient } from './paysafe-api-client';

export class CardServiceHandler {

  private paysafeApiClient: PaysafeAPIClient;

  constructor(p: PaysafeAPIClient) {
    this.paysafeApiClient = p;
  }

}
