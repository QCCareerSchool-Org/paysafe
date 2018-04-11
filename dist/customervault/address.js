"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request_object_1 = require("../request-object");
class Address extends request_object_1.RequestObject {
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
    setNickName(nickName) { this.nickName = nickName; }
    getNickName() { return this.nickName; }
    setStreet(street) { this.street = street; }
    getStreet() { return this.street; }
    setStreet2(street2) { this.street2 = street2; }
    getStreet2() { return this.street2; }
    setCity(city) { this.city = city; }
    getCity() { return this.city; }
    setState(state) { this.state = state; }
    getState() { return this.state; }
    setZip(zip) { this.zip = zip; }
    getZip() { return this.zip; }
    setCountry(country) { this.country = country; }
    getCountry() { return this.country; }
    setRecipientName(recipientName) { this.recipientName = recipientName; }
    getRecipientName() { return this.recipientName; }
    setPhone(phone) { this.phone = phone; }
    getPhone() { return this.phone; }
    setStatus(status) { this.status = status; }
    getStatus() { return this.status; }
    setDefaultShippingAddressIndicator(defaultShippingAddressIndicator) { this.defaultShippingAddressIndicator = defaultShippingAddressIndicator; }
    getDefaultShippingAddressIndicator() { return this.defaultShippingAddressIndicator; }
}
exports.Address = Address;
