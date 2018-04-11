"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const address_1 = require("./customervault/address");
const card_1 = require("./customervault/card");
const profile_1 = require("./customervault/profile");
const paths = {
    PROFILE: '/profiles',
    ADDRESS: '/addresses',
    CARD: '/cards',
    ACH_BANK_ACCOUNT: '/achbankaccounts',
    BACS_BANK_ACCOUNT: '/bacsbankaccounts',
    SEPA_BANK_ACCOUNT: '/sepabankaccounts',
    EFT_BANK_ACCOUNT: '/eftbankaccounts',
    MANDATE: '/mandates',
};
function createQuerystring(fields) {
    if (!fields.length) {
        return '';
    }
    return '?fields=' + fields.join(',');
}
class CustomerServiceHandler {
    constructor(p) {
        this.paysafeApiClient = p;
    }
    /** verifies that the service is up and accessible */
    monitor() {
        return this.paysafeApiClient.get(this.paysafeApiClient.getEnvironment().host + '/customervault/monitor');
    }
    /**
     * create a new profile
     * @param profile the profile to create
     */
    createProfile(profile) {
        return new Promise((resolve, reject) => {
            const uri = this.getURI(paths.PROFILE);
            this.paysafeApiClient.post(uri, profile).then((response) => {
                if (response) {
                    return resolve(new profile_1.Profile(response));
                }
                reject(new Error('empty response'));
            }).catch((err) => {
                reject(err);
            });
        });
    }
    /**
     * retrieve a profile
     * @param profile the profile to search for--must include id
     * @param fields an optional array of strings--possible strings are 'cards', 'addresses', 'achbankaccounts', 'bacsbankaccounts', 'eftbankaccounts', 'sepabankaccounts'
     */
    getProfile(profileId, fields) {
        return new Promise((resolve, reject) => {
            if (typeof profileId === 'undefined') {
                throw new Error('profileId is undefined');
            }
            const querystring = typeof fields !== 'undefined' ? createQuerystring(fields) : '';
            const uri = this.getURI(`${paths.PROFILE}/${profileId}${querystring}`);
            this.paysafeApiClient.get(uri).then((response) => {
                if (response) {
                    return resolve(new profile_1.Profile(response));
                }
                reject(new Error('empty response'));
            }).catch((err) => {
                reject(err);
            });
        });
    }
    /**
     * create a new address for a profile
     * @param address the address to create--must have a profile, which must have an id
     */
    createAddress(profileId, address) {
        return new Promise((resolve, reject) => {
            if (typeof profileId === 'undefined') {
                throw new Error('profileId is undefined');
            }
            if (typeof address === 'undefined') {
                throw new Error('address is undefined');
            }
            const uri = this.getURI(`${paths.PROFILE}/${profileId}/${paths.ADDRESS}`);
            this.paysafeApiClient.post(uri, address).then((response) => {
                if (response) {
                    return resolve(new address_1.Address(response));
                }
                reject(new Error('empty response'));
            }).catch((err) => {
                reject(err);
            });
        });
    }
    createCard(profileId, card) {
        return new Promise((resolve, reject) => {
            if (typeof profileId === 'undefined') {
                throw new Error('profileId undefined');
            }
            if (typeof card === 'undefined') {
                throw new Error('card is undefined');
            }
            const uri = this.getURI(`${paths.PROFILE}/${profileId}/${paths.CARD}`);
            this.paysafeApiClient.post(uri, card).then((response) => {
                if (response) {
                    return resolve(new card_1.Card(response));
                }
                reject(new Error('empty response'));
            }).catch((err) => {
                reject(err);
            });
        });
    }
    getCard(profileId, cardId) {
        return new Promise((resolve, reject) => {
            if (typeof profileId === 'undefined') {
                throw new Error('profileId is undefined');
            }
            if (typeof cardId === 'undefined') {
                throw new Error('cardId is undefined');
            }
            const uri = this.getURI(`${paths.PROFILE}/${profileId}/${paths.CARD}/${cardId}`);
            this.paysafeApiClient.get(uri).then((response) => {
                if (response) {
                    return resolve(new card_1.Card(response));
                }
                reject(new Error('empty response'));
            }).catch((err) => {
                reject(err);
            });
        });
    }
    updateCard(profileId, card) {
        return new Promise((resolve, reject) => {
            if (typeof profileId === 'undefined') {
                throw new Error('profile id is undefined');
            }
            const cardId = card.getId();
            if (typeof cardId === 'undefined') {
                throw new Error('card.id is undefined');
            }
            const uri = this.getURI(`${paths.PROFILE}/${profileId}/${paths.CARD}/${cardId}`);
            this.paysafeApiClient.put(uri, card).then((response) => {
                if (response) {
                    return resolve(new card_1.Card(response));
                }
                reject(new Error('empty response'));
            }).catch((err) => {
                reject(err);
            });
        });
    }
    getAddress(profileId, addressId) {
        return new Promise((resolve, reject) => {
            if (typeof profileId === 'undefined') {
                throw new Error('profileId is undefined');
            }
            if (typeof addressId === 'undefined') {
                throw new Error('addressId is undefined');
            }
            const uri = this.getURI(`${paths.PROFILE}/${profileId}/${paths.ADDRESS}/${addressId}`);
            this.paysafeApiClient.get(uri).then((response) => {
                if (response) {
                    return resolve(new address_1.Address(response));
                }
                reject(new Error('empty response'));
            }).catch((err) => {
                reject(err);
            });
        });
    }
    updateAddress(profileId, address) {
        return new Promise((resolve, reject) => {
            if (typeof profileId === 'undefined') {
                throw new Error('profile id is undefined');
            }
            const addressId = address.getId();
            if (typeof addressId === 'undefined') {
                throw new Error('address.id is undefined');
            }
            const uri = this.getURI(`${paths.PROFILE}/${profileId}/${paths.ADDRESS}/${addressId}`);
            this.paysafeApiClient.put(uri, address).then((response) => {
                if (response) {
                    return resolve(new address_1.Address(response));
                }
                reject(new Error('empty response'));
            }).catch((err) => {
                reject(err);
            });
        });
    }
    getURI(path) {
        return this.paysafeApiClient.getEnvironment().host + '/customervault/v1/' + path;
    }
}
exports.CustomerServiceHandler = CustomerServiceHandler;
