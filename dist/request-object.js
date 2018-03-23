"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const paysafe_error_1 = require("./paysafe-error");
const ID_MAX_LENGTH = 36;
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
    setId(id) { if (id.length > ID_MAX_LENGTH) {
        throw new Error('invalid id');
    } this.id = id; }
    getId() { return this.id; }
    deleteId() { delete this.id; }
    setError(error) { this.error = error; }
    getError() { return this.error; }
}
exports.RequestObject = RequestObject;
