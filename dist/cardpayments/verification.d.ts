import { Link } from '../common/link';
import { RequestObject } from '../request-object';
import { AccordD } from './accord-d';
import { AcquirerResponse } from './acquirer-response';
import { Authentication } from './authentication';
import { BillingDetails } from './billing-details';
import { Card } from './card';
import { MerchantDescriptor } from './merchant-descriptor';
import { ShippingDetails } from './shipping-details';
import { PaysafeError } from '../paysafe-error';
export declare class Verification extends RequestObject {
    private id?;
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
    private error?;
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
    setCvvVerification(cvvVerification: any): void;
    getCvvVerification(): any | undefined;
    setAvsResponse(avsResponse: any): void;
    getAvsResponse(): any | undefined;
    setCurrencyCode(currencyCode: any): void;
    getCurrencyCode(): any | undefined;
    setDescription(description: any): void;
    getDescription(): any | undefined;
    setCustomerIp(customerIp: any): void;
    getCustomerIp(): any | undefined;
    setBillingDetails(billingDetails: BillingDetails): void;
    getBillingDetails(): BillingDetails | undefined;
    setProfile(profile: any): void;
    getProfile(): any | undefined;
    setAuthCode(authCode: any): void;
    getAuthCode(): any | undefined;
    setCard(card: Card): void;
    getCard(): Card | undefined;
    setTxnTime(txnTime: any): void;
    getTxnTime(): any | undefined;
    setDupCheck(dupCheck: any): void;
    getDupCheck(): any | undefined;
    setChildAccountNum(childAccountNum: any): void;
    getChildAccountNum(): any | undefined;
    setAcquirerResponse(acquirerResponse: AcquirerResponse): void;
    getAcquirerResponse(): AcquirerResponse | undefined;
    setRiskReasonCode(riskReasonCode: any): void;
    getRiskReasonCode(): any | undefined;
    setError(error: PaysafeError): void;
    getError(): PaysafeError | undefined;
    setMerchantRefNum(merchantRefNum: any): void;
    getMerchantRefNum(): any | undefined;
    setId(id: any): void;
    getId(): any | undefined;
}
