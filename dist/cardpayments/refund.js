"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const link_1 = require("../common/link");
const create_array_1 = require("../common/create-array");
const settlement_1 = require("./settlement");
const acquirer_response_1 = require("./acquirer-response");
const request_object_1 = require("../request-object");
class Refund extends request_object_1.RequestObject {
    constructor(resp) {
        super(resp);
        if (!resp)
            return;
        this.amount = resp.amount;
        this.childAccountNum = resp.childAccountNum;
        this.dupCheck = resp.dupCheck;
        this.txnTime = resp.txnTime;
        this.status = resp.status;
        this.riskReasonCode = resp.riskReasonCode;
        if (resp.acquirerResponse)
            this.acquirerResponse = new acquirer_response_1.AcquirerResponse(resp.acquirerResponse);
        if (resp.settlements)
            this.settlements = new settlement_1.Settlement(resp.settlements);
        if (resp.links)
            this.links = create_array_1.createArray(resp.links, link_1.Link);
        if (resp.refunds)
            this.refunds = create_array_1.createArray(resp.refunds, Refund);
        this.currencyCode = resp.currencyCode;
        this.originalMerchantRefNum = resp.originalMerchantRefNum;
        this.mode = resp.mode;
        this.authType = resp.authType;
        this.confirmationNumber = resp.confirmationNumber;
    }
    setConfirmationNumber(confirmationNumber) { this.confirmationNumber = confirmationNumber; }
    getConfirmationNumber() { return this.confirmationNumber; }
    setAuthType(authType) { this.authType = authType; }
    getAuthType() { return this.authType; }
    setMode(mode) { this.mode = mode; }
    getMode() { return this.mode; }
    setOriginalMerchantRefNum(originalMerchantRefNum) { this.originalMerchantRefNum = originalMerchantRefNum; }
    getOriginalMerchantRefNum() { return this.originalMerchantRefNum; }
    setCurrencyCode(currencyCode) { this.currencyCode = currencyCode; }
    getCurrencyCode() { return this.currencyCode; }
    setRefunds(refunds) { this.refunds = refunds; }
    getRefunds() { return this.refunds; }
    setStatus(status) { this.status = status; }
    getStatus() { return this.status; }
    setLinks(links) { this.links = links; }
    getLinks() { return this.links; }
    setSettlements(settlements) { this.settlements = settlements; }
    getSettlements() { return this.settlements; }
    deleteSettlements() { delete this.settlements; }
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
}
exports.Refund = Refund;
