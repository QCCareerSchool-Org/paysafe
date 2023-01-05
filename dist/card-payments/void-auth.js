"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoidAuth = void 0;
const amount_request_1 = require("./amount-request");
const AMOUNT_MAX = 99999999999;
class VoidAuth extends amount_request_1.AmountRequest {
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
exports.VoidAuth = VoidAuth;
