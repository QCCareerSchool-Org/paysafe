"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request");
const paysafe_error_1 = require("./paysafe-error");
const card_service_handler_1 = require("./card-service-handler");
const direct_debit_service_handler_1 = require("./direct-debit-service-handler");
const customer_service_handler_1 = require("./customer-service-handler");
const three_d_secure_service_handler_1 = require("./three-d-secure-service-handler");
const accord_d_1 = require("./cardpayments/accord-d");
const authentication_1 = require("./cardpayments/authentication");
const authorization_1 = require("./cardpayments/authorization");
const authorization_reversal_1 = require("./cardpayments/authorization-reversal");
const billing_details_1 = require("./cardpayments/billing-details");
const card_1 = require("./cardpayments/card");
const card_expiry_1 = require("./cardpayments/card-expiry");
const master_pass_1 = require("./cardpayments/master-pass");
const merchant_descriptor_1 = require("./cardpayments/merchant-descriptor");
const pagination_1 = require("./cardpayments/pagination");
const recipient_date_of_birth_1 = require("./cardpayments/recipient-date-of-birth");
const refund_1 = require("./cardpayments/refund");
const settlement_1 = require("./cardpayments/settlement");
const shipping_details_1 = require("./cardpayments/shipping-details");
const verification_1 = require("./cardpayments/verification");
const visa_additional_auth_data_1 = require("./cardpayments/visa-additional-auth-data");
const address_1 = require("./customervault/address");
const date_of_birth_1 = require("./customervault/date-of-birth");
// import { Mandate } from './customervault/mandate';
const profile_1 = require("./customervault/profile");
// import { ACHBankAccount } from './customervault/ach-bank-account';
// import { BACSBankAccount } from './customervault/bacs-bank-account';
// import { EFTBankAccount } from './customervault/eft-bank-account';
// import { SEPABankAccount } from './customervault/sepa-bank-account';
// import { Purchase } from './directdebit/purchase';
// import { Standalonecredit } from './directdebit/standalone-credit';
// import { EnrollmentCheck } from './threedsecure/enrollment-check';
// import { Authentication3D } from './threedsecure/authentication-3d';
class PaysafeAPIClient {
    // ACHBankAccount = ACHBankAccount;
    // BACSBankAccount = BACSBankAccount;
    // EFTBankAccount = EFTBankAccount;
    // SEPABankAccount = SEPABankAccount;
    // direct debit
    // Purchase = Purchase;
    // Standalonecredit = Standalonecredit;
    // 3D Secure
    // EnrollmentCheck = EnrollmentCheck;
    // Authentication3D = Authentication3D;
    constructor(apiKey, apiPassword, environment, accountNumber) {
        // card payments
        this.AccordD = accord_d_1.AccordD;
        this.Authentication = authentication_1.Authentication;
        this.Authorization = authorization_1.Authorization;
        this.AuthorizationReversal = authorization_reversal_1.AuthorizationReversal;
        this.BillingDetails = billing_details_1.BillingDetails;
        this.Card = card_1.Card;
        this.CardExpiry = card_expiry_1.CardExpiry;
        this.MasterPass = master_pass_1.MasterPass;
        this.MerchantDescriptor = merchant_descriptor_1.MerchantDescriptor;
        this.Pagination = pagination_1.Pagination;
        this.RecipientDateOfBirth = recipient_date_of_birth_1.RecipientDateOfBirth;
        this.Refund = refund_1.Refund;
        this.Settlement = settlement_1.Settlement;
        this.ShippingDetails = shipping_details_1.ShippingDetails;
        this.Verification = verification_1.Verification;
        this.VisaAdditionalAuthData = visa_additional_auth_data_1.VisaAdditionalAuthData;
        // customer vault
        this.Address = address_1.Address;
        this.DateOfBirth = date_of_birth_1.DateOfBirth;
        // Mandate = Mandate;
        this.Profile = profile_1.Profile;
        this.apiKey = apiKey;
        this.apiPassword = apiPassword;
        this.environment = environment;
        this.accountNumber = accountNumber;
    }
    updateConfig(apiKey, apiPassword, environment, accountNumber) {
        this.apiKey = apiKey;
        this.apiPassword = apiPassword;
        this.environment = environment;
        this.accountNumber = accountNumber;
    }
    error(code, message) {
        const error = new paysafe_error_1.PaysafeError();
        error.message = message;
        error.setCode(code);
        return error;
    }
    CardServiceHandler() {
        if (!this.cardServiceHandler) {
            this.cardServiceHandler = new card_service_handler_1.CardServiceHandler(this);
        }
        return this.cardServiceHandler;
    }
    DirectDebitServiceHandler() {
        if (!this.directDebitServiceHandler) {
            this.directDebitServiceHandler = new direct_debit_service_handler_1.DirectDebitServiceHandler(this);
        }
        return this.directDebitServiceHandler;
    }
    CustomerServiceHandler() {
        if (!this.customerServiceHandler) {
            this.customerServiceHandler = new customer_service_handler_1.CustomerServiceHandler(this);
        }
        return this.customerServiceHandler;
    }
    ThreeDSecureServiceHandler() {
        if (!this.threeDSecureServiceHandler) {
            this.threeDSecureServiceHandler = new three_d_secure_service_handler_1.ThreeDSecureServiceHandler(this);
        }
        return this.threeDSecureServiceHandler;
    }
    processRequest(PaysafeRequest, requestObject) {
        var requestJson = prepareRequestParameter(requestObject);
        var reqHeaders = {
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': 'Basic ' + prepareAPICredential(this.apiKey, this.apiPassword)
        };
        var strRegObject = serializeObject(requestObject);
        var options = {
            headers: reqHeaders,
            uri: PaysafeRequest.buildUrl(this.environment.host),
            method: PaysafeRequest.method,
            body: strRegObject,
            pool: {
                maxSockets: this.environment.maxSockets,
            },
            timeout: this.environment.timeout,
        };
        return new Promise((resolve, reject) => {
            request(options, (err, response, body) => {
                if (err) {
                    reject(this.error(err.code, 'Connection error: No internet Connection available: ' + err.syscall));
                }
                else if (response.statusCode === 503) {
                    reject(this.error(response.statusCode, body));
                }
                else if (!body) {
                    resolve({ status: response.statusCode });
                }
                else {
                    try {
                        body = typeof body === "string" ? deSerializeObject(body) : body;
                        resolve(body);
                    }
                    catch (e) {
                        reject(this.error(e.code, 'Failed to parse body'));
                    }
                }
            });
        });
    }
}
exports.PaysafeAPIClient = PaysafeAPIClient;
function prepareAPICredential(apiKey, apiPassword) {
    let apiCredential = apiKey + ":" + apiPassword;
    let apiCredBuffer = new Buffer(apiCredential);
    return apiCredBuffer.toString('Base64');
}
;
function prepareRequestParameter(requestObject) {
    if (requestObject === null)
        return '';
    return serializeObject(requestObject);
}
function serializeObject(obj) {
    if (obj === null)
        return '';
    return JSON.stringify(obj);
}
function deSerializeObject(obj) {
    if (obj === null)
        return '';
    return JSON.parse(obj);
}
