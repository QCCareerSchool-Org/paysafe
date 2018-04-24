import { expect } from 'chai';
import * as Debug from 'debug';
import * as dotenv from 'dotenv';
import 'mocha';
import * as request from 'request';
import * as util from 'util';

import { Paysafe } from './index';

import { CardExpiry } from './common/card-expiry';
import { DateOfBirth } from './common/date-of-birth';

import { Authorization } from './card-payments/authorization';
import { Settlement } from './card-payments/settlement';
import { Verification } from './card-payments/verification';
import { VoidAuth } from './card-payments/void-auth';

import { BillingDetails } from './card-payments/lib/billing-details';
import { Card } from './card-payments/lib/card';
import { MerchantDescriptor } from './card-payments/lib/merchant-descriptor';

import { ACHBankAccount } from './customer-vault/ach-bank-account';
import { Address } from './customer-vault/address';
import { BACSBankAccount } from './customer-vault/bacs-bank-account';
import { Card as CustomerVaultCard } from './customer-vault/card';
import { Profile } from './customer-vault/profile';

import { BillingAddress } from './customer-vault/lib/billing-address';
import { Mandate } from './customer-vault/mandate';

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

const paysafe = new Paysafe(apiKey, apiPassword, 'TEST', paysafeAccountNumber);

const rand = Math.random();
// tslint:disable-next-line:no-magic-numbers
const creditCardNumber = rand < 0.333 ? '4510150000000321' : rand < 0.667 ? '4500030000000004' : '4003440000000007';
const expiryMonth = 12;
const expiryYear = new Date().getFullYear() + 1;

const timeout = 60000; // 60 seconds

/* tslint:disable:no-magic-numbers */

describe('Card Payments', () => {

  it('should be up and running', async (done) => {

    try {
      const result = await paysafe.getCardServiceHandler().monitor();
      expect(result).to.equal('3');
      expect(result).to.have.property('status').that.equals('READY');
      done();
    } catch (err) {
      done(err);
    }

  });

});

describe('Paysafe API with Single-Use Tokens', () => {

  let singleUseToken: string;

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

      const profileCard = new CustomerVaultCard();
      profileCard.setSingleUseToken(singleUseToken);
      profile.setCard(profileCard);

      paysafe.getCardServiceHandler().authorize(authorization).then((authorizationResult) => {
        debug(authorizationResult);
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
        return paysafe.getCustomerServiceHandler().createProfile(profile);
      }).then((profileResult) => {
        debug(profileResult);
        expect(profileResult.getId()).to.not.be.an('undefined');
        expect(profileResult.getMerchantCustomerId()).to.equal(merchantCustomerId);
        expect(profileResult.getFirstName()).to.equal(firstName);
        expect(profileResult.getLastName()).to.equal(lastName);
        const cards: CustomerVaultCard[] = profileResult.getCards() as CustomerVaultCard[];
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

      const profileCard = new CustomerVaultCard();
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

      paysafe.getCustomerServiceHandler().createProfile(profile).then((profileResult) => {
        debug(profileResult);
        expect(profileResult.getId()).to.not.be.an('undefined');
        expect(profileResult.getMerchantCustomerId()).to.equal(merchantCustomerId);
        expect(profileResult.getFirstName()).to.equal(firstName);
        expect(profileResult.getLastName()).to.equal(lastName);
        const cards = profileResult.getCards() as CustomerVaultCard[];
        expect(cards).to.not.be.an('undefined');
        expect(cards[0].getLastDigits()).to.equal(creditCardNumber.substr(creditCardNumber.length - 4));
        return paysafe.getCardServiceHandler().authorize(authorization);
      }).then((authorizationResult) => {
        debug(authorizationResult);
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

      paysafe.getCardServiceHandler().verify(verification).then((verificationResult) => {
        debug(verificationResult);

        // console.log('VERIFICATION', verificationResult);

        expect(verificationResult.getId()).to.not.be.an('undefined');
        expect(verificationResult.getStatus()).to.equal('COMPLETED');

        const profile = new Profile();
        profile.setMerchantCustomerId(merchantCustomerId);
        profile.setLocale('en_US');
        profile.setFirstName(firstName);
        profile.setLastName(lastName);

        // console.log(profile);

        return paysafe.getCustomerServiceHandler().createProfile(profile);

      }).then((profileResult) => {
        debug(profileResult);

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

        return paysafe.getCustomerServiceHandler().createAddress(pId, address);

      }).then((addressResult) => {
        debug(addressResult);

        // console.log('ADDRESS', addressResult);

        expect(addressResult.getId()).to.not.be.an('undefined');
        expect(addressResult.getStatus()).to.equal('ACTIVE');
        aId = addressResult.getId() as string;

        const card = new CustomerVaultCard();
        card.setSingleUseToken(singleUseToken);

        // console.log(card);

        return paysafe.getCustomerServiceHandler().createCard(pId, card);

      }).then((cardResult) => {
        debug(cardResult);

        // console.log('CARD', cardResult);

        expect(cardResult.getId()).to.not.be.an('undefined');
        expect(cardResult.getStatus()).to.equal('ACTIVE');
        cId = cardResult.getId() as string;

        const card = new CustomerVaultCard(cardResult);
        card.setBillingAddressId(aId);

        // console.log(card);

        return paysafe.getCustomerServiceHandler().updateCard(pId, cId, card);

      }).then((cardResult) => {
        debug(cardResult);

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

        return paysafe.getCardServiceHandler().authorize(authorization);

      }).then((authorizationResult) => {
        debug(authorizationResult);

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

      paysafe.getCardServiceHandler().verify(verification).then((verificationResult) => {
        debug(verificationResult);

        // console.log('VERIFICATION', verificationResult);

        expect(verificationResult.getId()).to.not.be.an('undefined');
        expect(verificationResult.getStatus()).to.equal('COMPLETED');

        const profile = new Profile();
        profile.setMerchantCustomerId(merchantCustomerId);
        profile.setLocale('en_US');
        profile.setFirstName(firstName);
        profile.setLastName(lastName);

        // console.log(profile);

        return paysafe.getCustomerServiceHandler().createProfile(profile);

      }).then((profileResult) => {
        debug(profileResult);

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

        return paysafe.getCustomerServiceHandler().createAddress(pId, address);

      }).then((addressResult) => {
        debug(addressResult);

        // console.log('ADDRESS', addressResult);

        expect(addressResult.getId()).to.not.be.an('undefined');
        expect(addressResult.getStatus()).to.equal('ACTIVE');
        aId = addressResult.getId() as string;

        const card = new CustomerVaultCard();
        card.setSingleUseToken(singleUseToken);

        // console.log(card);

        return paysafe.getCustomerServiceHandler().createCard(pId, card);

      }).then((cardResult) => {
        debug(cardResult);

        // console.log('CARD', cardResult);

        expect(cardResult.getId()).to.not.be.an('undefined');
        expect(cardResult.getStatus()).to.equal('ACTIVE');
        cId = cardResult.getId() as string;

        const card = new CustomerVaultCard(cardResult);
        card.setBillingAddressId(aId);

        // console.log(card);

        return paysafe.getCustomerServiceHandler().updateCard(pId, cId, card);

      }).then((cardResult) => {
        debug(cardResult);

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

        return paysafe.getCardServiceHandler().authorize(authorization);

      }).then((authorizationResult) => {
        debug(authorizationResult);

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

  let voidAuthId: string;
  it('should void an authorization', (done) => {
    const amount = randomInt(100, 200);
    const merchantRefNum = randomStr() + '_void';

    try {
      const authorizationReversal = new VoidAuth();
      authorizationReversal.setAmount(amount);
      authorizationReversal.setMerchantRefNum(merchantRefNum);

      paysafe.getCardServiceHandler().void(authorizationId, authorizationReversal).then((voidAuthResult) => {
        debug(voidAuthResult);
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
      paysafe.getCardServiceHandler().getVoid(voidAuthId).then((voidAuthResult) => {
        debug(voidAuthResult);
        expect(voidAuthResult.getId()).to.not.be.an('undefined');
        expect(voidAuthResult.getId()).to.equal(voidAuthId);
        done();
      }).catch((err) => done(new Error(JSON.stringify(err))));
    } catch (err) {
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
      const authorization = new Authorization();
      authorization.setMerchantRefNum(merchantRefNumAuth);
      authorization.setAmount(amount);
      authorization.setCurrencyCode(currencyCode);
      authorization.setSettleWithAuth(false);

      const cardExpiry = new CardExpiry();
      cardExpiry.setYear(expiryYear);
      cardExpiry.setMonth(expiryMonth);

      const card = new Card();
      card.setCardNum(creditCardNumber);
      card.setCardExpiry(cardExpiry);
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

      paysafe.getCardServiceHandler().authorize(authorization).then((authorizationResult) => {
        debug(authorizationResult);

        expect(authorizationResult).to.have.property('id').that.is.a('string');
        expect(authorizationResult).to.have.property('merchantRefNum').that.is.a('string').that.equals(merchantRefNumAuth);
        expect(authorizationResult).to.have.property('amount').that.is.a('number').that.equals(amount);
        expect(authorizationResult).to.have.property('currencyCode').that.is.a('string').that.equals(currencyCode);
        expect(authorizationResult).to.have.property('card').that.is.instanceof(Card);
        const c = authorizationResult.getCard() as Card;
        expect(c.getLastDigits()).to.equal(creditCardNumber.substr(creditCardNumber.length - 4));
        authorizationId = authorizationResult.getId() as string;

        const settlement = new Settlement();
        settlement.setMerchantRefNum(merchantRefNumSettlement);
        settlement.setAmount(amount);

        return paysafe.getCardServiceHandler().settle(authorizationId, settlement);
      }).then((settlementResult) => {
        debug(settlementResult);

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

      const card = new CustomerVaultCard();
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

      paysafe.getCustomerServiceHandler().createProfile(profile).then((profileResult) => {
        debug(profileResult);

        // console.log('PROFILE', profileResult);

        expect(profileResult.getId()).to.not.be.an('undefined');
        expect(profileResult.getStatus()).to.equal('ACTIVE');
        expect(profileResult.getCards()).to.not.be.an('undefined');
        const cards = profileResult.getCards() as CustomerVaultCard[];
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

        return paysafe.getCardServiceHandler().authorize(authorization);

      }).then((authorizationResult) => {
        debug(authorizationResult);

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
