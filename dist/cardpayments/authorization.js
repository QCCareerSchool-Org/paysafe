"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_array_1 = require("../common/create-array");
const link_1 = require("../common/link");
const profile_1 = require("../customervault/profile");
const request_object_1 = require("../request-object");
const accord_d_1 = require("./accord-d");
const acquirer_response_1 = require("./acquirer-response");
const authentication_1 = require("./authentication");
const billing_details_1 = require("./billing-details");
const card_1 = require("./card");
const master_pass_1 = require("./master-pass");
const merchant_descriptor_1 = require("./merchant-descriptor");
const settlement_1 = require("./settlement");
const shipping_details_1 = require("./shipping-details");
const visa_additional_auth_data_1 = require("./visa-additional-auth-data");
class Authorization extends request_object_1.RequestObject {
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
        if (typeof resp.settleWithAuth !== 'undefined') {
            this.settleWithAuth = resp.settleWithAuth;
        }
        if (typeof resp.availableToSettle !== 'undefined') {
            this.availableToSettle = resp.availableToSettle;
        }
        if (typeof resp.childAccountNum !== 'undefined') {
            this.childAccountNum = resp.childAccountNum;
        }
        if (typeof resp.card !== 'undefined') {
            this.card = new card_1.Card(resp.card);
        }
        if (typeof resp.authentication !== 'undefined') {
            this.authentication = new authentication_1.Authentication(resp.authentication);
        }
        if (typeof resp.authCode !== 'undefined') {
            this.authCode = resp.authCode;
        }
        if (typeof resp.profile !== 'undefined') {
            this.profile = new profile_1.Profile(resp.profile);
        }
        if (typeof resp.billingDetails !== 'undefined') {
            this.billingDetails = new billing_details_1.BillingDetails(resp.billingDetails);
        }
        if (typeof resp.shippingDetails !== 'undefined') {
            this.shippingDetails = new shipping_details_1.ShippingDetails(resp.shippingDetails);
        }
        if (typeof resp.recurring !== 'undefined') {
            this.recurring = resp.recurring;
        }
        if (typeof resp.customerIp !== 'undefined') {
            this.customerIp = resp.customerIp;
        }
        if (typeof resp.dupCheck !== 'undefined') {
            this.dupCheck = resp.dupCheck;
        }
        if (typeof resp.keywords !== 'undefined') {
            this.keywords = resp.keywords;
        }
        if (typeof resp.merchantDescriptor !== 'undefined') {
            this.merchantDescriptor = new merchant_descriptor_1.MerchantDescriptor(resp.merchantDescriptor);
        }
        if (typeof resp.accordD !== 'undefined') {
            this.accordD = new accord_d_1.AccordD(resp.accordD);
        }
        if (typeof resp.description !== 'undefined') {
            this.description = resp.description;
        }
        if (typeof resp.masterPass !== 'undefined') {
            this.masterPass = new master_pass_1.MasterPass(resp.masterPass);
        }
        if (typeof resp.txnTime !== 'undefined') {
            this.txnTime = resp.txnTime;
        }
        if (typeof resp.currencyCode !== 'undefined') {
            this.currencyCode = resp.currencyCode;
        }
        if (typeof resp.avsResponse !== 'undefined') {
            this.avsResponse = resp.avsResponse;
        }
        if (typeof resp.cvvVerification !== 'undefined') {
            this.cvvVerification = resp.cvvVerification;
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
        if (typeof resp.visaAdditionalAuthData !== 'undefined') {
            this.visaAdditionalAuthData = new visa_additional_auth_data_1.VisaAdditionalAuthData(resp.visaAdditionalAuthData);
        }
        if (typeof resp.links !== 'undefined') {
            this.links = create_array_1.createArray(resp.links, link_1.Link);
        }
        if (typeof resp.auths !== 'undefined') {
            this.auths = create_array_1.createArray(resp.auths, Authorization);
        }
        if (typeof resp.settlements !== 'undefined') {
            this.settlements = create_array_1.createArray(resp.settlements, settlement_1.Settlement);
        }
    }
    setMerchantRefNum(merchantRefNum) { this.merchantRefNum = merchantRefNum; }
    getMerchantRefNum() { return this.merchantRefNum; }
    setAmount(amount) { this.amount = amount; }
    getAmount() { return this.amount; }
    setSettleWithAuth(settleWithAuth) { this.settleWithAuth = settleWithAuth; }
    getSettleWithAuth() { return this.settleWithAuth; }
    setAvailableToSettle(availableToSettle) { this.availableToSettle = availableToSettle; }
    getAvailableToSettle() { return this.availableToSettle; }
    setChildAccountNum(childAccountNum) { this.childAccountNum = childAccountNum; }
    getChildAccountNum() { return this.childAccountNum; }
    setCard(card) { this.card = card; }
    getCard() { return this.card; }
    setAuthentication(authentication) { this.authentication = authentication; }
    getAuthentication() { return this.authentication; }
    setAuthCode(authCode) { this.authCode = authCode; }
    getAuthCode() { return this.authCode; }
    setProfile(profile) { this.profile = profile; }
    getProfile() { return this.profile; }
    setBillingDetails(billingDetails) { this.billingDetails = billingDetails; }
    getBillingDetails() { return this.billingDetails; }
    setShippingDetails(shippingDetails) { this.shippingDetails = shippingDetails; }
    getShippingDetails() { return this.shippingDetails; }
    setRecurring(recurring) { this.recurring = recurring; }
    getRecurring() { return this.recurring; }
    setCustomerIp(customerIp) { this.customerIp = customerIp; }
    getCustomerIp() { return this.customerIp; }
    setDupCheck(dupCheck) { this.dupCheck = dupCheck; }
    getDupCheck() { return this.dupCheck; }
    setKeywords(keywords) { this.keywords = keywords; }
    getKeywords() { return this.keywords; }
    setMerchantDescriptor(merchantDescriptor) { this.merchantDescriptor = merchantDescriptor; }
    getMerchantDescriptor() { return this.merchantDescriptor; }
    setAccordD(accordD) { this.accordD = accordD; }
    getAccordD() { return this.accordD; }
    setDescription(description) { this.description = description; }
    getDescription() { return this.description; }
    setMasterPass(masterPass) { this.masterPass = masterPass; }
    getMasterPass() { return this.masterPass; }
    setTxnTime(txnTime) { this.txnTime = txnTime; }
    getTxnTime() { return this.txnTime; }
    setCurrencyCode(currencyCode) { this.currencyCode = currencyCode; }
    getCurrencyCode() { return this.currencyCode; }
    setAvsResponse(avsResponse) { this.avsResponse = avsResponse; }
    getAvsResponse() { return this.avsResponse; }
    setCvvVerification(cvvVerification) { this.cvvVerification = cvvVerification; }
    getCvvVerification() { return this.cvvVerification; }
    setStatus(status) { this.status = status; }
    getStatus() { return this.status; }
    setRiskReasonCode(riskReasonCode) { this.riskReasonCode = riskReasonCode; }
    getRiskReasonCode() { return this.riskReasonCode; }
    setAcquirerResponse(acquirerResponse) { this.acquirerResponse = acquirerResponse; }
    getAcquirerResponse() { return this.acquirerResponse; }
    setVisaAdditionalAuthData(visaAdditionalAuthData) { this.visaAdditionalAuthData = visaAdditionalAuthData; }
    getVisaAdditionalAuthData() { return this.visaAdditionalAuthData; }
    setLinks(links) { this.links = links; }
    getLinks() { return this.links; }
    setAuths(auths) { this.auths = auths; }
    getAuths() { return this.auths; }
    setSettlements(settlements) { this.settlements = settlements; }
    getSettlements() { return this.settlements; }
}
exports.Authorization = Authorization;
