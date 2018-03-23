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
    setField(field) { this.field = field; }
    getField() { return this.field; }
    setError(error) { this.error = error; }
    getError() { return this.error; }
}
exports.FieldError = FieldError;
