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
const mandate_1 = require("./customervault/mandate");
const profile_1 = require("./customervault/profile");
const ach_bank_account_1 = require("./customervault/ach-bank-account");
const bacs_bank_account_1 = require("./customervault/bacs-bank-account");
const eft_bank_account_1 = require("./customervault/eft-bank-account");
const sepa_bank_account_1 = require("./customervault/sepa-bank-account");
// import { Purchase } from './directdebit/purchase';
// import { Standalonecredit } from './directdebit/standalone-credit';
// import { EnrollmentCheck } from './threedsecure/enrollment-check';
// import { Authentication3D } from './threedsecure/authentication-3d';
class PaysafeAPIClient {
    constructor(apiKey, apiPassword, environment, accountNumber) {
        this.classes = {
            // card payments
            AccordD: accord_d_1.AccordD,
            Authentication: authentication_1.Authentication,
            Authorization: authorization_1.Authorization,
            AuthorizationReversal: authorization_reversal_1.AuthorizationReversal,
            BillingDetails: billing_details_1.BillingDetails,
            Card: card_1.Card,
            CardExpiry: card_expiry_1.CardExpiry,
            MasterPass: master_pass_1.MasterPass,
            MerchantDescriptor: merchant_descriptor_1.MerchantDescriptor,
            Pagination: pagination_1.Pagination,
            RecipientDateOfBirth: recipient_date_of_birth_1.RecipientDateOfBirth,
            Refund: refund_1.Refund,
            Settlement: settlement_1.Settlement,
            ShippingDetails: shipping_details_1.ShippingDetails,
            Verification: verification_1.Verification,
            VisaAdditionalAuthData: visa_additional_auth_data_1.VisaAdditionalAuthData,
            // customer vault
            Address: address_1.Address,
            DateOfBirth: date_of_birth_1.DateOfBirth,
            Mandate: mandate_1.Mandate,
            Profile: profile_1.Profile,
            ACHBankAccount: ach_bank_account_1.ACHBankAccount,
            BACSBankAccount: bacs_bank_account_1.BACSBankAccount,
            EFTBankAccount: eft_bank_account_1.EFTBankAccount,
            SEPABankAccount: sepa_bank_account_1.SEPABankAccount,
        };
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
    processRequest(PaysafeRequest, requestObject) {
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
                }
                else if (response.statusCode === 503) {
                    reject(this.error(response.statusCode, body));
                }
                else if (!body) {
                    resolve({ status: response.statusCode });
                }
                else {
                    try {
                        body = typeof body === 'string' ? JSON.parse(body) : body;
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
