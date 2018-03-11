"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AcquirerResponse {
    constructor(resp) {
        if (!resp)
            return;
        this.code = resp.code;
        this.responseCode = resp.responseCode;
        this.avsCode = resp.avsCode;
        this.balanceResponse = resp.balanceResponse;
    }
    setBalanceResponse(balanceResponse) { this.balanceResponse = balanceResponse; }
    getBalanceResponse() { return this.balanceResponse; }
    setAvsCode(avsCode) { this.avsCode = avsCode; }
    getAvsCode() { return this.avsCode; }
    setResponseCode(responseCode) { this.responseCode = responseCode; }
    getResponseCode() { return this.responseCode; }
    setCode(code) { this.code = code; }
    getCode() { return this.code; }
}
exports.AcquirerResponse = AcquirerResponse;
