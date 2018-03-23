import { expect } from 'chai';
import * as dotenv from 'dotenv';
import 'mocha';
import * as request from 'request';
import * as util from 'util';
import { CardServiceHandler } from './card-service-handler';
import { Authorization } from './cardpayments/authorization';
import { BillingDetails } from './cardpayments/billing-details';
import { Card } from './cardpayments/card';
import { CardExpiry } from './cardpayments/card-expiry';
import { MerchantDescriptor } from './cardpayments/merchant-descriptor';
import { CustomerServiceHandler } from './customer-service-handler';
import { Address } from './customervault/address';
import { DateOfBirth } from './customervault/date-of-birth';
import { Profile } from './customervault/profile';
import * as environment from './environment';
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

const paysafeAPIClient = new PaysafeAPIClient(apiKey, apiPassword, environment.TEST, accountNumber);

const creditCardNumber = '4510150000000321';
const expiryMonth = 12;
const expiryYear = new Date().getFullYear() + 1;

const timeout = 30000;

describe('Paysafe API', () => {

  let singleUseToken: string;

  before((done) => {
    getSingleUseToken((err, result) => {
      if (err) {
        return done(err);
      }
      singleUseToken = result;
      done();
    });
  });

  let profileId: string;
  let paymentToken: string;

  it('should create a profile', (done) => {
    const merchantCustomerId = randomStr();
    const randLocale = Math.random();
    const locale = randLocale < 0.333 ? 'en_US' : randLocale < 0.666 ? 'fr_CA' : 'en_GB';
    const firstName = randomStr();
    const lastName = randomStr();
    const gender = Math.random() < 0.5 ? 'M' : 'F';
    const emailAddress = randomEmail();
    const phoneNumber = randomStr();

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

      const customerServiceHandler = paysafeAPIClient.getCustomerServiceHandler();
      customerServiceHandler.createProfile(profile).then((profileResult) => {
        expect(profileResult.getId()).to.not.be.an('undefined');
        expect(profileResult.getMerchantCustomerId()).to.equal(merchantCustomerId);
        expect(profileResult.getLocale()).to.equal(locale);
        expect(profileResult.getFirstName()).to.equal(firstName);
        expect(profileResult.getLastName()).to.equal(lastName);
        expect(profileResult.getGender()).to.equal(gender);
        expect(profileResult.getEmail()).to.equal(emailAddress);
        expect(profileResult.getPhone()).to.equal(phoneNumber);
        profileId = profileResult.getId() as string; // for future tests
        done();
      }).catch(done);
    } catch (err) {
      done(err);
    }
  }).timeout(timeout);

  it('should get a profile', (done) => {

    try {

      const profile = new Profile();
      profile.setId(profileId);

      const customerServiceHandler = paysafeAPIClient.getCustomerServiceHandler();
      customerServiceHandler.getProfile(profile).then((profileResult) => {
        done();
      }).catch(done);
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

      const customerServiceHandler = paysafeAPIClient.getCustomerServiceHandler();
      customerServiceHandler.createProfile(profile).then((profileResult) => {
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
      }).catch(done);
    } catch (err) {
      done(err);
    }
  }).timeout(timeout);

  it('should add an address to a profile', (done) => {
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

      const profile = new Profile();
      profile.setId(profileId);
      address.setProfile(profile);

      let addressId: string;

      const customerServiceHandler = paysafeAPIClient.getCustomerServiceHandler();
      customerServiceHandler.createAddress(address).then((addressResult) => {
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
        return customerServiceHandler.getProfile(profile, ['addresses']);
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
      }).catch(done);
    } catch (err) {
      done(err);
    }
  }).timeout(timeout);

  it('should create a profile with a card using a single-use token', (done) => {
    const merchantCustomerId = randomStr();
    const firstName = randomStr();
    const lastName = randomStr();

    try {
      const profile = new Profile();
      profile.setMerchantCustomerId(merchantCustomerId);
      profile.setLocale('en_US');
      profile.setFirstName(firstName);
      profile.setLastName(lastName);

      const card = new Card();
      card.setSingleUseToken(singleUseToken);
      profile.setCard(card);

      const customerServiceHandler = paysafeAPIClient.getCustomerServiceHandler();
      // console.log('REQ 4', profile);
      customerServiceHandler.createProfile(profile).then((profileResult) => {
        // console.log('RES 4', profileResult);
        expect(profileResult.getFirstName()).to.equal(firstName);
        expect(profileResult.getLastName()).to.equal(lastName);
        expect(profileResult.getCards()).to.not.be.an('undefined');

        const cards = profileResult.getCards();
        expect(cards).to.not.be.an('undefined');
        expect((cards as Card[])).to.be.an('array').of.length(1);
        expect((cards as Card[])[0].getLastDigits()).to.not.be.an('undefined');
        expect((cards as Card[])[0].getLastDigits()).to.equal(creditCardNumber.substr(creditCardNumber.length - 4));

        paymentToken = (cards as Card[])[0].getPaymentToken() as string; // needed for future test

        const expiry = (cards as Card[])[0].getCardExpiry();
        expect(expiry).to.not.be.an('undefined');
        expect((expiry as CardExpiry).getMonth()).to.equal(expiryMonth);
        expect((expiry as CardExpiry).getYear()).to.equal(expiryYear);
        done();
      }).catch(done);
    } catch (err) {
      done(err);
    }
  }).timeout(timeout);

  it('should charge a card stored in a profile', (done) => {
    const merchantRefNum = randomStr();
    const amount = Math.round(Math.random() * 75) + 25; // 25 to 100
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
      authorization.setSettleWithAuth(true);

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

        done();
      }).catch(done);
    } catch (err) {
      done(err);
    }
  }).timeout(timeout);

});

/*
describe('CustomerServiceHandler', () => {

  it('Should charge a card', (done) => {

    const authorization = new Authorization();
    authorization.setAmount(125);

    const card = new Card();
    card.setCardNum(creditCardNumber);
    authorization.setCard(card);
    authorization.setCurrencyCode('CAD');

    const cardExpiry = new CardExpiry();
    cardExpiry.setYear(expiryYear);
    cardExpiry.setMonth(expiryYear);
    card.setCardExpiry(cardExpiry);

    console.log(authorization);

    const cardServiceHandler = paysafeAPIClient.getCardServiceHandler();
    cardServiceHandler.authorize(authorization).then((authorizationResult) => {
      console.log(authorizationResult);
      done();
    }).catch(done);

  });

});
*/

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
