"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const splitpay_request_1 = require("./splitpay-request");
const AMOUNT_MAX = 99999999999;
class Refund extends splitpay_request_1.SplitpayRequest {
    constructor(resp) {
        super(resp);
        if (!resp) {
            return;
        }
        if (typeof resp.status !== 'undefined') {
            this.status = resp.status;
        }
    }
    setStatus(status) { this.status = status; }
    getStatus() { return this.status; }
}
exports.Refund = Refund;
