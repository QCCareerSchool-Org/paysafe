"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const paysafe_error_1 = require("./paysafe-error");
const ID_MAX_LENGTH = 36;
/**
 * parent object of any object that can be sent as a request body
 */
class RequestObject {
    constructor(resp) {
        if (!resp) {
            return;
        }
        if (typeof resp.id !== 'undefined') {
            this.id = resp.id;
        }
        if (typeof resp.error !== 'undefined') {
            this.error = new paysafe_error_1.PaysafeError(resp.error);
        }
    }
    // public setId(id: string): void { if (id.length > ID_MAX_LENGTH) { throw new Error('invalid id'); } this.id = id; }
    getId() { return this.id; }
    // public deleteId(): void { delete this.id; }
    // public setError(error: PaysafeError): void { this.error = error; }
    getError() { return this.error; }
}
exports.RequestObject = RequestObject;
