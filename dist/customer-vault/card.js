"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = void 0;
const request_1 = require("./request");
const card_expiry_1 = require("../common/card-expiry");
const billing_address_1 = require("./lib/billing-address");
class Card extends request_1.Request {
    constructor(resp) {
        super(resp);
        if (!resp) {
            return;
        }
        if (typeof resp.nickName !== 'undefined') {
            this.nickName = resp.nickName;
        }
        if (typeof resp.merchantRefNum !== 'undefined') {
            this.merchantRefNum = resp.merchantRefNum;
        }
        if (typeof resp.holderName !== 'undefined') {
            this.holderName = resp.holderName;
        }
        if (typeof resp.cardNum !== 'undefined') {
            this.cardNum = resp.cardNum;
        }
        if (typeof resp.cardBin !== 'undefined') {
            this.cardBin = resp.cardBin;
        }
        if (typeof resp.lastDigits !== 'undefined') {
            this.lastDigits = resp.lastDigits;
        }
        if (typeof resp.cardExpiry !== 'undefined') {
            this.cardExpiry = new card_expiry_1.CardExpiry(resp.cardExpiry);
        }
        if (typeof resp.cardType !== 'undefined') {
            this.cardType = resp.cardType;
        }
        if (typeof resp.billingAddress !== 'undefined') {
            this.billingAddress = new billing_address_1.BillingAddress(resp.billingAddress);
        }
        if (typeof resp.billingAddressId !== 'undefined') {
            this.billingAddressId = resp.billingAddressId;
        }
        if (typeof resp.defaultCardIndicator !== 'undefined') {
            this.defaultCardIndicator = resp.defaultCardIndicator;
        }
        if (typeof resp.paymentToken !== 'undefined') {
            this.paymentToken = resp.paymentToken;
        }
        if (typeof resp.singleUseToken !== 'undefined') {
            this.singleUseToken = resp.singleUseToken;
        }
        if (typeof resp.status !== 'undefined') {
            this.status = resp.status;
        }
    }
    setNickName(nickName) { this.nickName = nickName; }
    getNickName() { return this.nickName; }
    setMerchantRefNum(merchantRefNum) { this.merchantRefNum = merchantRefNum; }
    getMerchantRefNum() { return this.merchantRefNum; }
    setHolderName(holderName) { this.holderName = holderName; }
    getHolderName() { return this.holderName; }
    setCardNum(cardNum) { this.cardNum = cardNum; }
    getCardNum() { return this.cardNum; }
    getCardBin() { return this.cardBin; }
    getLastDigits() { return this.lastDigits; }
    setCardExpiry(cardExpiry) { this.cardExpiry = cardExpiry; }
    getCardExpiry() { return this.cardExpiry; }
    getCardType() { return this.cardType; }
    setBillingAddress(billingAddress) { this.billingAddress = billingAddress; }
    getBillingAddress() { return this.billingAddress; }
    setBillingAddressId(billingAddressId) { this.billingAddressId = billingAddressId; }
    getBillingAddressId() { return this.billingAddressId; }
    setDefaultCardIndicator(defaultCardIndicator) { this.defaultCardIndicator = defaultCardIndicator; }
    getDefaultCardIndicator() { return this.defaultCardIndicator; }
    setPaymentToken(paymentToken) { this.paymentToken = paymentToken; }
    getPaymentToken() { return this.paymentToken; }
    setSingleUseToken(singleUseToken) { this.singleUseToken = singleUseToken; }
    getSingleUseToken() { return this.singleUseToken; }
    getStatus() { return this.status; }
}
exports.Card = Card;
