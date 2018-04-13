"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const Debug = require("debug");
const dotenv = require("dotenv");
require("mocha");
const request = require("request");
const index_1 = require("../index");
const address_1 = require("./address");
const card_1 = require("./card");
const mandate_1 = require("./mandate");
const profile_1 = require("./profile");
const ach_bank_account_1 = require("./ach-bank-account");
const bacs_bank_account_1 = require("./bacs-bank-account");
const card_expiry_1 = require("../common/card-expiry");
const date_of_birth_1 = require("../common/date-of-birth");
const billing_address_1 = require("./lib/billing-address");
dotenv.config();
if (typeof process.env.SINGLE_USE_API_KEY === 'undefined') {
    throw new Error('SINGLE_USE_API_KEY is undefined');
}
const singleUseApiKey = process.env.SINGLE_USE_API_KEY;
if (typeof process.env.SINGLE_USE_API_PASSWORD === 'undefined') {
    throw new Error('SINGLE_USE_API_PASSWORD is undefined');
}
const singleUseApiPassword = process.env.SINGLE_USE_API_PASSWORD;
if (typeof process.env.API_KEY === 'undefined') {
    throw new Error('API_KEY is undefined');
}
const apiKey = process.env.API_KEY;
if (typeof process.env.API_PASSWORD === 'undefined') {
    throw new Error('API_PASSWORD is undefined');
}
const apiPassword = process.env.API_PASSWORD;
if (typeof process.env.ACCOUNT_NUMBER === 'undefined') {
    throw new Error('ACCOUNT_NUMBER is undefined');
}
const paysafeAccountNumber = process.env.ACCOUNT_NUMBER;
const debug = Debug('paysafe-testing-customer-vault');
const paysafe = new index_1.Paysafe(apiKey, apiPassword, 'TEST', paysafeAccountNumber);
const rand = Math.random();
// tslint:disable-next-line:no-magic-numbers
const creditCardNumber = rand < 0.333 ? '4510150000000321' : rand < 0.667 ? '4500030000000004' : '4003440000000007';
const expiryMonth = 12;
const expiryYear = new Date().getFullYear() + 1;
const timeout = 80000; // 80 seconds
/* tslint:disable:no-magic-numbers */
describe('Customer Vault API', () => {
    it('should be up and running', (done) => {
        paysafe.getCustomerServiceHandler().monitor().then((result) => {
            chai_1.expect(result).to.have.property('status').that.equals('READY');
            done();
        }).catch((err) => done(Error(JSON.stringify(err))));
    }).timeout(timeout);
    describe('Creating Profiles', () => {
        it('should create a profile', (done) => {
            const merchantCustomerId = randomStr();
            const randLocale = Math.random();
            const locale = randLocale < 0.333 ? 'en_US' : randLocale < 0.666 ? 'fr_CA' : 'en_GB';
            const firstName = randomStr();
            const lastName = randomStr();
            const gender = Math.random() < 0.5 ? 'M' : 'F';
            const emailAddress = randomEmail();
            const phoneNumber = randomStr();
            const nationality = 'Canadian';
            try {
                const profile = new profile_1.Profile();
                profile.setMerchantCustomerId(merchantCustomerId);
                profile.setLocale(locale);
                profile.setFirstName(firstName);
                profile.setLastName(lastName);
                profile.setGender(gender);
                profile.setEmail(emailAddress);
                profile.setPhone(phoneNumber);
                profile.setNationality(nationality);
                paysafe.getCustomerServiceHandler().createProfile(profile).then((profileResult) => {
                    debug(profileResult);
                    chai_1.expect(profileResult.getId()).to.not.be.an('undefined');
                    chai_1.expect(profileResult.getMerchantCustomerId()).to.equal(merchantCustomerId);
                    chai_1.expect(profileResult.getLocale()).to.equal(locale);
                    chai_1.expect(profileResult.getFirstName()).to.equal(firstName);
                    chai_1.expect(profileResult.getLastName()).to.equal(lastName);
                    chai_1.expect(profileResult.getGender()).to.equal(gender);
                    chai_1.expect(profileResult.getEmail()).to.equal(emailAddress);
                    chai_1.expect(profileResult.getPhone()).to.equal(phoneNumber);
                    chai_1.expect(profileResult.getNationality()).to.equal(nationality);
                    done();
                }).catch((err) => done(Error(JSON.stringify(err))));
            }
            catch (err) {
                done(Error(JSON.stringify(err)));
            }
        }).timeout(timeout);
        it('should create a profile with a card', (done) => {
            const merchantCustomerId = randomStr();
            const randLocale = Math.random();
            const locale = randLocale < 0.333 ? 'en_US' : randLocale < 0.666 ? 'fr_CA' : 'en_GB';
            const firstName = randomStr();
            const lastName = randomStr();
            const gender = Math.random() < 0.5 ? 'M' : 'F';
            const emailAddress = randomEmail();
            const phoneNumber = randomStr();
            const nationality = 'Canadian';
            try {
                const cardExpiry = new card_expiry_1.CardExpiry();
                cardExpiry.setYear(expiryYear);
                cardExpiry.setMonth(expiryMonth);
                const card = new card_1.Card();
                card.setCardNum(creditCardNumber);
                card.setCardExpiry(cardExpiry);
                const profile = new profile_1.Profile();
                profile.setMerchantCustomerId(merchantCustomerId);
                profile.setLocale(locale);
                profile.setFirstName(firstName);
                profile.setLastName(lastName);
                profile.setGender(gender);
                profile.setEmail(emailAddress);
                profile.setPhone(phoneNumber);
                profile.setNationality(nationality);
                profile.setCard(card);
                paysafe.getCustomerServiceHandler().createProfile(profile).then((profileResult) => {
                    debug(profileResult);
                    chai_1.expect(profileResult.getId()).to.not.be.an('undefined');
                    chai_1.expect(profileResult.getMerchantCustomerId()).to.equal(merchantCustomerId);
                    chai_1.expect(profileResult.getLocale()).to.equal(locale);
                    chai_1.expect(profileResult.getFirstName()).to.equal(firstName);
                    chai_1.expect(profileResult.getLastName()).to.equal(lastName);
                    chai_1.expect(profileResult.getGender()).to.equal(gender);
                    chai_1.expect(profileResult.getEmail()).to.equal(emailAddress);
                    chai_1.expect(profileResult.getPhone()).to.equal(phoneNumber);
                    chai_1.expect(profileResult.getNationality()).to.equal(nationality);
                    chai_1.expect(profileResult.getCards()).to.not.be.an('undefined');
                    chai_1.expect(profileResult.getCards()).to.be.an('array').of.length(1);
                    const cards = profileResult.getCards();
                    chai_1.expect(cards[0].getId()).to.not.be.an('undefined');
                    chai_1.expect(cards[0].getLastDigits()).to.equal(creditCardNumber.substr(creditCardNumber.length - 4));
                    done();
                }).catch((err) => done(Error(JSON.stringify(err))));
            }
            catch (err) {
                done(Error(JSON.stringify(err)));
            }
        }).timeout(timeout);
        it('should create a profile with a dateOfBirth', (done) => {
            const merchantCustomerId = randomStr();
            const firstName = randomStr();
            const lastName = randomStr();
            const day = Math.floor(Math.random() * 28) + 1;
            const month = Math.floor(Math.random() * 12) + 1;
            const year = Math.floor(Math.random() * 117) + 1900;
            try {
                const profile = new profile_1.Profile();
                profile.setMerchantCustomerId(merchantCustomerId);
                profile.setLocale('en_US');
                profile.setFirstName(firstName);
                profile.setLastName(lastName);
                const dateOfBirth = new date_of_birth_1.DateOfBirth();
                dateOfBirth.setYear(year);
                dateOfBirth.setMonth(month);
                dateOfBirth.setDay(day);
                profile.setDateOfBirth(dateOfBirth);
                paysafe.getCustomerServiceHandler().createProfile(profile).then((profileResult) => {
                    debug(profileResult);
                    chai_1.expect(profileResult.getFirstName()).to.equal(firstName);
                    chai_1.expect(profileResult.getLastName()).to.equal(lastName);
                    chai_1.expect(profileResult.getDateOfBirth()).to.not.be.an('undefined');
                    const dob = profileResult.getDateOfBirth();
                    chai_1.expect(dob).to.not.be.an('undefined');
                    chai_1.expect(dob).to.be.an.instanceof(date_of_birth_1.DateOfBirth);
                    chai_1.expect(dob.getYear()).to.not.be.an('undefined');
                    chai_1.expect(dob.getYear()).to.equal(year);
                    chai_1.expect(dob.getMonth()).to.not.be.an('undefined');
                    chai_1.expect(dob.getMonth()).to.equal(month);
                    chai_1.expect(dob.getDay()).to.not.be.an('undefined');
                    chai_1.expect(dob.getDay()).to.equal(day);
                    done();
                }).catch((err) => done(Error(JSON.stringify(err))));
            }
            catch (err) {
                done(Error(JSON.stringify(err)));
            }
        }).timeout(timeout);
        it('should create a profile with an achBankAccount', (done) => {
            const merchantCustomerId = randomStr();
            const accountNumber = randomInt(0, 999999).toString().padStart(6, '0');
            const routingNumber = '307075259';
            try {
                const billingAddress = new billing_address_1.BillingAddress();
                billingAddress.setStreet('38 McArthur Ave');
                billingAddress.setCity('Ottawa');
                billingAddress.setZip('KIL 6R2');
                billingAddress.setCountry('CA');
                const achBankAccount = new ach_bank_account_1.ACHBankAccount();
                achBankAccount.setNickName('Dave\' Account');
                achBankAccount.setAccountHolderName('Dave Welsh');
                achBankAccount.setAccountNumber(accountNumber);
                achBankAccount.setRoutingNumber(routingNumber);
                achBankAccount.setAccountType('CHECKING');
                achBankAccount.setBillingAddress(billingAddress);
                const profile = new profile_1.Profile();
                profile.setMerchantCustomerId(merchantCustomerId);
                profile.setACHBankAccount(achBankAccount);
                paysafe.getCustomerServiceHandler().createProfile(profile).then((profileResult) => {
                    debug(profileResult);
                    chai_1.expect(profileResult.getId()).to.not.be.an('undefined');
                    chai_1.expect(profileResult.getACHBankAccounts()).to.not.be.an('undefined');
                    chai_1.expect(profileResult.getACHBankAccounts()).to.be.an('array').of.length(1);
                    const achBankAccounts = profileResult.getACHBankAccounts();
                    chai_1.expect(achBankAccounts[0].getId()).to.not.be.an('undefined');
                    chai_1.expect(achBankAccounts[0].getRoutingNumber()).to.equal(routingNumber);
                    chai_1.expect(achBankAccounts[0].getLastDigits()).to.equal(accountNumber.substr(accountNumber.length - 2));
                    done();
                }).catch((err) => done(Error(JSON.stringify(err))));
            }
            catch (err) {
                done(Error(JSON.stringify(err)));
            }
        }).timeout(timeout);
        it('should create a profile with an bacsBankAccount and then add a mandate', (done) => {
            const merchantCustomerId = randomStr();
            const accountNumber = randomInt(0, 999999).toString().padStart(8, '0');
            const sortCode = '086081'; // randomInt(0, 999999).toString().padStart(6, '0');
            try {
                const billingAddress = new billing_address_1.BillingAddress();
                billingAddress.setStreet('38 McArthur Ave');
                billingAddress.setCity('Ottawa');
                billingAddress.setZip('KIL 6R2');
                billingAddress.setCountry('CA');
                const bacsBankAccount = new bacs_bank_account_1.BACSBankAccount();
                bacsBankAccount.setNickName('Dave\' Account');
                bacsBankAccount.setAccountHolderName('Dave Welsh');
                bacsBankAccount.setAccountNumber(accountNumber);
                bacsBankAccount.setSortCode(sortCode);
                bacsBankAccount.setBillingAddress(billingAddress);
                const profile = new profile_1.Profile();
                profile.setMerchantCustomerId(merchantCustomerId);
                profile.setBACSBankAccount(bacsBankAccount);
                debug(profile);
                paysafe.getCustomerServiceHandler().createProfile(profile).then((profileResult) => {
                    debug(profileResult);
                    chai_1.expect(profileResult.getId()).to.not.be.an('undefined');
                    chai_1.expect(profileResult.getBACSBankAccounts()).to.not.be.an('undefined');
                    chai_1.expect(profileResult.getBACSBankAccounts()).to.be.an('array').of.length(1);
                    const bacsBankAccounts = profileResult.getBACSBankAccounts();
                    chai_1.expect(bacsBankAccounts[0].getId()).to.not.be.an('undefined');
                    chai_1.expect(bacsBankAccounts[0].getSortCode()).to.equal(sortCode);
                    chai_1.expect(bacsBankAccounts[0].getAccountNumber()).to.equal(accountNumber);
                    const mandate = new mandate_1.Mandate();
                    mandate.setReference('9387234987');
                    const pId = profileResult.getId();
                    const bankAccountId = profileResult.getBACSBankAccounts()[0].getId();
                    return paysafe.getCustomerServiceHandler().createMandate('BACS', pId, bankAccountId, mandate);
                }).then((updateResult) => {
                    debug(updateResult);
                    done();
                }).catch((err) => done(Error(JSON.stringify(err))));
            }
            catch (err) {
                done(Error(JSON.stringify(err)));
            }
        }).timeout(timeout * 2);
    });
    describe('Manipulating Profiles', () => {
        let profileId;
        beforeEach(function (done) {
            this.timeout(timeout);
            const firstName = randomStr();
            const lastName = randomStr();
            const merchantCustomerId = randomStr();
            try {
                const profile = new profile_1.Profile();
                profile.setFirstName(firstName);
                profile.setLastName(lastName);
                profile.setMerchantCustomerId(merchantCustomerId);
                profile.setLocale('en_US');
                paysafe.getCustomerServiceHandler().createProfile(profile).then((profileResult) => {
                    chai_1.expect(profileResult.getId()).to.not.be.an('undefined');
                    chai_1.expect(profileResult.getFirstName()).to.equal(firstName);
                    chai_1.expect(profileResult.getLastName()).to.equal(lastName);
                    chai_1.expect(profileResult.getMerchantCustomerId()).to.equal(merchantCustomerId);
                    profileId = profileResult.getId();
                    done();
                }).catch((err) => done(Error(JSON.stringify(err))));
            }
            catch (err) {
                done(Error(JSON.stringify(err)));
            }
        });
        it('should get a profile', (done) => {
            try {
                paysafe.getCustomerServiceHandler().getProfile(profileId).then((profileResult) => {
                    debug(profileResult);
                    chai_1.expect(profileResult.getId()).to.equal(profileId);
                    done();
                }).catch((err) => done(Error(JSON.stringify(err))));
            }
            catch (err) {
                done(Error(JSON.stringify(err)));
            }
        }).timeout(timeout);
        it('should update a profile', (done) => {
            const firstName = randomStr();
            const merchantCustomerId = randomStr();
            try {
                const profile = new profile_1.Profile();
                profile.setFirstName(firstName);
                profile.setMerchantCustomerId(merchantCustomerId);
                profile.setLocale('en_US');
                paysafe.getCustomerServiceHandler().updateProfile(profileId, profile).then((profileResult) => {
                    debug(profileResult);
                    chai_1.expect(profileResult.getId()).to.equal(profileId);
                    chai_1.expect(profileResult.getFirstName()).to.equal(firstName);
                    chai_1.expect(profileResult.getLastName()).to.be.an('undefined');
                    chai_1.expect(profileResult.getMerchantCustomerId()).to.equal(merchantCustomerId);
                    done();
                }).catch((err) => done(Error(JSON.stringify(err))));
            }
            catch (err) {
                done(Error(JSON.stringify(err)));
            }
        }).timeout(timeout);
        it('should add a card', (done) => {
            try {
                const cardExpiry = new card_expiry_1.CardExpiry();
                cardExpiry.setYear(expiryYear);
                cardExpiry.setMonth(expiryMonth);
                const card = new card_1.Card();
                card.setCardNum(creditCardNumber);
                card.setCardExpiry(cardExpiry);
                let cardId;
                paysafe.getCustomerServiceHandler().createCard(profileId, card).then((cardResult) => {
                    debug(cardResult);
                    chai_1.expect(cardResult.getLastDigits()).to.not.be.an('undefined');
                    chai_1.expect(cardResult.getLastDigits()).to.equal(creditCardNumber.substr(creditCardNumber.length - 4));
                    const expiry = cardResult.getCardExpiry();
                    chai_1.expect(expiry).to.not.be.an('undefined');
                    chai_1.expect(expiry.getMonth()).to.equal(expiryMonth);
                    chai_1.expect(expiry.getYear()).to.equal(expiryYear);
                    cardId = cardResult.getId();
                    return paysafe.getCustomerServiceHandler().getProfile(profileId, ['cards']);
                }).then((profileResult) => {
                    debug(profileResult);
                    chai_1.expect(profileResult).to.not.be.an('undefined');
                    chai_1.expect(profileResult).to.be.instanceof(profile_1.Profile);
                    chai_1.expect(profileResult.getCards()).to.not.be.an('undefined');
                    chai_1.expect(profileResult.getCards()).to.be.an('array');
                    let found = false;
                    for (const c of profileResult.getCards()) {
                        chai_1.expect(c.getId()).to.not.be.an('undefined');
                        if (c.getId() === cardId) { // this is the card we added
                            found = true;
                            chai_1.expect(c.getLastDigits()).to.equal(creditCardNumber.substr(creditCardNumber.length - 4));
                        }
                    }
                    chai_1.expect(found).to.equal(true);
                    done();
                }).catch((err) => done(Error(JSON.stringify(err))));
            }
            catch (err) {
                done(Error(JSON.stringify(err)));
            }
        }).timeout(timeout * 2);
        it('should add an address', (done) => {
            const nickName = randomStr();
            const recipientName = randomStr();
            const street = randomStr();
            const street2 = randomStr();
            const city = randomStr();
            const state = 'ON';
            const zip = 'K1A 1A1';
            const country = 'CA';
            const phoneNumber = randomStr();
            const defaultShippingIndicator = Math.random() < 0.5;
            try {
                const address = new address_1.Address();
                address.setNickName(nickName);
                address.setRecipientName(recipientName);
                address.setStreet(street);
                address.setStreet2(street2);
                address.setCity(city);
                address.setState(state);
                address.setZip(zip);
                address.setCountry(country);
                address.setPhone(phoneNumber);
                address.setDefaultShippingAddressIndicator(defaultShippingIndicator);
                let addressId;
                paysafe.getCustomerServiceHandler().createAddress(profileId, address).then((addressResult) => {
                    debug(addressResult);
                    chai_1.expect(addressResult).to.not.be.an('undefined');
                    chai_1.expect(addressResult).to.be.instanceof(address_1.Address);
                    chai_1.expect(addressResult.getId()).to.not.be.an('undefined');
                    chai_1.expect(addressResult.getNickName()).to.equal(nickName);
                    chai_1.expect(addressResult.getRecipientName()).to.equal(recipientName);
                    chai_1.expect(addressResult.getStreet()).to.equal(street);
                    chai_1.expect(addressResult.getStreet2()).to.equal(street2);
                    chai_1.expect(addressResult.getCity()).to.equal(city);
                    chai_1.expect(addressResult.getState()).to.equal(state);
                    chai_1.expect(addressResult.getZip()).to.equal(zip);
                    chai_1.expect(addressResult.getCountry()).to.equal(country);
                    chai_1.expect(addressResult.getPhone()).to.equal(phoneNumber);
                    chai_1.expect(addressResult.getDefaultShippingAddressIndicator()).to.equal(defaultShippingIndicator);
                    addressId = addressResult.getId();
                    return paysafe.getCustomerServiceHandler().getProfile(profileId, ['addresses']);
                }).then((profileResult) => {
                    debug(profileResult);
                    chai_1.expect(profileResult).to.not.be.an('undefined');
                    chai_1.expect(profileResult).to.be.instanceof(profile_1.Profile);
                    chai_1.expect(profileResult.getAddresses()).to.not.be.an('undefined');
                    chai_1.expect(profileResult.getAddresses()).to.be.an('array');
                    let found = false;
                    for (const a of profileResult.getAddresses()) {
                        chai_1.expect(a.getId()).to.not.be.an('undefined');
                        if (a.getId() === addressId) { // this is the address we added
                            found = true;
                            chai_1.expect(a.getNickName()).to.equal(nickName);
                            chai_1.expect(a.getRecipientName()).to.equal(recipientName);
                            chai_1.expect(a.getStreet()).to.equal(street);
                            chai_1.expect(a.getStreet2()).to.equal(street2);
                            chai_1.expect(a.getCity()).to.equal(city);
                            chai_1.expect(a.getState()).to.equal(state);
                            chai_1.expect(a.getZip()).to.equal(zip);
                            chai_1.expect(a.getCountry()).to.equal(country);
                            chai_1.expect(a.getPhone()).to.equal(phoneNumber);
                            chai_1.expect(a.getDefaultShippingAddressIndicator()).to.equal(defaultShippingIndicator);
                        }
                    }
                    chai_1.expect(found).to.equal(true);
                    done();
                }).catch((err) => done(Error(JSON.stringify(err))));
            }
            catch (err) {
                done(Error(JSON.stringify(err)));
            }
        }).timeout(timeout * 2);
        it('should add an achBankAccount', (done) => {
            const accountNumber = randomInt(0, 999999).toString().padStart(6, '0');
            const routingNumber = '307075259';
            try {
                const billingAddress = new billing_address_1.BillingAddress();
                billingAddress.setStreet('38 McArthur Ave');
                billingAddress.setCity('Ottawa');
                billingAddress.setZip('KIL 6R2');
                billingAddress.setCountry('CA');
                const achBankAccount = new ach_bank_account_1.ACHBankAccount();
                achBankAccount.setNickName('Dave\' Account');
                achBankAccount.setAccountHolderName('Dave Welsh');
                achBankAccount.setAccountNumber(accountNumber);
                achBankAccount.setRoutingNumber(routingNumber);
                achBankAccount.setAccountType('CHECKING');
                achBankAccount.setBillingAddress(billingAddress);
                paysafe.getCustomerServiceHandler().createACHBankAccount(profileId, achBankAccount).then((achBankAccountResult) => {
                    debug(achBankAccountResult);
                    done();
                }).catch((err) => done(Error(JSON.stringify(err))));
            }
            catch (err) {
                done(Error(JSON.stringify(err)));
            }
        }).timeout(timeout * 2);
    });
    describe('Card Single Use Tokens', () => {
        let singleUseToken;
        beforeEach(function (done) {
            this.timeout(timeout);
            getCardSingleUseToken().then((result) => {
                singleUseToken = result;
                done();
            }).catch((err) => done(Error(JSON.stringify(err))));
        });
        it('should create a profile with a card using a single-use token', (done) => {
            const merchantCustomerId = randomStr();
            const firstName = randomStr();
            const lastName = randomStr();
            try {
                const profile = new profile_1.Profile();
                profile.setMerchantCustomerId(merchantCustomerId);
                profile.setLocale('en_US');
                profile.setFirstName(firstName);
                profile.setLastName(lastName);
                const card = new card_1.Card();
                card.setSingleUseToken(singleUseToken);
                profile.setCard(card);
                paysafe.getCustomerServiceHandler().createProfile(profile).then((profileResult) => {
                    debug(profileResult);
                    chai_1.expect(profileResult.getFirstName()).to.equal(firstName);
                    chai_1.expect(profileResult.getLastName()).to.equal(lastName);
                    chai_1.expect(profileResult.getCards()).to.not.be.an('undefined');
                    const cards = profileResult.getCards();
                    chai_1.expect(cards).to.not.be.an('undefined');
                    chai_1.expect(cards).to.be.an('array').of.length(1);
                    chai_1.expect(cards[0].getLastDigits()).to.not.be.an('undefined');
                    chai_1.expect(cards[0].getLastDigits()).to.equal(creditCardNumber.substr(creditCardNumber.length - 4));
                    const expiry = cards[0].getCardExpiry();
                    chai_1.expect(expiry).to.not.be.an('undefined');
                    chai_1.expect(expiry.getMonth()).to.equal(expiryMonth);
                    chai_1.expect(expiry.getYear()).to.equal(expiryYear);
                    done();
                }).catch((err) => done(Error(JSON.stringify(err))));
            }
            catch (err) {
                done(Error(JSON.stringify(err)));
            }
        }).timeout(timeout);
        it('should create a profile and then add a card using a single-use token', (done) => {
            const merchantCustomerId = randomStr();
            const firstName = randomStr();
            const lastName = randomStr();
            try {
                const profile = new profile_1.Profile();
                profile.setMerchantCustomerId(merchantCustomerId);
                profile.setLocale('en_US');
                profile.setFirstName(firstName);
                profile.setLastName(lastName);
                paysafe.getCustomerServiceHandler().createProfile(profile).then((profileResult) => {
                    debug(profileResult);
                    chai_1.expect(profileResult.getFirstName()).to.equal(firstName);
                    chai_1.expect(profileResult.getLastName()).to.equal(lastName);
                    const card = new card_1.Card();
                    card.setSingleUseToken(singleUseToken);
                    const pId = profileResult.getId();
                    return paysafe.getCustomerServiceHandler().createCard(pId, card);
                }).then((cardResult) => {
                    debug(cardResult);
                    chai_1.expect(cardResult.getLastDigits()).to.not.be.an('undefined');
                    chai_1.expect(cardResult.getLastDigits()).to.equal(creditCardNumber.substr(creditCardNumber.length - 4));
                    const expiry = cardResult.getCardExpiry();
                    chai_1.expect(expiry).to.not.be.an('undefined');
                    chai_1.expect(expiry.getMonth()).to.equal(expiryMonth);
                    chai_1.expect(expiry.getYear()).to.equal(expiryYear);
                    done();
                }).catch((err) => done(Error(JSON.stringify(err))));
            }
            catch (err) {
                done(Error(JSON.stringify(err)));
            }
        }).timeout(timeout * 2);
    });
});
function getCardSingleUseToken() {
    return new Promise((resolve, reject) => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + new Buffer(`${singleUseApiKey}:${singleUseApiPassword}`).toString('Base64'),
        };
        const data = {
            card: {
                cardNum: creditCardNumber,
                cardExpiry: {
                    year: expiryYear,
                    month: expiryMonth,
                },
            },
        };
        const options = {
            uri: 'https://api.test.paysafe.com/customervault/v1/singleusetokens',
            headers,
            method: 'POST',
            json: true,
            body: data,
            timeout,
        };
        debug(options);
        request(options, (err, response, body) => {
            if (err) {
                return reject(err);
            }
            if (typeof body.paymentToken !== 'undefined') {
                resolve(body.paymentToken);
            }
            else {
                reject(new Error('unexpected result'));
            }
        });
    });
}
function randomStr() {
    return Math.random().toString(36).slice(2);
}
function randomEmail() {
    return `${randomStr()}@example.com`;
}
function randomInt(min, max) {
    min = Math.floor(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
