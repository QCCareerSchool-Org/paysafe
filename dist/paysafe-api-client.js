"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Paysafe
 *
 */
const Debug = require("debug");
const request = require("request");
const Environments = require("./environment");
const paysafe_error_1 = require("./paysafe-error");
const card_service_handler_1 = require("./card-service-handler");
const customer_service_handler_1 = require("./customer-service-handler");
const direct_debit_service_handler_1 = require("./direct-debit-service-handler");
const three_d_secure_service_handler_1 = require("./three-d-secure-service-handler");
const debug = Debug('paysafe');
class PaysafeAPIClient {
    constructor(apiKey, apiPassword, environment, accountNumber) {
        this.apiKey = apiKey;
        this.apiPassword = apiPassword;
        this.environment = Environments[environment];
        this.accountNumber = accountNumber;
        this.baseRequest = request.defaults({
            pool: { maxSockets: this.environment.maxSockets },
        });
    }
    updateConfig(apiKey, apiPassword, environment, accountNumber) {
        this.apiKey = apiKey;
        this.apiPassword = apiPassword;
        this.environment = environment;
        this.accountNumber = accountNumber;
    }
    getApiKey() { return this.apiKey; }
    getApiPassword() { return this.apiPassword; }
    getEnvironment() { return this.environment; }
    getAccountNumber() { return this.accountNumber; }
    getCardServiceHandler() {
        if (!this.cardServiceHandler) {
            this.cardServiceHandler = new card_service_handler_1.CardServiceHandler(this);
        }
        return this.cardServiceHandler;
    }
    getDirectDebitServiceHandler() {
        if (!this.directDebitServiceHandler) {
            this.directDebitServiceHandler = new direct_debit_service_handler_1.DirectDebitServiceHandler(this);
        }
        return this.directDebitServiceHandler;
    }
    getCustomerServiceHandler() {
        if (!this.customerServiceHandler) {
            this.customerServiceHandler = new customer_service_handler_1.CustomerServiceHandler(this);
        }
        return this.customerServiceHandler;
    }
    getThreeDSecureServiceHandler() {
        if (!this.threeDSecureServiceHandler) {
            this.threeDSecureServiceHandler = new three_d_secure_service_handler_1.ThreeDSecureServiceHandler(this);
        }
        return this.threeDSecureServiceHandler;
    }
    get(uri, requestObject) {
        return this.process('GET', uri, requestObject);
    }
    post(uri, requestObject) {
        return this.process('POST', uri, requestObject);
    }
    put(uri, requestObject) {
        return this.process('PUT', uri, requestObject);
    }
    delete(uri, requestObject) {
        return this.process('DELETE', uri, requestObject);
    }
    process(method, uri, requestObject) {
        const options = {
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': 'Basic ' + prepareAPICredential(this.apiKey, this.apiPassword),
            },
            uri,
            method,
            json: true,
            timeout: this.environment.timeout,
        };
        if (typeof requestObject !== 'undefined') {
            options.body = requestObject;
        }
        return new Promise((resolve, reject) => {
            this.baseRequest(options, (err, response, body) => {
                const CLIENT_ERROR = 400;
                const SERVER_ERROR = 500;
                if (err) {
                    reject(err);
                }
                else if (response.statusCode >= SERVER_ERROR) {
                    reject(new Error('Server Error ' + response.statusCode));
                }
                else if (method === 'DELETE' && !body) { // for delete calls, the response is empty string
                    resolve();
                }
                else {
                    try {
                        body = (typeof body === 'string') ? JSON.parse(body) : body;
                        debug(body);
                        if (typeof body.error !== 'undefined') { // the entire response is an error
                            return reject(new paysafe_error_1.PaysafeError(body.error));
                        }
                        resolve(body);
                    }
                    catch (parseError) {
                        reject(parseError);
                    }
                }
            });
        });
    }
}
exports.PaysafeAPIClient = PaysafeAPIClient;
function prepareAPICredential(apiKey, apiPassword) {
    const apiCredential = apiKey + ':' + apiPassword;
    const apiCredBuffer = new Buffer(apiCredential);
    return apiCredBuffer.toString('Base64');
}
