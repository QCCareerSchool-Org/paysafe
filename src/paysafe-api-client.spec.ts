import 'mocha';

import { PaysafeAPIClient } from './paysafe-api-client';
import * as environment from './environment';


const apiKey = '';
const apiPassword = '';
const accountNumber = '';

describe('PaysafeAPIClient', () => {

  it('????', (done) => {
    const paysafeAPIClient = new PaysafeAPIClient(apiKey, apiPassword, environment.TEST, accountNumber);
    const authentication = new paysafeAPIClient.Authentication();
    const x = new paysafeAPIClient.Authentication(authentication);
    const card = new paysafeAPIClient.Card();
    done();
  });

});


