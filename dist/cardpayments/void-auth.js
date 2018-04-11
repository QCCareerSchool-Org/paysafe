"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_array_1 = require("../common/create-array");
const link_1 = require("../common/link");
const request_object_1 = require("../request-object");
const acquirer_response_1 = require("./lib/acquirer-response");
class VoidAuth extends request_object_1.RequestObject {
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
        if (typeof resp.childAccountNum !== 'undefined') {
            this.childAccountNum = resp.childAccountNum;
        }
        if (typeof resp.dupCheck !== 'undefined') {
            this.dupCheck = resp.dupCheck;
        }
        if (typeof resp.txnTime !== 'undefined') {
            this.txnTime = resp.txnTime;
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
        if (typeof resp.links !== 'undefined') {
            this.links = create_array_1.createArray(resp.links, link_1.Link);
        }
    }
    setMerchantRefNum(merchantRefNum) { this.merchantRefNum = merchantRefNum; }
    getMerchantRefNum() { return this.merchantRefNum; }
    setAmount(amount) { this.amount = amount; }
    getAmount() { return this.amount; }
    setChildAccountNum(childAccountNum) { this.childAccountNum = childAccountNum; }
    getChildAccountNum() { return this.childAccountNum; }
    setDupCheck(dupCheck) { this.dupCheck = dupCheck; }
    getDupCheck() { return this.dupCheck; }
    setTxnTime(txnTime) { this.txnTime = txnTime; }
    getTxnTime() { return this.txnTime; }
    setStatus(status) { this.status = status; }
    getStatus() { return this.status; }
    setRiskReasonCode(riskReasonCode) { this.riskReasonCode = riskReasonCode; }
    getRiskReasonCode() { return this.riskReasonCode; }
    setAcquirerResponse(acquirerResponse) { this.acquirerResponse = acquirerResponse; }
    getAcquirerResponse() { return this.acquirerResponse; }
    setLinks(links) { this.links = links; }
    getLinks() { return this.links; }
}
exports.VoidAuth = VoidAuth;
