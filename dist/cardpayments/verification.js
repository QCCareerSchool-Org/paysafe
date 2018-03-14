"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const link_1 = require("../common/link");
const create_array_1 = require("../common/create-array");
const request_object_1 = require("../request-object");
const accord_d_1 = require("./accord-d");
const acquirer_response_1 = require("./acquirer-response");
const authentication_1 = require("./authentication");
const billing_details_1 = require("./billing-details");
const card_1 = require("./card");
const merchant_descriptor_1 = require("./merchant-descriptor");
const shipping_details_1 = require("./shipping-details");
const profile_1 = require("../customervault/profile");
class Verification extends request_object_1.RequestObject {
    constructor(resp) {
        super(resp);
        if (!resp)
            return;
        this.childAccountNum = resp.childAccountNum;
        if (resp.card)
            this.card = new card_1.Card(resp.card);
        this.authCode = resp.authCode;
        if (resp.profile)
            this.profile = new profile_1.Profile(resp.profile);
        if (resp.billingDetails)
            this.billingDetails = new billing_details_1.BillingDetails(resp.billingDetails);
        this.customerIp = resp.customerIp;
        this.dupCheck = resp.dupCheck;
        this.description = resp.description;
        this.txnTime = resp.txnTime;
        this.currencyCode = resp.currencyCode;
        this.avsResponse = resp.avsResponse;
        this.cvvVerification = resp.cvvVerification;
        this.status = resp.status;
        this.riskReasonCode = resp.riskReasonCode;
        if (this.acquirerResponse)
            this.acquirerResponse = new acquirer_response_1.AcquirerResponse(resp.acquirerResponse);
        if (resp.links)
            this.links = create_array_1.createArray(resp.links, link_1.Link);
        if (resp.verifications)
            this.verifications = create_array_1.createArray(resp.verifications, Verification);
        if (resp.accordD)
            this.accordD = new accord_d_1.AccordD(resp.accordD);
        if (resp.merchantDescriptor)
            this.merchantDescriptor = new merchant_descriptor_1.MerchantDescriptor(resp.merchantDescriptor);
        if (resp.shippingDetails)
            this.shippingDetails = new shipping_details_1.ShippingDetails(resp.shippingDetails);
        if (resp.authentication)
            this.authentication = new authentication_1.Authentication(resp.authentication);
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
}
exports.Verification = Verification;
