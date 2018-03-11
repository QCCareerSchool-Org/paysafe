"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const paysafe_error_1 = require("../paysafe-error");
const profile_1 = require("./profile");
class EFTBankAccount {
    constructor(resp) {
        if (!resp)
            return;
        this.id = resp.id;
        this.nickName = resp.nickName;
        this.merchantRefNum = resp.merchantRefNum;
        this.status = resp.status;
        this.statusReason = resp.statusReason;
        this.accountNumber = resp.accountNumber;
        this.accountHolderName = resp.accountHolderName;
        this.transitNumber = resp.transitNumber;
        this.institutionId = resp.institutionId;
        this.lastDigits = resp.lastDigits;
        this.billingAddressId = resp.billingAddressId;
        this.paymentToken = resp.paymentToken;
        this.payMethod = resp.payMethod;
        this.paymentDescriptor = resp.paymentDescriptor;
        if (resp.profile)
            this.profile = new profile_1.Profile(resp.profile);
        if (resp.error)
            this.error = new paysafe_error_1.PaysafeError(resp.error);
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
    setProfile(profile) { this.profile = profile; }
    getProfile() { return this.profile; }
    setError(error) { this.error = error; }
    getError() { return this.error; }
}
exports.EFTBankAccount = EFTBankAccount;
