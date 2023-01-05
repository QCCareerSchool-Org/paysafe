import Debug from 'debug';
import * as dotenv from 'dotenv';
import 'jest';
import request from 'request';

import { CardExpiry } from '../common/card-expiry';
import { DateOfBirth } from '../common/date-of-birth';
import { Paysafe } from '../index';
import { ACHBankAccount } from './ach-bank-account';
import { Address } from './address';
import { BACSBankAccount } from './bacs-bank-account';
import { Card } from './card';
import { BillingAddress } from './lib/billing-address';
import { Mandate } from './mandate';
import { Profile } from './profile';

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

const timeout = 20000; // 80 seconds

/* tslint:disable:no-magic-numbers */

describe('Customer Vault API', () => {

  it('should be up and running', async () => {
    const result = await paysafe.getCustomerServiceHandler().monitor();
    expect(result).not.toHaveProperty('error');
    expect(result).toHaveProperty('status');
    expect(result.status).toBe('READY');
  });

  describe('Creating Profiles', () => {

    it('should create a profile', async () => {
      const merchantCustomerId = randomStr();
      const randLocale = Math.random();
      const locale = randLocale < 0.333 ? 'en_US' : randLocale < 0.666 ? 'fr_CA' : 'en_GB';
      const firstName = randomStr();
      const lastName = randomStr();
      const gender = Math.random() < 0.5 ? 'M' : 'F';
      const emailAddress = randomEmail();
      const phoneNumber = randomStr();
      const nationality = 'Canadian';

      const profile = new Profile();
      profile.setMerchantCustomerId(merchantCustomerId);
      profile.setLocale(locale);
      profile.setFirstName(firstName);
      profile.setLastName(lastName);
      profile.setGender(gender);
      profile.setEmail(emailAddress);
      profile.setPhone(phoneNumber);
      profile.setNationality(nationality);

      const profileResult = await paysafe.getCustomerServiceHandler().createProfile(profile);
      // debug(profileResult);

      expect(profileResult).not.toHaveProperty('error');
      expect(profileResult.getId()).toBeDefined();
      expect(profileResult.getMerchantCustomerId()).toBe(merchantCustomerId);
      expect(profileResult.getLocale()).toBe(locale);
      expect(profileResult.getFirstName()).toBe(firstName);
      expect(profileResult.getLastName()).toBe(lastName);
      expect(profileResult.getGender()).toBe(gender);
      expect(profileResult.getEmail()).toBe(emailAddress);
      expect(profileResult.getPhone()).toBe(phoneNumber);
      expect(profileResult.getNationality()).toBe(nationality);
    });

    it('should create a profile with a card', async () => {
      const merchantCustomerId = randomStr();
      const randLocale = Math.random();
      const locale = randLocale < 0.333 ? 'en_US' : randLocale < 0.666 ? 'fr_CA' : 'en_GB';
      const firstName = randomStr();
      const lastName = randomStr();
      const gender = Math.random() < 0.5 ? 'M' : 'F';
      const emailAddress = randomEmail();
      const phoneNumber = randomStr();
      const nationality = 'Canadian';

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

      const profileResult = await paysafe.getCustomerServiceHandler().createProfile(profile);
      // debug(profileResult);

      expect(profileResult).not.toHaveProperty('error');
      expect(profileResult.getId()).toBeDefined();
      expect(profileResult.getMerchantCustomerId()).toBe(merchantCustomerId);
      expect(profileResult.getLocale()).toBe(locale);
      expect(profileResult.getFirstName()).toBe(firstName);
      expect(profileResult.getLastName()).toBe(lastName);
      expect(profileResult.getGender()).toBe(gender);
      expect(profileResult.getEmail()).toBe(emailAddress);
      expect(profileResult.getPhone()).toBe(phoneNumber);
      expect(profileResult.getNationality()).toBe(nationality);
      expect(profileResult.getCards()).toBeDefined();
      expect(Array.isArray(profileResult.getCards())).toBe(true);
      expect(profileResult.getCards()).toHaveLength(1);
      const cards = profileResult.getCards() as Card[];
      expect(cards[0].getId()).toBeDefined();
      expect(cards[0].getLastDigits()).toBe(creditCardNumber.substring(creditCardNumber.length - 4));
    });

    it('should create a profile with a card with a billing address', async () => {
      const merchantCustomerId = randomStr();
      const randLocale = Math.random();
      const locale = randLocale < 0.333 ? 'en_US' : randLocale < 0.666 ? 'fr_CA' : 'en_GB';
      const firstName = randomStr();
      const lastName = randomStr();
      const gender = Math.random() < 0.5 ? 'M' : 'F';
      const emailAddress = randomEmail();
      const phoneNumber = randomStr();
      const nationality = 'Canadian';

      const billingAddress = new BillingAddress();
      billingAddress.setZip('K1L 6R2');
      billingAddress.setCountry('CA');

      const cardExpiry = new CardExpiry();
      cardExpiry.setYear(expiryYear);
      cardExpiry.setMonth(expiryMonth);

      const card = new Card();
      card.setCardNum(creditCardNumber);
      card.setCardExpiry(cardExpiry);
      card.setBillingAddress(billingAddress);

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

      const profileResult = await paysafe.getCustomerServiceHandler().createProfile(profile);
      // debug(profileResult);

      expect(profileResult).not.toHaveProperty('error');
      expect(profileResult.getId()).toBeDefined();
      expect(profileResult.getMerchantCustomerId()).toBe(merchantCustomerId);
      expect(profileResult.getLocale()).toBe(locale);
      expect(profileResult.getFirstName()).toBe(firstName);
      expect(profileResult.getLastName()).toBe(lastName);
      expect(profileResult.getGender()).toBe(gender);
      expect(profileResult.getEmail()).toBe(emailAddress);
      expect(profileResult.getPhone()).toBe(phoneNumber);
      expect(profileResult.getNationality()).toBe(nationality);
      expect(profileResult.getCards()).toBeDefined();
      expect(Array.isArray(profileResult.getCards())).toBe(true);
      expect(profileResult.getCards()).toHaveLength(1);
      const cards = profileResult.getCards() as Card[];
      expect(cards[0].getId()).toBeDefined();
      expect(cards[0].getLastDigits()).toBe(creditCardNumber.substring(creditCardNumber.length - 4));
    });

    it('should create a profile with a dateOfBirth', async () => {
      const merchantCustomerId = randomStr();
      const firstName = randomStr();
      const lastName = randomStr();

      const day = Math.floor(Math.random() * 28) + 1;
      const month = Math.floor(Math.random() * 12) + 1;
      const year = Math.floor(Math.random() * 117) + 1900;

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

      const profileResult = await paysafe.getCustomerServiceHandler().createProfile(profile);
      // debug(profileResult);

      expect(profileResult).not.toHaveProperty('error');
      expect(profileResult.getFirstName()).toBe(firstName);
      expect(profileResult.getLastName()).toBe(lastName);
      expect(profileResult.getDateOfBirth()).toBeDefined();
      const dob = profileResult.getDateOfBirth();
      expect(dob).toBeDefined();
      expect((dob as DateOfBirth)).toBeInstanceOf(DateOfBirth);
      expect((dob as DateOfBirth).getYear()).toBeDefined();
      expect((dob as DateOfBirth).getYear()).toBe(year);
      expect((dob as DateOfBirth).getMonth()).toBeDefined();
      expect((dob as DateOfBirth).getMonth()).toBe(month);
      expect((dob as DateOfBirth).getDay()).toBeDefined();
      expect((dob as DateOfBirth).getDay()).toBe(day);
    });

    it('should create a profile with an achBankAccount', async () => {

      const merchantCustomerId = randomStr();
      const accountNumber = randomInt(0, 999999).toString().padStart(6, '0');
      const routingNumber = '307075259';

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

      const profileResult = await paysafe.getCustomerServiceHandler().createProfile(profile);
      // debug(profileResult);

      expect(profileResult).not.toHaveProperty('error');
      expect(profileResult.getId()).toBeDefined();
      expect(profileResult.getACHBankAccounts()).toBeDefined();
      expect(Array.isArray(profileResult.getACHBankAccounts())).toBe(true);
      expect(profileResult.getACHBankAccounts()).toHaveLength(1);
      const achBankAccounts = profileResult.getACHBankAccounts() as ACHBankAccount[];

      expect(achBankAccounts[0].getId()).toBeDefined();
      expect(achBankAccounts[0].getRoutingNumber()).toBe(routingNumber);
      expect(achBankAccounts[0].getLastDigits()).toBe(accountNumber.substring(accountNumber.length - 2));
    });

    it('should create a profile with an bacsBankAccount and then add a mandate', async () => {
      const merchantCustomerId = randomStr();
      const accountNumber = randomInt(0, 999999).toString().padStart(8, '0');
      const sortCode = '086081'; // randomInt(0, 999999).toString().padStart(6, '0');

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

      // debug(profile);
      const profileResult = await paysafe.getCustomerServiceHandler().createProfile(profile);
      // debug(profileResult);

      expect(profileResult).not.toHaveProperty('error');
      expect(profileResult.getId()).toBeDefined();
      expect(profileResult.getBACSBankAccounts()).toBeDefined();
      expect(Array.isArray(profileResult.getBACSBankAccounts())).toBe(true);
      expect(profileResult.getBACSBankAccounts()).toHaveLength(1);
      const bacsBankAccounts = profileResult.getBACSBankAccounts() as BACSBankAccount[];

      expect(bacsBankAccounts[0].getId()).toBeDefined();
      expect(bacsBankAccounts[0].getSortCode()).toBe(sortCode);
      expect(bacsBankAccounts[0].getAccountNumber()).toBe(accountNumber);

      const mandate = new Mandate();
      mandate.setReference('9387234987');

      const pId = profileResult.getId() as string;
      const bankAccountId = (profileResult.getBACSBankAccounts() as BACSBankAccount[])[0].getId() as string;

      const updateResult = await paysafe.getCustomerServiceHandler().createMandate('BACS', pId, bankAccountId, mandate);
      // debug(updateResult);

      expect(updateResult).not.toHaveProperty('error');
    });
  });

  describe('Manipulating Profiles', () => {
    let profileId: string;

    beforeEach(async () => {
      const firstName = randomStr();
      const lastName = randomStr();
      const merchantCustomerId = randomStr();
      const profile = new Profile();
      profile.setFirstName(firstName);
      profile.setLastName(lastName);
      profile.setMerchantCustomerId(merchantCustomerId);
      profile.setLocale('en_US');
      const profileResult = await paysafe.getCustomerServiceHandler().createProfile(profile);
      profileId = profileResult.getId() as string;
    });

    it('should get a profile', async () => {
      const profileResult = await paysafe.getCustomerServiceHandler().getProfile(profileId);
      // debug(profileResult);
      expect(profileResult).not.toHaveProperty('error');
      expect(profileResult.getId()).toBe(profileId);
    });

    it('should update a profile', async () => {
      const firstName = randomStr();
      const merchantCustomerId = randomStr();

      const profile = new Profile();
      profile.setFirstName(firstName);
      profile.setMerchantCustomerId(merchantCustomerId);
      profile.setLocale('en_US');
      const profileResult = await paysafe.getCustomerServiceHandler().updateProfile(profileId, profile);
      // debug(profileResult);

      expect(profileResult).not.toHaveProperty('error');
      expect(profileResult.getId()).toBe(profileId);
      expect(profileResult.getFirstName()).toBe(firstName);
      expect(profileResult.getLastName()).toBeUndefined();
      expect(profileResult.getMerchantCustomerId()).toBe(merchantCustomerId);
    });

    it('should add a card', async () => {
      const cardExpiry = new CardExpiry();
      cardExpiry.setYear(expiryYear);
      cardExpiry.setMonth(expiryMonth);

      const card = new Card();
      card.setCardNum(creditCardNumber);
      card.setCardExpiry(cardExpiry);

      const cardResult = await paysafe.getCustomerServiceHandler().createCard(profileId, card);
      // debug(cardResult);

      expect(cardResult).not.toHaveProperty('error');
      expect(cardResult.getLastDigits()).toBeDefined();
      expect(cardResult.getLastDigits()).toBe(creditCardNumber.substring(creditCardNumber.length - 4));

      const expiry = cardResult.getCardExpiry() as CardExpiry;
      expect(expiry).toBeDefined();
      expect(expiry.getMonth()).toBe(expiryMonth);
      expect(expiry.getYear()).toBe(expiryYear);

      const cardId = cardResult.getId() as string;

      const profileResult = await paysafe.getCustomerServiceHandler().getProfile(profileId, [ 'cards' ]);
      // debug(profileResult);

      expect(profileResult).not.toHaveProperty('error');
      expect(profileResult).toBeDefined();
      expect(profileResult).toBeInstanceOf(Profile);
      expect(profileResult.getCards()).toBeDefined();
      expect(Array.isArray(profileResult.getCards())).toBe(true);

      let found = false;
      for (const c of profileResult.getCards() as Card[]) {
        expect(c.getId()).toBeDefined();
        if (c.getId() === cardId) { // this is the card we added
          found = true;
          // eslint-disable-next-line jest/no-conditional-expect
          expect(c.getLastDigits()).toBe(creditCardNumber.substring(creditCardNumber.length - 4));
        }
      }
      expect(found).toBe(true);
    });

    it('should add an address', async () => {
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

      const addressResult = await paysafe.getCustomerServiceHandler().createAddress(profileId, address);

      // debug(addressResult);
      expect(addressResult).not.toHaveProperty('error');
      expect(addressResult).toBeDefined();
      expect(addressResult).toBeInstanceOf(Address);
      expect(addressResult.getId()).toBeDefined();
      expect(addressResult.getNickName()).toBe(nickName);
      expect(addressResult.getRecipientName()).toBe(recipientName);
      expect(addressResult.getStreet()).toBe(street);
      expect(addressResult.getStreet2()).toBe(street2);
      expect(addressResult.getCity()).toBe(city);
      expect(addressResult.getState()).toBe(state);
      expect(addressResult.getZip()).toBe(zip);
      expect(addressResult.getCountry()).toBe(country);
      expect(addressResult.getPhone()).toBe(phoneNumber);
      expect(addressResult.getDefaultShippingAddressIndicator()).toBe(defaultShippingIndicator);
      const addressId = addressResult.getId() as string;

      const profileResult = await paysafe.getCustomerServiceHandler().getProfile(profileId, [ 'addresses' ]);

      // debug(profileResult);
      expect(profileResult).not.toHaveProperty('error');
      expect(profileResult).toBeDefined();
      expect(profileResult).toBeInstanceOf(Profile);
      expect(profileResult.getAddresses()).toBeDefined();
      expect(Array.isArray(profileResult.getAddresses())).toBe(true);
      let found = false;
      for (const a of profileResult.getAddresses() as Address[]) {
        expect(a.getId()).toBeDefined();
        if (a.getId() === addressId) { // this is the address we added
          found = true;
          expect(a.getNickName()).toBe(nickName); // eslint-disable-line jest/no-conditional-expect
          expect(a.getRecipientName()).toBe(recipientName); // eslint-disable-line jest/no-conditional-expect
          expect(a.getStreet()).toBe(street); // eslint-disable-line jest/no-conditional-expect
          expect(a.getStreet2()).toBe(street2); // eslint-disable-line jest/no-conditional-expect
          expect(a.getCity()).toBe(city); // eslint-disable-line jest/no-conditional-expect
          expect(a.getState()).toBe(state); // eslint-disable-line jest/no-conditional-expect
          expect(a.getZip()).toBe(zip); // eslint-disable-line jest/no-conditional-expect
          expect(a.getCountry()).toBe(country); // eslint-disable-line jest/no-conditional-expect
          expect(a.getPhone()).toBe(phoneNumber); // eslint-disable-line jest/no-conditional-expect
          expect(a.getDefaultShippingAddressIndicator()).toBe(defaultShippingIndicator);// eslint-disable-line jest/no-conditional-expect
        }
      }
      expect(found).toBe(true);
    });

    it('should add an achBankAccount', async () => {
      const accountNumber = randomInt(0, 999999).toString().padStart(6, '0');
      const routingNumber = '307075259';

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

      const achBankAccountResult = await paysafe.getCustomerServiceHandler().createACHBankAccount(profileId, achBankAccount);
      // debug(achBankAccountResult);

      expect(achBankAccountResult).toBeDefined();
    });
  });

  describe('Card Single Use Tokens', () => {
    let singleUseToken: string;

    beforeEach(async () => {
      singleUseToken = await getCardSingleUseToken();
    });

    it('should create a profile with a card using a single-use token', async () => {
      const merchantCustomerId = randomStr();
      const firstName = randomStr();
      const lastName = randomStr();

      const profile = new Profile();
      profile.setMerchantCustomerId(merchantCustomerId);
      profile.setLocale('en_US');
      profile.setFirstName(firstName);
      profile.setLastName(lastName);

      const card = new Card();
      card.setSingleUseToken(singleUseToken);
      profile.setCard(card);

      const profileResult = await paysafe.getCustomerServiceHandler().createProfile(profile);
      // debug(profileResult);

      expect(profileResult).not.toHaveProperty('error');
      expect(profileResult.getFirstName()).toBe(firstName);
      expect(profileResult.getLastName()).toBe(lastName);
      expect(profileResult.getCards()).toBeDefined();

      const cards = profileResult.getCards() as Card[];
      expect(cards).toBeDefined();
      expect(Array.isArray(cards)).toBe(true);
      expect(cards).toHaveLength(1);
      expect(cards[0].getLastDigits()).toBeDefined();
      expect(cards[0].getLastDigits()).toBe(creditCardNumber.substring(creditCardNumber.length - 4));

      const expiry = cards[0].getCardExpiry() as CardExpiry;
      expect(expiry).toBeDefined();
      expect(expiry.getMonth()).toBe(expiryMonth);
      expect(expiry.getYear()).toBe(expiryYear);
    });

    it('should create a profile and then add a card using a single-use token', async () => {
      const merchantCustomerId = randomStr();
      const firstName = randomStr();
      const lastName = randomStr();

      const profile = new Profile();
      profile.setMerchantCustomerId(merchantCustomerId);
      profile.setLocale('en_US');
      profile.setFirstName(firstName);
      profile.setLastName(lastName);

      const profileResult = await paysafe.getCustomerServiceHandler().createProfile(profile);
      // debug(profileResult);

      expect(profileResult).not.toHaveProperty('error');
      expect(profileResult.getFirstName()).toBe(firstName);
      expect(profileResult.getLastName()).toBe(lastName);

      const card = new Card();
      card.setSingleUseToken(singleUseToken);

      const pId = profileResult.getId() as string;

      const cardResult = await paysafe.getCustomerServiceHandler().createCard(pId, card);
      // debug(cardResult);

      expect(cardResult).not.toHaveProperty('error');
      expect(cardResult.getLastDigits()).toBeDefined();
      expect(cardResult.getLastDigits()).toBe(creditCardNumber.substring(creditCardNumber.length - 4));

      const expiry = cardResult.getCardExpiry() as CardExpiry;
      expect(expiry).toBeDefined();
      expect(expiry.getMonth()).toBe(expiryMonth);
      expect(expiry.getYear()).toBe(expiryYear);
    });

    it('should create a profile, then add an address, then add a card using a single-use token, and then update the card\'s billing address', async () => {
      const merchantCustomerId = randomStr();
      const firstName = randomStr();
      const lastName = randomStr();
      const street = randomStr();
      const street2 = randomStr();
      const city = randomStr();
      const state = 'ON';
      const zip = 'K1L 6R2';
      const country = 'CA';

      const profile = new Profile();
      profile.setMerchantCustomerId(merchantCustomerId);
      profile.setLocale('en_US');
      profile.setFirstName(firstName);
      profile.setLastName(lastName);

      const profileResult = await paysafe.getCustomerServiceHandler().createProfile(profile);
      // debug(profileResult);

      expect(profileResult).not.toHaveProperty('error');
      expect(profileResult.getId()).toBeDefined();
      expect(profileResult.getFirstName()).toBe(firstName);
      expect(profileResult.getLastName()).toBe(lastName);

      const profileId = profileResult.getId() as string;

      const address = new Address();
      address.setStreet(street);
      address.setStreet2(street2);
      address.setCity(city);
      address.setState(state);
      address.setZip(zip);
      address.setCountry(country);

      const addressResult = await paysafe.getCustomerServiceHandler().createAddress(profileId, address);
      // debug(addressResult);

      expect(addressResult).not.toHaveProperty('error');
      expect(addressResult.getId()).toBeDefined();
      expect(addressResult.getStreet()).toBe(street);
      expect(addressResult.getStreet2()).toBe(street2);

      const addressId = addressResult.getId() as string;

      const card = new Card();
      card.setSingleUseToken(singleUseToken);

      const cardResult = await paysafe.getCustomerServiceHandler().createCard(profileId, card);
      // debug(cardResult);

      expect(cardResult).not.toHaveProperty('error');
      expect(cardResult.getId()).toBeDefined();
      expect(cardResult.getLastDigits()).toBeDefined();
      expect(cardResult.getLastDigits()).toBe(creditCardNumber.substring(creditCardNumber.length - 4));

      const cardId = cardResult.getId() as string;

      const expiry = cardResult.getCardExpiry() as CardExpiry;
      expect(expiry).toBeDefined();
      expect(expiry.getMonth()).toBe(expiryMonth);
      expect(expiry.getYear()).toBe(expiryYear);

      const cardUpdate = new Card();
      cardUpdate.setBillingAddressId(addressId);
      cardUpdate.setCardExpiry(expiry);

      const cardUpdateResult = await paysafe.getCustomerServiceHandler().updateCard(profileId, cardId, cardUpdate);
      // debug(cardUpdateResult);

      expect(cardUpdateResult).not.toHaveProperty('error');
    });
  });
});

async function getCardSingleUseToken(): Promise<string> {
  return new Promise((resolve, reject) => {
    const headers: request.Headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + Buffer.from(`${singleUseApiKey}:${singleUseApiPassword}`).toString('base64'),
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

    // debug(options);
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
