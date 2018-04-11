import { expect } from 'chai';
import * as dotenv from 'dotenv';
import 'mocha';
import * as request from 'request';
import * as util from 'util';

import { CardServiceHandler } from './card-service-handler';
import { CustomerServiceHandler } from './customer-service-handler';

import { Authorization } from './cardpayments/authorization';
import { Verification } from './cardpayments/verification';
import { VoidAuth } from './cardpayments/void-auth';

import { BillingDetails } from './cardpayments/lib/billing-details';
import { Card } from './cardpayments/lib/card';
import { MerchantDescriptor } from './cardpayments/lib/merchant-descriptor';

import { CardExpiry } from './common/card-expiry';
import { DateOfBirth } from './common/date-of-birth';

import { Address } from './customervault/address';
import { BillingAddress } from './customervault/billing-address';
import { Card as VaultCard } from './customervault/card';
import { Profile } from './customervault/profile';

import { PaysafeAPIClient } from './paysafe-api-client';
import { PaysafeError } from './paysafe-error';

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

const paysafeAPIClient = new PaysafeAPIClient(apiKey, apiPassword, 'TEST', accountNumber);

const rand = Math.random();
// tslint:disable-next-line:no-magic-numbers
const creditCardNumber = rand < 0.333 ? '4510150000000321' : rand < 0.667 ? '4500030000000004' : '4003440000000007';
const expiryMonth = 12;
const expiryYear = new Date().getFullYear() + 1;

const timeout = 60000; // 60 seconds

/* tslint:disable:no-magic-numbers */

let profileId: string;

describe('Card Payments', () => {

  it('should be up and running', (done) => {

    paysafeAPIClient.getCardServiceHandler().monitor().then((result) => {
      expect(result).to.have.property('status').that.equals('READY');
      done();
    }).catch(done);

  });

});

describe('Customer Vault', () => {

  it('should be up and running', (done) => {

    paysafeAPIClient.getCustomerServiceHandler().monitor().then((result) => {
      expect(result).to.have.property('status').that.equals('READY');
      done();
    }).catch(done);

  });

});

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
      const profile = new Profile();
      profile.setMerchantCustomerId(merchantCustomerId);
      profile.setLocale(locale);
      profile.setFirstName(firstName);
      profile.setLastName(lastName);
      profile.setGender(gender);
      profile.setEmail(emailAddress);
      profile.setPhone(phoneNumber);
      profile.setNationality(nationality);

      paysafeAPIClient.getCustomerServiceHandler().createProfile(profile).then((profileResult: Profile) => {
        expect(profileResult.getId()).to.not.be.an('undefined');
        expect(profileResult.getMerchantCustomerId()).to.equal(merchantCustomerId);
        expect(profileResult.getLocale()).to.equal(locale);
        expect(profileResult.getFirstName()).to.equal(firstName);
        expect(profileResult.getLastName()).to.equal(lastName);
        expect(profileResult.getGender()).to.equal(gender);
        expect(profileResult.getEmail()).to.equal(emailAddress);
        expect(profileResult.getPhone()).to.equal(phoneNumber);
        expect(profileResult.getNationality()).to.equal(nationality);
        profileId = profileResult.getId() as string; // for future tests
        done();
      }).catch((err) => done(new Error(JSON.stringify(err))));
    } catch (err) {
      done(err);
    }
  }).timeout(timeout);

  it('should get a profile', (done) => {

    try {
      paysafeAPIClient.getCustomerServiceHandler().getProfile(profileId).then((profileResult) => {
        expect(profileResult.getId()).to.equal(profileId);
        done();
      }).catch((err) => done(new Error(JSON.stringify(err))));
    } catch (err) {
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
      const profile = new Profile();
      profile.setMerchantCustomerId(merchantCustomerId);
      profile.setLocale('en_US');
      profile.setFirstName(firstName);
      profile.setLastName(lastName);

      const dateOfBirth = new DateOfBirth();
      dateOfBirth.setYear(year);
      dateOfBirth.setMonth(month);
      dateOfBirth.setDay(day);
      profile.setDateOfBirth(dateOfBirth);

      paysafeAPIClient.getCustomerServiceHandler().createProfile(profile).then((profileResult) => {
        expect(profileResult.getFirstName()).to.equal(firstName);
        expect(profileResult.getLastName()).to.equal(lastName);
        expect(profileResult.getDateOfBirth()).to.not.be.an('undefined');
        const dob = profileResult.getDateOfBirth();
        expect(dob).to.not.be.an('undefined');
        expect((dob as DateOfBirth)).to.be.an.instanceof(DateOfBirth);
        expect((dob as DateOfBirth).getYear()).to.not.be.an('undefined');
        expect((dob as DateOfBirth).getYear()).to.equal(year);
        expect((dob as DateOfBirth).getMonth()).to.not.be.an('undefined');
        expect((dob as DateOfBirth).getMonth()).to.equal(month);
        expect((dob as DateOfBirth).getDay()).to.not.be.an('undefined');
        expect((dob as DateOfBirth).getDay()).to.equal(day);
        done();
      }).catch((err) => done(new Error(JSON.stringify(err))));
    } catch (err) {
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
      const address = new Address();
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

      let addressId: string;

      paysafeAPIClient.getCustomerServiceHandler().createAddress(profileId, address).then((addressResult) => {
        expect(addressResult).to.not.be.an('undefined');
        expect(addressResult).to.be.instanceof(Address);
        expect(addressResult.getId()).to.not.be.an('undefined');
        expect(addressResult.getNickName()).to.equal(nickName);
        expect(addressResult.getRecipientName()).to.equal(recipientName);
        expect(addressResult.getStreet()).to.equal(street);
        expect(addressResult.getStreet2()).to.equal(street2);
        expect(addressResult.getCity()).to.equal(city);
        expect(addressResult.getState()).to.equal(state);
        expect(addressResult.getZip()).to.equal(zip);
        expect(addressResult.getCountry()).to.equal(country);
        expect(addressResult.getPhone()).to.equal(phoneNumber);
        expect(addressResult.getDefaultShippingAddressIndicator()).to.equal(defaultShippingIndicator);
        addressId = addressResult.getId() as string;
        return paysafeAPIClient.getCustomerServiceHandler().getProfile(profileId, ['addresses']);
      }).then((profileResult) => {
        expect(profileResult).to.not.be.an('undefined');
        expect(profileResult).to.be.instanceof(Profile);
        expect(profileResult.getAddresses()).to.not.be.an('undefined');
        expect(profileResult.getAddresses()).to.be.an('array');
        let found = false;
        for (const a of profileResult.getAddresses() as Address[]) {
          expect(a.getId()).to.not.be.an('undefined');
          if (a.getId() === addressId) { // this is the address we added
            found = true;
            expect(a.getNickName()).to.equal(nickName);
            expect(a.getRecipientName()).to.equal(recipientName);
            expect(a.getStreet()).to.equal(street);
            expect(a.getStreet2()).to.equal(street2);
            expect(a.getCity()).to.equal(city);
            expect(a.getState()).to.equal(state);
            expect(a.getZip()).to.equal(zip);
            expect(a.getCountry()).to.equal(country);
            expect(a.getPhone()).to.equal(phoneNumber);
            expect(a.getDefaultShippingAddressIndicator()).to.equal(defaultShippingIndicator);
          }
        }
        expect(found).to.equal(true);
        done();
      }).catch((err) => done(new Error(JSON.stringify(err))));
    } catch (err) {
      done(err);
    }
  }).timeout(timeout);

});

let paymentToken: string;

describe('Paysafe API with Single-Use Tokens', () => {

  let singleUseToken: string;

  beforeEach(function(done) {
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

      const verification = new Verification();
      verification.setMerchantRefNum(merchantRefNum);

      const card = new Card();
      card.setPaymentToken(singleUseToken);
      verification.setCard(card);

      const billingDetails = new BillingDetails();
      billingDetails.setZip('K1L 6R2');
      verification.setBillingDetails(billingDetails);

      paysafeAPIClient.getCardServiceHandler().verify(verification).then((verificationResult) => {
        expect(verificationResult.getId()).to.not.be.an('undefined');
        expect(verificationResult.getMerchantRefNum()).to.equal(merchantRefNum);
        expect(verificationResult.getStatus()).to.equal('COMPLETED');
        done();
      }).catch((err) => done(new Error(JSON.stringify(err))));

    } catch (err) {
      done(err);
    }

  }).timeout(timeout);

  it('should add a card to an existing profile using a single-use token', (done) => {

    try {
      const card = new VaultCard();
      card.setSingleUseToken(singleUseToken);

      let cardId: string;

      paysafeAPIClient.getCustomerServiceHandler().createCard(profileId, card).then((cardResult) => {
        expect(cardResult).to.not.be.an('undefined');
        expect(cardResult).to.be.instanceof(VaultCard);
        expect(cardResult.getId()).to.not.be.an('undefined');
        cardId = cardResult.getId() as string;
        return paysafeAPIClient.getCustomerServiceHandler().getProfile(profileId, ['cards']);
      }).then((profileResult) => {
        expect(profileResult).to.not.be.an('undefined');
        expect(profileResult).to.be.instanceof(Profile);
        expect(profileResult.getCards()).to.not.be.an('undefined');
        expect(profileResult.getCards()).to.be.an('array');
        let found = false;
        for (const c of profileResult.getCards() as VaultCard[]) {
          expect(c.getId()).to.not.be.an('undefined');
          if (c.getId() === cardId) { // this is the card we added
            found = true;
            expect(c.getCardExpiry()).to.not.be.an('undefined');
            expect(c.getLastDigits()).to.equal(creditCardNumber.substr(creditCardNumber.length - 4));
            expect((c.getCardExpiry() as CardExpiry).getMonth()).to.equal(expiryMonth);
            expect((c.getCardExpiry() as CardExpiry).getYear()).to.equal(expiryYear);
          }
        }
        expect(found).to.equal(true);
        done();
      }).catch((err) => done(new Error(JSON.stringify(err))));
    } catch (err) {
      done(err);
    }
  }).timeout(timeout * 2);

  it('should create a profile along with a card using a single-use token', (done) => {
    const merchantCustomerId = randomStr();
    const firstName = randomStr();
    const lastName = randomStr();

    try {
      const profile = new Profile();
      profile.setMerchantCustomerId(merchantCustomerId);
      profile.setLocale('en_US');
      profile.setFirstName(firstName);
      profile.setLastName(lastName);

      const card = new VaultCard();
      card.setSingleUseToken(singleUseToken);
      profile.setCard(card);

      // console.log('REQ 4', profile);
      paysafeAPIClient.getCustomerServiceHandler().createProfile(profile).then((profileResult) => {
        // console.log('RES 4', profileResult);
        expect(profileResult.getFirstName()).to.equal(firstName);
        expect(profileResult.getLastName()).to.equal(lastName);
        expect(profileResult.getCards()).to.not.be.an('undefined');

        const cards = profileResult.getCards() as VaultCard[];
        expect(cards).to.not.be.an('undefined');
        expect(cards).to.be.an('array').of.length(1);
        expect(cards[0].getLastDigits()).to.not.be.an('undefined');
        expect(cards[0].getLastDigits()).to.equal(creditCardNumber.substr(creditCardNumber.length - 4));

        paymentToken = cards[0].getPaymentToken() as string; // needed for future test

        const expiry = cards[0].getCardExpiry() as CardExpiry;
        expect(expiry).to.not.be.an('undefined');
        expect(expiry.getMonth()).to.equal(expiryMonth);
        expect(expiry.getYear()).to.equal(expiryYear);
        done();
      }).catch((err) => done(new Error(JSON.stringify(err))));
    } catch (err) {
      done(err);
    }
  }).timeout(timeout);

  it('should perform an authorization on a single-use token', (done) => {
    const merchantRefNum = randomStr();
    const amount = randomInt(200, 300);

    try {
      const authorization = new Authorization();
      authorization.setAmount(amount);
      authorization.setCurrencyCode('CAD');
      authorization.setMerchantRefNum(merchantRefNum);

      const card = new Card();
      card.setPaymentToken(singleUseToken);
      authorization.setCard(card);

      const billingDetails = new BillingDetails();
      billingDetails.setZip('K1L 6R2');
      authorization.setBillingDetails(billingDetails);

      paysafeAPIClient.getCardServiceHandler().authorize(authorization).then((authorizationResult) => {
        expect(authorizationResult.getId()).to.not.be.an('undefined');
        expect(authorizationResult.getMerchantRefNum()).to.equal(merchantRefNum);
        expect(authorizationResult.getAmount()).to.equal(amount);
        expect(authorizationResult.getStatus()).to.equal('COMPLETED');
        expect(authorizationResult.getTxnTime()).to.be.a('Date');
        const c = authorizationResult.getCard();
        expect(c).to.not.be.an('undefined');
        expect((c as Card).getLastDigits()).to.equal(creditCardNumber.substr(creditCardNumber.length - 4));
        const exp = (c as Card).getCardExpiry();
        expect(exp).to.not.be.an('undefined');
        expect((exp as CardExpiry).getMonth()).to.equal(expiryMonth);
        expect((exp as CardExpiry).getYear()).to.equal(expiryYear);
        done();
      }).catch((err) => done(new Error(JSON.stringify(err))));

    } catch (err) {
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
      const authorization = new Authorization();
      authorization.setAmount(amount);
      authorization.setCurrencyCode('CAD');
      authorization.setMerchantRefNum(merchantRefNum);
      authorization.setRecurring('INITIAL');

      const authCard = new Card();
      authCard.setPaymentToken(singleUseToken);
      authorization.setCard(authCard);

      const billingDetails = new BillingDetails();
      billingDetails.setZip('K1L 6R2');
      authorization.setBillingDetails(billingDetails);

      const profile = new Profile();
      profile.setMerchantCustomerId(merchantCustomerId);
      profile.setLocale('en_US');
      profile.setFirstName(firstName);
      profile.setLastName(lastName);

      const profileCard = new VaultCard();
      profileCard.setSingleUseToken(singleUseToken);
      profile.setCard(profileCard);

      paysafeAPIClient.getCardServiceHandler().authorize(authorization).then((authorizationResult) => {
        expect(authorizationResult.getId()).to.not.be.an('undefined');
        expect(authorizationResult.getMerchantRefNum()).to.equal(merchantRefNum);
        expect(authorizationResult.getAmount()).to.equal(amount);
        expect(authorizationResult.getStatus()).to.equal('COMPLETED');
        const c = authorizationResult.getCard();
        expect(c).to.not.be.an('undefined');
        expect((c as Card).getLastDigits()).to.equal(creditCardNumber.substr(creditCardNumber.length - 4));
        const exp = (c as Card).getCardExpiry();
        expect(exp).to.not.be.an('undefined');
        expect((exp as CardExpiry).getMonth()).to.equal(expiryMonth);
        expect((exp as CardExpiry).getYear()).to.equal(expiryYear);
        return paysafeAPIClient.getCustomerServiceHandler().createProfile(profile);
      }).then((profileResult) => {
        expect(profileResult.getId()).to.not.be.an('undefined');
        expect(profileResult.getMerchantCustomerId()).to.equal(merchantCustomerId);
        expect(profileResult.getFirstName()).to.equal(firstName);
        expect(profileResult.getLastName()).to.equal(lastName);
        const cards: VaultCard[] = profileResult.getCards() as VaultCard[];
        expect(cards).to.not.be.an('undefined');
        expect(cards[0].getLastDigits()).to.equal(creditCardNumber.substr(creditCardNumber.length - 4));
        done();
      }).catch((err) => done(new Error(JSON.stringify(err))));
    } catch (err) {
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
      const profile = new Profile();
      profile.setMerchantCustomerId(merchantCustomerId);
      profile.setLocale('en_US');
      profile.setFirstName(firstName);
      profile.setLastName(lastName);

      const profileCard = new VaultCard();
      profileCard.setSingleUseToken(singleUseToken);
      profile.setCard(profileCard);

      const authorization = new Authorization();
      authorization.setAmount(amount);
      authorization.setCurrencyCode('CAD');
      authorization.setMerchantRefNum(merchantRefNum);
      authorization.setRecurring('INITIAL');

      const authCard = new Card();
      authCard.setPaymentToken(singleUseToken);
      authorization.setCard(authCard);

      const billingDetails = new BillingDetails();
      billingDetails.setZip('K1L 6R2');
      authorization.setBillingDetails(billingDetails);

      paysafeAPIClient.getCustomerServiceHandler().createProfile(profile).then((profileResult) => {
        expect(profileResult.getId()).to.not.be.an('undefined');
        expect(profileResult.getMerchantCustomerId()).to.equal(merchantCustomerId);
        expect(profileResult.getFirstName()).to.equal(firstName);
        expect(profileResult.getLastName()).to.equal(lastName);
        const cards = profileResult.getCards() as VaultCard[];
        expect(cards).to.not.be.an('undefined');
        expect(cards[0].getLastDigits()).to.equal(creditCardNumber.substr(creditCardNumber.length - 4));
        return paysafeAPIClient.getCardServiceHandler().authorize(authorization);
      }).then((authorizationResult) => {
        expect(authorizationResult.getId()).to.not.be.an('undefined');
        expect(authorizationResult.getMerchantRefNum()).to.equal(merchantRefNum);
        expect(authorizationResult.getAmount()).to.equal(amount);
        expect(authorizationResult.getStatus()).to.equal('COMPLETED');
        const c = authorizationResult.getCard() as Card;
        expect(c).to.not.be.an('undefined');
        expect(c.getLastDigits()).to.equal(creditCardNumber.substr(creditCardNumber.length - 4));
        const exp = c.getCardExpiry() as CardExpiry;
        expect(exp).to.not.be.an('undefined');
        expect(exp.getMonth()).to.equal(expiryMonth);
        expect(exp.getYear()).to.equal(expiryYear);
        done();
      }).catch((err) => done(new Error(JSON.stringify(err))));
    } catch (err) {
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

    let pId: string;
    let aId: string;
    let cId: string;

    try {
      const verification = new Verification();
      verification.setMerchantRefNum(merchantRefNumVerify);
      const verificationCard = new Card();
      verificationCard.setPaymentToken(singleUseToken);
      verification.setCard(verificationCard);
      const billingDetails = new BillingDetails();
      billingDetails.setZip('K1L 6R2');
      verification.setBillingDetails(billingDetails);

      // console.log(verification);

      paysafeAPIClient.getCardServiceHandler().verify(verification).then((verificationResult) => {

        // console.log('VERIFICATION', verificationResult);

        expect(verificationResult.getId()).to.not.be.an('undefined');
        expect(verificationResult.getStatus()).to.equal('COMPLETED');

        const profile = new Profile();
        profile.setMerchantCustomerId(merchantCustomerId);
        profile.setLocale('en_US');
        profile.setFirstName(firstName);
        profile.setLastName(lastName);

        // console.log(profile);

        return paysafeAPIClient.getCustomerServiceHandler().createProfile(profile);

      }).then((profileResult) => {

        // console.log('PROFILE', profileResult);

        expect(profileResult.getId()).to.not.be.an('undefined');
        expect(profileResult.getStatus()).to.equal('ACTIVE');
        pId = profileResult.getId() as string;

        const address = new Address();
        address.setStreet(street);
        address.setStreet2(street2);
        address.setCity(city);
        address.setZip('K1L 6R2');
        address.setCountry(country);

        // console.log(address);

        return paysafeAPIClient.getCustomerServiceHandler().createAddress(pId, address);

      }).then((addressResult) => {

        // console.log('ADDRESS', addressResult);

        expect(addressResult.getId()).to.not.be.an('undefined');
        expect(addressResult.getStatus()).to.equal('ACTIVE');
        aId = addressResult.getId() as string;

        const card = new VaultCard();
        card.setSingleUseToken(singleUseToken);

        // console.log(card);

        return paysafeAPIClient.getCustomerServiceHandler().createCard(pId, card);

      }).then((cardResult) => {

        // console.log('CARD', cardResult);

        expect(cardResult.getId()).to.not.be.an('undefined');
        expect(cardResult.getStatus()).to.equal('ACTIVE');
        cId = cardResult.getId() as string;

        const card = new VaultCard(cardResult);
        card.setBillingAddressId(aId);

        // console.log(card);

        return paysafeAPIClient.getCustomerServiceHandler().updateCard(pId, card);

      }).then((cardResult) => {

        // console.log('CARD', cardResult);

        const authorization = new Authorization();
        authorization.setAmount(amount);
        authorization.setCurrencyCode('CAD');
        authorization.setMerchantRefNum(merchantRefNumAuth);
        authorization.setRecurring('RECURRING');
        const card = new Card();
        card.setPaymentToken(cardResult.getPaymentToken() as string);
        authorization.setCard(card);

        // console.log(authorization);

        return paysafeAPIClient.getCardServiceHandler().authorize(authorization);

      }).then((authorizationResult) => {

        // console.log('AUTHORIZATION', authorizationResult);

        expect(authorizationResult.getId()).to.not.be.an('undefined');
        expect(authorizationResult.getAmount()).to.equal(amount);

        done();

      }).catch((err) => done(new Error(JSON.stringify(err))));
    } catch (err) {
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

    let pId: string;
    let aId: string;
    let cId: string;

    try {
      const verification = new Verification();
      verification.setMerchantRefNum(merchantRefNumVerify);
      const verificationCard = new Card();
      verificationCard.setPaymentToken(singleUseToken);
      verification.setCard(verificationCard);
      const verificationBillingDetails = new BillingDetails();
      verificationBillingDetails.setZip('K1L 6R2');
      verification.setBillingDetails(verificationBillingDetails);

      // console.log(verification);

      paysafeAPIClient.getCardServiceHandler().verify(verification).then((verificationResult) => {

        // console.log('VERIFICATION', verificationResult);

        expect(verificationResult.getId()).to.not.be.an('undefined');
        expect(verificationResult.getStatus()).to.equal('COMPLETED');

        const profile = new Profile();
        profile.setMerchantCustomerId(merchantCustomerId);
        profile.setLocale('en_US');
        profile.setFirstName(firstName);
        profile.setLastName(lastName);

        // console.log(profile);

        return paysafeAPIClient.getCustomerServiceHandler().createProfile(profile);

      }).then((profileResult) => {

        // console.log('PROFILE', profileResult);

        expect(profileResult.getId()).to.not.be.an('undefined');
        expect(profileResult.getStatus()).to.equal('ACTIVE');
        pId = profileResult.getId() as string;

        const address = new Address();
        address.setStreet(street);
        address.setStreet2(street2);
        address.setCity(city);
        address.setZip('K1L 6R2');
        address.setCountry(country);

        // console.log(address);

        return paysafeAPIClient.getCustomerServiceHandler().createAddress(pId, address);

      }).then((addressResult) => {

        // console.log('ADDRESS', addressResult);

        expect(addressResult.getId()).to.not.be.an('undefined');
        expect(addressResult.getStatus()).to.equal('ACTIVE');
        aId = addressResult.getId() as string;

        const card = new VaultCard();
        card.setSingleUseToken(singleUseToken);

        // console.log(card);

        return paysafeAPIClient.getCustomerServiceHandler().createCard(pId, card);

      }).then((cardResult) => {

        // console.log('CARD', cardResult);

        expect(cardResult.getId()).to.not.be.an('undefined');
        expect(cardResult.getStatus()).to.equal('ACTIVE');
        cId = cardResult.getId() as string;

        const card = new VaultCard(cardResult);
        card.setBillingAddressId(aId);

        // console.log(card);

        return paysafeAPIClient.getCustomerServiceHandler().updateCard(pId, card);

      }).then((cardResult) => {

        // console.log('CARD', cardResult);

        const authorization = new Authorization();
        authorization.setAmount(amount);
        authorization.setCurrencyCode('CAD');
        authorization.setMerchantRefNum(merchantRefNumAuth);
        authorization.setRecurring('INITIAL');
        const card = new Card();
        card.setPaymentToken(singleUseToken);
        authorization.setCard(card);
        const authBillingDetails = new BillingDetails();
        authBillingDetails.setZip('K1L 6R2');
        authorization.setBillingDetails(authBillingDetails);

        // console.log(authorization);

        return paysafeAPIClient.getCardServiceHandler().authorize(authorization);

      }).then((authorizationResult) => {

        // console.log('AUTHORIZATION', authorizationResult);

        expect(authorizationResult.getId()).to.not.be.an('undefined');
        expect(authorizationResult.getAmount()).to.equal(amount);

        done();

      }).catch((err) => done(new Error(JSON.stringify(err))));
    } catch (err) {
      done(err);
    }

  }).timeout(timeout * 6);

});

describe('Paysafe API Auths, Refunds, and Voids', () => {

  let authorizationId: string;

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

      const cardServiceHandler = paysafeAPIClient.getCardServiceHandler();
      // console.log('REQ 5', authorization);
      cardServiceHandler.authorize(authorization).then((authorizationResult) => {
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

  let voidAuthId: string;
  it('should void an authorization', (done) => {
    const amount = randomInt(100, 200);
    const merchantRefNum = randomStr() + '_void';

    try {
      const authorizationReversal = new VoidAuth();
      authorizationReversal.setAmount(amount);
      authorizationReversal.setMerchantRefNum(merchantRefNum);

      paysafeAPIClient.getCardServiceHandler().void(authorizationId, authorizationReversal).then((voidAuthResult) => {
        expect(voidAuthResult.getId()).to.not.be.an('undefined');
        voidAuthId = voidAuthResult.getId() as string;
        expect(voidAuthResult.getMerchantRefNum()).to.equal(merchantRefNum);
        expect(voidAuthResult.getStatus()).to.equal('COMPLETED');
        expect(voidAuthResult.getAmount()).to.equal(amount);
        done();
      }).catch((err) => done(new Error(JSON.stringify(err))));
    } catch (err) {
      done(err);
    }
  }).timeout(timeout);

  it('should look up a void authorization', (done) => {

    try {
      paysafeAPIClient.getCardServiceHandler().getVoid(voidAuthId).then((voidAuthResult) => {
        expect(voidAuthResult.getId()).to.not.be.an('undefined');
        expect(voidAuthResult.getId()).to.equal(voidAuthId);
        done();
      }).catch((err) => done(new Error(JSON.stringify(err))));
    } catch (err) {
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

      const billingAddress = new BillingAddress();
      billingAddress.setStreet(street);
      billingAddress.setStreet2(street2);
      billingAddress.setCity(city);
      billingAddress.setState(state);
      billingAddress.setZip(zip);
      billingAddress.setCountry(country);

      const cardExpiry = new CardExpiry();
      cardExpiry.setMonth(expiryMonth);
      cardExpiry.setYear(expiryYear);

      const card = new VaultCard();
      card.setCardNum(creditCardNumber);
      card.setCardExpiry(cardExpiry);
      card.setBillingAddress(billingAddress);

      const profile = new Profile();
      profile.setMerchantCustomerId(merchantCustomerId);
      profile.setLocale('en_US');
      profile.setFirstName(firstName);
      profile.setLastName(lastName);
      profile.setCard(card);

      // console.log(profile);

      paysafeAPIClient.getCustomerServiceHandler().createProfile(profile).then((profileResult) => {

        // console.log('PROFILE', profileResult);

        expect(profileResult.getId()).to.not.be.an('undefined');
        expect(profileResult.getStatus()).to.equal('ACTIVE');
        expect(profileResult.getCards()).to.not.be.an('undefined');
        const cards = profileResult.getCards() as VaultCard[];
        expect(cards).to.be.an('array').of.length(1);
        expect(cards[0].getPaymentToken()).to.not.be.an('undefined');

        const authorization = new Authorization();
        authorization.setAmount(amount);
        authorization.setCurrencyCode('CAD');
        authorization.setMerchantRefNum(merchantRefNum);
        authorization.setSettleWithAuth(true);
        authorization.setRecurring('INITIAL');
        const card2 = new Card();
        card2.setPaymentToken(cards[0].getPaymentToken() as string);
        authorization.setCard(card2);

        // console.log(authorization);

        return paysafeAPIClient.getCardServiceHandler().authorize(authorization);

      }).then((authorizationResult) => {

        // console.log('AUTHORIZATION', authorizationResult);

        expect(authorizationResult.getId()).to.not.be.an('undefined');
        expect(authorizationResult.getAmount()).to.equal(amount);

        done();

      }).catch(done);
    } catch (err) {
      done(err);
    }

  }).timeout(timeout * 2);

});

function getSingleUseToken(cb: (err: Error | null, result?: any) => void): void {

  const headers: request.Headers = {
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

  const options: request.OptionsWithUri = {
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
    } else {
      cb(new Error('unexpected result'), body);
    }
  });

}

function randomStr(): string {
  return Math.random().toString(36).slice(2);
}

function randomEmail(): string {
  return `${randomStr()}@example.com`;
}

function randomInt(min: number, max: number) {
  min = Math.floor(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
