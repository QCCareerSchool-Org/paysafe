"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FieldError {
    constructor(resp) {
        if (!resp)
            return;
        this.field = resp.field;
        this.error = resp.error;
    }
    setField(field) { this.field = field; }
    getField() { return this.field; }
    setError(error) { this.error = error; }
    getError() { return this.error; }
}
exports.FieldError = FieldError;
