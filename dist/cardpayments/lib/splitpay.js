"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Splitpay {
    constructor(resp) {
        if (typeof resp === 'undefined') {
            return;
        }
        if (typeof resp.linkedAccount !== 'undefined') {
            this.linkedAccount = resp.linkedAccount;
        }
        if (typeof resp.account !== 'undefined') {
            this.account = resp.account;
        }
        if (typeof resp.percent !== 'undefined') {
            this.percent = resp.percent;
        }
    }
}
exports.Splitpay = Splitpay;
