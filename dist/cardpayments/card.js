"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const paysafe_error_1 = require("../paysafe-error");
const create_array_1 = require("../common/create-array");
const billing_details_1 = require("./billing-details");
const card_expiry_1 = require("./card-expiry");
class Card {
    constructor(resp) {
        if (!resp)
            return;
        this.id = resp.id;
        this.singleUseToken = resp.singleUseToken;
        this.brand = resp.brand;
        this.nickName = resp.nickName;
        this.merchantRefNum = resp.merchantRefNum;
        this.holderName = resp.holderName;
        this.cardType = resp.cardType;
        this.billingAddressId = resp.billingAddressId;
        if (resp.billingDetails) {
            if (resp.billingDetails instanceof Array)
                this.billingDetails = create_array_1.createArray(resp.billingDetails, billing_details_1.BillingDetails);
            else
                this.billingDetails = new billing_details_1.BillingDetails(resp.billingDetails);
        }
        this.defaultCardIndicator = resp.defaultCardIndicator;
        this.paymentToken = resp.paymentToken;
        this.cardNum = resp.cardNum;
        this.type = resp.type;
        this.lastDigits = resp.lastDigits;
        if (resp.cardExpiry)
            this.cardExpiry = new card_expiry_1.CardExpiry(resp.cardExpiry);
        this.cvv = resp.cvv;
        this.track1 = resp.track1;
        this.track2 = resp.track2;
        this.profile = resp.profile;
        if (resp.error)
            this.error = new paysafe_error_1.PaysafeError(resp.error);
        this.status = resp.status;
    }
    setSingleUseToken(singleUseToken) { this.singleUseToken = singleUseToken; }
    getSingleUseToken() { return this.singleUseToken; }
    setBrand(brand) { this.brand = brand; }
    getBrand() { return this.brand; }
    setStatus(status) { this.status = status; }
    getStatus() { return this.status; }
    setError(error) { this.error = error; }
    getError() { return this.error; }
    setProfile(profile) { this.profile = profile; }
    getProfile() { return this.profile; }
    setDefaultCardIndicator(defaultCardIndicator) { this.defaultCardIndicator = defaultCardIndicator; }
    getDefaultCardIndicator() { return this.defaultCardIndicator; }
    setBillingAddressId(billingAddressId) { this.billingAddressId = billingAddressId; }
    getBillingAddressId() { return this.billingAddressId; }
    setBillingDetails(billingDetails) { this.billingDetails = billingDetails; }
    ;
    getBillingDetails() { return this.billingDetails; }
    setCardType(cardType) { this.cardType = cardType; }
    getCardType() { return this.cardType; }
    setNickName(nickName) { this.nickName = nickName; }
    getNickName() { return this.nickName; }
    setMerchantRefNum(merchantRefNum) { this.merchantRefNum = merchantRefNum; }
    getMerchantRefNum() { return this.merchantRefNum; }
    setHolderName(holderName) { this.holderName = holderName; }
    getHolderName() { return this.holderName; }
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
    setId(id) { this.id = id; }
    getId() { return this.id; }
}
exports.Card = Card;
