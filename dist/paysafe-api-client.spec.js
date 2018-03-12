"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const paysafe_api_client_1 = require("./paysafe-api-client");
const environment = require("./environment");
const apiKey = '';
const apiPassword = '';
const accountNumber = '';
describe('PaysafeAPIClient', () => {
    it('????', (done) => {
        const paysafeAPIClient = new paysafe_api_client_1.PaysafeAPIClient(apiKey, apiPassword, environment.TEST, accountNumber);
        const authentication = new paysafeAPIClient.classes.Authentication();
        const x = new paysafeAPIClient.classes.Authentication(authentication);
        const card = new paysafeAPIClient.classes.Card();
        done();
    });
});
