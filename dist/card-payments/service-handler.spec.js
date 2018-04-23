"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const Debug = require("debug");
const dotenv = require("dotenv");
require("mocha");
const request = require("request");
const index_1 = require("../index");
const authorization_1 = require("./authorization");
const verification_1 = require("./verification");
const billing_details_1 = require("./lib/billing-details");
const card_1 = require("./lib/card");
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
const paysafe = new index_1.Paysafe(apiKey, apiPassword, 'TEST', paysafeAccountNumber);
const rand = Math.random();
// tslint:disable-next-line:no-magic-numbers
const creditCardNumber = rand < 0.333 ? '4510150000000321' : rand < 0.667 ? '4500030000000004' : '4003440000000007';
const expiryMonth = 12;
const expiryYear = new Date().getFullYear() + 1;
const timeout = 80000; // 80 seconds
/* tslint:disable:no-magic-numbers */
describe('Card Payments API', () => {
    it('should be up and running', () => __awaiter(this, void 0, void 0, function* () {
        const result = yield paysafe.getCardServiceHandler().monitor();
        chai_1.expect(result).to.not.have.property('error');
        chai_1.expect(result).to.have.property('status').that.equals('READY');
    })).timeout(timeout);
    describe('Card Single Use Tokens', () => {
        let singleUseToken;
        beforeEach(function (done) {
            this.timeout(timeout);
            getCardSingleUseToken().then((result) => {
                singleUseToken = result;
                done();
            }).catch(done);
        });
        it('should verify a single-use token', () => __awaiter(this, void 0, void 0, function* () {
            const merchantRefNum = randomStr();
            const verification = new verification_1.Verification();
            verification.setMerchantRefNum(merchantRefNum);
            const card = new card_1.Card();
            card.setPaymentToken(singleUseToken);
            verification.setCard(card);
            const billingDetails = new billing_details_1.BillingDetails();
            billingDetails.setZip('K1L 6R2');
            verification.setBillingDetails(billingDetails);
            const verificationResult = yield paysafe.getCardServiceHandler().verify(verification);
            debug(verificationResult);
            chai_1.expect(verificationResult).to.not.have.property('error');
            chai_1.expect(verificationResult.getId()).to.not.be.an('undefined');
            chai_1.expect(verificationResult.getMerchantRefNum()).to.equal(merchantRefNum);
            chai_1.expect(verificationResult.getStatus()).to.equal('COMPLETED');
        })).timeout(timeout);
        it('should perform an authorization on a single-use token', () => __awaiter(this, void 0, void 0, function* () {
            const merchantRefNum = randomStr();
            const amount = randomInt(200, 300);
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
            const authorizationResult = yield paysafe.getCardServiceHandler().authorize(authorization);
            debug(authorizationResult);
            chai_1.expect(authorizationResult).to.not.have.property('error');
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
        })).timeout(timeout);
    });
});
function getCardSingleUseToken() {
    return new Promise((resolve, reject) => {
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
                return reject(err);
            }
            if (typeof body.paymentToken !== 'undefined') {
                resolve(body.paymentToken);
            }
            else {
                reject(new Error('unexpected result'));
            }
        });
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
