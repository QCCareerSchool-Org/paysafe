"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const link_1 = require("../common/link");
const create_array_1 = require("../common/create-array");
const request_object_1 = require("../request-object");
const authorization_1 = require("./authorization");
const acquirer_response_1 = require("./acquirer-response");
const paysafe_error_1 = require("../paysafe-error");
class AuthorizationReversal extends request_object_1.RequestObject {
    constructor(resp) {
        super();
        if (!resp)
            return;
        this.id = resp.id;
        this.merchantRefNum = resp.merchantRefNum;
        this.amount = resp.amount;
        this.childAccountNum = resp.childAccountNum;
        this.dupCheck = resp.dupCheck;
        this.txnTime = resp.txnTime;
        if (resp.error)
            this.error = new paysafe_error_1.PaysafeError(resp.error);
        this.status = resp.status;
        this.riskReasonCode = resp.riskReasonCode;
        if (resp.acquirerResponse)
            this.acquirerResponse = new acquirer_response_1.AcquirerResponse(resp.acquirerResponse);
        if (resp.links)
            this.links = create_array_1.createArray(resp.links, link_1.Link);
        if (resp.voidAuths)
            this.voidAuths = create_array_1.createArray(resp.voidAuths, AuthorizationReversal);
        if (resp.authorization)
            this.authorization = new authorization_1.Authorization(resp.authorization);
    }
    setAuthorization(authorization) { this.authorization = authorization; }
    getAuthorization() { return this.authorization; }
    deleteAuthorization() { delete this.authorization; }
    setVoidAuths(voidAuths) { this.voidAuths = voidAuths; }
    getVoidAuths() { return this.voidAuths; }
    setLinks(links) { this.links = links; }
    getLinks() { return this.links; }
    setTxnTime(txnTime) { this.txnTime = txnTime; }
    getTxnTime() { return this.txnTime; }
    setDupCheck(dupCheck) { this.dupCheck = dupCheck; }
    getDupCheck() { return this.dupCheck; }
    setAcquirerResponse(acquirerResponse) { this.acquirerResponse = acquirerResponse; }
    getAcquirerResponse() { return this.acquirerResponse; }
    setRiskReasonCode(riskReasonCode) { this.riskReasonCode = riskReasonCode; }
    getRiskReasonCode() { return this.riskReasonCode; }
    setError(error) { this.error = error; }
    getError() { return this.error; }
    setChildAccountNum(childAccountNum) { this.childAccountNum = childAccountNum; }
    getChildAccountNum() { return this.childAccountNum; }
    setAmount(amount) { this.amount = amount; }
    getAmount() { return this.amount; }
    setMerchantRefNum(merchantRefNum) { this.merchantRefNum = merchantRefNum; }
    getMerchantRefNum() { return this.merchantRefNum; }
    setStatus(status) { this.status = status; }
    getStatus() { return this.status; }
    setId(id) { this.id = id; }
    getId() { return this.id; }
    deleteId() { delete this.id; }
}
exports.AuthorizationReversal = AuthorizationReversal;
