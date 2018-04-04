"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const dotenv = require("dotenv");
require("mocha");
const request = require("request");
const authorization_1 = require("./cardpayments/authorization");
const authorization_reversal_1 = require("./cardpayments/authorization-reversal");
const billing_details_1 = require("./cardpayments/billing-details");
const card_1 = require("./cardpayments/card");
const merchant_descriptor_1 = require("./cardpayments/merchant-descriptor");
const verification_1 = require("./cardpayments/verification");
const address_1 = require("./customervault/address");
const date_of_birth_1 = require("./customervault/date-of-birth");
const profile_1 = require("./customervault/profile");
const paysafe_api_client_1 = require("./paysafe-api-client");
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
const accountNumber = process.env.ACCOUNT_NUMBER;
const paysafeAPIClient = new paysafe_api_client_1.PaysafeAPIClient(apiKey, apiPassword, 'TEST', accountNumber);
const rand = Math.random();
// tslint:disable-next-line:no-magic-numbers
const creditCardNumber = rand < 0.333 ? '4510150000000321' : rand < 0.667 ? '4500030000000004' : '4003440000000007';
const expiryMonth = 12;
const expiryYear = new Date().getFullYear() + 1;
const timeout = 60000; // 60 seconds
/* tslint:disable:no-magic-numbers */
let profileId;
describe('General Paysafe API', () => {
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
        /*
          private nationality?: string;
          private email?: string;
          private phone?: string;
          private cellPhone?: string;
          private paymentToken?: string;
          private addresses?: Address | Address[];
          private card?: Card;
          private cards?: Card[];
      */
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
            const customerServiceHandler = paysafeAPIClient.getCustomerServiceHandler();
            customerServiceHandler.createProfile(profile).then((profileResult) => {
                chai_1.expect(profileResult.getId()).to.not.be.an('undefined');
                chai_1.expect(profileResult.getMerchantCustomerId()).to.equal(merchantCustomerId);
                chai_1.expect(profileResult.getLocale()).to.equal(locale);
                chai_1.expect(profileResult.getFirstName()).to.equal(firstName);
                chai_1.expect(profileResult.getLastName()).to.equal(lastName);
                chai_1.expect(profileResult.getGender()).to.equal(gender);
                chai_1.expect(profileResult.getEmail()).to.equal(emailAddress);
                chai_1.expect(profileResult.getPhone()).to.equal(phoneNumber);
                chai_1.expect(profileResult.getNationality()).to.equal(nationality);
                profileId = profileResult.getId(); // for future tests
                done();
            }).catch((err) => done(new Error(JSON.stringify(err))));
        }
        catch (err) {
            done(err);
        }
    }).timeout(timeout);
    it('should get a profile', (done) => {
        try {
            const profile = new profile_1.Profile();
            profile.setId(profileId);
            const customerServiceHandler = paysafeAPIClient.getCustomerServiceHandler();
            customerServiceHandler.getProfile(profile).then((profileResult) => {
                done();
            }).catch((err) => done(new Error(JSON.stringify(err))));
        }
        catch (err) {
            done(err);
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
            const customerServiceHandler = paysafeAPIClient.getCustomerServiceHandler();
            customerServiceHandler.createProfile(profile).then((profileResult) => {
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
            }).catch((err) => done(new Error(JSON.stringify(err))));
        }
        catch (err) {
            done(err);
        }
    }).timeout(timeout);
    it('should add an address to an existing profile', (done) => {
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
            const profile = new profile_1.Profile();
            profile.setId(profileId);
            address.setProfile(profile);
            let addressId;
            const customerServiceHandler = paysafeAPIClient.getCustomerServiceHandler();
            customerServiceHandler.createAddress(address).then((addressResult) => {
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
                return customerServiceHandler.getProfile(profile, ['addresses']);
            }).then((profileResult) => {
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
            }).catch((err) => done(new Error(JSON.stringify(err))));
        }
        catch (err) {
            done(err);
        }
    }).timeout(timeout);
});
let paymentToken;
describe('Paysafe API with Single-Use Tokens', () => {
    let singleUseToken;
    beforeEach(function (done) {
        this.timeout(timeout);
        getSingleUseToken((err, result) => {
            if (err) {
                return done(err);
            }
            singleUseToken = result;
            done();
        });
    });
    it('should verify a single-use token', (done) => {
        const merchantRefNum = randomStr();
        try {
            const verification = new verification_1.Verification();
            verification.setMerchantRefNum(merchantRefNum);
            const card = new card_1.Card();
            card.setPaymentToken(singleUseToken);
            verification.setCard(card);
            const billingDetails = new billing_details_1.BillingDetails();
            billingDetails.setZip('K1L 6R2');
            verification.setBillingDetails(billingDetails);
            paysafeAPIClient.getCardServiceHandler().verify(verification).then((verificationResult) => {
                chai_1.expect(verificationResult.getId()).to.not.be.an('undefined');
                chai_1.expect(verificationResult.getMerchantRefNum()).to.equal(merchantRefNum);
                chai_1.expect(verificationResult.getStatus()).to.equal('COMPLETED');
                done();
            }).catch((err) => done(new Error(JSON.stringify(err))));
        }
        catch (err) {
            done(err);
        }
    }).timeout(timeout);
    it('should add a card to an existing profile using a single-use token', (done) => {
        try {
            const card = new card_1.Card();
            card.setSingleUseToken(singleUseToken);
            const profile = new profile_1.Profile();
            profile.setId(profileId);
            card.setProfile(profile);
            let cardId;
            paysafeAPIClient.getCustomerServiceHandler().createCard(card).then((cardResult) => {
                chai_1.expect(cardResult).to.not.be.an('undefined');
                chai_1.expect(cardResult).to.be.instanceof(card_1.Card);
                chai_1.expect(cardResult.getId()).to.not.be.an('undefined');
                cardId = cardResult.getId();
                return paysafeAPIClient.getCustomerServiceHandler().getProfile(profile, ['cards']);
            }).then((profileResult) => {
                chai_1.expect(profileResult).to.not.be.an('undefined');
                chai_1.expect(profileResult).to.be.instanceof(profile_1.Profile);
                chai_1.expect(profileResult.getCards()).to.not.be.an('undefined');
                chai_1.expect(profileResult.getCards()).to.be.an('array');
                let found = false;
                for (const c of profileResult.getCards()) {
                    chai_1.expect(c.getId()).to.not.be.an('undefined');
                    if (c.getId() === cardId) { // this is the card we added
                        found = true;
                        chai_1.expect(c.getCardExpiry()).to.not.be.an('undefined');
                        chai_1.expect(c.getLastDigits()).to.equal(creditCardNumber.substr(creditCardNumber.length - 4));
                        chai_1.expect(c.getCardExpiry().getMonth()).to.equal(expiryMonth);
                        chai_1.expect(c.getCardExpiry().getYear()).to.equal(expiryYear);
                    }
                }
                chai_1.expect(found).to.equal(true);
                done();
            }).catch((err) => done(new Error(JSON.stringify(err))));
        }
        catch (err) {
            done(err);
        }
    }).timeout(timeout * 2);
    it('should create a profile along with a card using a single-use token', (done) => {
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
            // console.log('REQ 4', profile);
            paysafeAPIClient.getCustomerServiceHandler().createProfile(profile).then((profileResult) => {
                // console.log('RES 4', profileResult);
                chai_1.expect(profileResult.getFirstName()).to.equal(firstName);
                chai_1.expect(profileResult.getLastName()).to.equal(lastName);
                chai_1.expect(profileResult.getCards()).to.not.be.an('undefined');
                const cards = profileResult.getCards();
                chai_1.expect(cards).to.not.be.an('undefined');
                chai_1.expect(cards).to.be.an('array').of.length(1);
                chai_1.expect(cards[0].getLastDigits()).to.not.be.an('undefined');
                chai_1.expect(cards[0].getLastDigits()).to.equal(creditCardNumber.substr(creditCardNumber.length - 4));
                paymentToken = cards[0].getPaymentToken(); // needed for future test
                const expiry = cards[0].getCardExpiry();
                chai_1.expect(expiry).to.not.be.an('undefined');
                chai_1.expect(expiry.getMonth()).to.equal(expiryMonth);
                chai_1.expect(expiry.getYear()).to.equal(expiryYear);
                done();
            }).catch((err) => done(new Error(JSON.stringify(err))));
        }
        catch (err) {
            done(err);
        }
    }).timeout(timeout);
    it('should perform an authorization on a single-use token', (done) => {
        const merchantRefNum = randomStr();
        const amount = randomInt(200, 300);
        try {
            const authorization = new authorization_1.Authorization();
            authorization.setAmount(amount);
            authorization.setCurrencyCode('CAD');
            authorization.setMerchantRefNum(merchantRefNum);
            const card = new card_1.Card();
            card.setPaymentToken(singleUseToken);
            authorization.setCard(card);
            const billingDetails = new billing_details_1.BillingDetails();
            billingDetails.setZip('K1L 6R2');
            authorization.setBillingDetails(billingDetails);
            paysafeAPIClient.getCardServiceHandler().authorize(authorization).then((authorizationResult) => {
                chai_1.expect(authorizationResult.getId()).to.not.be.an('undefined');
                chai_1.expect(authorizationResult.getMerchantRefNum()).to.equal(merchantRefNum);
                chai_1.expect(authorizationResult.getAmount()).to.equal(amount);
                chai_1.expect(authorizationResult.getStatus()).to.equal('COMPLETED');
                chai_1.expect(authorizationResult.getTxnTime()).to.be.a('Date');
                const c = authorizationResult.getCard();
                chai_1.expect(c).to.not.be.an('undefined');
                chai_1.expect(c.getLastDigits()).to.equal(creditCardNumber.substr(creditCardNumber.length - 4));
                const exp = c.getCardExpiry();
                chai_1.expect(exp).to.not.be.an('undefined');
                chai_1.expect(exp.getMonth()).to.equal(expiryMonth);
                chai_1.expect(exp.getYear()).to.equal(expiryYear);
                done();
            }).catch((err) => done(new Error(JSON.stringify(err))));
        }
        catch (err) {
            done(err);
        }
    }).timeout(timeout);
    it('should perform an authorization on a single-use token and then create a profile along with that same card', (done) => {
        const merchantRefNum = randomStr();
        const amount = randomInt(200, 300);
        const merchantCustomerId = randomStr();
        const firstName = randomStr();
        const lastName = randomStr();
        try {
            const authorization = new authorization_1.Authorization();
            authorization.setAmount(amount);
            authorization.setCurrencyCode('CAD');
            authorization.setMerchantRefNum(merchantRefNum);
            authorization.setRecurring('INITIAL');
            const authCard = new card_1.Card();
            authCard.setPaymentToken(singleUseToken);
            authorization.setCard(authCard);
            const billingDetails = new billing_details_1.BillingDetails();
            billingDetails.setZip('K1L 6R2');
            authorization.setBillingDetails(billingDetails);
            const profile = new profile_1.Profile();
            profile.setMerchantCustomerId(merchantCustomerId);
            profile.setLocale('en_US');
            profile.setFirstName(firstName);
            profile.setLastName(lastName);
            const profileCard = new card_1.Card();
            profileCard.setSingleUseToken(singleUseToken);
            profile.setCard(profileCard);
            paysafeAPIClient.getCardServiceHandler().authorize(authorization).then((authorizationResult) => {
                chai_1.expect(authorizationResult.getId()).to.not.be.an('undefined');
                chai_1.expect(authorizationResult.getMerchantRefNum()).to.equal(merchantRefNum);
                chai_1.expect(authorizationResult.getAmount()).to.equal(amount);
                chai_1.expect(authorizationResult.getStatus()).to.equal('COMPLETED');
                const c = authorizationResult.getCard();
                chai_1.expect(c).to.not.be.an('undefined');
                chai_1.expect(c.getLastDigits()).to.equal(creditCardNumber.substr(creditCardNumber.length - 4));
                const exp = c.getCardExpiry();
                chai_1.expect(exp).to.not.be.an('undefined');
                chai_1.expect(exp.getMonth()).to.equal(expiryMonth);
                chai_1.expect(exp.getYear()).to.equal(expiryYear);
                return paysafeAPIClient.getCustomerServiceHandler().createProfile(profile);
            }).then((profileResult) => {
                chai_1.expect(profileResult.getId()).to.not.be.an('undefined');
                chai_1.expect(profileResult.getMerchantCustomerId()).to.equal(merchantCustomerId);
                chai_1.expect(profileResult.getFirstName()).to.equal(firstName);
                chai_1.expect(profileResult.getLastName()).to.equal(lastName);
                const cards = profileResult.getCards();
                chai_1.expect(cards).to.not.be.an('undefined');
                chai_1.expect(cards[0].getLastDigits()).to.equal(creditCardNumber.substr(creditCardNumber.length - 4));
                done();
            }).catch((err) => done(new Error(JSON.stringify(err))));
        }
        catch (err) {
            done(err);
        }
    }).timeout(timeout * 2);
    it('should create a profile along with a card using a single-use token and then perform an authorization on that single-use token', (done) => {
        const merchantRefNum = randomStr();
        const amount = randomInt(200, 300);
        const merchantCustomerId = randomStr();
        const firstName = randomStr();
        const lastName = randomStr();
        try {
            const profile = new profile_1.Profile();
            profile.setMerchantCustomerId(merchantCustomerId);
            profile.setLocale('en_US');
            profile.setFirstName(firstName);
            profile.setLastName(lastName);
            const profileCard = new card_1.Card();
            profileCard.setSingleUseToken(singleUseToken);
            profile.setCard(profileCard);
            const authorization = new authorization_1.Authorization();
            authorization.setAmount(amount);
            authorization.setCurrencyCode('CAD');
            authorization.setMerchantRefNum(merchantRefNum);
            authorization.setRecurring('INITIAL');
            const authCard = new card_1.Card();
            authCard.setPaymentToken(singleUseToken);
            authorization.setCard(authCard);
            const billingDetails = new billing_details_1.BillingDetails();
            billingDetails.setZip('K1L 6R2');
            authorization.setBillingDetails(billingDetails);
            paysafeAPIClient.getCustomerServiceHandler().createProfile(profile).then((profileResult) => {
                chai_1.expect(profileResult.getId()).to.not.be.an('undefined');
                chai_1.expect(profileResult.getMerchantCustomerId()).to.equal(merchantCustomerId);
                chai_1.expect(profileResult.getFirstName()).to.equal(firstName);
                chai_1.expect(profileResult.getLastName()).to.equal(lastName);
                const cards = profileResult.getCards();
                chai_1.expect(cards).to.not.be.an('undefined');
                chai_1.expect(cards[0].getLastDigits()).to.equal(creditCardNumber.substr(creditCardNumber.length - 4));
                return paysafeAPIClient.getCardServiceHandler().authorize(authorization);
            }).then((authorizationResult) => {
                chai_1.expect(authorizationResult.getId()).to.not.be.an('undefined');
                chai_1.expect(authorizationResult.getMerchantRefNum()).to.equal(merchantRefNum);
                chai_1.expect(authorizationResult.getAmount()).to.equal(amount);
                chai_1.expect(authorizationResult.getStatus()).to.equal('COMPLETED');
                const c = authorizationResult.getCard();
                chai_1.expect(c).to.not.be.an('undefined');
                chai_1.expect(c.getLastDigits()).to.equal(creditCardNumber.substr(creditCardNumber.length - 4));
                const exp = c.getCardExpiry();
                chai_1.expect(exp).to.not.be.an('undefined');
                chai_1.expect(exp.getMonth()).to.equal(expiryMonth);
                chai_1.expect(exp.getYear()).to.equal(expiryYear);
                done();
            }).catch((err) => done(new Error(JSON.stringify(err))));
        }
        catch (err) {
            done(err);
        }
    }).timeout(timeout * 2);
    it('should verify a single-use token, create a profile, add an address, add a card using the single-use token, update the card\'s billingAddresId, and then charge the card\'s permanent payment token', (done) => {
        const merchantRefNumVerify = randomStr();
        const merchantRefNumAuth = randomStr();
        const amount = randomInt(200, 300);
        const merchantCustomerId = randomStr();
        const firstName = randomStr();
        const lastName = randomStr();
        const street = randomStr();
        const street2 = randomStr();
        const city = randomStr();
        const country = 'CA';
        let pId;
        let aId;
        let cId;
        try {
            const verification = new verification_1.Verification();
            verification.setMerchantRefNum(merchantRefNumVerify);
            const verificationCard = new card_1.Card();
            verificationCard.setPaymentToken(singleUseToken);
            verification.setCard(verificationCard);
            const billingDetails = new billing_details_1.BillingDetails();
            billingDetails.setZip('K1L 6R2');
            verification.setBillingDetails(billingDetails);
            // console.log(verification);
            paysafeAPIClient.getCardServiceHandler().verify(verification).then((verificationResult) => {
                // console.log('VERIFICATION', verificationResult);
                chai_1.expect(verificationResult.getId()).to.not.be.an('undefined');
                chai_1.expect(verificationResult.getStatus()).to.equal('COMPLETED');
                const profile = new profile_1.Profile();
                profile.setMerchantCustomerId(merchantCustomerId);
                profile.setLocale('en_US');
                profile.setFirstName(firstName);
                profile.setLastName(lastName);
                // console.log(profile);
                return paysafeAPIClient.getCustomerServiceHandler().createProfile(profile);
            }).then((profileResult) => {
                // console.log('PROFILE', profileResult);
                chai_1.expect(profileResult.getId()).to.not.be.an('undefined');
                chai_1.expect(profileResult.getStatus()).to.equal('ACTIVE');
                pId = profileResult.getId();
                const address = new address_1.Address();
                address.setStreet(street);
                address.setStreet2(street2);
                address.setCity(city);
                address.setZip('K1L 6R2');
                address.setCountry(country);
                address.setProfile(profileResult);
                // console.log(address);
                return paysafeAPIClient.getCustomerServiceHandler().createAddress(address);
            }).then((addressResult) => {
                // console.log('ADDRESS', addressResult);
                chai_1.expect(addressResult.getId()).to.not.be.an('undefined');
                chai_1.expect(addressResult.getStatus()).to.equal('ACTIVE');
                aId = addressResult.getId();
                const card = new card_1.Card();
                card.setSingleUseToken(singleUseToken);
                const profile = new profile_1.Profile();
                profile.setId(pId);
                card.setProfile(profile);
                // console.log(card);
                return paysafeAPIClient.getCustomerServiceHandler().createCard(card);
            }).then((cardResult) => {
                // console.log('CARD', cardResult);
                chai_1.expect(cardResult.getId()).to.not.be.an('undefined');
                chai_1.expect(cardResult.getStatus()).to.equal('ACTIVE');
                cId = cardResult.getId();
                const card = new card_1.Card(cardResult);
                card.setBillingAddressId(aId);
                const profile = new profile_1.Profile();
                profile.setId(pId);
                card.setProfile(profile);
                // console.log(card);
                return paysafeAPIClient.getCustomerServiceHandler().updateCard(card);
            }).then((cardResult) => {
                // console.log('CARD', cardResult);
                const authorization = new authorization_1.Authorization();
                authorization.setAmount(amount);
                authorization.setCurrencyCode('CAD');
                authorization.setMerchantRefNum(merchantRefNumAuth);
                authorization.setRecurring('RECURRING');
                const card = new card_1.Card();
                card.setPaymentToken(cardResult.getPaymentToken());
                authorization.setCard(card);
                // console.log(authorization);
                return paysafeAPIClient.getCardServiceHandler().authorize(authorization);
            }).then((authorizationResult) => {
                // console.log('AUTHORIZATION', authorizationResult);
                chai_1.expect(authorizationResult.getId()).to.not.be.an('undefined');
                chai_1.expect(authorizationResult.getAmount()).to.equal(amount);
                done();
            }).catch((err) => done(new Error(JSON.stringify(err))));
        }
        catch (err) {
            done(err);
        }
    }).timeout(timeout * 6);
    it('should verify a single-use token, create a profile, add an address, add a card using the single-use token, update the card\'s billingAddresId, and then charge the single-use token', (done) => {
        const merchantRefNumVerify = randomStr();
        const merchantRefNumAuth = randomStr();
        const amount = randomInt(200, 300);
        const merchantCustomerId = randomStr();
        const firstName = randomStr();
        const lastName = randomStr();
        const street = randomStr();
        const street2 = randomStr();
        const city = randomStr();
        const country = 'CA';
        let pId;
        let aId;
        let cId;
        try {
            const verification = new verification_1.Verification();
            verification.setMerchantRefNum(merchantRefNumVerify);
            const verificationCard = new card_1.Card();
            verificationCard.setPaymentToken(singleUseToken);
            verification.setCard(verificationCard);
            const verificationBillingDetails = new billing_details_1.BillingDetails();
            verificationBillingDetails.setZip('K1L 6R2');
            verification.setBillingDetails(verificationBillingDetails);
            // console.log(verification);
            paysafeAPIClient.getCardServiceHandler().verify(verification).then((verificationResult) => {
                // console.log('VERIFICATION', verificationResult);
                chai_1.expect(verificationResult.getId()).to.not.be.an('undefined');
                chai_1.expect(verificationResult.getStatus()).to.equal('COMPLETED');
                const profile = new profile_1.Profile();
                profile.setMerchantCustomerId(merchantCustomerId);
                profile.setLocale('en_US');
                profile.setFirstName(firstName);
                profile.setLastName(lastName);
                // console.log(profile);
                return paysafeAPIClient.getCustomerServiceHandler().createProfile(profile);
            }).then((profileResult) => {
                // console.log('PROFILE', profileResult);
                chai_1.expect(profileResult.getId()).to.not.be.an('undefined');
                chai_1.expect(profileResult.getStatus()).to.equal('ACTIVE');
                pId = profileResult.getId();
                const address = new address_1.Address();
                address.setStreet(street);
                address.setStreet2(street2);
                address.setCity(city);
                address.setZip('K1L 6R2');
                address.setCountry(country);
                address.setProfile(profileResult);
                // console.log(address);
                return paysafeAPIClient.getCustomerServiceHandler().createAddress(address);
            }).then((addressResult) => {
                // console.log('ADDRESS', addressResult);
                chai_1.expect(addressResult.getId()).to.not.be.an('undefined');
                chai_1.expect(addressResult.getStatus()).to.equal('ACTIVE');
                aId = addressResult.getId();
                const card = new card_1.Card();
                card.setSingleUseToken(singleUseToken);
                const profile = new profile_1.Profile();
                profile.setId(pId);
                card.setProfile(profile);
                // console.log(card);
                return paysafeAPIClient.getCustomerServiceHandler().createCard(card);
            }).then((cardResult) => {
                // console.log('CARD', cardResult);
                chai_1.expect(cardResult.getId()).to.not.be.an('undefined');
                chai_1.expect(cardResult.getStatus()).to.equal('ACTIVE');
                cId = cardResult.getId();
                const card = new card_1.Card(cardResult);
                card.setBillingAddressId(aId);
                const profile = new profile_1.Profile();
                profile.setId(pId);
                card.setProfile(profile);
                // console.log(card);
                return paysafeAPIClient.getCustomerServiceHandler().updateCard(card);
            }).then((cardResult) => {
                // console.log('CARD', cardResult);
                const authorization = new authorization_1.Authorization();
                authorization.setAmount(amount);
                authorization.setCurrencyCode('CAD');
                authorization.setMerchantRefNum(merchantRefNumAuth);
                authorization.setRecurring('INITIAL');
                const card = new card_1.Card();
                card.setPaymentToken(singleUseToken);
                authorization.setCard(card);
                const authBillingDetails = new billing_details_1.BillingDetails();
                authBillingDetails.setZip('K1L 6R2');
                authorization.setBillingDetails(authBillingDetails);
                // console.log(authorization);
                return paysafeAPIClient.getCardServiceHandler().authorize(authorization);
            }).then((authorizationResult) => {
                // console.log('AUTHORIZATION', authorizationResult);
                chai_1.expect(authorizationResult.getId()).to.not.be.an('undefined');
                chai_1.expect(authorizationResult.getAmount()).to.equal(amount);
                done();
            }).catch((err) => done(new Error(JSON.stringify(err))));
        }
        catch (err) {
            done(err);
        }
    }).timeout(timeout * 6);
});
describe('Paysafe API Auths, Refunds, and Voids', () => {
    let authorizationId;
    it('should charge a card stored in a profile', (done) => {
        const merchantRefNum = randomStr();
        const amount = randomInt(200, 300);
        const currencyCode = 'CAD';
        const street = randomStr();
        const city = randomStr();
        const state = 'ON';
        const zip = 'K1A 1A1';
        const country = 'CA';
        const dynamicDescriptor = randomStr();
        try {
            const authorization = new authorization_1.Authorization();
            authorization.setMerchantRefNum(merchantRefNum);
            authorization.setAmount(amount);
            authorization.setCurrencyCode(currencyCode);
            authorization.setSettleWithAuth(false);
            const card = new card_1.Card();
            card.setPaymentToken(paymentToken);
            authorization.setCard(card);
            const billingDetails = new billing_details_1.BillingDetails();
            billingDetails.setStreet(street);
            billingDetails.setCity(city);
            billingDetails.setState(state);
            billingDetails.setZip(zip);
            billingDetails.setCountry(country);
            authorization.setBillingDetails(billingDetails);
            const merchantDescriptor = new merchant_descriptor_1.MerchantDescriptor();
            merchantDescriptor.setDynamicDescriptor(dynamicDescriptor);
            merchantDescriptor.setPhone('18002671829');
            authorization.setMerchantDescriptor(merchantDescriptor);
            const cardServiceHandler = paysafeAPIClient.getCardServiceHandler();
            // console.log('REQ 5', authorization);
            cardServiceHandler.authorize(authorization).then((authorizationResult) => {
                // console.log('RES 5', authorizationResult);
                chai_1.expect(authorizationResult).to.have.property('id').that.is.a('string');
                chai_1.expect(authorizationResult).to.have.property('merchantRefNum').that.is.a('string').that.equals(merchantRefNum);
                chai_1.expect(authorizationResult).to.have.property('amount').that.is.a('number').that.equals(amount);
                chai_1.expect(authorizationResult).to.have.property('currencyCode').that.is.a('string').that.equals(currencyCode);
                chai_1.expect(authorizationResult).to.have.property('card').that.is.instanceof(card_1.Card);
                const c = authorizationResult.getCard();
                if (typeof c !== 'undefined') {
                    const lastFourDigits = creditCardNumber.substr(creditCardNumber.length - 4);
                    chai_1.expect(c.getLastDigits()).to.equal(lastFourDigits);
                }
                authorizationId = authorizationResult.getId();
                done();
            }).catch((err) => done(new Error(JSON.stringify(err))));
        }
        catch (err) {
            done(err);
        }
    }).timeout(timeout);
    it('should void an authorization', (done) => {
        const amount = randomInt(100, 200);
        const merchantRefNum = randomStr();
        try {
            const authorizationReversal = new authorization_reversal_1.AuthorizationReversal();
            authorizationReversal.setAmount(amount);
            authorizationReversal.setMerchantRefNum(merchantRefNum);
            const authorization = new authorization_1.Authorization();
            authorization.setId(authorizationId);
            authorizationReversal.setAuthorization(authorization);
            const cardServiceHandler = paysafeAPIClient.getCardServiceHandler();
            cardServiceHandler.reverseAuth(authorizationReversal).then((authorizationReversalResult) => {
                chai_1.expect(authorizationReversalResult.getId()).to.not.be.an('undefined');
                chai_1.expect(authorizationReversalResult.getMerchantRefNum()).to.equal(merchantRefNum);
                chai_1.expect(authorizationReversalResult.getStatus()).to.equal('COMPLETED');
                chai_1.expect(authorizationReversalResult.getAmount()).to.equal(amount);
                done();
            }).catch((err) => done(new Error(JSON.stringify(err))));
        }
        catch (err) {
            done(err);
        }
    }).timeout(timeout);
});
function getSingleUseToken(cb) {
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
    request(options, (err, response, body) => {
        if (err) {
            return cb(err);
        }
        if (typeof body.paymentToken !== 'undefined') {
            cb(null, body.paymentToken);
        }
        else {
            cb(new Error('unexpected result'), body);
        }
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
