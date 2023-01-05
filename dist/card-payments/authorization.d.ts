import { SplitpayRequest } from './splitpay-request';
import { Settlement } from './settlement';
import { AccordD } from './lib/accord-d';
import { Authentication } from './lib/authentication';
import { BillingDetails } from './lib/billing-details';
import { Card } from './lib/card';
import { Level2level3 } from './lib/level2level3';
import { MerchantDescriptor } from './lib/merchant-descriptor';
import { Profile } from './lib/profile';
import { Recipient } from './lib/recipient';
import { ShippingDetails } from './lib/shipping-details';
import { StoredCredential } from './lib/stored-credential';
export type AuthorizationRecurring = 'INITIAL' | 'RECURRING';
export type AuthorizationAvsResponse = 'MATCH' | 'MATCH_ADDRESS_ONLY' | 'MATCH_ZIP_ONLY' | 'NO_MATCH' | 'NOT_PROCESSED' | 'UNKNOWN';
export type AuthorizationCvvVerification = 'MATCH' | 'NO_MATCH' | 'NOT_PROCESSED' | 'UNKNOWN';
export type AuthorizationStatus = 'RECEIVED' | 'COMPLETED' | 'HELD' | 'FAILED' | 'CANCELLED';
export declare class Authorization extends SplitpayRequest {
    private card?;
    private authentication?;
    private profile?;
    private billingDetails?;
    private shippingDetails?;
    /**
    * This indicates whether this is an initial or repeat transaction for a customer for whom you will be processing
    * recurring transactions. The Recurring Indicator is used to identify transactions that are eligible for repeat
    * processing. The merchant should identity the initial transaction processed with full billing information including
    * the card security code (CVV) by setting the recurring indicator to “INITIAL”. Subsequent charges to the same card
    * can be identified with the recurring indicator set to “RECURRING”. For these transactions the card security code
    * is not required and could not be passed in because card regulations do not allow merchants to store it.
    *
    * Note: Not all processing gateways support this parameter. Contact your account manager for more information. You
    * cannot include both the recurring parameter and the storedCredential object in the same authorization request.
    * Paysafe recommends using the storedCredential object.
    */
    private recurring?;
    /**
     * This object is used to identify requests that use stored credentials that the merchant has on file for the
     * consumer, in order to improve authorization rates and reduce fraud.
     *
     * Note: You cannot include both the recurring parameter and the storedCredential object in the same authorization
     * request. Paysafe recommends using the storedCredential object.
     */
    private storedCredential?;
    private customerIp?;
    private keywords?;
    private merchantDescriptor?;
    private accordD?;
    private description?;
    private recipient?;
    private level2level3?;
    private settleWithAuth?;
    private availableToSettle?;
    private authCode?;
    private currencyCode?;
    private avsResponse?;
    private cvvVerification?;
    private status?;
    private settlements?;
    constructor(resp?: Authorization);
    setCard(card: Card): void;
    getCard(): Card | undefined;
    setAuthentication(authentication: Authentication): void;
    getAuthentication(): Authentication | undefined;
    setProfile(profile: Profile): void;
    getProfile(): Profile | undefined;
    setBillingDetails(billingDetails: BillingDetails): void;
    getBillingDetails(): BillingDetails | undefined;
    setShippingDetails(shippingDetails: ShippingDetails): void;
    getShippingDetails(): ShippingDetails | undefined;
    setRecurring(recurring: AuthorizationRecurring): void;
    getRecurring(): AuthorizationRecurring | undefined;
    setStoredCredential(storedCredential: StoredCredential): void;
    getStoredCredential(): StoredCredential | undefined;
    setCustomerIp(customerIp: string): void;
    getCustomerIp(): string | undefined;
    setKeywords(keywords: string[]): void;
    getKeywords(): string[] | undefined;
    setMerchantDescriptor(merchantDescriptor: MerchantDescriptor): void;
    getMerchantDescriptor(): MerchantDescriptor | undefined;
    setAccordD(accordD: AccordD): void;
    getAccordD(): AccordD | undefined;
    setDescription(description: string): void;
    getDescription(): string | undefined;
    setRecipient(recipient: Recipient): void;
    getRecipient(): Recipient | undefined;
    setLevel2level3(level2level3: Level2level3): void;
    getLevel2level3(): Level2level3 | undefined;
    setSettleWithAuth(settleWithAuth: boolean): void;
    getSettleWithAuth(): boolean | undefined;
    getAvailableToSettle(): number | undefined;
    getAuthCode(): string | undefined;
    setCurrencyCode(currencyCode: string): void;
    getCurrencyCode(): string | undefined;
    getAvsResponse(): AuthorizationAvsResponse | undefined;
    getCvvVerification(): AuthorizationCvvVerification | undefined;
    setStatus(status: AuthorizationStatus): void;
    getStatus(): AuthorizationStatus | undefined;
    setSettlements(settlements: Settlement[]): void;
    getSettlements(): Settlement[] | undefined;
}
