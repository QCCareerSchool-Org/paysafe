"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BillingDetails {
    constructor(resp) {
        if (!resp)
            return;
        this.street = resp.street;
        this.street2 = resp.street2;
        this.city = resp.city;
        this.state = resp.state;
        this.zip = resp.zip;
        this.country = resp.country;
        this.phone = resp.phone;
        this.useAsShippingAddress = resp.useAsShippingAddress;
    }
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
    setPhone(phone) { this.phone = phone; }
    getPhone() { return this.phone; }
    setUseAsShippingAddress(useAsShippingAddress) { this.useAsShippingAddress = useAsShippingAddress; }
    getUseAsShippingAddress() { return this.useAsShippingAddress; }
}
exports.BillingDetails = BillingDetails;
