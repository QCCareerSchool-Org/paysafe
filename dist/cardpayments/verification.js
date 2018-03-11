"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request_object_1 = require("../request-object");
class Verification extends request_object_1.RequestObject {
    constructor(resp) {
        super();
        if (!resp)
            return;
    }
    setAccordD(accordD) { this.accordD = accordD; }
    getAccordD() { return this.accordD; }
    setMerchantDescriptor(merchantDescriptor) { this.merchantDescriptor = merchantDescriptor; }
    getMerchantDescriptor() { return this.merchantDescriptor; }
    setShippingDetails(shippingDetails) { this.shippingDetails = shippingDetails; }
    getShippingDetails() { return this.shippingDetails; }
    setAuthentication(authentication) { this.authentication = authentication; }
    getAuthentication() { return this.authentication; }
    setVerifications(verifications) { this.verifications = verifications; }
    getVerifications() { return this.verifications; }
    setLinks(links) { this.links = links; }
    getLinks() { return this.links; }
    setCvvVerification(cvvVerification) { this.cvvVerification = cvvVerification; }
    getCvvVerification() { return this.cvvVerification; }
    setAvsResponse(avsResponse) { this.avsResponse = avsResponse; }
    getAvsResponse() { return this.avsResponse; }
    setCurrencyCode(currencyCode) { this.currencyCode = currencyCode; }
    getCurrencyCode() { return this.currencyCode; }
    setDescription(description) { this.description = description; }
    getDescription() { return this.description; }
    setCustomerIp(customerIp) { this.customerIp = customerIp; }
    getCustomerIp() { return this.customerIp; }
    setBillingDetails(billingDetails) { this.billingDetails = billingDetails; }
    getBillingDetails() { return this.billingDetails; }
    setProfile(profile) { this.profile = profile; }
    getProfile() { return this.profile; }
    setAuthCode(authCode) { this.authCode = authCode; }
    getAuthCode() { return this.authCode; }
    setCard(card) { this.card = card; }
    getCard() { return this.card; }
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
    setError(error) { this.error = error; }
    getError() { return this.error; }
    setMerchantRefNum(merchantRefNum) { this.merchantRefNum = merchantRefNum; }
    getMerchantRefNum() { return this.merchantRefNum; }
    setId(id) { this.id = id; }
    getId() { return this.id; }
}
exports.Verification = Verification;
