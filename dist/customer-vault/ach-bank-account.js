"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ACHBankAccount = void 0;
const request_1 = require("./request");
const billing_address_1 = require("./lib/billing-address");
const NICK_NAME_MAX_LENGTH = 50;
const MERCHANT_REF_NUM_MAX_LENGTH = 255;
const ACCOUNT_NUMBER_MIN_LENGTH = 4;
const ACCOUNT_NUMBER_MAX_LENGTH = 7;
const ACCOUNT_HOLDER_NAME_MAX_LENGTH = 22;
const ROUTING_NUMBER_MAX_LENGTH = 9;
const BILLING_ADDRESS_ID_MAX_LENGTH = 36;
const PAYMENT_TOKEN_MAX_LENGTH = 50;
class ACHBankAccount extends request_1.Request {
    constructor(resp) {
        super(resp);
        if (!resp) {
            return;
        }
        if (typeof resp.nickName !== 'undefined') {
            this.nickName = resp.nickName;
        }
        if (typeof resp.merchantRefNum !== 'undefined') {
            this.merchantRefNum = resp.merchantRefNum;
        }
        if (typeof resp.status !== 'undefined') {
            this.status = resp.status;
        }
        if (typeof resp.statusReason !== 'undefined') {
            this.statusReason = resp.statusReason;
        }
        if (typeof resp.accountNumber !== 'undefined') {
            this.accountNumber = resp.accountNumber;
        }
        if (typeof resp.accountHolderName !== 'undefined') {
            this.accountHolderName = resp.accountHolderName;
        }
        if (typeof resp.routingNumber !== 'undefined') {
            this.routingNumber = resp.routingNumber;
        }
        if (typeof resp.accountType !== 'undefined') {
            this.accountType = resp.accountType;
        }
        if (typeof resp.lastDigits !== 'undefined') {
            this.lastDigits = resp.lastDigits;
        }
        if (typeof resp.billingAddressId !== 'undefined') {
            this.billingAddressId = resp.billingAddressId;
        }
        if (typeof resp.billingAddress !== 'undefined') {
            this.billingAddress = new billing_address_1.BillingAddress(resp.billingAddress);
        }
        if (typeof resp.paymentToken !== 'undefined') {
            this.paymentToken = resp.paymentToken;
        }
    }
    setNickName(nickName) {
        if (nickName.length > NICK_NAME_MAX_LENGTH) {
            throw new Error('invalid nickName');
        }
        this.nickName = nickName;
    }
    getNickName() { return this.nickName; }
    setMerchantRefNum(merchantRefNum) {
        if (merchantRefNum.length > MERCHANT_REF_NUM_MAX_LENGTH) {
            throw new Error('invalid merchantRefNum');
        }
        this.merchantRefNum = merchantRefNum;
    }
    getMerchantRefNum() { return this.merchantRefNum; }
    getStatus() { return this.status; }
    getStatusReason() { return this.statusReason; }
    setAccountNumber(accountNumber) {
        if (accountNumber.length < ACCOUNT_NUMBER_MIN_LENGTH || accountNumber.length > ACCOUNT_NUMBER_MAX_LENGTH) {
            throw new Error('invalid accountNumber');
        }
        this.accountNumber = accountNumber;
    }
    getAccountNumber() { return this.accountNumber; }
    setAccountHolderName(accountHolderName) {
        if (accountHolderName.length > ACCOUNT_HOLDER_NAME_MAX_LENGTH) {
            throw new Error('invalid accountHolderName');
        }
        this.accountHolderName = accountHolderName;
    }
    getAccountHolderName() { return this.accountHolderName; }
    setRoutingNumber(routingNumber) {
        if (routingNumber.length > ROUTING_NUMBER_MAX_LENGTH) {
            throw new Error('invalid routingNumber');
        }
        this.routingNumber = routingNumber;
    }
    getRoutingNumber() { return this.routingNumber; }
    setAccountType(accountType) { this.accountType = accountType; }
    getAccountType() { return this.accountType; }
    getLastDigits() { return this.lastDigits; }
    setBillingAddress(billingAddress) { this.billingAddress = billingAddress; }
    getBillingAddress() { return this.billingAddress; }
    setBillingAddressId(billingAddressId) {
        if (billingAddressId.length > BILLING_ADDRESS_ID_MAX_LENGTH) {
            throw new Error('invalid billingAddressId');
        }
        this.billingAddressId = billingAddressId;
    }
    getBillingAddressId() { return this.billingAddressId; }
    setPaymentToken(paymentToken) {
        if (paymentToken.length > PAYMENT_TOKEN_MAX_LENGTH) {
            throw new Error('invalid paymentToken');
        }
        this.paymentToken = paymentToken;
    }
    getPaymentToken() { return this.paymentToken; }
}
exports.ACHBankAccount = ACHBankAccount;
