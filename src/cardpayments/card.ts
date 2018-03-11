import { PaysafeError } from '../paysafe-error';

import { createArray } from '../common/create-array';

import { BillingDetails } from './billing-details';
import { CardExpiry } from './card-expiry';

import { Profile } from '../customervault/profile';

export class Card {

  id?: any;
  singleUseToken?: string;
  brand?: any;
  nickName?: any;
  merchantRefNum?: string;
  holderName?: string;
  cardType?: any;
  billingAddressId?: any;
  billingDetails?: BillingDetails | BillingDetails[];
  defaultCardIndicator?: 'true' | 'false';
  paymentToken?: string;
  cardNum?: string;
  type?: any;
  lastDigits?: string;
  cardExpiry?: CardExpiry;
  cvv?: string;
  track1?: string;
  track2?: string;
  profile?: Profile;
  error?: PaysafeError;
  status?: any;

  constructor(resp?: Card) {
    if (!resp)
      return;
    this.id = resp.id;
    this.singleUseToken = resp.singleUseToken;
    this.brand = resp.brand;
    this.nickName = resp.nickName;
    this.merchantRefNum = resp.merchantRefNum;
    this.holderName = resp.holderName;
    this.cardType = resp.cardType;
    this.billingAddressId = resp.billingAddressId;
    if (resp.billingDetails) {
      if (resp.billingDetails instanceof Array)
        this.billingDetails = createArray(resp.billingDetails, BillingDetails);
      else
        this.billingDetails = new BillingDetails(resp.billingDetails);
    }
    this.defaultCardIndicator = resp.defaultCardIndicator;
    this.paymentToken = resp.paymentToken;
    this.cardNum = resp.cardNum;
    this.type = resp.type;
    this.lastDigits = resp.lastDigits;
    if (resp.cardExpiry)
      this.cardExpiry = new CardExpiry(resp.cardExpiry);
    this.cvv = resp.cvv;
    this.track1 = resp.track1;
    this.track2 = resp.track2;
    this.profile = resp.profile;
    if (resp.error)
      this.error = new PaysafeError(resp.error);
    this.status = resp.status;
  }

  setSingleUseToken(singleUseToken: string): void { this.singleUseToken = singleUseToken; }
  getSingleUseToken(): string | undefined { return this.singleUseToken; }
  setBrand(brand: any): void { this.brand = brand; }
  getBrand(): any | undefined { return this.brand; }
  setStatus(status: any): void { this.status = status; }
  getStatus(): any | undefined { return this.status; }
  setError(error: PaysafeError): void { this.error = error; }
  getError(): PaysafeError | undefined { return this.error; }
  setProfile(profile: Profile): void { this.profile = profile; }
  getProfile(): Profile | undefined { return this.profile; }
  setDefaultCardIndicator(defaultCardIndicator: any): void { this.defaultCardIndicator = defaultCardIndicator; }
  getDefaultCardIndicator(): any | undefined { return this.defaultCardIndicator; }
  setBillingAddressId(billingAddressId: any): void { this.billingAddressId = billingAddressId; }
  getBillingAddressId(): any | undefined { return this.billingAddressId; }
  setBillingDetails(billingDetails: BillingDetails | BillingDetails[]): void { this.billingDetails = billingDetails };
  getBillingDetails(): BillingDetails | BillingDetails[] | undefined { return this.billingDetails; }
  setCardType(cardType: any): void { this.cardType = cardType; }
  getCardType(): any | undefined { return this.cardType; }
  setNickName(nickName: any): void { this.nickName = nickName; }
  getNickName(): any | undefined { return this.nickName; }
  setMerchantRefNum(merchantRefNum: string): void { this.merchantRefNum = merchantRefNum; }
  getMerchantRefNum(): string | undefined { return this.merchantRefNum; }
  setHolderName(holderName: string): void { this.holderName = holderName; }
  getHolderName(): string | undefined { return this.holderName; }
  setPaymentToken(paymentToken: string): void { this.paymentToken = paymentToken; }
  getPaymentToken(): string | undefined { return this.paymentToken; }
  setCardNum(cardNum: string): void { this.cardNum = cardNum; }
  getCardNum(): string | undefined { return this.cardNum; }
  setType(type: any): void { this.type = type; }
  getType(): any | undefined { return this.type; }
  setLastDigits(lastDigits: string): void { this.lastDigits = lastDigits; }
  getLastDigits(): string | undefined { return this.lastDigits; }
  setCardExpiry(cardExpiry: CardExpiry): void { this.cardExpiry = cardExpiry; }
  getCardExpiry(): CardExpiry | undefined { return this.cardExpiry; }
  setCvv(cvv: any): void { this.cvv = cvv; }
  getCvv(): any | undefined { return this.cvv; }
  setTrack1(track1: string): void { this.track1 = track1; }
  getTrack1(): string | undefined { return this.track1; }
  settrack2(track2: string): void { this.track2 = track2; }
  gettrack2(): string | undefined { return this.track2; }
  setId(id: any): void { this.id = id; }
  getId(): any | undefined { return this.id; }

}
