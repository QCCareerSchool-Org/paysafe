"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_array_1 = require("./create-array");
const field_error_1 = require("./field-error");
const link_1 = require("./link");
class PaysafeError extends Error {
    static create(code, message) {
        const err = new PaysafeError();
        err.setCode(code);
        err.setMessage(message);
        return err;
    }
    constructor(resp) {
        if (!resp) {
            super();
            return;
        }
        super(resp.message);
        if (typeof resp.code !== 'undefined') {
            if (typeof resp.code === 'number') {
                this.code = resp.code;
            }
            else if (typeof resp.code === 'string') {
                this.code = parseInt(resp.code, 10) || 0;
            }
        }
        if (typeof resp.details !== 'undefined') {
            if (Array.isArray(resp.details)) {
                this.details = resp.details;
            }
        }
        if (typeof resp.fieldErrors !== 'undefined') {
            this.fieldErrors = create_array_1.createArray(resp.fieldErrors, field_error_1.FieldError);
        }
        if (typeof resp.links !== 'undefined') {
            this.links = create_array_1.createArray(resp.links, link_1.Link);
        }
    }
    setCode(code) { this.code = code; }
    getCode() { return this.code; }
    setMessage(message) { this.message = message; }
    getMessage() { return this.message; }
    getDetails() { return this.details; }
    getFieldErrors() { return this.fieldErrors; }
    getLinks() { return this.links; }
}
exports.PaysafeError = PaysafeError;
