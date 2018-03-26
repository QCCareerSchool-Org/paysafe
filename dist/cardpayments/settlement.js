"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_array_1 = require("../common/create-array");
const link_1 = require("../common/link");
const request_object_1 = require("../request-object");
const acquirer_response_1 = require("./acquirer-response");
const authorization_1 = require("./authorization");
class Settlement extends request_object_1.RequestObject {
    constructor(resp) {
        super(resp);
        if (!resp) {
            return;
        }
        if (typeof resp.merchantRefNum !== 'undefined') {
            this.merchantRefNum = resp.merchantRefNum;
        }
        if (typeof resp.amount !== 'undefined') {
            this.amount = resp.amount;
        }
        if (typeof resp.availableToRefund !== 'undefined') {
            this.availableToRefund = resp.availableToRefund;
        }
        if (typeof resp.childAccountNum !== 'undefined') {
            this.childAccountNum = resp.childAccountNum;
        }
        if (typeof resp.txnTime !== 'undefined') {
            this.txnTime = resp.txnTime;
        }
        if (typeof resp.dupCheck !== 'undefined') {
            this.dupCheck = resp.dupCheck;
        }
        if (typeof resp.status !== 'undefined') {
            this.status = resp.status;
        }
        if (typeof resp.riskReasonCode !== 'undefined') {
            this.riskReasonCode = resp.riskReasonCode;
        }
        if (typeof resp.acquirerResponse !== 'undefined') {
            this.acquirerResponse = new acquirer_response_1.AcquirerResponse(resp.acquirerResponse);
        }
        if (typeof resp.authorization !== 'undefined') {
            this.authorization = new authorization_1.Authorization(resp.authorization);
        }
        if (typeof resp.links !== 'undefined') {
            this.links = create_array_1.createArray(resp.links, link_1.Link);
        }
        if (typeof resp.settlements !== 'undefined') {
            this.settlements = create_array_1.createArray(resp.settlements, Settlement);
        }
        if (typeof resp.originalMerchantRefNum !== 'undefined') {
            this.originalMerchantRefNum = resp.originalMerchantRefNum;
        }
        if (typeof resp.mode !== 'undefined') {
            this.mode = resp.mode;
        }
        if (typeof resp.currencyCode !== 'undefined') {
            this.currencyCode = resp.currencyCode;
        }
        if (typeof resp.confirmationNumber !== 'undefined') {
            this.confirmationNumber = resp.confirmationNumber;
        }
        if (typeof resp.authType !== 'undefined') {
            this.authType = resp.authType;
        }
    }
    setMerchantRefNum(merchantRefNum) { this.merchantRefNum = merchantRefNum; }
    getMerchantRefNum() { return this.merchantRefNum; }
    setAmount(amount) { this.amount = amount; }
    getAmount() { return this.amount; }
    setAvailableToRefund(availableToRefund) { this.availableToRefund = availableToRefund; }
    getAvailableToRefund() { return this.availableToRefund; }
    setChildAccountNum(childAccountNum) { this.childAccountNum = childAccountNum; }
    getChildAccountNum() { return this.childAccountNum; }
    setTxnTime(txnTime) { this.txnTime = txnTime; }
    getTxnTime() { return this.txnTime; }
    setDupCheck(dupCheck) { this.dupCheck = dupCheck; }
    getDupCheck() { return this.dupCheck; }
    setStatus(status) { this.status = status; }
    getStatus() { return this.status; }
    setRiskReasonCode(riskReasonCode) { this.riskReasonCode = riskReasonCode; }
    getRiskReasonCode() { return this.riskReasonCode; }
    setAcquirerResponse(acquirerResponse) { this.acquirerResponse = acquirerResponse; }
    getAcquirerResponse() { return this.acquirerResponse; }
    setAuthorization(authorization) { this.authorization = authorization; }
    getAuthorization() { return this.authorization; }
    deleteAuthorization() { delete this.authorization; }
    setLinks(links) { this.links = links; }
    getLinks() { return this.links; }
    setSettlements(settlements) { this.settlements = settlements; }
    getSettlements() { return this.settlements; }
    setMode(mode) { this.mode = mode; }
    getMode() { return this.mode; }
    setCurrencyCode(currencyCode) { this.currencyCode = currencyCode; }
    getCurrencyCode() { return this.currencyCode; }
    setAuthType(authType) { this.authType = authType; }
    getAuthType() { return this.authType; }
    setConfirmationNumber(confirmationNumber) { this.confirmationNumber = confirmationNumber; }
    getConfirmationNumber() { return this.confirmationNumber; }
    setOriginalMerchantRefNum(originalMerchantRefNum) { this.originalMerchantRefNum = originalMerchantRefNum; }
    getOriginalMerchantRefNum() { return this.originalMerchantRefNum; }
}
exports.Settlement = Settlement;
