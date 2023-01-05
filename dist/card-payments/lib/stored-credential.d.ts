export declare enum StoredCredentialType {
    /** Ad hoc consumer-initiated request */
    ADHOC = "ADHOC",
    /** Unscheduled merchant-iniitated request */
    TOPUP = "TOPUP",
    /** Scheduled, merchant-initiated recurring request */
    RECURRING = "RECURRING"
}
export declare enum StoredCredentialOccurrence {
    /** Used when this is the first time the consumer uses this credit card */
    INITIAL = "INITIAL",
    /** Used when the consumer uses this credit card for subsquent requests */
    SUBSEQUENT = "SUBSEQUENT"
}
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
export declare class StoredCredential {
    /**
     * This specifies the type of request being made. Possible values are:
     * * ADHOC – Ad hoc consumer-initiated request
     * * TOPUP – Unscheduled merchant-iniitated request
     * * RECURRING – Scheduled, merchant-initiated recurring request
     *
     * Note: This value defaults to ADHOC.
     */
    private type?;
    /**
     * This specifies whether this stored credential request is initial or recurring. Possible values are:
     * * INITIAL – Used when this is the first time the consumer uses this credit card
     * * SUBSEQUENT – Used when the consumer uses this credit card for subsquent requests
     *
     * Note: This value defaults to INITIAL.
     */
    private occurrence?;
    /**
     * Id of the initial Recurring Payment transaction. This id should be stored from the auth response of the
     * transaction indicated as initial with the following: type=RECURRING/TOPUP, occurrence=INITIAL. This reference
     * should be provided when:
     * * type=RECURRING and occurrence=SUBSEQUENT
     * * type=TOPUP and occurrence=SUBSEQUENT
     *
     * Note: This reference is a must to meet PSD 2 authentication process requirements for merchant initiated transactions successfully.
     */
    private initialTransactionId?;
    /**
     * Id of the initial Recurring Payment transaction in case this transaction was processed through external PSP. This
     * reference should be provided only when:
     * * type=RECURRING and occurrence=SUBSEQUENT
     * * type=TOPUP and occurrence=SUBSEQUENT
     *
     * Note: This reference cannot be provided along with initialTransactionId.
     */
    private externalInitialTransactionId?;
    constructor(resp?: StoredCredential);
    setType(type: StoredCredentialType): void;
    getType(): StoredCredentialType | undefined;
    setOccurence(occurrence: StoredCredentialOccurrence): void;
    getOccurence(): StoredCredentialOccurrence | undefined;
    setInitialTransactionId(initialTransactionId: string): void;
    getInitialTransactionId(): string | undefined;
    setExternalInitialTransactionId(externalInitialTransactionId: string): void;
    getExternalInitialTransactionId(): string | undefined;
}
