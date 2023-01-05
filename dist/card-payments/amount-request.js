"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmountRequest = void 0;
const request_1 = require("./request");
const AMOUNT_MAX = 99999999999;
/**
 * abstract parent class of any Card Payments API request pbject that has an amount
 */
class AmountRequest extends request_1.Request {
    constructor(resp) {
        super(resp);
        if (!resp) {
            return;
        }
        if (typeof resp.amount !== 'undefined') {
            this.amount = resp.amount;
        }
    }
    setAmount(amount) {
        if (amount > AMOUNT_MAX) {
            throw new Error('invalid amount');
        }
        this.amount = amount;
    }
    getAmount() { return this.amount; }
}
exports.AmountRequest = AmountRequest;
