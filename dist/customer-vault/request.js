"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ID_MAX_LENGTH = 36;
/**
 * abstract parent class of any Customer Vault API request object
 */
class Request {
    constructor(resp) {
        if (!resp) {
            return;
        }
        if (typeof resp.id !== 'undefined') {
            this.id = resp.id;
        }
    }
    getId() { return this.id; }
}
exports.Request = Request;
