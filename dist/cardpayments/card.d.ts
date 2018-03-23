import { RequestObject } from '../request-object';
import { BillingDetails } from './billing-details';
import { CardExpiry } from './card-expiry';
import { Profile } from '../customervault/profile';
export declare class Card extends RequestObject {
    private merchantRefNum?;
    private singleUseToken?;
    private brand?;
    private nickName?;
    private holderName?;
    private cardType?;
    private billingAddressId?;
    private billingDetails?;
    private defaultCardIndicator?;
    private paymentToken?;
    private cardNum?;
    private type?;
    private lastDigits?;
    private cardExpiry?;
    private cvv?;
    private track1?;
    private track2?;
    private status?;
    private profile?;
    constructor(resp?: Card);
    setMerchantRefNum(merchantRefNum: string): void;
    getMerchantRefNum(): string | undefined;
    setSingleUseToken(singleUseToken: string): void;
    getSingleUseToken(): string | undefined;
    setBrand(brand: string): void;
    getBrand(): string | undefined;
    setNickName(nickName: string): void;
    getNickName(): string | undefined;
    setHolderName(holderName: string): void;
    getHolderName(): string | undefined;
    setCardType(cardType: string): void;
    getCardType(): string | undefined;
    setBillingAddressId(billingAddressId: string): void;
    getBillingAddressId(): string | undefined;
    setBillingDetails(billingDetails: BillingDetails | BillingDetails[]): void;
    getBillingDetails(): BillingDetails | BillingDetails[] | undefined;
    setDefaultCardIndicator(defaultCardIndicator: 'true' | 'false'): void;
    getDefaultCardIndicator(): string | undefined;
    setPaymentToken(paymentToken: string): void;
    getPaymentToken(): string | undefined;
    setCardNum(cardNum: string): void;
    getCardNum(): string | undefined;
    setType(type: string): void;
    getType(): string | undefined;
    setLastDigits(lastDigits: string): void;
    getLastDigits(): string | undefined;
    setCardExpiry(cardExpiry: CardExpiry): void;
    getCardExpiry(): CardExpiry | undefined;
    setCvv(cvv: string): void;
    getCvv(): string | undefined;
    setTrack1(track1: string): void;
    getTrack1(): string | undefined;
    settrack2(track2: string): void;
    gettrack2(): string | undefined;
    setStatus(status: string): void;
    getStatus(): string | undefined;
    setProfile(profile: Profile): void;
    getProfile(): Profile | undefined;
}
