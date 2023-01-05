"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Settlement = void 0;
const splitpay_request_1 = require("./splitpay-request");
const AMOUNT_MAX = 99999999999;
class Settlement extends splitpay_request_1.SplitpayRequest {
    constructor(resp) {
        super(resp);
        if (!resp) {
            return;
        }
        if (typeof resp.availableToRefund !== 'undefined') {
            this.availableToRefund = resp.availableToRefund;
        }
        if (typeof resp.status !== 'undefined') {
            this.status = resp.status;
        }
    }
    getAvailableToRefund() { return this.availableToRefund; }
    setStatus(status) { this.status = status; }
    getStatus() { return this.status; }
}
exports.Settlement = Settlement;
