"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const paysafe_error_1 = require("./paysafe-error");
class RequestObject {
    constructor(resp) {
        if (!resp)
            return;
        this.id = resp.id;
        this.merchantRefNum = resp.merchantRefNum;
        if (typeof resp.error !== 'undefined')
            this.error = new paysafe_error_1.PaysafeError(resp.error);
    }
    setId(id) { this.id = id; }
    getId() { return this.id; }
    deleteId() { delete this.id; }
    setMerchantRefNum(merchantRefNum) { this.merchantRefNum = merchantRefNum; }
    getMerchantRefNum() { return this.merchantRefNum; }
    setError(error) { this.error = error; }
    getError() { return this.error; }
}
exports.RequestObject = RequestObject;
