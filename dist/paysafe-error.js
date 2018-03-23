"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_array_1 = require("./common/create-array");
const field_error_1 = require("./common/field-error");
const link_1 = require("./common/link");
class PaysafeError extends Error {
    constructor(resp) {
        if (!resp) {
            super();
            return;
        }
        super(resp.message);
        if (typeof resp.code !== 'undefined') {
            this.code = resp.code;
        }
        if (typeof resp.links !== 'undefined') {
            this.links = create_array_1.createArray(resp.links, link_1.Link);
        }
        if (typeof resp.fieldErrors !== 'undefined') {
            this.fieldErrors = create_array_1.createArray(resp.fieldErrors, field_error_1.FieldError);
        }
        if (typeof resp.details !== 'undefined') {
            this.details = resp.details;
        }
    }
    setCode(code) { this.code = code; }
    getCode() { return this.code; }
    setMessage(message) { this.message = message; }
    getMessage() { return this.message; }
    setLinks(links) { this.links = links; }
    getLinks() { return this.links; }
    setFieldErrors(fieldErrors) { this.fieldErrors = fieldErrors; }
    getFieldErrors() { return this.fieldErrors; }
    setDetails(details) { this.details = details; }
    getDetails() { return this.details; }
}
exports.PaysafeError = PaysafeError;
