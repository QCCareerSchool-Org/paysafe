"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = void 0;
const card_expiry_1 = require("../../common/card-expiry");
class Card {
    constructor(resp) {
        if (!resp) {
            return;
        }
        if (typeof resp.paymentToken !== 'undefined') {
            this.paymentToken = resp.paymentToken;
        }
        if (typeof resp.singleUseToken !== 'undefined') {
            this.singleUseToken = resp.singleUseToken;
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
    }
    setPaymentToken(paymentToken) { this.paymentToken = paymentToken; }
    getPaymentToken() { return this.paymentToken; }
    setSingleUseToken(singleUseToken) { this.singleUseToken = singleUseToken; }
    getSingleUseToken() { return this.singleUseToken; }
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
}
exports.Card = Card;
