export enum StoredCredentialType {
  /** Ad hoc consumer-initiated request */
  ADHOC = 'ADHOC',
  /** Unscheduled merchant-iniitated request */
  TOPUP = 'TOPUP',
  /** Scheduled, merchant-initiated recurring request */
  RECURRING = 'RECURRING',
}

export enum StoredCredentialOccurrence {
  /** Used when this is the first time the consumer uses this credit card */
  INITIAL = 'INITIAL',
  /** Used when the consumer uses this credit card for subsquent requests */
  SUBSEQUENT = 'SUBSEQUENT',
}

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
export class StoredCredential {

  /**
   * This specifies the type of request being made. Possible values are:
   * * ADHOC – Ad hoc consumer-initiated request
   * * TOPUP – Unscheduled merchant-iniitated request
   * * RECURRING – Scheduled, merchant-initiated recurring request
   *
   * Note: This value defaults to ADHOC.
   */
  private type?: StoredCredentialType;
  /**
   * This specifies whether this stored credential request is initial or recurring. Possible values are:
   * * INITIAL – Used when this is the first time the consumer uses this credit card
   * * SUBSEQUENT – Used when the consumer uses this credit card for subsquent requests
   *
   * Note: This value defaults to INITIAL.
   */
  private occurrence?: StoredCredentialOccurrence;
  /**
   * Id of the initial Recurring Payment transaction. This id should be stored from the auth response of the
   * transaction indicated as initial with the following: type=RECURRING/TOPUP, occurrence=INITIAL. This reference
   * should be provided when:
   * * type=RECURRING and occurrence=SUBSEQUENT
   * * type=TOPUP and occurrence=SUBSEQUENT
   *
   * Note: This reference is a must to meet PSD 2 authentication process requirements for merchant initiated transactions successfully.
   */
  private initialTransactionId?: string;
  /**
   * Id of the initial Recurring Payment transaction in case this transaction was processed through external PSP. This
   * reference should be provided only when:
   * * type=RECURRING and occurrence=SUBSEQUENT
   * * type=TOPUP and occurrence=SUBSEQUENT
   *
   * Note: This reference cannot be provided along with initialTransactionId.
   */
  private externalInitialTransactionId?: string;

  constructor(resp?: StoredCredential) {
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

  public setType(type: StoredCredentialType): void { this.type = type; }
  public getType(): StoredCredentialType | undefined { return this.type; }

  public setOccurence(occurrence: StoredCredentialOccurrence): void { this.occurrence = occurrence; }
  public getOccurence(): StoredCredentialOccurrence | undefined { return this.occurrence; }

  public setInitialTransactionId(initialTransactionId: string): void {
    if (initialTransactionId.length > INITIAL_TRANSACTION_ID_MAX_LENGTH) {
      throw new Error('invalid initial transaction ID');
    }
    this.initialTransactionId = initialTransactionId;
  }

  public getInitialTransactionId(): string | undefined { return this.initialTransactionId; }

  public setExternalInitialTransactionId(externalInitialTransactionId: string): void {
    if (externalInitialTransactionId.length > EXTERNAL_INITIAL_TRANSACTION_ID_MAX_LENGTH) {
      throw new Error('invalid external initial transaction ID');
    }
    this.externalInitialTransactionId = externalInitialTransactionId;
  }

  public getExternalInitialTransactionId(): string | undefined { return this.externalInitialTransactionId; }
}
