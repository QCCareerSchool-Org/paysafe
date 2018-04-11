"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_array_1 = require("../common/create-array");
const link_1 = require("../common/link");
const request_object_1 = require("../request-object");
const acquirer_response_1 = require("./lib/acquirer-response");
const splitpay_1 = require("./lib/splitpay");
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
            this.riskReasonCode = resp.riskReasonCode.slice(0);
        }
        if (typeof resp.acquirerResponse !== 'undefined') {
            this.acquirerResponse = new acquirer_response_1.AcquirerResponse(resp.acquirerResponse);
        }
        if (typeof resp.splitpay !== 'undefined') {
            if (Array.isArray(resp.splitpay)) {
                this.splitpay = create_array_1.createArray(resp.splitpay, splitpay_1.Splitpay);
            }
            else {
                this.splitpay = new splitpay_1.Splitpay(resp.splitpay);
            }
        }
        if (typeof resp.links !== 'undefined') {
            this.links = create_array_1.createArray(resp.links, link_1.Link);
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
    setSplitpay(splitpay) { this.splitpay = splitpay; }
    getSplitpay() { return this.splitpay; }
    setLinks(links) { this.links = links; }
    getLinks() { return this.links; }
}
exports.Settlement = Settlement;
