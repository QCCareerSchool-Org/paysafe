import * as request from 'request';

import { Environment } from './environment';
import { RequestObject } from './request-object';
import { PaysafeError } from './paysafe-error';
import { PaysafeRequest } from './paysafe-request';

import { CardServiceHandler } from './card-service-handler';
import { DirectDebitServiceHandler } from './direct-debit-service-handler';
import { CustomerServiceHandler } from './customer-service-handler';
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

  private apiKey: string;
  private apiPassword: string;
  private environment: Environment;
  private accountNumber: string;

  private cardServiceHandler?: CardServiceHandler;
  private customerServiceHandler?: CustomerServiceHandler
  private directDebitServiceHandler?: DirectDebitServiceHandler;
  private threeDSecureServiceHandler?: ThreeDSecureServiceHandler;

  classes: { [key: string]: any } = {
  
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

  constructor(apiKey: string, apiPassword: string, environment: Environment, accountNumber: string) {
    this.apiKey = apiKey;
    this.apiPassword = apiPassword;
    this.environment = environment;
    this.accountNumber = accountNumber;
  }

  updateConfig(apiKey: string, apiPassword: string, environment: Environment, accountNumber: string) {
    this.apiKey = apiKey;
    this.apiPassword = apiPassword;
    this.environment = environment;
    this.accountNumber = accountNumber;
  }

  error(code: number, message: string): PaysafeError {
    const error = new PaysafeError();
    error.message = message;
    error.setCode(code);
    return error;
  }

  getApiKey(): string { return this.apiKey; }
  getApiPassword(): string { return this.apiPassword; }
  getEnvironment(): Environment { return this.environment; }
  getAccountNumber(): string { return this.accountNumber; }

  getCardServiceHandler(): CardServiceHandler {
    if (!this.cardServiceHandler) {
      this.cardServiceHandler = new CardServiceHandler(this);
    }
    return this.cardServiceHandler;
  }

  getDirectDebitServiceHandler(): DirectDebitServiceHandler {
    if (!this.directDebitServiceHandler) {
      this.directDebitServiceHandler = new DirectDebitServiceHandler(this);
    }
    return this.directDebitServiceHandler;
  }

  getCustomerServiceHandler(): CustomerServiceHandler {
    if (!this.customerServiceHandler) {
      this.customerServiceHandler = new CustomerServiceHandler(this);
    }
    return this.customerServiceHandler;
  }

  getThreeDSecureServiceHandler(): ThreeDSecureServiceHandler {
    if (!this.threeDSecureServiceHandler) {
      this.threeDSecureServiceHandler = new ThreeDSecureServiceHandler(this);
    }
    return this.threeDSecureServiceHandler;
  }

  processRequest(PaysafeRequest: PaysafeRequest, requestObject?: RequestObject): Promise<any> {

    const options = {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': 'Basic ' + prepareAPICredential(this.apiKey, this.apiPassword)
      },
      uri: PaysafeRequest.buildUrl(this.environment.host),
      method: PaysafeRequest.method,
      body: requestObject ? JSON.stringify(requestObject) : '',
      pool: {
        maxSockets: this.environment.maxSockets,
      },
      timeout: this.environment.timeout,
    };

    return new Promise((resolve, reject) => {

      request(options, (err, response, body) => {
        if (err) {
          reject(this.error(err.code, 'Connection error: No internet Connection available: ' + err.syscall));
        } else if (response.statusCode === 503) {
          reject(this.error(response.statusCode, body));
        } else if (!body) { // for delete method, the response is empty string
          resolve({ status: response.statusCode });
        } else {
          try {
            body = typeof body === 'string' ? JSON.parse(body) : body;
            resolve(body);
          } catch (e) {
            reject(this.error(e.code, 'Failed to parse body'));
          }
        }
      });
    });
  }

}

function prepareAPICredential(apiKey: string, apiPassword: string): string {
  let apiCredential = apiKey + ":" + apiPassword;
  let apiCredBuffer = new Buffer(apiCredential);
  return apiCredBuffer.toString('Base64');
};
