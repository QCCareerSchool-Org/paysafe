"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const paysafe_error_1 = require("../paysafe-error");
const profile_1 = require("./profile");
const sepa_bank_account_1 = require("./sepa-bank-account");
const bacs_bank_account_1 = require("./bacs-bank-account");
class Mandate {
    constructor(resp) {
        if (!resp)
            return;
        this.id = resp.id;
        this.reference = resp.reference;
        this.bankAccountId = resp.bankAccountId;
        this.statusChangeDate = resp.statusChangeDate;
        this.statusReasonCode = resp.statusReasonCode;
        this.statusReason = resp.statusReason;
        this.paymentToken = resp.paymentToken;
        if (resp.error)
            this.error = new paysafe_error_1.PaysafeError(resp.error);
        this.status = resp.status;
        if (resp.profiles)
            this.profiles = new profile_1.Profile(resp.profiles);
        if (resp.sepabankaccounts)
            this.sepabankaccounts = new sepa_bank_account_1.SEPABankAccount(resp.sepabankaccounts);
        if (resp.bacsbankaccounts)
            this.bacsbankaccounts = new bacs_bank_account_1.BACSBankAccount(resp.bacsbankaccounts);
    }
    setId(id) { this.id = id; }
    getId() { return this.id; }
    setreference(reference) { this.reference = reference; }
    getreference() { return this.reference; }
    setbankAccountId(bankAccountId) { this.bankAccountId = bankAccountId; }
    getbankAccountId() { return this.bankAccountId; }
    setStatus(status) { this.status = status; }
    getStatus() { return this.status; }
    setstatusChangeDate(statusChangeDate) { this.statusChangeDate = statusChangeDate; }
    getstatusChangeDate() { return this.statusChangeDate; }
    setstatusReasonCode(statusReasonCode) { this.statusReasonCode = statusReasonCode; }
    getstatusReasonCode() { return this.statusReasonCode; }
    setstatusReason(statusReason) { this.statusReason = statusReason; }
    getstatusReason() { return this.statusReason; }
    setpaymentToken(paymentToken) { this.paymentToken = paymentToken; }
    getpaymentToken() { return this.paymentToken; }
    setError(error) { this.error = error; }
    getError() { return this.error; }
    setprofiles(profiles) { this.profiles = profiles; }
    getprofiles() { return this.profiles; }
    setsepabankaccounts(sepabankaccounts) { this.sepabankaccounts = sepabankaccounts; }
    getsepabankaccounts() { return this.sepabankaccounts; }
    setbacsbankaccounts(bacsbankaccounts) { this.bacsbankaccounts = bacsbankaccounts; }
    getbacsbankaccounts() { return this.bacsbankaccounts; }
}
exports.Mandate = Mandate;
