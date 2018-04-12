"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_array_1 = require("../common/create-array");
const amount_request_1 = require("./amount-request");
const splitpay_1 = require("./lib/splitpay");
const AMOUNT_MAX = 99999999999;
/**
 * abstract parent class of any Card Payments API request
 */
class SplitpayRequest extends amount_request_1.AmountRequest {
    constructor(resp) {
        super(resp);
        if (!resp) {
            return;
        }
        if (typeof resp.splitpay !== 'undefined') {
            if (Array.isArray(resp.splitpay)) {
                this.splitpay = create_array_1.createArray(resp.splitpay, splitpay_1.Splitpay);
            }
            else {
                this.splitpay = new splitpay_1.Splitpay(resp.splitpay);
            }
        }
    }
    setSplitpay(splitpay) { this.splitpay = splitpay; }
    getSplitpay() { return this.splitpay; }
}
exports.SplitpayRequest = SplitpayRequest;
