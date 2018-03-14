"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request_object_1 = require("../request-object");
const create_array_1 = require("../common/create-array");
const billing_details_1 = require("./billing-details");
const card_expiry_1 = require("./card-expiry");
const profile_1 = require("../customervault/profile");
class Card extends request_object_1.RequestObject {
    constructor(resp) {
        super(resp);
        if (!resp)
            return;
        this.singleUseToken = resp.singleUseToken;
        this.brand = resp.brand;
        this.nickName = resp.nickName;
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
        this.status = resp.status;
        if (this.profile)
            this.profile = new profile_1.Profile(resp.profile);
    }
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
    ;
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
}
exports.Card = Card;
