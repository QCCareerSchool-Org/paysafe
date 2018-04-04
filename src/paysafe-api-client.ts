/**
 * Paysafe
 *
 * Ideas: remove "fake" fields such as profile from Card and profile from Address and alter the service handler functions to take the profile id directly
 */
import * as request from 'request';

import * as Environments from './environment';
import { PaysafeError } from './paysafe-error';
import { PaysafeRequest } from './paysafe-request';
import { RequestObject } from './request-object';

import { CardServiceHandler } from './card-service-handler';
import { CustomerServiceHandler } from './customer-service-handler';
import { DirectDebitServiceHandler } from './direct-debit-service-handler';
import { ThreeDSecureServiceHandler } from './three-d-secure-service-handler';

import { AccordD } from './cardpayments/accord-d';
import { Authentication } from './cardpayments/authentication';
import { Authorization } from './cardpayments/authorization';
import { AuthorizationReversal } from './cardpayments/authorization-reversal';
import { BillingDetails } from './cardpayments/billing-details';
import { Card } from './cardpayments/card';
import { CardExpiry } from './cardpayments/card-expiry';
import { MasterPass } from './cardpayments/master-pass';
import { MerchantDescriptor } from './cardpayments/merchant-descriptor';
import { Pagination } from './cardpayments/pagination';
import { RecipientDateOfBirth } from './cardpayments/recipient-date-of-birth';
import { Refund } from './cardpayments/refund';
import { Settlement } from './cardpayments/settlement';
import { ShippingDetails } from './cardpayments/shipping-details';
import { Verification } from './cardpayments/verification';
import { VisaAdditionalAuthData } from './cardpayments/visa-additional-auth-data';

import { Address } from './customervault/address';
import { DateOfBirth } from './customervault/date-of-birth';
import { Mandate } from './customervault/mandate';
import { Profile } from './customervault/profile';

import { ACHBankAccount } from './customervault/ach-bank-account';
import { BACSBankAccount } from './customervault/bacs-bank-account';
import { EFTBankAccount } from './customervault/eft-bank-account';
import { SEPABankAccount } from './customervault/sepa-bank-account';

// import { Purchase } from './directdebit/purchase';
// import { Standalonecredit } from './directdebit/standalone-credit';

// import { EnrollmentCheck } from './threedsecure/enrollment-check';
// import { Authentication3D } from './threedsecure/authentication-3d';

export class PaysafeAPIClient {

  public classes: { [key: string]: any } = {

    // card payments
    AccordD,
    Authentication,
    Authorization,
    AuthorizationReversal,
    BillingDetails,
    Card,
    CardExpiry,
    MasterPass,
    MerchantDescriptor,
    Pagination,
    RecipientDateOfBirth,
    Refund,
    Settlement,
    ShippingDetails,
    Verification,
    VisaAdditionalAuthData,

    // customer vault
    Address,
    DateOfBirth,
    Mandate,
    Profile,
    ACHBankAccount,
    BACSBankAccount,
    EFTBankAccount,
    SEPABankAccount,

    // direct debit
    // Purchase,
    // Standalonecredit,

    // 3D Secure
    // EnrollmentCheck,
    // Authentication3D,
  };

  private apiKey: string;
  private apiPassword: string;
  private environment: Environments.Environment;
  private accountNumber: string;

  private cardServiceHandler?: CardServiceHandler;
  private customerServiceHandler?: CustomerServiceHandler;
  private directDebitServiceHandler?: DirectDebitServiceHandler;
  private threeDSecureServiceHandler?: ThreeDSecureServiceHandler;

  private baseRequest: request.RequestAPI<request.Request, request.CoreOptions, request.RequiredUriUrl>;

  constructor(apiKey: string, apiPassword: string, environment: 'TEST' | 'LIVE', accountNumber: string) {
    this.apiKey = apiKey;
    this.apiPassword = apiPassword;
    this.environment = Environments[environment];
    this.accountNumber = accountNumber;
    this.baseRequest = request.defaults({
      pool: { maxSockets: this.environment.maxSockets },
    });
  }

  public updateConfig(apiKey: string, apiPassword: string, environment: Environments.Environment, accountNumber: string) {
    this.apiKey = apiKey;
    this.apiPassword = apiPassword;
    this.environment = environment;
    this.accountNumber = accountNumber;
  }

  public error(code: number, message: string): PaysafeError {
    const error = new PaysafeError();
    error.message = message;
    error.setCode(code);
    return error;
  }

  public getApiKey(): string { return this.apiKey; }
  public getApiPassword(): string { return this.apiPassword; }
  public getEnvironment(): Environments.Environment { return this.environment; }
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

  public processRequest<T extends RequestObject>(paysafeRequest: PaysafeRequest, requestObject?: T): Promise<T> {

    const options: request.OptionsWithUri = {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': 'Basic ' + prepareAPICredential(this.apiKey, this.apiPassword),
      },
      uri: paysafeRequest.buildUrl(this.environment.host),
      method: paysafeRequest.method,
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
          if (err.code === 'ETIMEDOUT' || err.code === 'ESOCKETTIMEDOUT') {
            reject(this.error(-1, err.code));
          } else {
            reject(this.error(-1, JSON.stringify(err)));
          }
        } else if (response.statusCode >= SERVER_ERROR) {
          reject(this.error(response.statusCode, body));
        } else if (!body) { // for delete calls, the response is empty string
          resolve();
        } else {
          try {
            body = typeof body === 'string' ? JSON.parse(body) : body;
            if (typeof body.error !== 'undefined') { // the entire response is an error
              return reject(new PaysafeError(body.error));
            }
            resolve(body);
          } catch (parseError) {
            reject(this.error(parseError.code, 'Failed to parse body'));
          }
        }
      });
    });
  }

}

function prepareAPICredential(apiKey: string, apiPassword: string): string {
  const apiCredential = apiKey + ':' + apiPassword;
  const apiCredBuffer = new Buffer(apiCredential);
  return apiCredBuffer.toString('Base64');
}
