"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Address = void 0;
const request_1 = require("./request");
const NICK_NAME_MAX_LENGTH = 50;
const STREET_MAX_LENGTH = 50;
const STREET2_MAX_LENGTH = 50;
const CITY_MAX_LENGTH = 40;
const STATE_MAX_LENGTH = 40;
const ZIP_MAX_LENGTH = 10;
const COUNTRY_MAX_LENGTH = 2;
const RECIPIENT_NAME_MAX_LENGTH = 255;
const PHONE_MAX_LENGTH = 40;
class Address extends request_1.Request {
    constructor(resp) {
        super(resp);
        if (!resp) {
            return;
        }
        if (typeof resp.nickName !== 'undefined') {
            this.nickName = resp.nickName;
        }
        if (typeof resp.street !== 'undefined') {
            this.street = resp.street;
        }
        if (typeof resp.street2 !== 'undefined') {
            this.street2 = resp.street2;
        }
        if (typeof resp.city !== 'undefined') {
            this.city = resp.city;
        }
        if (typeof resp.state !== 'undefined') {
            this.state = resp.state;
        }
        if (typeof resp.zip !== 'undefined') {
            this.zip = resp.zip;
        }
        if (typeof resp.country !== 'undefined') {
            this.country = resp.country;
        }
        if (typeof resp.recipientName !== 'undefined') {
            this.recipientName = resp.recipientName;
        }
        if (typeof resp.phone !== 'undefined') {
            this.phone = resp.phone;
        }
        if (typeof resp.status !== 'undefined') {
            this.status = resp.status;
        }
        if (typeof resp.defaultShippingAddressIndicator !== 'undefined') {
            this.defaultShippingAddressIndicator = resp.defaultShippingAddressIndicator;
        }
    }
    setNickName(nickName) {
        if (nickName.length > NICK_NAME_MAX_LENGTH) {
            throw new Error('invalid nickName');
        }
        this.nickName = nickName;
    }
    getNickName() { return this.nickName; }
    setStreet(street) {
        if (street.length > STREET_MAX_LENGTH) {
            throw new Error('invalid street');
        }
        this.street = street;
    }
    getStreet() { return this.street; }
    setStreet2(street2) {
        if (street2.length > STREET2_MAX_LENGTH) {
            throw new Error('invalid street2');
        }
        this.street2 = street2;
    }
    getStreet2() { return this.street2; }
    setCity(city) {
        if (city.length > CITY_MAX_LENGTH) {
            throw new Error('invalid city');
        }
        this.city = city;
    }
    getCity() { return this.city; }
    setState(state) {
        if (state.length > STATE_MAX_LENGTH) {
            throw new Error('invalid state');
        }
        this.state = state;
    }
    getState() { return this.state; }
    setZip(zip) {
        if (zip.length > ZIP_MAX_LENGTH) {
            throw new Error('invalid zip');
        }
        this.zip = zip;
    }
    getZip() { return this.zip; }
    setCountry(country) {
        if (country.length > COUNTRY_MAX_LENGTH) {
            throw new Error('invalid country');
        }
        this.country = country;
    }
    getCountry() { return this.country; }
    setRecipientName(recipientName) {
        if (recipientName.length > RECIPIENT_NAME_MAX_LENGTH) {
            throw new Error('invalid recipientName');
        }
        this.recipientName = recipientName;
    }
    getRecipientName() { return this.recipientName; }
    setPhone(phone) {
        if (phone.length > PHONE_MAX_LENGTH) {
            throw new Error('invalid phone');
        }
        this.phone = phone;
    }
    getPhone() { return this.phone; }
    getStatus() { return this.status; }
    setDefaultShippingAddressIndicator(defaultShippingAddressIndicator) { this.defaultShippingAddressIndicator = defaultShippingAddressIndicator; }
    getDefaultShippingAddressIndicator() { return this.defaultShippingAddressIndicator; }
}
exports.Address = Address;
