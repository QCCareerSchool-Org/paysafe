"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mandate = void 0;
const request_1 = require("./request");
const REFERENCE_MAX_LENGTH = 35; // 10 for BACS, 35 for SEPA
const PAYMENT_TOKEN_MAX_LENGTH = 50;
class Mandate extends request_1.Request {
    constructor(resp) {
        super(resp);
        if (!resp) {
            return;
        }
        if (typeof resp.reference !== 'undefined') {
            this.reference = resp.reference;
        }
        if (typeof resp.bankAccountId !== 'undefined') {
            this.bankAccountId = resp.bankAccountId;
        }
        if (typeof resp.status !== 'undefined') {
            this.status = resp.status;
        }
        if (typeof resp.paymentToken !== 'undefined') {
            this.paymentToken = resp.paymentToken;
        }
        if (typeof resp.statusChangeDate !== 'undefined') {
            this.statusChangeDate = new Date(resp.statusChangeDate);
        }
        if (typeof resp.statusReasonCode !== 'undefined') {
            this.statusReasonCode = resp.statusReasonCode;
        }
        if (typeof resp.statusReason !== 'undefined') {
            this.statusReason = resp.statusReason;
        }
    }
    setReference(reference) {
        if (reference.length > REFERENCE_MAX_LENGTH) {
            throw new Error('invalid reference');
        }
        this.reference = reference;
    }
    getReference() { return this.reference; }
    getBankAccountId() { return this.bankAccountId; }
    getStatus() { return this.status; }
    getStatusChangeDate() { return this.statusChangeDate; }
    getStatusReasonCode() { return this.statusReasonCode; }
    getStatusReason() { return this.statusReason; }
    setPaymentToken(paymentToken) {
        if (paymentToken.length > PAYMENT_TOKEN_MAX_LENGTH) {
            throw new Error('invalid paymentToken');
        }
        this.paymentToken = paymentToken;
    }
    getPaymentToken() { return this.paymentToken; }
}
exports.Mandate = Mandate;
