"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcquirerResponse = void 0;
class AcquirerResponse {
    constructor(resp) {
        if (!resp) {
            return;
        }
        if (typeof resp.code !== 'undefined') {
            this.code = resp.code;
        }
        if (typeof resp.responseCode !== 'undefined') {
            this.responseCode = resp.responseCode;
        }
        if (typeof resp.avsCode !== 'undefined') {
            this.avsCode = resp.avsCode;
        }
        if (typeof resp.balanceResponse !== 'undefined') {
            this.balanceResponse = resp.balanceResponse;
        }
    }
    setCode(code) { this.code = code; }
    getCode() { return this.code; }
    setResponseCode(responseCode) { this.responseCode = responseCode; }
    getResponseCode() { return this.responseCode; }
    setAvsCode(avsCode) { this.avsCode = avsCode; }
    getAvsCode() { return this.avsCode; }
    setBalanceResponse(balanceResponse) { this.balanceResponse = balanceResponse; }
    getBalanceResponse() { return this.balanceResponse; }
}
exports.AcquirerResponse = AcquirerResponse;
