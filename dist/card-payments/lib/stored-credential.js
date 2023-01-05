"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoredCredential = exports.StoredCredentialOccurrence = exports.StoredCredentialType = void 0;
var StoredCredentialType;
(function (StoredCredentialType) {
    /** Ad hoc consumer-initiated request */
    StoredCredentialType["ADHOC"] = "ADHOC";
    /** Unscheduled merchant-iniitated request */
    StoredCredentialType["TOPUP"] = "TOPUP";
    /** Scheduled, merchant-initiated recurring request */
    StoredCredentialType["RECURRING"] = "RECURRING";
})(StoredCredentialType = exports.StoredCredentialType || (exports.StoredCredentialType = {}));
;
var StoredCredentialOccurrence;
(function (StoredCredentialOccurrence) {
    /** Used when this is the first time the consumer uses this credit card */
    StoredCredentialOccurrence["INITIAL"] = "INITIAL";
    /** Used when the consumer uses this credit card for subsquent requests */
    StoredCredentialOccurrence["SUBSEQUENT"] = "SUBSEQUENT";
})(StoredCredentialOccurrence = exports.StoredCredentialOccurrence || (exports.StoredCredentialOccurrence = {}));
const INITIAL_TRANSACTION_ID_MAX_LENGTH = 36;
const EXTERNAL_INITIAL_TRANSACTION_ID_MAX_LENGTH = 256;
/**
 * The storedCredential object is used to identify authorization requests that use stored credentials for a consumer,
 * in order to improve authorization rates and reduce fraud. Stored credentials can be used in two cases:
 *
 * Using a payment token – An authorization request that uses a paymentToken from the Customer Vault API
 * Using a card number – An authorization request that uses a credit card number stored by the merchant
 *
 * Notes:
 * * If you use a paymentToken in the authorization request but do not include the storedCredential object, Paysafe
 *   will provide default information taken from Customer Vault data.
 * * You cannot include both the storedCredential object and the recurring parameter in the same authorization request.
 *   Paysafe recommends using the storedCredential object.
 * * The cvv parameter of the card object is required when the occurrence parameter is set to INITIAL. However, cvv is
 *   not required when the occurrence parameter is set to SUBSEQUENT.
 * * The storedCredential object cannot be used for Apple Pay or Google Pay transactions.
 */
class StoredCredential {
    constructor(resp) {
        if (!resp) {
            return;
        }
        if (typeof resp.type !== 'undefined') {
            this.type = resp.type;
        }
        if (typeof resp.occurrence !== 'undefined') {
            this.occurrence = resp.occurrence;
        }
    }
    setType(type) { this.type = type; }
    getType() { return this.type; }
    setOccurence(occurrence) { this.occurrence = occurrence; }
    getOccurence() { return this.occurrence; }
    setInitialTransactionId(initialTransactionId) {
        if (initialTransactionId.length > INITIAL_TRANSACTION_ID_MAX_LENGTH) {
            throw new Error('invalid initial transaction ID');
        }
        this.initialTransactionId = initialTransactionId;
    }
    getInitialTransactionId() { return this.initialTransactionId; }
    setExternalInitialTransactionId(externalInitialTransactionId) {
        if (externalInitialTransactionId.length > EXTERNAL_INITIAL_TRANSACTION_ID_MAX_LENGTH) {
            throw new Error('invalid external initial transaction ID');
        }
        this.externalInitialTransactionId = externalInitialTransactionId;
    }
    getExternalInitialTransactionId() { return this.externalInitialTransactionId; }
}
exports.StoredCredential = StoredCredential;
