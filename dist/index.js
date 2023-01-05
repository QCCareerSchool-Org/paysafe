"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Paysafe = void 0;
/**
 * Paysafe
 *
 */
const Debug = require("debug");
const request = require("request");
const service_handler_1 = require("./card-payments/service-handler");
const service_handler_2 = require("./customer-vault/service-handler");
const service_handler_3 = require("./direct-debit/service-handler");
const service_handler_4 = require("./three-d-secure/service-handler");
const debug = Debug('paysafe');
class Paysafe {
    constructor(apiKey, apiPassword, environment, accountNumber) {
        this.apiKey = apiKey;
        this.apiPassword = apiPassword;
        this.environment = environment;
        this.accountNumber = accountNumber;
        this.maxSockets = 40;
        this.timeout = 60000; // 60 seconds
        this.baseRequest = request.defaults({
            pool: { maxSockets: this.maxSockets },
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
            this.cardServiceHandler = new service_handler_1.ServiceHandler(this);
        }
        return this.cardServiceHandler;
    }
    getDirectDebitServiceHandler() {
        if (!this.directDebitServiceHandler) {
            this.directDebitServiceHandler = new service_handler_3.ServiceHandler(this);
        }
        return this.directDebitServiceHandler;
    }
    getCustomerServiceHandler() {
        if (!this.customerServiceHandler) {
            this.customerServiceHandler = new service_handler_2.ServiceHandler(this);
        }
        return this.customerServiceHandler;
    }
    getThreeDSecureServiceHandler() {
        if (!this.threeDSecureServiceHandler) {
            this.threeDSecureServiceHandler = new service_handler_4.ServiceHandler(this);
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
            uri: this.getHost() + uri,
            method,
            json: true,
            timeout: this.timeout,
        };
        if (typeof requestObject !== 'undefined') {
            options.body = requestObject;
        }
        return new Promise((resolve, reject) => {
            debug(options);
            this.baseRequest(options, (err, response, body) => {
                debug('STATUS CODE ' + response.statusCode);
                debug(body);
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
                        // if (typeof body.error !== 'undefined') { // the entire response is an error
                        //  return reject(new PaysafeError(body.error));
                        // }
                        resolve(body);
                    }
                    catch (parseError) {
                        reject(parseError);
                    }
                }
            });
        });
    }
    getHost() {
        return this.environment === 'LIVE' ? 'https://api.paysafe.com' : 'https://api.test.paysafe.com';
    }
}
exports.Paysafe = Paysafe;
function prepareAPICredential(apiKey, apiPassword) {
    const apiCredential = apiKey + ':' + apiPassword;
    const apiCredBuffer = new Buffer(apiCredential);
    return apiCredBuffer.toString('Base64');
}
