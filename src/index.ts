/**
 * Paysafe
 *
 */
import Debug from 'debug';
import request from 'request';

import { Request as CardPaymentRequest } from './card-payments/request';
import { ServiceHandler as CardServiceHandler } from './card-payments/service-handler';
import { Request as CustomerVaultRequest } from './customer-vault/request';
import { ServiceHandler as CustomerServiceHandler } from './customer-vault/service-handler';
import { ServiceHandler as DirectDebitServiceHandler } from './direct-debit/service-handler';
import { ServiceHandler as ThreeDSecureServiceHandler } from './three-d-secure/service-handler';

export type GeneralRequest = CardPaymentRequest | CustomerVaultRequest;

export type Environment = 'LIVE' | 'TEST';

const debug = Debug('paysafe');

export class Paysafe {

  private cardServiceHandler?: CardServiceHandler;
  private customerServiceHandler?: CustomerServiceHandler;
  private directDebitServiceHandler?: DirectDebitServiceHandler;
  private threeDSecureServiceHandler?: ThreeDSecureServiceHandler;
  private readonly maxSockets = 40;
  private readonly timeout = 60000; // 60 seconds
  private readonly baseRequest = request.defaults({
    pool: { maxSockets: this.maxSockets },
  });

  constructor(private apiKey: string, private apiPassword: string, private environment: Environment, private accountNumber: string) { /* empty */ }

  public updateConfig(apiKey: string, apiPassword: string, environment: Environment, accountNumber: string) {
    this.apiKey = apiKey;
    this.apiPassword = apiPassword;
    this.environment = environment;
    this.accountNumber = accountNumber;
  }

  public getApiKey(): string { return this.apiKey; }

  public getApiPassword(): string { return this.apiPassword; }

  public getEnvironment(): Environment { return this.environment; }

  public getAccountNumber(): string { return this.accountNumber; }

  public getCardServiceHandler(): CardServiceHandler {
    if (!this.cardServiceHandler) {
      this.cardServiceHandler = new CardServiceHandler(this);
    }
    return this.cardServiceHandler;
  }

  public getDirectDebitServiceHandler(): DirectDebitServiceHandler {
    if (!this.directDebitServiceHandler) {
      this.directDebitServiceHandler = new DirectDebitServiceHandler(this);
    }
    return this.directDebitServiceHandler;
  }

  public getCustomerServiceHandler(): CustomerServiceHandler {
    if (!this.customerServiceHandler) {
      this.customerServiceHandler = new CustomerServiceHandler(this);
    }
    return this.customerServiceHandler;
  }

  public getThreeDSecureServiceHandler(): ThreeDSecureServiceHandler {
    if (!this.threeDSecureServiceHandler) {
      this.threeDSecureServiceHandler = new ThreeDSecureServiceHandler(this);
    }
    return this.threeDSecureServiceHandler;
  }

  public async get<T extends GeneralRequest>(uri: string, requestObject?: T): Promise<T> {
    return this.process('GET', uri, requestObject);
  }

  public async post<T extends GeneralRequest>(uri: string, requestObject?: T): Promise<T> {
    return this.process('POST', uri, requestObject);
  }

  public async put<T extends GeneralRequest>(uri: string, requestObject?: T): Promise<T> {
    return this.process('PUT', uri, requestObject);
  }

  public async delete<T extends GeneralRequest>(uri: string, requestObject?: T): Promise<void> {
    return this.process('DELETE', uri, requestObject);
  }

  private process<T extends GeneralRequest>(method: 'DELETE', uri: string, requestObject?: T): Promise<void>;
  private process<T extends GeneralRequest>(method: 'GET' | 'POST' | 'PUT', uri: string, requestObject?: T): Promise<T>;
  private async process<T extends GeneralRequest>(method: 'GET' | 'POST' | 'PUT' | 'DELETE', uri: string, requestObject?: T): Promise<void | T> {
    const options: request.OptionsWithUri = {
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
        } else if (response.statusCode >= SERVER_ERROR) {
          reject(new Error('Server Error ' + response.statusCode));
        } else if (method === 'DELETE' && !body) { // for delete calls, the response is empty string
          resolve();
        } else {
          try {
            body = (typeof body === 'string') ? JSON.parse(body) : body;
            // if (typeof body.error !== 'undefined') { // the entire response is an error
            //  return reject(new PaysafeError(body.error));
            // }
            resolve(body);
          } catch (parseError) {
            reject(parseError);
          }
        }
      });
    });
  }

  private getHost() {
    return this.environment === 'LIVE' ? 'https://api.paysafe.com' : 'https://api.test.paysafe.com';
  }

}

function prepareAPICredential(apiKey: string, apiPassword: string): string {
  const apiCredential = apiKey + ':' + apiPassword;
  const apiCredBuffer = Buffer.from(apiCredential);
  return apiCredBuffer.toString('Base64');
}
