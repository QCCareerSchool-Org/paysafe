"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EFTBankAccount = void 0;
const paysafe_error_1 = require("../common/paysafe-error");
class EFTBankAccount {
    constructor(resp) {
        if (!resp) {
            return;
        }
        if (typeof resp.id !== 'undefined') {
            this.id = resp.id;
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
        if (typeof resp.transitNumber !== 'undefined') {
            this.transitNumber = resp.transitNumber;
        }
        if (typeof resp.institutionId !== 'undefined') {
            this.institutionId = resp.institutionId;
        }
        if (typeof resp.lastDigits !== 'undefined') {
            this.lastDigits = resp.lastDigits;
        }
        if (typeof resp.billingAddressId !== 'undefined') {
            this.billingAddressId = resp.billingAddressId;
        }
        if (typeof resp.paymentToken !== 'undefined') {
            this.paymentToken = resp.paymentToken;
        }
        if (typeof resp.payMethod !== 'undefined') {
            this.payMethod = resp.payMethod;
        }
        if (typeof resp.paymentDescriptor !== 'undefined') {
            this.paymentDescriptor = resp.paymentDescriptor;
        }
        // if (typeof resp.profile !== 'undefined') {
        //   this.profile = new Profile(resp.profile);
        // }
        if (typeof resp.error !== 'undefined') {
            this.error = new paysafe_error_1.PaysafeError(resp.error);
        }
    }
    setId(id) { this.id = id; }
    getId() { return this.id; }
    setnickName(nickName) { this.nickName = nickName; }
    getnickName() { return this.nickName; }
    setmerchantRefNum(merchantRefNum) { this.merchantRefNum = merchantRefNum; }
    getmerchantRefNum() { return this.merchantRefNum; }
    setStatus(status) { this.status = status; }
    getStatus() { return this.status; }
    setstatusReason(statusReason) { this.statusReason = statusReason; }
    getstatusReason() { return this.statusReason; }
    setaccountNumber(accountNumber) { this.accountNumber = accountNumber; }
    getaccountNumber() { return this.accountNumber; }
    setaccountHolderName(accountHolderName) { this.accountHolderName = accountHolderName; }
    getaccountHolderName() { return this.accountHolderName; }
    settransitNumber(transitNumber) { this.transitNumber = transitNumber; }
    gettransitNumber() { return this.transitNumber; }
    setinstitutionId(institutionId) { this.institutionId = institutionId; }
    getinstitutionId() { return this.institutionId; }
    setlastDigits(lastDigits) { this.lastDigits = lastDigits; }
    getlastDigits() { return this.lastDigits; }
    setbillingAddressId(billingAddressId) { this.billingAddressId = billingAddressId; }
    getbillingAddressId() { return this.billingAddressId; }
    setpaymentToken(paymentToken) { this.paymentToken = paymentToken; }
    getpaymentToken() { return this.paymentToken; }
    setpayMethod(payMethod) { this.payMethod = payMethod; }
    getpayMethod() { return this.payMethod; }
    setpaymentDescriptor(paymentDescriptor) { this.paymentDescriptor = paymentDescriptor; }
    getpaymentDescriptor() { return this.paymentDescriptor; }
    // public setProfile(profile: Profile): void { this.profile = profile; }
    // public getProfile(): Profile | undefined { return this.profile; }
    setError(error) { this.error = error; }
    getError() { return this.error; }
}
exports.EFTBankAccount = EFTBankAccount;
