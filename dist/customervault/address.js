"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const profile_1 = require("./profile");
const paysafe_error_1 = require("../paysafe-error");
class Address {
    constructor(resp) {
        if (!resp)
            return;
        this.id = resp.id;
        this.nickName = resp.nickName;
        this.street = resp.street;
        this.street2 = resp.street2;
        this.city = resp.city;
        this.state = resp.state;
        this.zip = resp.zip;
        this.country = resp.country;
        this.recipientName = resp.recipientName;
        this.phone = resp.phone;
        if (resp.profile)
            this.profile = new profile_1.Profile(resp.profile);
        if (resp.error)
            this.error = new paysafe_error_1.PaysafeError(resp.error);
        this.status = resp.status;
        this.defaultShippingAddressIndicator = resp.defaultShippingAddressIndicator;
    }
    setId(id) { this.id = id; }
    getId() { return this.id; }
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
    setProfile(profile) { this.profile = profile; }
    getProfile() { return this.profile; }
    setError(error) { this.error = error; }
    getError() { return this.error; }
    setStatus(status) { this.status = status; }
    getStatus() { return this.status; }
    setDefaultShippingAddressIndicator(defaultShippingAddressIndicator) { this.defaultShippingAddressIndicator = defaultShippingAddressIndicator; }
    getDefaultShippingAddressIndicator() { return this.defaultShippingAddressIndicator; }
}
exports.Address = Address;
