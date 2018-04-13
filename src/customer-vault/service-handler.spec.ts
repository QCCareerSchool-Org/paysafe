import { expect } from 'chai';
import * as Debug from 'debug';
import * as dotenv from 'dotenv';
import 'mocha';
import * as request from 'request';

import { Paysafe } from '../index';

import { Address } from './address';
import { Card } from './card';
import { Mandate } from './mandate';
import { Profile } from './profile';

import { ACHBankAccount } from './ach-bank-account';
import { BACSBankAccount } from './bacs-bank-account';

import { CardExpiry } from '../common/card-expiry';
import { DateOfBirth } from '../common/date-of-birth';
import { BillingAddress } from './lib/billing-address';

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

const paysafe = new Paysafe(apiKey, apiPassword, 'TEST', paysafeAccountNumber);

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
      expect(result).to.have.property('status').that.equals('READY');
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
        const profile = new Profile();
        profile.setMerchantCustomerId(merchantCustomerId);
        profile.setLocale(locale);
        profile.setFirstName(firstName);
        profile.setLastName(lastName);
        profile.setGender(gender);
        profile.setEmail(emailAddress);
        profile.setPhone(phoneNumber);
        profile.setNationality(nationality);

        paysafe.getCustomerServiceHandler().createProfile(profile).then((profileResult: Profile) => {
          debug(profileResult);
          expect(profileResult.getId()).to.not.be.an('undefined');
          expect(profileResult.getMerchantCustomerId()).to.equal(merchantCustomerId);
          expect(profileResult.getLocale()).to.equal(locale);
          expect(profileResult.getFirstName()).to.equal(firstName);
          expect(profileResult.getLastName()).to.equal(lastName);
          expect(profileResult.getGender()).to.equal(gender);
          expect(profileResult.getEmail()).to.equal(emailAddress);
          expect(profileResult.getPhone()).to.equal(phoneNumber);
          expect(profileResult.getNationality()).to.equal(nationality);
          done();
        }).catch((err) => done(Error(JSON.stringify(err))));
      } catch (err) {
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
        const cardExpiry = new CardExpiry();
        cardExpiry.setYear(expiryYear);
        cardExpiry.setMonth(expiryMonth);

        const card = new Card();
        card.setCardNum(creditCardNumber);
        card.setCardExpiry(cardExpiry);

        const profile = new Profile();
        profile.setMerchantCustomerId(merchantCustomerId);
        profile.setLocale(locale);
        profile.setFirstName(firstName);
        profile.setLastName(lastName);
        profile.setGender(gender);
        profile.setEmail(emailAddress);
        profile.setPhone(phoneNumber);
        profile.setNationality(nationality);
        profile.setCard(card);

        paysafe.getCustomerServiceHandler().createProfile(profile).then((profileResult: Profile) => {
          debug(profileResult);
          expect(profileResult.getId()).to.not.be.an('undefined');
          expect(profileResult.getMerchantCustomerId()).to.equal(merchantCustomerId);
          expect(profileResult.getLocale()).to.equal(locale);
          expect(profileResult.getFirstName()).to.equal(firstName);
          expect(profileResult.getLastName()).to.equal(lastName);
          expect(profileResult.getGender()).to.equal(gender);
          expect(profileResult.getEmail()).to.equal(emailAddress);
          expect(profileResult.getPhone()).to.equal(phoneNumber);
          expect(profileResult.getNationality()).to.equal(nationality);
          expect(profileResult.getCards()).to.not.be.an('undefined');
          expect(profileResult.getCards()).to.be.an('array').of.length(1);
          const cards = profileResult.getCards() as Card[];
          expect(cards[0].getId()).to.not.be.an('undefined');
          expect(cards[0].getLastDigits()).to.equal(creditCardNumber.substr(creditCardNumber.length - 4));
          done();
        }).catch((err) => done(Error(JSON.stringify(err))));
      } catch (err) {
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

        paysafe.getCustomerServiceHandler().createProfile(profile).then((profileResult) => {
          debug(profileResult);
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
        }).catch((err) => done(Error(JSON.stringify(err))));
      } catch (err) {
        done(Error(JSON.stringify(err)));
      }
    }).timeout(timeout);

    it('should create a profile with an achBankAccount', (done) => {

      const merchantCustomerId = randomStr();
      const accountNumber = randomInt(0, 999999).toString().padStart(6, '0');
      const routingNumber = '307075259';

      try {

        const billingAddress = new BillingAddress();
        billingAddress.setStreet('38 McArthur Ave');
        billingAddress.setCity('Ottawa');
        billingAddress.setZip('KIL 6R2');
        billingAddress.setCountry('CA');

        const achBankAccount = new ACHBankAccount();
        achBankAccount.setNickName('Dave\' Account');
        achBankAccount.setAccountHolderName('Dave Welsh');
        achBankAccount.setAccountNumber(accountNumber);
        achBankAccount.setRoutingNumber(routingNumber);
        achBankAccount.setAccountType('CHECKING');
        achBankAccount.setBillingAddress(billingAddress);

        const profile = new Profile();
        profile.setMerchantCustomerId(merchantCustomerId);
        profile.setACHBankAccount(achBankAccount);

        paysafe.getCustomerServiceHandler().createProfile(profile).then((profileResult) => {
          debug(profileResult);

          expect(profileResult.getId()).to.not.be.an('undefined');
          expect(profileResult.getACHBankAccounts()).to.not.be.an('undefined');
          expect(profileResult.getACHBankAccounts()).to.be.an('array').of.length(1);
          const achBankAccounts = profileResult.getACHBankAccounts() as ACHBankAccount[];

          expect(achBankAccounts[0].getId()).to.not.be.an('undefined');
          expect(achBankAccounts[0].getRoutingNumber()).to.equal(routingNumber);
          expect(achBankAccounts[0].getLastDigits()).to.equal(accountNumber.substr(accountNumber.length - 2));

          done();
        }).catch((err) => done(Error(JSON.stringify(err))));
      } catch (err) {
        done(Error(JSON.stringify(err)));
      }

    }).timeout(timeout);

    it('should create a profile with an bacsBankAccount and then add a mandate', (done) => {

      const merchantCustomerId = randomStr();
      const accountNumber = randomInt(0, 999999).toString().padStart(8, '0');
      const sortCode = '086081'; // randomInt(0, 999999).toString().padStart(6, '0');

      try {
        const billingAddress = new BillingAddress();
        billingAddress.setStreet('38 McArthur Ave');
        billingAddress.setCity('Ottawa');
        billingAddress.setZip('KIL 6R2');
        billingAddress.setCountry('CA');

        const bacsBankAccount = new BACSBankAccount();
        bacsBankAccount.setNickName('Dave\' Account');
        bacsBankAccount.setAccountHolderName('Dave Welsh');
        bacsBankAccount.setAccountNumber(accountNumber);
        bacsBankAccount.setSortCode(sortCode);
        bacsBankAccount.setBillingAddress(billingAddress);

        const profile = new Profile();
        profile.setMerchantCustomerId(merchantCustomerId);
        profile.setBACSBankAccount(bacsBankAccount);

        debug(profile);
        paysafe.getCustomerServiceHandler().createProfile(profile).then((profileResult) => {
          debug(profileResult);

          expect(profileResult.getId()).to.not.be.an('undefined');
          expect(profileResult.getBACSBankAccounts()).to.not.be.an('undefined');
          expect(profileResult.getBACSBankAccounts()).to.be.an('array').of.length(1);
          const bacsBankAccounts = profileResult.getBACSBankAccounts() as BACSBankAccount[];

          expect(bacsBankAccounts[0].getId()).to.not.be.an('undefined');
          expect(bacsBankAccounts[0].getSortCode()).to.equal(sortCode);
          expect(bacsBankAccounts[0].getAccountNumber()).to.equal(accountNumber);

          const mandate = new Mandate();
          mandate.setReference('9387234987');

          const pId = profileResult.getId() as string;
          const bankAccountId = (profileResult.getBACSBankAccounts() as BACSBankAccount[])[0].getId() as string;

          return paysafe.getCustomerServiceHandler().createMandate('BACS', pId, bankAccountId, mandate);
        }).then((updateResult) => {
          debug(updateResult);
          done();
        }).catch((err) => done(Error(JSON.stringify(err))));
      } catch (err) {
        done(Error(JSON.stringify(err)));
      }

    }).timeout(timeout * 2);

  });

  describe('Manipulating Profiles', () => {

    let profileId: string;

    beforeEach(function (done) {
      this.timeout(timeout);
      const firstName = randomStr();
      const lastName = randomStr();
      const merchantCustomerId = randomStr();
      try {
        const profile = new Profile();
        profile.setFirstName(firstName);
        profile.setLastName(lastName);
        profile.setMerchantCustomerId(merchantCustomerId);
        profile.setLocale('en_US');
        paysafe.getCustomerServiceHandler().createProfile(profile).then((profileResult) => {
          expect(profileResult.getId()).to.not.be.an('undefined');
          expect(profileResult.getFirstName()).to.equal(firstName);
          expect(profileResult.getLastName()).to.equal(lastName);
          expect(profileResult.getMerchantCustomerId()).to.equal(merchantCustomerId);
          profileId = profileResult.getId() as string;
          done();
        }).catch((err) => done(Error(JSON.stringify(err))));
      } catch (err) {
        done(Error(JSON.stringify(err)));
      }
    });

    it('should get a profile', (done) => {

      try {
        paysafe.getCustomerServiceHandler().getProfile(profileId).then((profileResult) => {
          debug(profileResult);
          expect(profileResult.getId()).to.equal(profileId);
          done();
        }).catch((err) => done(Error(JSON.stringify(err))));
      } catch (err) {
        done(Error(JSON.stringify(err)));
      }

    }).timeout(timeout);

    it('should update a profile', (done) => {
      const firstName = randomStr();
      const merchantCustomerId = randomStr();

      try {
        const profile = new Profile();
        profile.setFirstName(firstName);
        profile.setMerchantCustomerId(merchantCustomerId);
        profile.setLocale('en_US');
        paysafe.getCustomerServiceHandler().updateProfile(profileId, profile).then((profileResult) => {
          debug(profileResult);
          expect(profileResult.getId()).to.equal(profileId);
          expect(profileResult.getFirstName()).to.equal(firstName);
          expect(profileResult.getLastName()).to.be.an('undefined');
          expect(profileResult.getMerchantCustomerId()).to.equal(merchantCustomerId);
          done();
        }).catch((err) => done(Error(JSON.stringify(err))));
      } catch (err) {
        done(Error(JSON.stringify(err)));
      }

    }).timeout(timeout);

    it('should add a card', (done) => {

      try {
        const cardExpiry = new CardExpiry();
        cardExpiry.setYear(expiryYear);
        cardExpiry.setMonth(expiryMonth);

        const card = new Card();
        card.setCardNum(creditCardNumber);
        card.setCardExpiry(cardExpiry);

        let cardId: string;

        paysafe.getCustomerServiceHandler().createCard(profileId, card).then((cardResult) => {
          debug(cardResult);
          expect(cardResult.getLastDigits()).to.not.be.an('undefined');
          expect(cardResult.getLastDigits()).to.equal(creditCardNumber.substr(creditCardNumber.length - 4));
          const expiry = cardResult.getCardExpiry() as CardExpiry;
          expect(expiry).to.not.be.an('undefined');
          expect(expiry.getMonth()).to.equal(expiryMonth);
          expect(expiry.getYear()).to.equal(expiryYear);
          cardId = cardResult.getId() as string;
          return paysafe.getCustomerServiceHandler().getProfile(profileId, ['cards']);
        }).then((profileResult) => {
          debug(profileResult);
          expect(profileResult).to.not.be.an('undefined');
          expect(profileResult).to.be.instanceof(Profile);
          expect(profileResult.getCards()).to.not.be.an('undefined');
          expect(profileResult.getCards()).to.be.an('array');
          let found = false;
          for (const c of profileResult.getCards() as Card[]) {
            expect(c.getId()).to.not.be.an('undefined');
            if (c.getId() === cardId) { // this is the card we added
              found = true;
              expect(c.getLastDigits()).to.equal(creditCardNumber.substr(creditCardNumber.length - 4));
            }
          }
          expect(found).to.equal(true);
          done();
        }).catch((err) => done(Error(JSON.stringify(err))));
      } catch (err) {
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

        paysafe.getCustomerServiceHandler().createAddress(profileId, address).then((addressResult) => {
          debug(addressResult);
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
          return paysafe.getCustomerServiceHandler().getProfile(profileId, ['addresses']);
        }).then((profileResult) => {
          debug(profileResult);
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
        }).catch((err) => done(Error(JSON.stringify(err))));
      } catch (err) {
        done(Error(JSON.stringify(err)));
      }
    }).timeout(timeout * 2);

    it('should add an achBankAccount', (done) => {

      const accountNumber = randomInt(0, 999999).toString().padStart(6, '0');
      const routingNumber = '307075259';

      try {
        const billingAddress = new BillingAddress();
        billingAddress.setStreet('38 McArthur Ave');
        billingAddress.setCity('Ottawa');
        billingAddress.setZip('KIL 6R2');
        billingAddress.setCountry('CA');

        const achBankAccount = new ACHBankAccount();
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
      } catch (err) {
        done(Error(JSON.stringify(err)));
      }

    }).timeout(timeout * 2);

  });

  describe('Card Single Use Tokens', () => {

    let singleUseToken: string;

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
        const profile = new Profile();
        profile.setMerchantCustomerId(merchantCustomerId);
        profile.setLocale('en_US');
        profile.setFirstName(firstName);
        profile.setLastName(lastName);

        const card = new Card();
        card.setSingleUseToken(singleUseToken);
        profile.setCard(card);

        paysafe.getCustomerServiceHandler().createProfile(profile).then((profileResult) => {
          debug(profileResult);

          expect(profileResult.getFirstName()).to.equal(firstName);
          expect(profileResult.getLastName()).to.equal(lastName);
          expect(profileResult.getCards()).to.not.be.an('undefined');

          const cards = profileResult.getCards() as Card[];
          expect(cards).to.not.be.an('undefined');
          expect(cards).to.be.an('array').of.length(1);
          expect(cards[0].getLastDigits()).to.not.be.an('undefined');
          expect(cards[0].getLastDigits()).to.equal(creditCardNumber.substr(creditCardNumber.length - 4));

          const expiry = cards[0].getCardExpiry() as CardExpiry;
          expect(expiry).to.not.be.an('undefined');
          expect(expiry.getMonth()).to.equal(expiryMonth);
          expect(expiry.getYear()).to.equal(expiryYear);
          done();
        }).catch((err) => done(Error(JSON.stringify(err))));
      } catch (err) {
        done(Error(JSON.stringify(err)));
      }
    }).timeout(timeout);

    it('should create a profile and then add a card using a single-use token', (done) => {
      const merchantCustomerId = randomStr();
      const firstName = randomStr();
      const lastName = randomStr();

      try {
        const profile = new Profile();
        profile.setMerchantCustomerId(merchantCustomerId);
        profile.setLocale('en_US');
        profile.setFirstName(firstName);
        profile.setLastName(lastName);

        paysafe.getCustomerServiceHandler().createProfile(profile).then((profileResult) => {
          debug(profileResult);

          expect(profileResult.getFirstName()).to.equal(firstName);
          expect(profileResult.getLastName()).to.equal(lastName);

          const card = new Card();
          card.setSingleUseToken(singleUseToken);

          const pId = profileResult.getId() as string;

          return paysafe.getCustomerServiceHandler().createCard(pId, card);
        }).then((cardResult) => {
          debug(cardResult);

          expect(cardResult.getLastDigits()).to.not.be.an('undefined');
          expect(cardResult.getLastDigits()).to.equal(creditCardNumber.substr(creditCardNumber.length - 4));

          const expiry = cardResult.getCardExpiry() as CardExpiry;
          expect(expiry).to.not.be.an('undefined');
          expect(expiry.getMonth()).to.equal(expiryMonth);
          expect(expiry.getYear()).to.equal(expiryYear);
          done();

        }).catch((err) => done(Error(JSON.stringify(err))));
      } catch (err) {
        done(Error(JSON.stringify(err)));
      }
    }).timeout(timeout * 2);

  });

});

function getCardSingleUseToken(): Promise<string> {

  return new Promise((resolve, reject) => {

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

    debug(options);
    request(options, (err, response, body) => {
      if (err) {
        return reject(err);
      }
      if (typeof body.paymentToken !== 'undefined') {
        resolve(body.paymentToken);
      } else {
        reject(new Error('unexpected result'));
      }
    });

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
