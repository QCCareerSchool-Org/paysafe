"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const Debug = require("debug");
const dotenv = require("dotenv");
require("mocha");
const request = require("request");
const index_1 = require("./index");
const card_expiry_1 = require("./common/card-expiry");
const authorization_1 = require("./card-payments/authorization");
const settlement_1 = require("./card-payments/settlement");
const verification_1 = require("./card-payments/verification");
const void_auth_1 = require("./card-payments/void-auth");
const billing_details_1 = require("./card-payments/lib/billing-details");
const card_1 = require("./card-payments/lib/card");
const merchant_descriptor_1 = require("./card-payments/lib/merchant-descriptor");
const address_1 = require("./customer-vault/address");
const card_2 = require("./customer-vault/card");
const profile_1 = require("./customer-vault/profile");
const billing_address_1 = require("./customer-vault/lib/billing-address");
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
const debug = Debug('paysafe-testing');
const paysafe = new index_1.Paysafe(apiKey, apiPassword, 'TEST', paysafeAccountNumber);
const rand = Math.random();
// tslint:disable-next-line:no-magic-numbers
const creditCardNumber = rand < 0.333 ? '4510150000000321' : rand < 0.667 ? '4500030000000004' : '4003440000000007';
const expiryMonth = 12;
const expiryYear = new Date().getFullYear() + 1;
const timeout = 60000; // 60 seconds
/* tslint:disable:no-magic-numbers */
describe('Card Payments', () => {
    it('should be up and running', (done) => {
        paysafe.getCardServiceHandler().monitor().then((result) => {
            chai_1.expect(result).to.have.property('status').that.equals('READY');
            done();
        }).catch(done);
    });
});
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
            const profileCard = new card_2.Card();
            profileCard.setSingleUseToken(singleUseToken);
            profile.setCard(profileCard);
            paysafe.getCardServiceHandler().authorize(authorization).then((authorizationResult) => {
                debug(authorizationResult);
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
                return paysafe.getCustomerServiceHandler().createProfile(profile);
            }).then((profileResult) => {
                debug(profileResult);
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
            const profileCard = new card_2.Card();
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
            paysafe.getCustomerServiceHandler().createProfile(profile).then((profileResult) => {
                debug(profileResult);
                chai_1.expect(profileResult.getId()).to.not.be.an('undefined');
                chai_1.expect(profileResult.getMerchantCustomerId()).to.equal(merchantCustomerId);
                chai_1.expect(profileResult.getFirstName()).to.equal(firstName);
                chai_1.expect(profileResult.getLastName()).to.equal(lastName);
                const cards = profileResult.getCards();
                chai_1.expect(cards).to.not.be.an('undefined');
                chai_1.expect(cards[0].getLastDigits()).to.equal(creditCardNumber.substr(creditCardNumber.length - 4));
                return paysafe.getCardServiceHandler().authorize(authorization);
            }).then((authorizationResult) => {
                debug(authorizationResult);
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
            paysafe.getCardServiceHandler().verify(verification).then((verificationResult) => {
                debug(verificationResult);
                // console.log('VERIFICATION', verificationResult);
                chai_1.expect(verificationResult.getId()).to.not.be.an('undefined');
                chai_1.expect(verificationResult.getStatus()).to.equal('COMPLETED');
                const profile = new profile_1.Profile();
                profile.setMerchantCustomerId(merchantCustomerId);
                profile.setLocale('en_US');
                profile.setFirstName(firstName);
                profile.setLastName(lastName);
                // console.log(profile);
                return paysafe.getCustomerServiceHandler().createProfile(profile);
            }).then((profileResult) => {
                debug(profileResult);
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
                // console.log(address);
                return paysafe.getCustomerServiceHandler().createAddress(pId, address);
            }).then((addressResult) => {
                debug(addressResult);
                // console.log('ADDRESS', addressResult);
                chai_1.expect(addressResult.getId()).to.not.be.an('undefined');
                chai_1.expect(addressResult.getStatus()).to.equal('ACTIVE');
                aId = addressResult.getId();
                const card = new card_2.Card();
                card.setSingleUseToken(singleUseToken);
                // console.log(card);
                return paysafe.getCustomerServiceHandler().createCard(pId, card);
            }).then((cardResult) => {
                debug(cardResult);
                // console.log('CARD', cardResult);
                chai_1.expect(cardResult.getId()).to.not.be.an('undefined');
                chai_1.expect(cardResult.getStatus()).to.equal('ACTIVE');
                cId = cardResult.getId();
                const card = new card_2.Card(cardResult);
                card.setBillingAddressId(aId);
                // console.log(card);
                return paysafe.getCustomerServiceHandler().updateCard(pId, card);
            }).then((cardResult) => {
                debug(cardResult);
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
                return paysafe.getCardServiceHandler().authorize(authorization);
            }).then((authorizationResult) => {
                debug(authorizationResult);
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
        const merchantRefNumVerify = randomStr() + '_verify';
        const merchantRefNumAuth = randomStr() + '_auth';
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
            paysafe.getCardServiceHandler().verify(verification).then((verificationResult) => {
                debug(verificationResult);
                // console.log('VERIFICATION', verificationResult);
                chai_1.expect(verificationResult.getId()).to.not.be.an('undefined');
                chai_1.expect(verificationResult.getStatus()).to.equal('COMPLETED');
                const profile = new profile_1.Profile();
                profile.setMerchantCustomerId(merchantCustomerId);
                profile.setLocale('en_US');
                profile.setFirstName(firstName);
                profile.setLastName(lastName);
                // console.log(profile);
                return paysafe.getCustomerServiceHandler().createProfile(profile);
            }).then((profileResult) => {
                debug(profileResult);
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
                // console.log(address);
                return paysafe.getCustomerServiceHandler().createAddress(pId, address);
            }).then((addressResult) => {
                debug(addressResult);
                // console.log('ADDRESS', addressResult);
                chai_1.expect(addressResult.getId()).to.not.be.an('undefined');
                chai_1.expect(addressResult.getStatus()).to.equal('ACTIVE');
                aId = addressResult.getId();
                const card = new card_2.Card();
                card.setSingleUseToken(singleUseToken);
                // console.log(card);
                return paysafe.getCustomerServiceHandler().createCard(pId, card);
            }).then((cardResult) => {
                debug(cardResult);
                // console.log('CARD', cardResult);
                chai_1.expect(cardResult.getId()).to.not.be.an('undefined');
                chai_1.expect(cardResult.getStatus()).to.equal('ACTIVE');
                cId = cardResult.getId();
                const card = new card_2.Card(cardResult);
                card.setBillingAddressId(aId);
                // console.log(card);
                return paysafe.getCustomerServiceHandler().updateCard(pId, card);
            }).then((cardResult) => {
                debug(cardResult);
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
                return paysafe.getCardServiceHandler().authorize(authorization);
            }).then((authorizationResult) => {
                debug(authorizationResult);
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
    /*
    it('should charge a card stored in a profile', (done) => {
      const merchantRefNum = randomStr() + '_auth';
      const amount = randomInt(200, 300);
      const currencyCode = 'CAD';
      const street = randomStr();
      const city = randomStr();
      const state = 'ON';
      const zip = 'K1A 1A1';
      const country = 'CA';
      const dynamicDescriptor = randomStr();
  
      try {
        const authorization = new Authorization();
        authorization.setMerchantRefNum(merchantRefNum);
        authorization.setAmount(amount);
        authorization.setCurrencyCode(currencyCode);
        authorization.setSettleWithAuth(false);
  
        const card = new Card();
        card.setPaymentToken(paymentToken);
        authorization.setCard(card);
  
        const billingDetails = new BillingDetails();
        billingDetails.setStreet(street);
        billingDetails.setCity(city);
        billingDetails.setState(state);
        billingDetails.setZip(zip);
        billingDetails.setCountry(country);
        authorization.setBillingDetails(billingDetails);
  
        const merchantDescriptor = new MerchantDescriptor();
        merchantDescriptor.setDynamicDescriptor(dynamicDescriptor);
        merchantDescriptor.setPhone('18002671829');
        authorization.setMerchantDescriptor(merchantDescriptor);
  
        const cardServiceHandler = paysafe.getCardServiceHandler();
        // console.log('REQ 5', authorization);
        cardServiceHandler.authorize(authorization).then((authorizationResult) => {
          debug(authorizationResult);
          // console.log('RES 5', authorizationResult);
          expect(authorizationResult).to.have.property('id').that.is.a('string');
          expect(authorizationResult).to.have.property('merchantRefNum').that.is.a('string').that.equals(merchantRefNum);
          expect(authorizationResult).to.have.property('amount').that.is.a('number').that.equals(amount);
          expect(authorizationResult).to.have.property('currencyCode').that.is.a('string').that.equals(currencyCode);
          expect(authorizationResult).to.have.property('card').that.is.instanceof(Card);
          const c = authorizationResult.getCard();
          if (typeof c !== 'undefined') {
            const lastFourDigits = creditCardNumber.substr(creditCardNumber.length - 4);
            expect(c.getLastDigits()).to.equal(lastFourDigits);
          }
          authorizationId = authorizationResult.getId() as string;
          done();
        }).catch((err) => done(new Error(JSON.stringify(err))));
      } catch (err) {
        done(err);
      }
    }).timeout(timeout);
  */
    let voidAuthId;
    it('should void an authorization', (done) => {
        const amount = randomInt(100, 200);
        const merchantRefNum = randomStr() + '_void';
        try {
            const authorizationReversal = new void_auth_1.VoidAuth();
            authorizationReversal.setAmount(amount);
            authorizationReversal.setMerchantRefNum(merchantRefNum);
            paysafe.getCardServiceHandler().void(authorizationId, authorizationReversal).then((voidAuthResult) => {
                debug(voidAuthResult);
                chai_1.expect(voidAuthResult.getId()).to.not.be.an('undefined');
                voidAuthId = voidAuthResult.getId();
                chai_1.expect(voidAuthResult.getMerchantRefNum()).to.equal(merchantRefNum);
                chai_1.expect(voidAuthResult.getStatus()).to.equal('COMPLETED');
                chai_1.expect(voidAuthResult.getAmount()).to.equal(amount);
                done();
            }).catch((err) => done(new Error(JSON.stringify(err))));
        }
        catch (err) {
            done(err);
        }
    }).timeout(timeout);
    it('should look up a void authorization', (done) => {
        try {
            paysafe.getCardServiceHandler().getVoid(voidAuthId).then((voidAuthResult) => {
                debug(voidAuthResult);
                chai_1.expect(voidAuthResult.getId()).to.not.be.an('undefined');
                chai_1.expect(voidAuthResult.getId()).to.equal(voidAuthId);
                done();
            }).catch((err) => done(new Error(JSON.stringify(err))));
        }
        catch (err) {
            done(err);
        }
    }).timeout(timeout);
    it('should charge a card and then settle it', (done) => {
        const merchantRefNumAuth = randomStr() + '_auth';
        const merchantRefNumSettlement = randomStr() + '_settlement';
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
            authorization.setMerchantRefNum(merchantRefNumAuth);
            authorization.setAmount(amount);
            authorization.setCurrencyCode(currencyCode);
            authorization.setSettleWithAuth(false);
            const cardExpiry = new card_expiry_1.CardExpiry();
            cardExpiry.setYear(expiryYear);
            cardExpiry.setMonth(expiryMonth);
            const card = new card_1.Card();
            card.setCardNum(creditCardNumber);
            card.setCardExpiry(cardExpiry);
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
            paysafe.getCardServiceHandler().authorize(authorization).then((authorizationResult) => {
                debug(authorizationResult);
                chai_1.expect(authorizationResult).to.have.property('id').that.is.a('string');
                chai_1.expect(authorizationResult).to.have.property('merchantRefNum').that.is.a('string').that.equals(merchantRefNumAuth);
                chai_1.expect(authorizationResult).to.have.property('amount').that.is.a('number').that.equals(amount);
                chai_1.expect(authorizationResult).to.have.property('currencyCode').that.is.a('string').that.equals(currencyCode);
                chai_1.expect(authorizationResult).to.have.property('card').that.is.instanceof(card_1.Card);
                const c = authorizationResult.getCard();
                chai_1.expect(c.getLastDigits()).to.equal(creditCardNumber.substr(creditCardNumber.length - 4));
                authorizationId = authorizationResult.getId();
                const settlement = new settlement_1.Settlement();
                settlement.setMerchantRefNum(merchantRefNumSettlement);
                settlement.setAmount(amount);
                return paysafe.getCardServiceHandler().settle(authorizationId, settlement);
            }).then((settlementResult) => {
                debug(settlementResult);
                done();
            }).catch((err) => done(new Error(JSON.stringify(err))));
        }
        catch (err) {
            done(err);
        }
    }).timeout(timeout);
    it('should create a profile along with a card with a billing address, and then be able to charge that card using its permanent card token without having to re-suply the AVS information', (done) => {
        const merchantRefNum = randomStr() + '_auth';
        const amount = randomInt(200, 300);
        const merchantCustomerId = randomStr();
        const firstName = randomStr();
        const lastName = randomStr();
        const street = randomStr();
        const street2 = randomStr();
        const city = randomStr();
        const state = 'ON';
        const zip = 'A1A 1A1';
        const country = 'CA';
        try {
            const billingAddress = new billing_address_1.BillingAddress();
            billingAddress.setStreet(street);
            billingAddress.setStreet2(street2);
            billingAddress.setCity(city);
            billingAddress.setState(state);
            billingAddress.setZip(zip);
            billingAddress.setCountry(country);
            const cardExpiry = new card_expiry_1.CardExpiry();
            cardExpiry.setMonth(expiryMonth);
            cardExpiry.setYear(expiryYear);
            const card = new card_2.Card();
            card.setCardNum(creditCardNumber);
            card.setCardExpiry(cardExpiry);
            card.setBillingAddress(billingAddress);
            const profile = new profile_1.Profile();
            profile.setMerchantCustomerId(merchantCustomerId);
            profile.setLocale('en_US');
            profile.setFirstName(firstName);
            profile.setLastName(lastName);
            profile.setCard(card);
            // console.log(profile);
            paysafe.getCustomerServiceHandler().createProfile(profile).then((profileResult) => {
                debug(profileResult);
                // console.log('PROFILE', profileResult);
                chai_1.expect(profileResult.getId()).to.not.be.an('undefined');
                chai_1.expect(profileResult.getStatus()).to.equal('ACTIVE');
                chai_1.expect(profileResult.getCards()).to.not.be.an('undefined');
                const cards = profileResult.getCards();
                chai_1.expect(cards).to.be.an('array').of.length(1);
                chai_1.expect(cards[0].getPaymentToken()).to.not.be.an('undefined');
                const authorization = new authorization_1.Authorization();
                authorization.setAmount(amount);
                authorization.setCurrencyCode('CAD');
                authorization.setMerchantRefNum(merchantRefNum);
                authorization.setSettleWithAuth(true);
                authorization.setRecurring('INITIAL');
                const card2 = new card_1.Card();
                card2.setPaymentToken(cards[0].getPaymentToken());
                authorization.setCard(card2);
                // console.log(authorization);
                return paysafe.getCardServiceHandler().authorize(authorization);
            }).then((authorizationResult) => {
                debug(authorizationResult);
                // console.log('AUTHORIZATION', authorizationResult);
                chai_1.expect(authorizationResult.getId()).to.not.be.an('undefined');
                chai_1.expect(authorizationResult.getAmount()).to.equal(amount);
                done();
            }).catch(done);
        }
        catch (err) {
            done(err);
        }
    }).timeout(timeout * 2);
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
