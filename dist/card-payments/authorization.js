"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_array_1 = require("../common/create-array");
const splitpay_request_1 = require("./splitpay-request");
const settlement_1 = require("./settlement");
const accord_d_1 = require("./lib/accord-d");
const authentication_1 = require("./lib/authentication");
const billing_details_1 = require("./lib/billing-details");
const card_1 = require("./lib/card");
const level2level3_1 = require("./lib/level2level3");
// import { MasterPass } from './lib/master-pass';
const merchant_descriptor_1 = require("./lib/merchant-descriptor");
const profile_1 = require("./lib/profile");
const recipient_1 = require("./lib/recipient");
const shipping_details_1 = require("./lib/shipping-details");
class Authorization extends splitpay_request_1.SplitpayRequest {
    constructor(resp) {
        super(resp);
        if (!resp) {
            return;
        }
        if (typeof resp.card !== 'undefined') {
            this.card = new card_1.Card(resp.card);
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
        if (typeof resp.settlements !== 'undefined') {
            this.settlements = create_array_1.createArray(resp.settlements, settlement_1.Settlement);
        }
    }
    setCard(card) { this.card = card; }
    getCard() { return this.card; }
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
    getAvailableToSettle() { return this.availableToSettle; }
    getAuthCode() { return this.authCode; }
    setCurrencyCode(currencyCode) { this.currencyCode = currencyCode; }
    getCurrencyCode() { return this.currencyCode; }
    getAvsResponse() { return this.avsResponse; }
    getCvvVerification() { return this.cvvVerification; }
    setStatus(status) { this.status = status; }
    getStatus() { return this.status; }
    setSettlements(settlements) { this.settlements = settlements; }
    getSettlements() { return this.settlements; }
}
exports.Authorization = Authorization;
