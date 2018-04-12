"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BillingAddress {
    constructor(resp) {
        if (!resp) {
            return;
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
}
exports.BillingAddress = BillingAddress;