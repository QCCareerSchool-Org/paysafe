import { PaysafeAPIClient } from './paysafe-api-client';

export class ThreeDSecureServiceHandler {

  private paysafeApiClient: PaysafeAPIClient;

  constructor(p: PaysafeAPIClient) {
    this.paysafeApiClient = p;
  }

}
