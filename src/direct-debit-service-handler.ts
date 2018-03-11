import { PaysafeAPIClient } from './paysafe-api-client';

export class DirectDebitServiceHandler {

  private paysafeApiClient: PaysafeAPIClient;

  constructor(p: PaysafeAPIClient) {
    this.paysafeApiClient = p;
  }

}
