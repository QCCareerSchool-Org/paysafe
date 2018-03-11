"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ShippingDetails {
    constructor(resp) {
        if (!resp)
            return;
        this.carrier = resp.carrier;
        this.shipMethod = resp.shipMethod;
        this.recipientName = resp.recipientName;
        this.street = resp.street;
        this.street2 = resp.street2;
        this.city = resp.city;
        this.state = resp.state;
        this.country = resp.country;
        this.zip = resp.zip;
        this.phone = resp.phone;
    }
    setCarrier(carrier) { this.carrier = carrier; }
    getCarrier() { return this.carrier; }
    setRecipientName(recipientName) { this.recipientName = recipientName; }
    getRecipientName() { return this.recipientName; }
    setPhone(phone) { this.phone = phone; }
    getPhone() { return this.phone; }
    setStreet(street) { this.street = street; }
    getStreet() { return this.street; }
    setStreet2(street2) { this.street2 = street2; }
    getStreet2() { return this.street2; }
    setCity(city) { this.city = city; }
    getCity() { return this.city; }
    setState(state) { this.state = state; }
    getState() { return this.state; }
    setCountry(country) { this.country = country; }
    getCountry() { return this.country; }
    setZip(zip) { this.zip = zip; }
    getZip() { return this.zip; }
}
exports.ShippingDetails = ShippingDetails;
