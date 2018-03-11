"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const link_1 = require("../common/link");
const create_array_1 = require("../common/create-array");
const authorization_1 = require("./authorization");
const acquirer_response_1 = require("./acquirer-response");
const paysafe_error_1 = require("../paysafe-error");
class Settlement {
    constructor(resp) {
        if (!resp)
            return;
        this.id = resp.id;
        this.merchantRefNum = resp.merchantRefNum;
        this.amount = resp.amount;
        this.availableToRefund = resp.availableToRefund;
        this.childAccountNum = resp.childAccountNum;
        this.txnTime = resp.txnTime;
        this.dupCheck = resp.dupCheck;
        this.status = resp.status;
        this.riskReasonCode = resp.riskReasonCode;
        if (resp.acquirerResponse)
            this.acquirerResponse = new acquirer_response_1.AcquirerResponse(resp.acquirerResponse);
        if (resp.authorization)
            this.authorization = new authorization_1.Authorization(resp.authorization);
        if (resp.links)
            this.links = create_array_1.createArray(resp.links, link_1.Link);
        if (resp.error)
            this.error = new paysafe_error_1.PaysafeError(resp.error);
        if (resp.settlements)
            this.settlements = create_array_1.createArray(resp.settlements, Settlement);
        this.originalMerchantRefNum = resp.originalMerchantRefNum;
        this.mode = resp.mode;
        this.currencyCode = resp.currencyCode;
        this.confirmationNumber = resp.confirmationNumber;
        this.authType = resp.authType;
    }
    setOriginalMerchantRefNum(originalMerchantRefNum) { this.originalMerchantRefNum = originalMerchantRefNum; }
    getOriginalMerchantRefNum() { return this.originalMerchantRefNum; }
    ;
    setAuthType(authType) { this.authType = authType; }
    getAuthType() { return this.authType; }
    setConfirmationNumber(confirmationNumber) { this.confirmationNumber = confirmationNumber; }
    getConfirmationNumber() { return this.confirmationNumber; }
    setCurrencyCode(currencyCode) { this.currencyCode = currencyCode; }
    getCurrencyCode() { return this.currencyCode; }
    setMode(mode) { this.mode = mode; }
    getMode() { return this.mode; }
    setSettlements(settlements) { this.settlements = settlements; }
    getSettlements() { return this.settlements; }
    ;
    setStatus(status) { this.status = status; }
    getStatus() { return this.status; }
    setLinks(links) { this.links = links; }
    getLinks() { return this.links; }
    setError(error) { this.error = error; }
    getError() { return this.error; }
    setAuthorization(authorization) { this.authorization = authorization; }
    getAuthorization() { return this.authorization; }
    setAvailableToRefund(availableToRefund) { this.availableToRefund = availableToRefund; }
    getAvailableToRefund() { return this.availableToRefund; }
    setTxnTime(txnTime) { this.txnTime = txnTime; }
    getTxnTime() { return this.txnTime; }
    setDupCheck(dupCheck) { this.dupCheck = dupCheck; }
    getDupCheck() { return this.dupCheck; }
    setChildAccountNum(childAccountNum) { this.childAccountNum = childAccountNum; }
    getChildAccountNum() { return this.childAccountNum; }
    setAcquirerResponse(acquirerResponse) { this.acquirerResponse = acquirerResponse; }
    getAcquirerResponse() { return this.acquirerResponse; }
    setRiskReasonCode(riskReasonCode) { this.riskReasonCode = riskReasonCode; }
    getRiskReasonCode() { return this.riskReasonCode; }
    setAmount(amount) { this.amount = amount; }
    getAmount() { return this.amount; }
    setMerchantRefNum(merchantRefNum) { this.merchantRefNum = merchantRefNum; }
    getMerchantRefNum() { return this.merchantRefNum; }
    setId(id) { this.id = id; }
    getId() { return this.id; }
}
exports.Settlement = Settlement;
