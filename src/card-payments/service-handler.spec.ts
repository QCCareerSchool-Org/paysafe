import Debug from 'debug';
import * as dotenv from 'dotenv';
import 'jest';
import request from 'request';

import { CardExpiry } from '../common/card-expiry';
import { PaysafeError } from '../common/paysafe-error';
import { Paysafe } from '../index';
import { Authorization } from './authorization';
import { BillingDetails } from './lib/billing-details';
import { Card } from './lib/card';
import { Verification } from './verification';

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

const debug = Debug('paysafe-testing-card-payments');

const paysafe = new Paysafe(apiKey, apiPassword, 'TEST', paysafeAccountNumber);

const rand = Math.random();
// tslint:disable-next-line:no-magic-numbers
const creditCardNumber = rand < 0.333 ? '4510150000000321' : rand < 0.667 ? '4500030000000004' : '4003440000000007';
const expiryMonth = 12;
const expiryYear = new Date().getFullYear() + 1;

const timeout = 80000; // 80 seconds

/* tslint:disable:no-magic-numbers */

describe('Card Payments API', () => {

  it('should be up and running', async () => {
    const result = await paysafe.getCardServiceHandler().monitor();
    expect(result).not.toHaveProperty('error');
    expect(result).toHaveProperty('status');
    expect(result.status).toBe('READY');
  });

  describe('Card Single Use Tokens', () => {
    let singleUseToken: string;

    beforeEach(async () => {
      singleUseToken = await getCardSingleUseToken();
    });

    it('should verify a single-use token', async () => {
      const merchantRefNum = randomStr();

      const verification = new Verification();
      verification.setMerchantRefNum(merchantRefNum);

      const card = new Card();
      card.setPaymentToken(singleUseToken);
      verification.setCard(card);

      const billingDetails = new BillingDetails();
      billingDetails.setZip('K1L 6R2');
      verification.setBillingDetails(billingDetails);

      const verificationResult = await paysafe.getCardServiceHandler().verify(verification);
      // debug(verificationResult);
      expect(verificationResult).not.toHaveProperty('error');
      expect(verificationResult.getId()).toBeDefined();
      expect(verificationResult.getMerchantRefNum()).toBe(merchantRefNum);
      expect(verificationResult.getStatus()).toBe('COMPLETED');
    });

    it('should perform an authorization on a single-use token', async () => {
      const merchantRefNum = randomStr();
      const amount = randomInt(200, 300);

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

      const authorizationResult = await paysafe.getCardServiceHandler().authorize(authorization);
      // debug(authorizationResult);
      expect(authorizationResult).not.toHaveProperty('error');
      expect(authorizationResult.getId()).toBeDefined();
      expect(authorizationResult.getMerchantRefNum()).toBe(merchantRefNum);
      expect(authorizationResult.getAmount()).toBe(amount);
      expect(authorizationResult.getStatus()).toBe('COMPLETED');
      expect(authorizationResult.getTxnTime()).toBeInstanceOf(Date);
      const c = authorizationResult.getCard();
      expect(c).toBeDefined();
      expect((c as Card).getLastDigits()).toBe(creditCardNumber.substring(creditCardNumber.length - 4));
      const exp = (c as Card).getCardExpiry();
      expect(exp).toBeDefined();
      expect((exp as CardExpiry).getMonth()).toBe(expiryMonth);
      expect((exp as CardExpiry).getYear()).toBe(expiryYear);
    });

    it('should perform an authorization on a single-use token and fail', async () => {
      const merchantRefNum = randomStr();
      const amount = 11;

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

      const authorizationResult = await paysafe.getCardServiceHandler().authorize(authorization);
      // debug(authorizationResult);
      expect(authorizationResult).toHaveProperty('error');
      const e = authorizationResult.getError();
      expect(e).toBeDefined();
      expect((e as PaysafeError).getCode()).toBe(3022);
      expect(authorizationResult.getId()).toBeDefined();
      expect(authorizationResult.getMerchantRefNum()).toBe(merchantRefNum);
      expect(authorizationResult).not.toHaveProperty('amount');
      expect(authorizationResult).not.toHaveProperty('status');
      expect(authorizationResult).not.toHaveProperty('txnTime');
      expect(authorizationResult).not.toHaveProperty('card');
    });

    it('should perform an authorization on a single-use token and have a server error', async () => {
      const merchantRefNum = randomStr();
      const amount = 20;

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

      await expect(paysafe.getCardServiceHandler().authorize(authorization)).rejects.toBeDefined();
    });
  });
});

async function getCardSingleUseToken(): Promise<string> {
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
