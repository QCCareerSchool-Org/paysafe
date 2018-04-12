"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FIRST_NAME_MAX_LENGTH = 80;
const LAST_NAME_MAX_LENGTH = 80;
const EMAIL_MAX_LENGTH = 255;
class Profile {
    constructor(resp) {
        if (!resp) {
            return;
        }
        if (typeof resp.firstName !== 'undefined') {
            this.firstName = resp.firstName;
        }
        if (typeof resp.lastName !== 'undefined') {
            this.lastName = resp.lastName;
        }
        if (typeof resp.email !== 'undefined') {
            this.email = resp.email;
        }
    }
    setFirstName(firstName) {
        if (firstName.length > FIRST_NAME_MAX_LENGTH) {
            throw new Error('invalid firstName');
        }
        this.firstName = firstName;
    }
    getFirstName() { return this.firstName; }
    setLastName(lastName) {
        if (lastName.length > LAST_NAME_MAX_LENGTH) {
            throw new Error('invalid lastName');
        }
        this.lastName = lastName;
    }
    getLastName() { return this.lastName; }
    setEmail(email) {
        if (email.length > EMAIL_MAX_LENGTH) {
            throw new Error('invalid email');
        }
        this.email = email;
    }
    getEmail() { return this.email; }
}
exports.Profile = Profile;
