import { Link } from '../common/link';
import { Profile } from '../customervault/profile';
import { RequestObject } from '../request-object';
import { AccordD } from './accord-d';
import { AcquirerResponse } from './acquirer-response';
import { Authentication } from './authentication';
import { BillingDetails } from './billing-details';
import { Card } from './card';
import { MerchantDescriptor } from './merchant-descriptor';
import { ShippingDetails } from './shipping-details';
export declare type statusType = 'RECEIVED' | 'COMPLETED' | 'FAILED';
export declare class Verification extends RequestObject {
    private merchantRefNum?;
    private childAccountNum?;
    private card?;
    private authCode?;
    private profile?;
    private billingDetails?;
    private customerIp?;
    private dupCheck?;
    private description?;
    private txnTime?;
    private currencyCode?;
    private avsResponse?;
    private cvvVerification?;
    private status?;
    private riskReasonCode?;
    private acquirerResponse?;
    private links?;
    private verifications?;
    private accordD?;
    private merchantDescriptor?;
    private shippingDetails?;
    private authentication?;
    constructor(resp?: Verification);
    setMerchantRefNum(merchantRefNum: string): void;
    getMerchantRefNum(): string | undefined;
    setAccordD(accordD: AccordD): void;
    getAccordD(): AccordD | undefined;
    setMerchantDescriptor(merchantDescriptor: MerchantDescriptor): void;
    getMerchantDescriptor(): MerchantDescriptor | undefined;
    setShippingDetails(shippingDetails: ShippingDetails): void;
    getShippingDetails(): ShippingDetails | undefined;
    setAuthentication(authentication: Authentication): void;
    getAuthentication(): Authentication | undefined;
    setVerifications(verifications: Verification[]): void;
    getVerifications(): Verification[] | undefined;
    setLinks(links: Link[]): void;
    getLinks(): Link[] | undefined;
    setCvvVerification(cvvVerification: string): void;
    getCvvVerification(): string | undefined;
    setAvsResponse(avsResponse: string): void;
    getAvsResponse(): string | undefined;
    setCurrencyCode(currencyCode: string): void;
    getCurrencyCode(): string | undefined;
    setDescription(description: string): void;
    getDescription(): string | undefined;
    setCustomerIp(customerIp: string): void;
    getCustomerIp(): string | undefined;
    setBillingDetails(billingDetails: BillingDetails): void;
    getBillingDetails(): BillingDetails | undefined;
    setProfile(profile: Profile): void;
    getProfile(): Profile | undefined;
    setAuthCode(authCode: string): void;
    getAuthCode(): string | undefined;
    setCard(card: Card): void;
    getCard(): Card | undefined;
    setTxnTime(txnTime: string): void;
    getTxnTime(): string | undefined;
    setDupCheck(dupCheck: string): void;
    getDupCheck(): string | undefined;
    setChildAccountNum(childAccountNum: string): void;
    getChildAccountNum(): string | undefined;
    setAcquirerResponse(acquirerResponse: AcquirerResponse): void;
    getAcquirerResponse(): AcquirerResponse | undefined;
    setStatus(status: statusType): void;
    getStatus(): statusType | undefined;
    setRiskReasonCode(riskReasonCode: string): void;
    getRiskReasonCode(): string | undefined;
}
