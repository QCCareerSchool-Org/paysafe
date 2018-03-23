"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_array_1 = require("../common/create-array");
const profile_1 = require("../customervault/profile");
const request_object_1 = require("../request-object");
const billing_details_1 = require("./billing-details");
const card_expiry_1 = require("./card-expiry");
class Card extends request_object_1.RequestObject {
    constructor(resp) {
        super(resp);
        if (!resp) {
            return;
        }
        if (typeof resp.merchantRefNum !== 'undefined') {
            this.merchantRefNum = resp.merchantRefNum;
        }
        if (typeof resp.singleUseToken !== 'undefined') {
            this.singleUseToken = resp.singleUseToken;
        }
        if (typeof resp.brand !== 'undefined') {
            this.brand = resp.brand;
        }
        if (typeof resp.nickName !== 'undefined') {
            this.nickName = resp.nickName;
        }
        if (typeof resp.holderName !== 'undefined') {
            this.holderName = resp.holderName;
        }
        if (typeof resp.cardType !== 'undefined') {
            this.cardType = resp.cardType;
        }
        if (typeof resp.billingAddressId !== 'undefined') {
            this.billingAddressId = resp.billingAddressId;
        }
        if (typeof resp.billingDetails !== 'undefined') {
            if (Array.isArray(resp.billingDetails)) {
                this.billingDetails = create_array_1.createArray(resp.billingDetails, billing_details_1.BillingDetails);
            }
            else {
                this.billingDetails = new billing_details_1.BillingDetails(resp.billingDetails);
            }
        }
        if (typeof resp.defaultCardIndicator !== 'undefined') {
            this.defaultCardIndicator = resp.defaultCardIndicator;
        }
        if (typeof resp.paymentToken !== 'undefined') {
            this.paymentToken = resp.paymentToken;
        }
        if (typeof resp.cardNum !== 'undefined') {
            this.cardNum = resp.cardNum;
        }
        if (typeof resp.type !== 'undefined') {
            this.type = resp.type;
        }
        if (typeof resp.lastDigits !== 'undefined') {
            this.lastDigits = resp.lastDigits;
        }
        if (typeof resp.cardExpiry !== 'undefined') {
            this.cardExpiry = new card_expiry_1.CardExpiry(resp.cardExpiry);
        }
        if (typeof resp.cvv !== 'undefined') {
            this.cvv = resp.cvv;
        }
        if (typeof resp.track1 !== 'undefined') {
            this.track1 = resp.track1;
        }
        if (typeof resp.track2 !== 'undefined') {
            this.track2 = resp.track2;
        }
        if (typeof resp.status !== 'undefined') {
            this.status = resp.status;
        }
        if (typeof this.profile !== 'undefined') {
            this.profile = new profile_1.Profile(resp.profile);
        }
    }
    setMerchantRefNum(merchantRefNum) { this.merchantRefNum = merchantRefNum; }
    getMerchantRefNum() { return this.merchantRefNum; }
    setSingleUseToken(singleUseToken) { this.singleUseToken = singleUseToken; }
    getSingleUseToken() { return this.singleUseToken; }
    setBrand(brand) { this.brand = brand; }
    getBrand() { return this.brand; }
    setNickName(nickName) { this.nickName = nickName; }
    getNickName() { return this.nickName; }
    setHolderName(holderName) { this.holderName = holderName; }
    getHolderName() { return this.holderName; }
    setCardType(cardType) { this.cardType = cardType; }
    getCardType() { return this.cardType; }
    setBillingAddressId(billingAddressId) { this.billingAddressId = billingAddressId; }
    getBillingAddressId() { return this.billingAddressId; }
    setBillingDetails(billingDetails) { this.billingDetails = billingDetails; }
    getBillingDetails() { return this.billingDetails; }
    setDefaultCardIndicator(defaultCardIndicator) { this.defaultCardIndicator = defaultCardIndicator; }
    getDefaultCardIndicator() { return this.defaultCardIndicator; }
    setPaymentToken(paymentToken) { this.paymentToken = paymentToken; }
    getPaymentToken() { return this.paymentToken; }
    setCardNum(cardNum) { this.cardNum = cardNum; }
    getCardNum() { return this.cardNum; }
    setType(type) { this.type = type; }
    getType() { return this.type; }
    setLastDigits(lastDigits) { this.lastDigits = lastDigits; }
    getLastDigits() { return this.lastDigits; }
    setCardExpiry(cardExpiry) { this.cardExpiry = cardExpiry; }
    getCardExpiry() { return this.cardExpiry; }
    setCvv(cvv) { this.cvv = cvv; }
    getCvv() { return this.cvv; }
    setTrack1(track1) { this.track1 = track1; }
    getTrack1() { return this.track1; }
    settrack2(track2) { this.track2 = track2; }
    gettrack2() { return this.track2; }
    setStatus(status) { this.status = status; }
    getStatus() { return this.status; }
    setProfile(profile) { this.profile = profile; }
    getProfile() { return this.profile; }
    deleteProfile() { delete this.profile; }
}
exports.Card = Card;
