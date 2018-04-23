import { expect } from 'chai';
import * as Debug from 'debug';
import * as dotenv from 'dotenv';
import 'mocha';
import * as request from 'request';

import { Paysafe } from '../index';

import { Authorization } from './authorization';
import { Verification } from './verification';

import { CardExpiry } from '../common/card-expiry';
import { BillingDetails } from './lib/billing-details';
import { Card } from './lib/card';

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
    expect(result).to.not.have.property('error');
    expect(result).to.have.property('status').that.equals('READY');
  }).timeout(timeout);

  describe('Card Single Use Tokens', () => {

    let singleUseToken: string;

    beforeEach(function (done) {
      this.timeout(timeout);
      getCardSingleUseToken().then((result) => {
        singleUseToken = result;
        done();
      }).catch(done);
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
      debug(verificationResult);
      expect(verificationResult).to.not.have.property('error');
      expect(verificationResult.getId()).to.not.be.an('undefined');
      expect(verificationResult.getMerchantRefNum()).to.equal(merchantRefNum);
      expect(verificationResult.getStatus()).to.equal('COMPLETED');

    }).timeout(timeout);

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
      debug(authorizationResult);
      expect(authorizationResult).to.not.have.property('error');
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

    }).timeout(timeout);

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
