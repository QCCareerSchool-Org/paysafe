"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const paysafe_error_1 = require("../paysafe-error");
const create_array_1 = require("../common/create-array");
const link_1 = require("../common/link");
const accord_d_1 = require("./accord-d");
const authentication_1 = require("./authentication");
const card_1 = require("./card");
const profile_1 = require("../customervault/profile");
const billing_details_1 = require("./billing-details");
const shipping_details_1 = require("./shipping-details");
const master_pass_1 = require("./master-pass");
const acquirer_response_1 = require("./acquirer-response");
const visa_additional_auth_data_1 = require("./visa-additional-auth-data");
const merchant_descriptor_1 = require("./merchant-descriptor");
const settlement_1 = require("./settlement");
const request_object_1 = require("../request-object");
class Authorization extends request_object_1.RequestObject {
    constructor(resp) {
        super();
        if (!resp)
            return;
        this.id = resp.id;
        this.merchantRefNum = resp.merchantRefNum;
        this.amount = resp.amount;
        this.settleWithAuth = resp.settleWithAuth;
        this.availableToSettle = resp.availableToSettle;
        this.childAccountNum = resp.childAccountNum;
        if (resp.card)
            this.card = new card_1.Card(resp.card);
        if (resp.authentication)
            this.authentication = new authentication_1.Authentication(resp.authentication);
        this.authCode = resp.authCode;
        if (resp.profile)
            this.profile = new profile_1.Profile(resp.profile);
        if (resp.billingDetails)
            this.billingDetails = new billing_details_1.BillingDetails(resp.billingDetails);
        if (resp.shippingDetails)
            this.shippingDetails = new shipping_details_1.ShippingDetails(resp.shippingDetails);
        this.recurring = resp.recurring;
        this.customerIp = resp.customerIp;
        this.dupCheck = resp.dupCheck;
        this.keywords = resp.keywords;
        if (resp.merchantDescriptor)
            this.merchantDescriptor = new merchant_descriptor_1.MerchantDescriptor(resp.merchantDescriptor);
        if (resp.accordD)
            this.accordD = new accord_d_1.AccordD(resp.accordD);
        this.description = resp.description;
        if (resp.masterPass)
            this.masterPass = new master_pass_1.MasterPass(resp.masterPass);
        this.txnTime = resp.txnTime;
        this.currencyCode = resp.currencyCode;
        this.avsResponse = resp.avsResponse;
        this.cvvVerification = resp.cvvVerification;
        if (resp.error)
            this.error = new paysafe_error_1.PaysafeError(resp.error);
        this.status = resp.status;
        this.riskReasonCode = resp.riskReasonCode;
        if (resp.acquirerResponse)
            this.acquirerResponse = new acquirer_response_1.AcquirerResponse(resp.acquirerResponse);
        if (resp.visaAdditionalAuthData)
            this.visaAdditionalAuthData = new visa_additional_auth_data_1.VisaAdditionalAuthData(resp.visaAdditionalAuthData);
        if (resp.links)
            this.links = create_array_1.createArray(resp.links, link_1.Link);
        if (resp.auths)
            this.auths = create_array_1.createArray(resp.auths, Authorization);
        if (resp.settlements)
            this.settlements = create_array_1.createArray(resp.settlements, settlement_1.Settlement);
    }
    setSettlements(settlements) { this.settlements = settlements; }
    getSettlements() { return this.settlements; }
    setAuths(auths) { this.auths = auths; }
    getAuths() { return this.auths; }
    setLinks(links) { this.links = links; }
    getLinks() { return this.links; }
    setShippingDetails(shippingDetails) { this.shippingDetails = shippingDetails; }
    getShippingDetails() { return this.shippingDetails; }
    setVisaAdditionalAuthData(visaAdditionalAuthData) { this.visaAdditionalAuthData = visaAdditionalAuthData; }
    getVisaAdditionalAuthData() { return this.visaAdditionalAuthData; }
    setAcquirerResponse(acquirerResponse) { this.acquirerResponse = acquirerResponse; }
    getAcquirerResponse() { return this.acquirerResponse; }
    setRiskReasonCode(riskReasonCode) { this.riskReasonCode = riskReasonCode; }
    getRiskReasonCode() { return this.riskReasonCode; }
    setError(error) { this.error = error; }
    getError() { return this.error; }
    setCvvVerification(cvvVerification) { this.cvvVerification = cvvVerification; }
    getCvvVerification() { return this.cvvVerification; }
    setAvsResponse(avsResponse) { this.avsResponse = avsResponse; }
    getAvsResponse() { return this.avsResponse; }
    setCurrencyCode(currencyCode) { this.currencyCode = currencyCode; }
    getCurrencyCode() { return this.currencyCode; }
    setTxnTime(txnTime) { this.txnTime = txnTime; }
    getTxnTime() { return this.txnTime; }
    setMasterPass(masterPass) { this.masterPass = masterPass; }
    getMasterPass() { return this.masterPass; }
    setDescription(description) { this.description = description; }
    getDescription() { return this.description; }
    setAccordD(accordD) { this.accordD = accordD; }
    getAccordD() { return this.accordD; }
    setMerchantDescriptor(merchantDescriptor) { this.merchantDescriptor = merchantDescriptor; }
    getMerchantDescriptor() { return this.merchantDescriptor; }
    setCard(card) { this.card = card; }
    getCard() { return this.card; }
    setKeywords(keywords) { this.keywords = keywords; }
    getKeywords() { return this.keywords; }
    setDupCheck(dupCheck) { this.dupCheck = dupCheck; }
    getDupCheck() { return this.dupCheck; }
    setRecurring(recurring) { this.recurring = recurring; }
    getRecurring() { return this.recurring; }
    setBillingDetails(billingDetails) { this.billingDetails = billingDetails; }
    getBillingDetails() { return this.billingDetails; }
    setProfile(profile) { this.profile = profile; }
    getProfile() { return this.profile; }
    setAuthCode(authCode) { this.authCode = authCode; }
    getAuthCode() { return this.authCode; }
    setCustomerIp(customerIp) { this.customerIp = customerIp; }
    getCustomerIp() { return this.customerIp; }
    setAuthentication(authentication) { this.authentication = authentication; }
    getAuthentication() { return this.authentication; }
    setChildAccountNum(childAccountNum) { this.childAccountNum = childAccountNum; }
    getChildAccountNum() { return this.childAccountNum; }
    setAvailableToSettle(availableToSettle) { this.availableToSettle = availableToSettle; }
    getAvailableToSettle() { return this.availableToSettle; }
    setSettleWithAuth(settleWithAuth) { this.settleWithAuth = settleWithAuth; }
    getSettleWithAuth() { return this.settleWithAuth; }
    setAmount(amount) { this.amount = amount; }
    getAmount() { return this.amount; }
    setMerchantRefNum(merchantRefNum) { this.merchantRefNum = merchantRefNum; }
    getMerchantRefNum() { return this.merchantRefNum; }
    setStatus(status) { this.status = status; }
    getStatus() { return this.status; }
    setId(id) { this.id = id; }
    getId() { return this.id; }
}
exports.Authorization = Authorization;
