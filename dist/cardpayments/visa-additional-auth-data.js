"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const recipient_date_of_birth_1 = require("./recipient-date-of-birth");
class VisaAdditionalAuthData {
    constructor(resp) {
        if (!resp)
            return;
        if (resp.recipientDateOfBirth)
            this.recipientDateOfBirth = new recipient_date_of_birth_1.RecipientDateOfBirth(resp.recipientDateOfBirth);
        this.recipientZip = resp.recipientZip;
        this.recipientLastName = resp.recipientLastName;
        this.recipientAccountNumber = resp.recipientAccountNumber;
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
