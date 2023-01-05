"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Request = void 0;
const create_array_1 = require("../common/create-array");
const link_1 = require("../common/link");
const paysafe_error_1 = require("../common/paysafe-error");
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
        if (typeof resp.links !== 'undefined') {
            this.links = (0, create_array_1.createArray)(resp.links, link_1.Link);
        }
        if (typeof resp.error !== 'undefined') {
            this.error = new paysafe_error_1.PaysafeError(resp.error);
        }
    }
    getId() { return this.id; }
    getLinks() { return this.links; }
    getError() { return this.error; }
}
exports.Request = Request;
