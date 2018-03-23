"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const recipient_date_of_birth_1 = require("./recipient-date-of-birth");
class VisaAdditionalAuthData {
    constructor(resp) {
        if (!resp) {
            return;
        }
        if (typeof resp.recipientDateOfBirth !== 'undefined') {
            this.recipientDateOfBirth = new recipient_date_of_birth_1.RecipientDateOfBirth(resp.recipientDateOfBirth);
        }
        if (typeof resp.recipientZip !== 'undefined') {
            this.recipientZip = resp.recipientZip;
        }
        if (typeof resp.recipientLastName !== 'undefined') {
            this.recipientLastName = resp.recipientLastName;
        }
        if (typeof resp.recipientAccountNumber !== 'undefined') {
            this.recipientAccountNumber = resp.recipientAccountNumber;
        }
    }
    setrecipientDateOfBirth(recipientDateOfBirth) { this.recipientDateOfBirth = recipientDateOfBirth; }
    getrecipientDateOfBirth() { return this.recipientDateOfBirth; }
    setrecipientZip(recipientZip) { this.recipientZip = recipientZip; }
    getrecipientZip() { return this.recipientZip; }
    setrecipientLastName(recipientLastName) { this.recipientLastName = recipientLastName; }
    getrecipientLastName() { return this.recipientLastName; }
    setrecipientAccountNumber(recipientAccountNumber) { this.recipientAccountNumber = recipientAccountNumber; }
    getrecipientAccountNumber() { return this.recipientAccountNumber; }
}
exports.VisaAdditionalAuthData = VisaAdditionalAuthData;
