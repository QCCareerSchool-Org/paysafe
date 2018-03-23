import { PaysafeError } from '../paysafe-error';
import { RequestObject } from '../request-object';

import { createArray } from '../common/create-array';

import { BillingDetails } from './billing-details';
import { CardExpiry } from './card-expiry';

import { Profile } from '../customervault/profile';

export class Card extends RequestObject {

  private merchantRefNum?: string;
  private singleUseToken?: string;
  private brand?: string;
  private nickName?: string;
  private holderName?: string;
  private cardType?: string;
  private billingAddressId?: string;
  private billingDetails?: BillingDetails | BillingDetails[];
  private defaultCardIndicator?: 'true' | 'false';
  private paymentToken?: string;
  private cardNum?: string;
  private type?: string;
  private lastDigits?: string;
  private cardExpiry?: CardExpiry;
  private cvv?: string;
  private track1?: string;
  private track2?: string;
  private status?: string;
  private profile?: Profile;

  constructor(resp?: Card) {
    super(resp);
    if (!resp) {
      return;
    }
    if (typeof resp.merchantRefNum !== 'undefined') {
      this.merchantRefNum = resp.merchantRefNum;
    }
    if (typeof resp.singleUseToken !== 'undefined') {
      this.singleUseToken = resp.singleUseToken;
    }
    if (typeof resp.brand !== 'undefined') {
      this.brand = resp.brand;
    }
    if (typeof resp.nickName !== 'undefined') {
      this.nickName = resp.nickName;
    }
    if (typeof resp.holderName !== 'undefined') {
      this.holderName = resp.holderName;
    }
    if (typeof resp.cardType !== 'undefined') {
      this.cardType = resp.cardType;
    }
    if (typeof resp.billingAddressId !== 'undefined') {
      this.billingAddressId = resp.billingAddressId;
    }
    if (typeof resp.billingDetails !== 'undefined') {
      if (resp.billingDetails instanceof Array) {
        this.billingDetails = createArray(resp.billingDetails, BillingDetails);
      } else {
        this.billingDetails = new BillingDetails(resp.billingDetails);
      }
    }
    if (typeof resp.defaultCardIndicator !== 'undefined') {
      this.defaultCardIndicator = resp.defaultCardIndicator;
    }
    if (typeof resp.paymentToken !== 'undefined') {
      this.paymentToken = resp.paymentToken;
    }
    if (typeof resp.cardNum !== 'undefined') {
      this.cardNum = resp.cardNum;
    }
    if (typeof resp.type !== 'undefined') {
      this.type = resp.type;
    }
    if (typeof resp.lastDigits !== 'undefined') {
      this.lastDigits = resp.lastDigits;
    }
    if (typeof resp.cardExpiry !== 'undefined') {
      this.cardExpiry = new CardExpiry(resp.cardExpiry);
    }
    if (typeof resp.cvv !== 'undefined') {
      this.cvv = resp.cvv;
    }
    if (typeof resp.track1 !== 'undefined') {
      this.track1 = resp.track1;
    }
    if (typeof resp.track2 !== 'undefined') {
      this.track2 = resp.track2;
    }
    if (typeof resp.status !== 'undefined') {
      this.status = resp.status;
    }
    if (typeof this.profile !== 'undefined') {
      this.profile = new Profile(resp.profile);
    }
  }

  public setMerchantRefNum(merchantRefNum: string): void { this.merchantRefNum = merchantRefNum; }
  public getMerchantRefNum(): string | undefined { return this.merchantRefNum; }

  public setSingleUseToken(singleUseToken: string): void { this.singleUseToken = singleUseToken; }
  public getSingleUseToken(): string | undefined { return this.singleUseToken; }

  public setBrand(brand: string): void { this.brand = brand; }
  public getBrand(): string | undefined { return this.brand; }

  public setNickName(nickName: string): void { this.nickName = nickName; }
  public getNickName(): string | undefined { return this.nickName; }

  public setHolderName(holderName: string): void { this.holderName = holderName; }
  public getHolderName(): string | undefined { return this.holderName; }

  public setCardType(cardType: string): void { this.cardType = cardType; }
  public getCardType(): string | undefined { return this.cardType; }

  public setBillingAddressId(billingAddressId: string): void { this.billingAddressId = billingAddressId; }
  public getBillingAddressId(): string | undefined { return this.billingAddressId; }

  public setBillingDetails(billingDetails: BillingDetails | BillingDetails[]): void { this.billingDetails = billingDetails };
  public getBillingDetails(): BillingDetails | BillingDetails[] | undefined { return this.billingDetails; }

  public setDefaultCardIndicator(defaultCardIndicator: 'true' | 'false'): void { this.defaultCardIndicator = defaultCardIndicator; }
  public getDefaultCardIndicator(): string | undefined { return this.defaultCardIndicator; }

  public setPaymentToken(paymentToken: string): void { this.paymentToken = paymentToken; }
  public getPaymentToken(): string | undefined { return this.paymentToken; }

  public setCardNum(cardNum: string): void { this.cardNum = cardNum; }
  public getCardNum(): string | undefined { return this.cardNum; }

  public setType(type: string): void { this.type = type; }
  public getType(): string | undefined { return this.type; }

  public setLastDigits(lastDigits: string): void { this.lastDigits = lastDigits; }
  public getLastDigits(): string | undefined { return this.lastDigits; }

  public setCardExpiry(cardExpiry: CardExpiry): void { this.cardExpiry = cardExpiry; }
  public getCardExpiry(): CardExpiry | undefined { return this.cardExpiry; }

  public setCvv(cvv: string): void { this.cvv = cvv; }
  public getCvv(): string | undefined { return this.cvv; }

  public setTrack1(track1: string): void { this.track1 = track1; }
  public getTrack1(): string | undefined { return this.track1; }

  public settrack2(track2: string): void { this.track2 = track2; }
  public gettrack2(): string | undefined { return this.track2; }

  public setStatus(status: string): void { this.status = status; }
  public getStatus(): string | undefined { return this.status; }

  public setProfile(profile: Profile): void { this.profile = profile; }
  public getProfile(): Profile | undefined { return this.profile; }

}
