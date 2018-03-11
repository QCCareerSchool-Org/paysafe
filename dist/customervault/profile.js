"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Profile {
    constructor(resp) {
        if (!resp)
            return;
    }
    setId(id) { this.id = id; }
    getId() { return this.id; }
    setStatus(status) { this.status = status; }
    getStatus() { return this.status; }
    setMerchantCustomerId(merchantCustomerId) { this.merchantCustomerId = merchantCustomerId; }
    getMerchantCustomerId() { return this.merchantCustomerId; }
    setLocale(locale) { this.locale = locale; }
    getLocale() { return this.locale; }
    setFirstName(firstName) { this.firstName = firstName; }
    getFirstName() { return this.firstName; }
    setMiddleName(middleName) { this.middleName = middleName; }
    getMiddleName() { return this.middleName; }
    setLastName(lastName) { this.lastName = lastName; }
    getLastName() { return this.lastName; }
    setDateOfBirth(dateOfBirth) { this.dateOfBirth = dateOfBirth; }
    getDateOfBirth() { return this.dateOfBirth; }
    setIp(ip) { this.ip = ip; }
    getIp() { return this.ip; }
    setGender(gender) { this.gender = gender; }
    getGender() { return this.gender; }
    setNationality(nationality) { this.nationality = nationality; }
    getNationality() { return this.nationality; }
    setEmail(email) { this.email = email; }
    getEmail() { return this.email; }
    setPhone(phone) { this.phone = phone; }
    getPhone() { return this.phone; }
    setCellPhone(cellPhone) { this.cellPhone = cellPhone; }
    getCellPhone() { return this.cellPhone; }
    setPaymentToken(paymentToken) { this.paymentToken = paymentToken; }
    getPaymentToken() { return this.paymentToken; }
    setAddresses(addresses) { this.addresses = addresses; }
    getAddresses() { return this.addresses; }
    setCards(cards) { this.cards = cards; }
    getCards() { return this.cards; }
    setACHBankAccounts(achbankaccounts) { this.achbankaccounts = achbankaccounts; }
    getACHBankAccounts() { return this.achbankaccounts; }
    setBACSBankAccounts(bacsbankaccounts) { this.bacsbankaccounts = bacsbankaccounts; }
    getBACSBankAccounts() { return this.bacsbankaccounts; }
    setEFTBankAccounts(eftbankaccounts) { this.eftbankaccounts = eftbankaccounts; }
    getEFTBankAccounts() { return this.eftbankaccounts; }
    setSEPABankAccounts(sepabankaccounts) { this.sepabankaccounts = sepabankaccounts; }
    getSEPABankAccounts() { return this.sepabankaccounts; }
    setError(error) { this.error = error; }
    getError() { return this.error; }
}
exports.Profile = Profile;
