"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_array_1 = require("../common/create-array");
const link_1 = require("../common/link");
const request_object_1 = require("../request-object");
const settlement_1 = require("./settlement");
const accord_d_1 = require("./lib/accord-d");
const acquirer_response_1 = require("./lib/acquirer-response");
const authentication_1 = require("./lib/authentication");
const billing_details_1 = require("./lib/billing-details");
const card_1 = require("./lib/card");
const level2level3_1 = require("./lib/level2level3");
// import { MasterPass } from './lib/master-pass';
const merchant_descriptor_1 = require("./lib/merchant-descriptor");
const profile_1 = require("./lib/profile");
const recipient_1 = require("./lib/recipient");
const shipping_details_1 = require("./lib/shipping-details");
const splitpay_1 = require("./lib/splitpay");
const MERCHANT_REF_NUM_MAX_LENGTH = 255;
class Authorization extends request_object_1.RequestObject {
    //  private childAccountNum?: string;
    //  private masterPass?: MasterPass;
    //  private visaAdditionalAuthData?: VisaAdditionalAuthData;
    //  private auths?: Authorization[];
    constructor(resp) {
        super(resp);
        if (!resp) {
            return;
        }
        if (typeof resp.card !== 'undefined') {
            this.card = new card_1.Card(resp.card);
        }
        if (typeof resp.merchantRefNum !== 'undefined') {
            this.merchantRefNum = resp.merchantRefNum;
        }
        if (typeof resp.amount !== 'undefined') {
            this.amount = resp.amount;
        }
        if (typeof resp.authentication !== 'undefined') {
            this.authentication = new authentication_1.Authentication(resp.authentication);
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
            this.keywords = resp.keywords.slice(0);
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
        if (typeof resp.recipient !== 'undefined') {
            this.recipient = new recipient_1.Recipient(resp.recipient);
        }
        if (typeof resp.level2level3 !== 'undefined') {
            this.level2level3 = new level2level3_1.Level2level3(resp.level2level3);
        }
        if (typeof resp.settleWithAuth !== 'undefined') {
            this.settleWithAuth = resp.settleWithAuth;
        }
        if (typeof resp.availableToSettle !== 'undefined') {
            this.availableToSettle = resp.availableToSettle;
        }
        if (typeof resp.authCode !== 'undefined') {
            this.authCode = resp.authCode;
        }
        if (typeof resp.txnTime !== 'undefined') {
            this.txnTime = new Date(resp.txnTime);
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
            this.riskReasonCode = resp.riskReasonCode.slice(0);
        }
        if (typeof resp.acquirerResponse !== 'undefined') {
            this.acquirerResponse = new acquirer_response_1.AcquirerResponse(resp.acquirerResponse);
        }
        if (typeof resp.splitpay !== 'undefined') {
            this.splitpay = new splitpay_1.Splitpay(resp.splitpay);
        }
        if (typeof resp.links !== 'undefined') {
            this.links = create_array_1.createArray(resp.links, link_1.Link);
        }
        if (typeof resp.settlements !== 'undefined') {
            this.settlements = create_array_1.createArray(resp.settlements, settlement_1.Settlement);
        }
        /*
        if (typeof resp.childAccountNum !== 'undefined') {
          this.childAccountNum = resp.childAccountNum;
        }
        if (typeof resp.masterPass !== 'undefined') {
          this.masterPass = new MasterPass(resp.masterPass);
        }
        if (typeof resp.visaAdditionalAuthData !== 'undefined') {
          this.visaAdditionalAuthData = new VisaAdditionalAuthData(resp.visaAdditionalAuthData);
        }
        if (typeof resp.auths !== 'undefined') {
          this.auths = createArray(resp.auths, Authorization);
        }
        */
    }
    setCard(card) { this.card = card; }
    getCard() { return this.card; }
    setMerchantRefNum(merchantRefNum) {
        if (merchantRefNum.length > MERCHANT_REF_NUM_MAX_LENGTH) {
            throw new Error('invalid merchantRefNum');
        }
        this.merchantRefNum = merchantRefNum;
    }
    getMerchantRefNum() { return this.merchantRefNum; }
    setAmount(amount) { this.amount = amount; }
    getAmount() { return this.amount; }
    setAuthentication(authentication) { this.authentication = authentication; }
    getAuthentication() { return this.authentication; }
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
    setRecipient(recipient) { this.recipient = recipient; }
    getRecipient() { return this.recipient; }
    setLevel2level3(level2level3) { this.level2level3 = level2level3; }
    getLevel2level3() { return this.level2level3; }
    setSettleWithAuth(settleWithAuth) { this.settleWithAuth = settleWithAuth; }
    getSettleWithAuth() { return this.settleWithAuth; }
    setAvailableToSettle(availableToSettle) { this.availableToSettle = availableToSettle; }
    getAvailableToSettle() { return this.availableToSettle; }
    setAuthCode(authCode) { this.authCode = authCode; }
    getAuthCode() { return this.authCode; }
    setTxnTime(txnTime) { this.txnTime = new Date(txnTime); }
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
    setSplitpay(splitpay) { this.splitpay = splitpay; }
    getSplitpay() { return this.splitpay; }
    setLinks(links) { this.links = links; }
    getLinks() { return this.links; }
    setSettlements(settlements) { this.settlements = settlements; }
    getSettlements() { return this.settlements; }
}
exports.Authorization = Authorization;
