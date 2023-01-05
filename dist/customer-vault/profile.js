"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profile = void 0;
const create_array_1 = require("../common/create-array");
const date_of_birth_1 = require("../common/date-of-birth");
const request_1 = require("./request");
const address_1 = require("./address");
const card_1 = require("./card");
const ach_bank_account_1 = require("./ach-bank-account");
const bacs_bank_account_1 = require("./bacs-bank-account");
const eft_bank_account_1 = require("./eft-bank-account");
const sepa_bank_account_1 = require("./sepa-bank-account");
const STATUSES = ['INITIAL', 'ACTIVE'];
const MERCHANT_CUSTOMER_ID_MAX_LENGTH = 100;
const LOCALES = ['en_US', 'fr_CA', 'en_GB'];
const FIRST_NAME_MAX_LENGTH = 80;
const MIDDLE_NAME_MAX_LENGTH = 80;
const LAST_NAME_MAX_LENGTH = 80;
const IP_MAX_LENGTH = 46;
const GENDERS = ['M', 'F'];
const NATIONALITY_MAX_LENGTH = 30;
const EMAIL_MAX_LENGTH = 255;
const PHONE_MAX_LENGTH = 40;
const CELL_PHONE_MAX_LENGTH = 40;
const PAYMENT_TOKEN_MAX_LENGTH = 50;
class Profile extends request_1.Request {
    constructor(resp) {
        super(resp);
        if (!resp) {
            return;
        }
        if (typeof resp.status !== 'undefined') {
            this.status = resp.status;
        }
        if (typeof resp.merchantCustomerId !== 'undefined') {
            this.merchantCustomerId = resp.merchantCustomerId;
        }
        if (typeof resp.locale !== 'undefined') {
            this.locale = resp.locale;
        }
        if (typeof resp.firstName !== 'undefined') {
            this.firstName = resp.firstName;
        }
        if (typeof resp.middleName !== 'undefined') {
            this.middleName = resp.middleName;
        }
        if (typeof resp.lastName !== 'undefined') {
            this.lastName = resp.lastName;
        }
        if (typeof resp.dateOfBirth !== 'undefined') {
            this.dateOfBirth = new date_of_birth_1.DateOfBirth(resp.dateOfBirth);
        }
        if (typeof resp.ip !== 'undefined') {
            this.ip = resp.ip;
        }
        if (typeof resp.gender !== 'undefined') {
            this.gender = resp.gender;
        }
        if (typeof resp.nationality !== 'undefined') {
            this.nationality = resp.nationality;
        }
        if (typeof resp.email !== 'undefined') {
            this.email = resp.email;
        }
        if (typeof resp.phone !== 'undefined') {
            this.phone = resp.phone;
        }
        if (typeof resp.cellPhone !== 'undefined') {
            this.cellPhone = resp.cellPhone;
        }
        if (typeof resp.paymentToken !== 'undefined') {
            this.paymentToken = resp.paymentToken;
        }
        if (typeof resp.addresses !== 'undefined') {
            this.addresses = (0, create_array_1.createArray)(resp.addresses, address_1.Address);
        }
        if (typeof resp.card !== 'undefined') {
            this.card = new card_1.Card(resp.card);
        }
        if (typeof resp.cards !== 'undefined') {
            if (!Array.isArray(resp.cards)) {
                throw new Error('cards should be an array');
            }
            this.cards = (0, create_array_1.createArray)(resp.cards, card_1.Card);
        }
        if (typeof resp.achBankAccount !== 'undefined') {
            this.achBankAccount = resp.achBankAccount;
        }
        if (typeof resp.achBankAccounts !== 'undefined') {
            if (!Array.isArray(resp.achBankAccounts)) {
                throw new Error('achBankAccounts should be an array');
            }
            this.achBankAccounts = (0, create_array_1.createArray)(resp.achBankAccounts, ach_bank_account_1.ACHBankAccount);
        }
        if (typeof resp.eftBankAccount !== 'undefined') {
            this.eftBankAccount = resp.eftBankAccount;
        }
        if (typeof resp.eftBankAccounts !== 'undefined') {
            if (!Array.isArray(resp.eftBankAccounts)) {
                throw new Error('eftBankAccounts should be an array');
            }
            this.eftBankAccounts = (0, create_array_1.createArray)(resp.eftBankAccounts, eft_bank_account_1.EFTBankAccount);
        }
        if (typeof resp.bacsBankAccount !== 'undefined') {
            this.bacsBankAccount = resp.bacsBankAccount;
        }
        if (typeof resp.bacsBankAccounts !== 'undefined') {
            if (!Array.isArray(resp.bacsBankAccounts)) {
                throw new Error('bacsBankAccounts should be an array');
            }
            this.bacsBankAccounts = (0, create_array_1.createArray)(resp.bacsBankAccounts, bacs_bank_account_1.BACSBankAccount);
        }
        if (typeof resp.sepaBankAccount !== 'undefined') {
            this.sepaBankAccount = resp.sepaBankAccount;
        }
        if (typeof resp.sepaBankAccounts !== 'undefined') {
            if (!Array.isArray(resp.sepaBankAccounts)) {
                throw new Error('sepaBankAccounts should be an array');
            }
            this.sepaBankAccounts = (0, create_array_1.createArray)(resp.sepaBankAccounts, sepa_bank_account_1.SEPABankAccount);
        }
    }
    setStatus(status) {
        if (STATUSES.indexOf(status) === -1) {
            throw new Error('invalid status');
        }
        this.status = status;
    }
    getStatus() { return this.status; }
    setMerchantCustomerId(merchantCustomerId) {
        if (merchantCustomerId.length > MERCHANT_CUSTOMER_ID_MAX_LENGTH) {
            throw new Error('invalid merchantCustomerId');
        }
        this.merchantCustomerId = merchantCustomerId;
    }
    getMerchantCustomerId() { return this.merchantCustomerId; }
    setLocale(locale) {
        if (LOCALES.indexOf(locale) === -1) {
            throw new Error('invalid locale');
        }
        this.locale = locale;
    }
    getLocale() { return this.locale; }
    setFirstName(firstName) {
        if (firstName.length > FIRST_NAME_MAX_LENGTH) {
            throw new Error('invalid firstName');
        }
        this.firstName = firstName;
    }
    getFirstName() { return this.firstName; }
    setMiddleName(middleName) {
        if (middleName.length > MIDDLE_NAME_MAX_LENGTH) {
            throw new Error('invalid middleName');
        }
        this.middleName = middleName;
    }
    getMiddleName() { return this.middleName; }
    setLastName(lastName) {
        if (lastName.length > LAST_NAME_MAX_LENGTH) {
            throw new Error('invalid lastName');
        }
        this.lastName = lastName;
    }
    getLastName() { return this.lastName; }
    setDateOfBirth(dateOfBirth) {
        if (!(dateOfBirth instanceof date_of_birth_1.DateOfBirth)) {
            throw new Error('invalid dateOfBirth');
        }
        this.dateOfBirth = dateOfBirth;
    }
    getDateOfBirth() { return this.dateOfBirth; }
    setIp(ip) {
        if (ip.length > IP_MAX_LENGTH) {
            throw new Error('invalid ip');
        }
        this.ip = ip;
    }
    getIp() { return this.ip; }
    setGender(gender) {
        if (GENDERS.indexOf(gender) === -1) {
            throw new Error('invalid gender');
        }
        this.gender = gender;
    }
    getGender() { return this.gender; }
    setNationality(nationality) {
        if (nationality.length > NATIONALITY_MAX_LENGTH) {
            throw new Error('invalid nationality');
        }
        this.nationality = nationality;
    }
    getNationality() { return this.nationality; }
    setEmail(email) {
        if (email.length > EMAIL_MAX_LENGTH) {
            throw new Error('invalid email');
        }
        this.email = email;
    }
    getEmail() { return this.email; }
    setPhone(phone) {
        if (phone.length > PHONE_MAX_LENGTH) {
            throw new Error('invalid phone');
        }
        this.phone = phone;
    }
    getPhone() { return this.phone; }
    setCellPhone(cellPhone) {
        if (cellPhone.length > CELL_PHONE_MAX_LENGTH) {
            throw new Error('invalid cellPhone');
        }
        this.cellPhone = cellPhone;
    }
    getCellPhone() { return this.cellPhone; }
    setPaymentToken(paymentToken) {
        if (paymentToken.length > PAYMENT_TOKEN_MAX_LENGTH) {
            throw new Error('payment token exceeds maximum length');
        }
        this.paymentToken = paymentToken;
    }
    getPaymentToken() { return this.paymentToken; }
    setAddresses(addresses) {
        if (!Array.isArray(addresses)) {
            throw new Error('addresses must be an array');
        }
        for (const a of addresses) {
            if (!(a instanceof address_1.Address)) {
                throw new Error('invalid addresses');
            }
        }
        this.addresses = addresses;
    }
    getAddresses() { return this.addresses; }
    setCard(card) {
        if (!(card instanceof card_1.Card)) {
            throw new Error('invalid card');
        }
        this.card = card;
    }
    getCard() { return this.card; }
    setCards(cards) {
        if (!Array.isArray(cards)) {
            throw new Error('cards must be an array');
        }
        for (const c of cards) {
            if (!(c instanceof card_1.Card)) {
                throw new Error('invalid card');
            }
        }
        this.cards = cards;
    }
    getCards() { return this.cards; }
    setACHBankAccount(achBankAccount) {
        if (!(achBankAccount instanceof ach_bank_account_1.ACHBankAccount)) {
            throw new Error('invalid achBankAccount');
        }
        this.achBankAccount = achBankAccount;
    }
    getACHBankAccount() { return this.achBankAccount; }
    getACHBankAccounts() { return this.achBankAccounts; }
    setBACSBankAccount(bacsBankAccount) {
        if (!(bacsBankAccount instanceof bacs_bank_account_1.BACSBankAccount)) {
            throw new Error('invalid bacsBankAccount');
        }
        this.bacsBankAccount = bacsBankAccount;
    }
    getBACSBankAccount() { return this.bacsBankAccount; }
    getBACSBankAccounts() { return this.bacsBankAccounts; }
    setEFTBankAccount(eftBankAccount) {
        if (!(eftBankAccount instanceof eft_bank_account_1.EFTBankAccount)) {
            throw new Error('invalid eftBankAccount');
        }
        this.eftBankAccount = eftBankAccount;
    }
    getEFTBankAccount() { return this.eftBankAccount; }
    getEFTBankAccounts() { return this.eftBankAccounts; }
    setSEPABankAccount(sepaBankAccount) {
        if (!(sepaBankAccount instanceof sepa_bank_account_1.SEPABankAccount)) {
            throw new Error('invalid sepaBankAccount');
        }
        this.sepaBankAccount = sepaBankAccount;
    }
    getSEPABankAccount() { return this.sepaBankAccount; }
    getSEPABankAccounts() { return this.sepaBankAccounts; }
}
exports.Profile = Profile;
