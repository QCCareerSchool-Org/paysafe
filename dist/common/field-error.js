"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FieldError {
    constructor(resp) {
        if (!resp) {
            return;
        }
        if (typeof resp.field !== 'undefined') {
            this.field = resp.field;
        }
        if (typeof resp.error !== 'undefined') {
            this.error = resp.error;
        }
    }
    getField() { return this.field; }
    getError() { return this.error; }
}
exports.FieldError = FieldError;
