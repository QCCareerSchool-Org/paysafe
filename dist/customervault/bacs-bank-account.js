"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_array_1 = require("../common/create-array");
const link_1 = require("../common/link");
const mandate_1 = require("./mandate");
const paysafe_error_1 = require("../paysafe-error");
const profile_1 = require("./profile");
class BACSBankAccount {
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
        this.sortCode = resp.sortCode;
        this.billingAddressId = resp.billingAddressId;
        if (resp.mandates) {
            if (resp.mandates instanceof Array)
                this.mandates = create_array_1.createArray(resp.mandates, mandate_1.Mandate);
            else
                this.mandates = new mandate_1.Mandate(resp.mandates);
        }
        this.lastDigits = resp.lastDigits;
        this.paymentToken = resp.paymentToken;
        this.mandateReference = resp.mandateReference;
        if (resp.error)
            this.error = new paysafe_error_1.PaysafeError(resp.error);
        if (resp.profile)
            this.profile = new profile_1.Profile(resp.profile);
        if (resp.links)
            this.links = create_array_1.createArray(resp.links, link_1.Link);
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
    setsortCode(sortCode) { this.sortCode = sortCode; }
    getsortCode() { return this.sortCode; }
    setbillingAddressId(billingAddressId) { this.billingAddressId = billingAddressId; }
    getbillingAddressId() { return this.billingAddressId; }
    setmandates(mandates) { this.mandates = mandates; }
    getmandates() { return this.mandates; }
    setlastDigits(lastDigits) { this.lastDigits = lastDigits; }
    getlastDigits() { return this.lastDigits; }
    setpaymentToken(paymentToken) { this.paymentToken = paymentToken; }
    getpaymentToken() { return this.paymentToken; }
    setmandateReference(mandateReference) { this.mandateReference = mandateReference; }
    getmandateReference() { return this.mandateReference; }
    setError(error) { this.error = error; }
    getError() { return this.error; }
    setProfile(profile) { this.profile = profile; }
    getProfile() { return this.profile; }
    setLinks(links) { this.links = links; }
    getLinks() { return this.links; }
}
exports.BACSBankAccount = BACSBankAccount;
