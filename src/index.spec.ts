import Debug from 'debug';
import * as dotenv from 'dotenv';
import request from 'request';
import 'jest';

import { Authorization } from './card-payments/authorization';
import { BillingDetails } from './card-payments/lib/billing-details';
import { Card } from './card-payments/lib/card';
import { MerchantDescriptor } from './card-payments/lib/merchant-descriptor';
import { StoredCredential, StoredCredentialOccurrence, StoredCredentialType } from './card-payments/lib/stored-credential';
import { Settlement } from './card-payments/settlement';
import { Verification } from './card-payments/verification';
import { CardExpiry } from './common/card-expiry';

import { Address } from './customer-vault/address';
import { Card as CustomerVaultCard } from './customer-vault/card';
import { BillingAddress } from './customer-vault/lib/billing-address';
import { Profile } from './customer-vault/profile';

import { Paysafe } from './index';

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

  it('should be up and running', async () => {
    const result = await paysafe.getCardServiceHandler().monitor();
    expect(result).toHaveProperty('status');
    expect(result.status).toBe('READY');
  });
});

describe('Paysafe API with Single-Use Tokens', () => {

  let singleUseToken: string;

  beforeEach(async () => {
    singleUseToken = await getSingleUseToken();
  });

  it('should perform an authorization on a single-use token and then create a profile along with that same card', async () => {
    const merchantRefNum = randomStr();
    const amount = randomInt(200, 300);
    const merchantCustomerId = randomStr();
    const firstName = randomStr();
    const lastName = randomStr();

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

    const authorizationResult = await paysafe.getCardServiceHandler().authorize(authorization);
    // debug(authorizationResult);

    expect(authorizationResult.getId()).toBeDefined();
    expect(authorizationResult.getMerchantRefNum()).toBe(merchantRefNum);
    expect(authorizationResult.getAmount()).toBe(amount);
    expect(authorizationResult.getStatus()).toBe('COMPLETED');
    const c = authorizationResult.getCard();
    expect(c).toBeDefined();
    expect((c as Card).getLastDigits()).toBe(creditCardNumber.substring(creditCardNumber.length - 4));
    const exp = (c as Card).getCardExpiry();
    expect(exp).toBeDefined();
    expect((exp as CardExpiry).getMonth()).toBe(expiryMonth);
    expect((exp as CardExpiry).getYear()).toBe(expiryYear);

    const profileResult = await paysafe.getCustomerServiceHandler().createProfile(profile);
    // debug(profileResult);
    expect(profileResult.getId()).toBeDefined();
    expect(profileResult.getMerchantCustomerId()).toBe(merchantCustomerId);
    expect(profileResult.getFirstName()).toBe(firstName);
    expect(profileResult.getLastName()).toBe(lastName);
    const cards: CustomerVaultCard[] = profileResult.getCards() as CustomerVaultCard[];
    expect(cards).toBeDefined();
    expect(cards[0].getLastDigits()).toBe(creditCardNumber.substring(creditCardNumber.length - 4));
  });

  it('should create a profile along with a card using a single-use token and then perform an authorization on that single-use token', async () => {
    const merchantRefNum = randomStr();
    const amount = randomInt(200, 300);
    const merchantCustomerId = randomStr();
    const firstName = randomStr();
    const lastName = randomStr();

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

    const profileResult = await paysafe.getCustomerServiceHandler().createProfile(profile);
    // debug(profileResult);
    expect(profileResult.getId()).toBeDefined();
    expect(profileResult.getMerchantCustomerId()).toBe(merchantCustomerId);
    expect(profileResult.getFirstName()).toBe(firstName);
    expect(profileResult.getLastName()).toBe(lastName);
    const cards = profileResult.getCards() as CustomerVaultCard[];
    expect(cards).toBeDefined();
    expect(cards[0].getLastDigits()).toBe(creditCardNumber.substring(creditCardNumber.length - 4));
    const authorizationResult = await paysafe.getCardServiceHandler().authorize(authorization);
    // debug(authorizationResult);
    expect(authorizationResult.getId()).toBeDefined();
    expect(authorizationResult.getMerchantRefNum()).toBe(merchantRefNum);
    expect(authorizationResult.getAmount()).toBe(amount);
    expect(authorizationResult.getStatus()).toBe('COMPLETED');
    const c = authorizationResult.getCard() as Card;
    expect(c).toBeDefined();
    expect(c.getLastDigits()).toBe(creditCardNumber.substring(creditCardNumber.length - 4));
    const exp = c.getCardExpiry() as CardExpiry;
    expect(exp).toBeDefined();
    expect(exp.getMonth()).toBe(expiryMonth);
    expect(exp.getYear()).toBe(expiryYear);
  });

  it('should create a profile along with a card using a single-use token and then perform an authorization using a storedCredentials object on that single-use token', async () => {
    const merchantRefNum = randomStr();
    const amount = randomInt(200, 300);
    const merchantCustomerId = randomStr();
    const firstName = randomStr();
    const lastName = randomStr();

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

    const storedCredential = new StoredCredential();
    storedCredential.setType(StoredCredentialType.RECURRING);
    storedCredential.setOccurence(StoredCredentialOccurrence.INITIAL);
    authorization.setStoredCredential(storedCredential);

    const authCard = new Card();
    authCard.setPaymentToken(singleUseToken);
    authorization.setCard(authCard);

    const billingDetails = new BillingDetails();
    billingDetails.setZip('K1L 6R2');
    authorization.setBillingDetails(billingDetails);

    const profileResult = await paysafe.getCustomerServiceHandler().createProfile(profile);
    // debug(profileResult);
    expect(profileResult.getId()).toBeDefined();
    expect(profileResult.getMerchantCustomerId()).toBe(merchantCustomerId);
    expect(profileResult.getFirstName()).toBe(firstName);
    expect(profileResult.getLastName()).toBe(lastName);
    const cards = profileResult.getCards() as CustomerVaultCard[];
    expect(cards).toBeDefined();
    expect(cards[0].getLastDigits()).toBe(creditCardNumber.substring(creditCardNumber.length - 4));

    const authorizationResult = await paysafe.getCardServiceHandler().authorize(authorization);
    // debug(authorizationResult);
    expect(authorizationResult.getId()).toBeDefined();
    expect(authorizationResult.getMerchantRefNum()).toBe(merchantRefNum);
    expect(authorizationResult.getAmount()).toBe(amount);
    expect(authorizationResult.getStatus()).toBe('COMPLETED');
    const c = authorizationResult.getCard() as Card;
    expect(c).toBeDefined();
    expect(c.getLastDigits()).toBe(creditCardNumber.substring(creditCardNumber.length - 4));
    const exp = c.getCardExpiry() as CardExpiry;
    expect(exp).toBeDefined();
    expect(exp.getMonth()).toBe(expiryMonth);
    expect(exp.getYear()).toBe(expiryYear);
  });

  it('should verify a single-use token, create a profile, add an address, add a card using the single-use token, update the card\'s billingAddresId, and then charge the card\'s permanent payment token', async () => {
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

    const verification = new Verification();
    verification.setMerchantRefNum(merchantRefNumVerify);
    const verificationCard = new Card();
    verificationCard.setPaymentToken(singleUseToken);
    verification.setCard(verificationCard);
    const billingDetails = new BillingDetails();
    billingDetails.setZip('K1L 6R2');
    verification.setBillingDetails(billingDetails);

    // console.log(verification);

    const verificationResult = await paysafe.getCardServiceHandler().verify(verification);
    // debug(verificationResult);

    // console.log('VERIFICATION', verificationResult);

    expect(verificationResult.getId()).toBeDefined();
    expect(verificationResult.getStatus()).toBe('COMPLETED');

    const profile = new Profile();
    profile.setMerchantCustomerId(merchantCustomerId);
    profile.setLocale('en_US');
    profile.setFirstName(firstName);
    profile.setLastName(lastName);

    // console.log(profile);

    const profileResult = await paysafe.getCustomerServiceHandler().createProfile(profile);
    // debug(profileResult);

    // console.log('PROFILE', profileResult);

    expect(profileResult.getId()).toBeDefined();
    expect(profileResult.getStatus()).toBe('ACTIVE');
    const pId = profileResult.getId() as string;

    const address = new Address();
    address.setStreet(street);
    address.setStreet2(street2);
    address.setCity(city);
    address.setZip('K1L 6R2');
    address.setCountry(country);

    // console.log(address);

    const addressResult = await paysafe.getCustomerServiceHandler().createAddress(pId, address);
    // debug(addressResult);

    // console.log('ADDRESS', addressResult);

    expect(addressResult.getId()).toBeDefined();
    expect(addressResult.getStatus()).toBe('ACTIVE');
    const aId = addressResult.getId() as string;

    const card = new CustomerVaultCard();
    card.setSingleUseToken(singleUseToken);

    // console.log(card);

    const cardResult = await paysafe.getCustomerServiceHandler().createCard(pId, card);
    // debug(cardResult);

    // console.log('CARD', cardResult);

    expect(cardResult.getId()).toBeDefined();
    expect(cardResult.getStatus()).toBe('ACTIVE');
    const cId = cardResult.getId() as string;

    const card2 = new CustomerVaultCard(cardResult);
    card2.setBillingAddressId(aId);

    // console.log(card);

    const cardResult2 = await paysafe.getCustomerServiceHandler().updateCard(pId, cId, card2);
    // debug(cardResult2);

    // console.log('CARD', cardResult);

    const authorization = new Authorization();
    authorization.setAmount(amount);
    authorization.setCurrencyCode('CAD');
    authorization.setMerchantRefNum(merchantRefNumAuth);
    authorization.setRecurring('RECURRING');
    const card3 = new Card();
    card3.setPaymentToken(cardResult2.getPaymentToken() as string);
    authorization.setCard(card3);

    // console.log(authorization);

    const authorizationResult = await paysafe.getCardServiceHandler().authorize(authorization);
    debug(authorizationResult);

    // console.log('AUTHORIZATION', authorizationResult);

    expect(authorizationResult.getId()).toBeDefined();
    expect(authorizationResult.getAmount()).toBe(amount);
  });

  it('should verify a single-use token, create a profile, add an address, add a card using the single-use token, update the card\'s billingAddresId, and then charge the single-use token', async () => {
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

    const verification = new Verification();
    verification.setMerchantRefNum(merchantRefNumVerify);
    const verificationCard = new Card();
    verificationCard.setPaymentToken(singleUseToken);
    verification.setCard(verificationCard);
    const verificationBillingDetails = new BillingDetails();
    verificationBillingDetails.setZip('K1L 6R2');
    verification.setBillingDetails(verificationBillingDetails);

    // console.log(verification);

    const verificationResult = await paysafe.getCardServiceHandler().verify(verification);
    // debug(verificationResult);

    // console.log('VERIFICATION', verificationResult);

    expect(verificationResult.getId()).toBeDefined();
    expect(verificationResult.getStatus()).toBe('COMPLETED');

    const profile = new Profile();
    profile.setMerchantCustomerId(merchantCustomerId);
    profile.setLocale('en_US');
    profile.setFirstName(firstName);
    profile.setLastName(lastName);

    // console.log(profile);

    const profileResult = await paysafe.getCustomerServiceHandler().createProfile(profile);
    // debug(profileResult);

    // console.log('PROFILE', profileResult);

    expect(profileResult.getId()).toBeDefined();
    expect(profileResult.getStatus()).toBe('ACTIVE');
    const pId = profileResult.getId() as string;

    const address = new Address();
    address.setStreet(street);
    address.setStreet2(street2);
    address.setCity(city);
    address.setZip('K1L 6R2');
    address.setCountry(country);

    // console.log(address);

    const addressResult = await paysafe.getCustomerServiceHandler().createAddress(pId, address);
    // debug(addressResult);

    // console.log('ADDRESS', addressResult);

    expect(addressResult.getId()).toBeDefined();
    expect(addressResult.getStatus()).toBe('ACTIVE');
    const aId = addressResult.getId() as string;

    const card = new CustomerVaultCard();
    card.setSingleUseToken(singleUseToken);

    // console.log(card);

    const cardResult = await paysafe.getCustomerServiceHandler().createCard(pId, card);
    // debug(cardResult);

    // console.log('CARD', cardResult);

    expect(cardResult.getId()).toBeDefined();
    expect(cardResult.getStatus()).toBe('ACTIVE');
    const cId = cardResult.getId() as string;

    const card2 = new CustomerVaultCard(cardResult);
    card2.setBillingAddressId(aId);

    // console.log(card);

    const cardUpdateResult = await paysafe.getCustomerServiceHandler().updateCard(pId, cId, card2);
    // debug(cardUpdateResult);

    // console.log('CARD', cardResult);

    const authorization = new Authorization();
    authorization.setAmount(amount);
    authorization.setCurrencyCode('CAD');
    authorization.setMerchantRefNum(merchantRefNumAuth);
    authorization.setRecurring('INITIAL');
    const card3 = new Card();
    card3.setPaymentToken(singleUseToken);
    authorization.setCard(card3);
    const authBillingDetails = new BillingDetails();
    authBillingDetails.setZip('K1L 6R2');
    authorization.setBillingDetails(authBillingDetails);

    // console.log(authorization);

    const authorizationResult = await paysafe.getCardServiceHandler().authorize(authorization);
    // debug(authorizationResult);

    // console.log('AUTHORIZATION', authorizationResult);

    expect(authorizationResult.getId()).toBeDefined();
    expect(authorizationResult.getAmount()).toBe(amount);
  });
});

describe('Paysafe API Auths, Refunds, and Voids', () => {

  let authorizationId: string;

  // it('should charge a card stored in a profile', (done) => {
  //   const merchantRefNum = randomStr() + '_auth';
  //   const amount = randomInt(200, 300);
  //   const currencyCode = 'CAD';
  //   const street = randomStr();
  //   const city = randomStr();
  //   const state = 'ON';
  //   const zip = 'K1A 1A1';
  //   const country = 'CA';
  //   const dynamicDescriptor = randomStr();

  //   try {
  //     const authorization = new Authorization();
  //     authorization.setMerchantRefNum(merchantRefNum);
  //     authorization.setAmount(amount);
  //     authorization.setCurrencyCode(currencyCode);
  //     authorization.setSettleWithAuth(false);

  //     const card = new Card();
  //     card.setPaymentToken(paymentToken);
  //     authorization.setCard(card);

  //     const billingDetails = new BillingDetails();
  //     billingDetails.setStreet(street);
  //     billingDetails.setCity(city);
  //     billingDetails.setState(state);
  //     billingDetails.setZip(zip);
  //     billingDetails.setCountry(country);
  //     authorization.setBillingDetails(billingDetails);

  //     const merchantDescriptor = new MerchantDescriptor();
  //     merchantDescriptor.setDynamicDescriptor(dynamicDescriptor);
  //     merchantDescriptor.setPhone('18002671829');
  //     authorization.setMerchantDescriptor(merchantDescriptor);

  //     const cardServiceHandler = paysafe.getCardServiceHandler();
  //     // console.log('REQ 5', authorization);
  //     cardServiceHandler.authorize(authorization).then((authorizationResult) => {
  //       // debug(authorizationResult);
  //       // console.log('RES 5', authorizationResult);
  //       expect(authorizationResult).toHaveProperty('id').that.is.a('string');
  //       expect(authorizationResult).toHaveProperty('merchantRefNum').that.is.a('string').that.equals(merchantRefNum);
  //       expect(authorizationResult).toHaveProperty('amount').that.is.a('number').that.equals(amount);
  //       expect(authorizationResult).toHaveProperty('currencyCode').that.is.a('string').that.equals(currencyCode);
  //       expect(authorizationResult).toHaveProperty('card').that.is.instanceof(Card);
  //       const c = authorizationResult.getCard();
  //       if (typeof c !== 'undefined') {
  //         const lastFourDigits = creditCardNumber.substring(creditCardNumber.length - 4);
  //         expect(c.getLastDigits()).toBe(lastFourDigits);
  //       }
  //       authorizationId = authorizationResult.getId() as string;
  //       done();
  //     }).catch((err) => done(new Error(JSON.stringify(err))));
  //   } catch (err) {
  //     done(err);
  //   }
  // }).timeout(timeout);

  // let voidAuthId: string;
  // it('should void an authorization', (done) => {
  //   const amount = randomInt(100, 200);
  //   const merchantRefNum = randomStr() + '_void';

  //   try {
  //     const authorizationReversal = new VoidAuth();
  //     authorizationReversal.setAmount(amount);
  //     authorizationReversal.setMerchantRefNum(merchantRefNum);

  //     paysafe.getCardServiceHandler().void(authorizationId, authorizationReversal).then((voidAuthResult) => {
  //       // debug(voidAuthResult);
  //       expect(voidAuthResult.getId()).toBeDefined();
  //       voidAuthId = voidAuthResult.getId() as string;
  //       expect(voidAuthResult.getMerchantRefNum()).toBe(merchantRefNum);
  //       expect(voidAuthResult.getStatus()).toBe('COMPLETED');
  //       expect(voidAuthResult.getAmount()).toBe(amount);
  //       done();
  //     }).catch((err) => { console.log(err); done(new Error(JSON.stringify(err))); });
  //   } catch (err) {
  //     done(err);
  //   }
  // }).timeout(timeout);

  // it('should look up a void authorization', (done) => {
  //   try {
  //     paysafe.getCardServiceHandler().getVoid(voidAuthId).then((voidAuthResult) => {
  //       // debug(voidAuthResult);
  //       expect(voidAuthResult.getId()).toBeDefined();
  //       expect(voidAuthResult.getId()).toBe(voidAuthId);
  //       done();
  //     }).catch((err) => done(new Error(JSON.stringify(err))));
  //   } catch (err) {
  //     done(err);
  //   }
  // }).timeout(timeout);

  it('should charge a card and then settle it', async () => {
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

    const authorizationResult = await paysafe.getCardServiceHandler().authorize(authorization);
    // debug(authorizationResult);

    expect(authorizationResult).toHaveProperty('id');
    expect(typeof (authorizationResult as unknown as { id: unknown }).id).toBe('string');
    expect(authorizationResult).toHaveProperty('merchantRefNum');
    expect(typeof (authorizationResult as unknown as { merchantRefNum: unknown }).merchantRefNum).toBe('string');
    expect((authorizationResult as unknown as { merchantRefNum: unknown }).merchantRefNum).toBe(merchantRefNumAuth);
    expect(authorizationResult).toHaveProperty('amount');
    expect(typeof (authorizationResult as unknown as { amount: unknown }).amount).toBe('number');
    expect((authorizationResult as unknown as { amount: unknown }).amount).toBe(amount);
    expect(authorizationResult).toHaveProperty('currencyCode');
    expect(typeof (authorizationResult as unknown as { currencyCode: unknown }).currencyCode).toBe('string');
    expect((authorizationResult as unknown as { currencyCode: unknown }).currencyCode).toBe(currencyCode);
    expect(authorizationResult).toHaveProperty('card');
    expect((authorizationResult as unknown as { card: unknown }).card).toBeInstanceOf(Card);
    const c = authorizationResult.getCard() as Card;
    expect(c.getLastDigits()).toBe(creditCardNumber.substring(creditCardNumber.length - 4));
    authorizationId = authorizationResult.getId() as string;

    const settlement = new Settlement();
    settlement.setMerchantRefNum(merchantRefNumSettlement);
    settlement.setAmount(amount);

    const settlementResult = await paysafe.getCardServiceHandler().settle(authorizationId, settlement);
    // debug(settlementResult);
  });

  it('should create a profile along with a card with a billing address, and then be able to charge that card using its permanent card token without having to re-suply the AVS information', async () => {
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

    const profileResult = await paysafe.getCustomerServiceHandler().createProfile(profile);
    // debug(profileResult);

    // console.log('PROFILE', profileResult);

    expect(profileResult.getId()).toBeDefined();
    expect(profileResult.getStatus()).toBe('ACTIVE');
    expect(profileResult.getCards()).toBeDefined();
    const cards = profileResult.getCards() as CustomerVaultCard[];
    expect(Array.isArray(cards)).toBe(true);
    expect(cards).toHaveLength(1);
    expect(cards[0].getPaymentToken()).toBeDefined();

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

    const authorizationResult = await paysafe.getCardServiceHandler().authorize(authorization);
    // debug(authorizationResult);

    // console.log('AUTHORIZATION', authorizationResult);

    expect(authorizationResult.getId()).toBeDefined();
    expect(authorizationResult.getAmount()).toBe(amount);
  });
});

async function getSingleUseToken(): Promise<string> {
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

  return new Promise((resolve, reject) => {
    request(options, (err, response, body) => {
      if (err) {
        return reject(err);
      }
      if (typeof body.paymentToken === 'string') {
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
