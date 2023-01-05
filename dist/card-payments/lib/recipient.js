"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Recipient = void 0;
const date_of_birth_1 = require("../../common/date-of-birth");
const ZIP_MAX_LENGTH = 10;
const LAST_NAME_MAX_LENGTH = 255;
const ACCOUNT_NUMBER_MAX_LENGTH = 25;
class Recipient {
    constructor(resp) {
        if (!resp) {
            return;
        }
        if (typeof resp.dateOfBirth !== 'undefined') {
            this.dateOfBirth = new date_of_birth_1.DateOfBirth(resp.dateOfBirth);
        }
        if (typeof resp.zip !== 'undefined') {
            this.zip = resp.zip;
        }
        if (typeof resp.lastName !== 'undefined') {
            this.lastName = resp.lastName;
        }
        if (typeof resp.accountNumber !== 'undefined') {
            this.accountNumber = resp.accountNumber;
        }
    }
    setDateOfBirth(dateOfBirth) { this.dateOfBirth = dateOfBirth; }
    getDateOfBirth() { return this.dateOfBirth; }
    setZip(zip) {
        if (zip.length > ZIP_MAX_LENGTH) {
            throw new Error('invalid zip');
        }
        this.zip = zip;
    }
    getZip() { return this.zip; }
    setLastName(lastName) {
        if (lastName.length > LAST_NAME_MAX_LENGTH) {
            throw new Error('invalid lastName');
        }
        this.lastName = lastName;
    }
    getLastName() { return this.lastName; }
    setAccountNumber(accountNumber) {
        if (accountNumber.length > ACCOUNT_NUMBER_MAX_LENGTH) {
            throw new Error('invalid accountNumber');
        }
        this.accountNumber = accountNumber;
    }
    getAccountNumber() { return this.accountNumber; }
}
exports.Recipient = Recipient;
