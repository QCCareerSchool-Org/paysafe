"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const address_1 = require("./address");
const card_1 = require("./card");
const mandate_1 = require("./mandate");
const profile_1 = require("./profile");
const ach_bank_account_1 = require("./ach-bank-account");
const bacs_bank_account_1 = require("./bacs-bank-account");
const paths = {
    PROFILE: 'profiles',
    ADDRESS: 'addresses',
    CARD: 'cards',
    ACH_BANK_ACCOUNT: 'achbankaccounts',
    BACS_BANK_ACCOUNT: 'bacsbankaccounts',
    SEPA_BANK_ACCOUNT: 'sepabankaccounts',
    EFT_BANK_ACCOUNT: 'eftbankaccounts',
    MANDATE: 'mandates',
};
function createQuerystring(fields) {
    if (!fields.length) {
        return '';
    }
    return '?fields=' + fields.join(',');
}
class ServiceHandler {
    constructor(paysafe) {
        this.paysafe = paysafe;
    }
    /** verifies that the service is up and accessible */
    monitor() {
        return this.paysafe.get('/customervault/monitor');
    }
    /**
     * create a new profile
     * @param profile the profile to create
     */
    createProfile(profile) {
        return new Promise((resolve, reject) => {
            if (typeof profile === 'undefined') {
                return reject(new Error('profile is undefined'));
            }
            const path = this.getPath(paths.PROFILE);
            this.paysafe.post(path, profile).then((response) => {
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
     * updates an existing profile
     * @param profileId the id of the profile to update
     * @param profile the new profile
     */
    updateProfile(profileId, profile) {
        return new Promise((resolve, reject) => {
            if (typeof profileId === 'undefined') {
                return reject(new Error('profileId is undefined'));
            }
            if (typeof profile === 'undefined') {
                return reject(new Error('profile is undefined'));
            }
            const path = this.getPath(`${paths.PROFILE}/${profileId}`);
            this.paysafe.put(path, profile).then((response) => {
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
     * @param profileId the id of the profile to search for
     * @param fields an optional array of strings--possible strings are 'cards', 'addresses', 'achbankaccounts', 'bacsbankaccounts', 'eftbankaccounts', 'sepabankaccounts'
     */
    getProfile(profileId, fields) {
        return new Promise((resolve, reject) => {
            if (typeof profileId === 'undefined') {
                return reject(new Error('profileId is undefined'));
            }
            const querystring = typeof fields !== 'undefined' ? createQuerystring(fields) : '';
            const path = this.getPath(`${paths.PROFILE}/${profileId}${querystring}`);
            this.paysafe.get(path).then((response) => {
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
     * @param profileId the id of the profile
     * @param address the address to create
     */
    createAddress(profileId, address) {
        return new Promise((resolve, reject) => {
            if (typeof profileId === 'undefined') {
                return reject(new Error('profileId is undefined'));
            }
            if (typeof address === 'undefined') {
                return reject(new Error('address is undefined'));
            }
            const path = this.getPath(`${paths.PROFILE}/${profileId}/${paths.ADDRESS}`);
            this.paysafe.post(path, address).then((response) => {
                if (response) {
                    return resolve(new address_1.Address(response));
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
                return reject(new Error('profileId is undefined'));
            }
            if (typeof addressId === 'undefined') {
                return reject(new Error('addressId is undefined'));
            }
            const path = this.getPath(`${paths.PROFILE}/${profileId}/${paths.ADDRESS}/${addressId}`);
            this.paysafe.get(path).then((response) => {
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
                return reject(new Error('profile id is undefined'));
            }
            const addressId = address.getId();
            if (typeof addressId === 'undefined') {
                return reject(new Error('address.id is undefined'));
            }
            const path = this.getPath(`${paths.PROFILE}/${profileId}/${paths.ADDRESS}/${addressId}`);
            this.paysafe.put(path, address).then((response) => {
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
                return reject(new Error('profileId undefined'));
            }
            if (typeof card === 'undefined') {
                return reject(new Error('card is undefined'));
            }
            const path = this.getPath(`${paths.PROFILE}/${profileId}/${paths.CARD}`);
            this.paysafe.post(path, card).then((response) => {
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
                return reject(new Error('profileId is undefined'));
            }
            if (typeof cardId === 'undefined') {
                return reject(new Error('cardId is undefined'));
            }
            const path = this.getPath(`${paths.PROFILE}/${profileId}/${paths.CARD}/${cardId}`);
            this.paysafe.get(path).then((response) => {
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
                return reject(new Error('profile id is undefined'));
            }
            const cardId = card.getId();
            if (typeof cardId === 'undefined') {
                return reject(new Error('card.id is undefined'));
            }
            const path = this.getPath(`${paths.PROFILE}/${profileId}/${paths.CARD}/${cardId}`);
            this.paysafe.put(path, card).then((response) => {
                if (response) {
                    return resolve(new card_1.Card(response));
                }
                reject(new Error('empty response'));
            }).catch((err) => {
                reject(err);
            });
        });
    }
    createACHBankAccount(profileId, achBankAccount) {
        return new Promise((resolve, reject) => {
            if (typeof profileId === 'undefined') {
                return reject(new Error('profileId is undefined'));
            }
            if (typeof achBankAccount === 'undefined') {
                return reject(new Error('achBankAccount is undefined'));
            }
            const path = this.getPath(`${paths.PROFILE}/${profileId}/${paths.ACH_BANK_ACCOUNT}`);
            this.paysafe.post(path, achBankAccount).then((response) => {
                if (response) {
                    return resolve(new ach_bank_account_1.ACHBankAccount(response));
                }
                reject(new Error('empty response'));
            }).catch((err) => {
                reject(err);
            });
        });
    }
    createBACSBankAccount(profileId, bacsBankAccount) {
        return new Promise((resolve, reject) => {
            if (typeof profileId === 'undefined') {
                return reject(new Error('profileId is undefined'));
            }
            if (typeof bacsBankAccount === 'undefined') {
                return reject(new Error('bacsBankAccount is undefined'));
            }
            const path = this.getPath(`${paths.PROFILE}/${profileId}/${paths.BACS_BANK_ACCOUNT}`);
            this.paysafe.post(path, bacsBankAccount).then((response) => {
                if (response) {
                    return resolve(new bacs_bank_account_1.BACSBankAccount(response));
                }
                reject(new Error('empty response'));
            }).catch((err) => {
                reject(err);
            });
        });
    }
    createMandate(accountType, profileId, bankAccountId, mandate) {
        return new Promise((resolve, reject) => {
            if (typeof accountType === 'undefined') {
                return reject(new Error('accountType id is undefined'));
            }
            if (typeof profileId === 'undefined') {
                return reject(new Error('profileId is undefined'));
            }
            if (typeof bankAccountId === 'undefined') {
                return reject(new Error('bankAccountid is undefined'));
            }
            if (typeof mandate === 'undefined') {
                return reject(new Error('mandate is undefined'));
            }
            let path;
            if (accountType === 'BACS') {
                path = this.getPath(`${paths.PROFILE}/${profileId}/${paths.BACS_BANK_ACCOUNT}/${bankAccountId}/mandates`);
            }
            else if (accountType === 'SEPA') {
                path = this.getPath(`${paths.PROFILE}/${profileId}/${paths.SEPA_BANK_ACCOUNT}/${bankAccountId}/mandates`);
            }
            else {
                return reject(new Error('invalid accountType'));
            }
            this.paysafe.post(path, mandate).then((response) => {
                if (response) {
                    return resolve(new mandate_1.Mandate(response));
                }
                reject(new Error('empty response'));
            }).catch((err) => {
                reject(err);
            });
        });
    }
    getPath(path) {
        return '/customervault/v1/' + path;
    }
}
exports.ServiceHandler = ServiceHandler;
