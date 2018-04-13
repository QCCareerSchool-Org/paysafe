"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = require("./request");
const create_array_1 = require("../common/create-array");
const billing_address_1 = require("./lib/billing-address");
const mandate_1 = require("./mandate");
const NICK_NAME_MAX_LENGTH = 50;
const MERCHANT_REF_NUM_MAX_LENGTH = 255;
const ACCOUNT_NUMBER_LENGTH = 8;
const ACCOUNT_HOLDER_NAME_MAX_LENGTH = 18;
const SORT_CODE_LENGTH = 6;
const BILLING_ADDRESS_ID_MAX_LENGTH = 36;
const PAYMENT_TOKEN_MAX_LENGTH = 50;
class BACSBankAccount extends request_1.Request {
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
        if (typeof resp.sortCode !== 'undefined') {
            this.sortCode = resp.sortCode;
        }
        if (typeof resp.lastDigits !== 'undefined') {
            this.lastDigits = resp.lastDigits;
        }
        if (typeof resp.billingAddress !== 'undefined') {
            this.billingAddress = new billing_address_1.BillingAddress(resp.billingAddress);
        }
        if (typeof resp.billingAddressId !== 'undefined') {
            this.billingAddressId = resp.billingAddressId;
        }
        if (typeof resp.paymentToken !== 'undefined') {
            this.paymentToken = resp.paymentToken;
        }
        if (typeof resp.mandates !== 'undefined') {
            if (!Array.isArray(resp.mandates)) {
                throw new Error('mandates should be an array');
            }
            this.mandates = create_array_1.createArray(resp.mandates, mandate_1.Mandate);
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
        if (accountNumber.length !== ACCOUNT_NUMBER_LENGTH) {
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
    setSortCode(sortCode) {
        if (sortCode.length !== SORT_CODE_LENGTH) {
            throw new Error('invalid sortCode');
        }
        this.sortCode = sortCode;
    }
    getSortCode() { return this.sortCode; }
    setBillingAddress(billingAddress) { this.billingAddress = billingAddress; }
    getBillingAddress() { return this.billingAddress; }
    setBillingAddressId(billingAddressId) {
        if (billingAddressId.length > BILLING_ADDRESS_ID_MAX_LENGTH) {
            throw new Error('invalid billingAddressId');
        }
        this.billingAddressId = billingAddressId;
    }
    getBillingAddressId() { return this.billingAddressId; }
    getMandates() { return this.mandates; }
    getLastDigits() { return this.lastDigits; }
    setPaymentToken(paymentToken) {
        if (paymentToken.length > PAYMENT_TOKEN_MAX_LENGTH) {
            throw new Error('invalid paymentToken');
        }
        this.paymentToken = paymentToken;
    }
    getPaymentToken() { return this.paymentToken; }
}
exports.BACSBankAccount = BACSBankAccount;
