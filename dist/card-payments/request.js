"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_array_1 = require("../common/create-array");
const link_1 = require("../common/link");
const paysafe_error_1 = require("../common/paysafe-error");
const acquirer_response_1 = require("./lib/acquirer-response");
const MERCHANT_REF_NUM_MAX_LENGTH = 255;
/**
 * abstract parent class of any Card Payments API request object
 */
class Request {
    constructor(resp) {
        if (!resp) {
            return;
        }
        if (typeof resp.id !== 'undefined') {
            this.id = resp.id;
        }
        if (typeof resp.merchantRefNum !== 'undefined') {
            this.merchantRefNum = resp.merchantRefNum;
        }
        if (typeof resp.dupCheck !== 'undefined') {
            this.dupCheck = resp.dupCheck;
        }
        if (typeof resp.txnTime !== 'undefined') {
            this.txnTime = new Date(resp.txnTime);
        }
        if (typeof resp.riskReasonCode !== 'undefined') {
            this.riskReasonCode = resp.riskReasonCode.slice(0);
        }
        if (typeof resp.acquirerResponse !== 'undefined') {
            this.acquirerResponse = new acquirer_response_1.AcquirerResponse(resp.acquirerResponse);
        }
        if (typeof resp.childAccountNum !== 'undefined') {
            this.childAccountNum = resp.childAccountNum;
        }
        if (typeof resp.links !== 'undefined') {
            this.links = create_array_1.createArray(resp.links, link_1.Link);
        }
        if (typeof resp.error !== 'undefined') {
            this.error = new paysafe_error_1.PaysafeError(resp.error);
        }
    }
    getId() { return this.id; }
    setMerchantRefNum(merchantRefNum) {
        if (merchantRefNum.length > MERCHANT_REF_NUM_MAX_LENGTH) {
            throw new Error('invalid merchantRefNum');
        }
        this.merchantRefNum = merchantRefNum;
    }
    getMerchantRefNum() { return this.merchantRefNum; }
    setDupCheck(dupCheck) { this.dupCheck = dupCheck; }
    getDupCheck() { return this.dupCheck; }
    getTxnTime() { return this.txnTime; }
    getRiskReasonCode() { return this.riskReasonCode; }
    getAcquirerResponse() { return this.acquirerResponse; }
    getChildAccountNum() { return this.childAccountNum; }
    getLinks() { return this.links; }
    getError() { return this.error; }
}
exports.Request = Request;
