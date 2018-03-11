import { PaysafeError } from '../paysafe-error';

import { createArray } from '../common/create-array';

import { BillingDetails } from './billing-details';
import { CardExpiry } from './card-expiry';

import { Profile } from '../customervault/profile';

export class Card {

  private id?: string;
  private singleUseToken?: string;
  private brand?: string;
  private nickName?: string;
  private merchantRefNum?: string;
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
  private error?: PaysafeError;

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
    this.status = resp.status;
    if (this.profile)
      this.profile = new Profile(resp.profile);
    if (resp.error)
      this.error = new PaysafeError(resp.error);
  }

  setId(id: string): void { this.id = id; }
  getId(): string | undefined { return this.id; }

  setSingleUseToken(singleUseToken: string): void { this.singleUseToken = singleUseToken; }
  getSingleUseToken(): string | undefined { return this.singleUseToken; }

  setBrand(brand: string): void { this.brand = brand; }
  getBrand(): string | undefined { return this.brand; }

  setNickName(nickName: string): void { this.nickName = nickName; }
  getNickName(): string | undefined { return this.nickName; }

  setMerchantRefNum(merchantRefNum: string): void { this.merchantRefNum = merchantRefNum; }
  getMerchantRefNum(): string | undefined { return this.merchantRefNum; }

  setHolderName(holderName: string): void { this.holderName = holderName; }
  getHolderName(): string | undefined { return this.holderName; }

  setCardType(cardType: string): void { this.cardType = cardType; }
  getCardType(): string | undefined { return this.cardType; }

  setBillingAddressId(billingAddressId: string): void { this.billingAddressId = billingAddressId; }
  getBillingAddressId(): string | undefined { return this.billingAddressId; }

  setBillingDetails(billingDetails: BillingDetails | BillingDetails[]): void { this.billingDetails = billingDetails };
  getBillingDetails(): BillingDetails | BillingDetails[] | undefined { return this.billingDetails; }

  setDefaultCardIndicator(defaultCardIndicator: 'true' | 'false'): void { this.defaultCardIndicator = defaultCardIndicator; }
  getDefaultCardIndicator(): string | undefined { return this.defaultCardIndicator; }

  setPaymentToken(paymentToken: string): void { this.paymentToken = paymentToken; }
  getPaymentToken(): string | undefined { return this.paymentToken; }

  setCardNum(cardNum: string): void { this.cardNum = cardNum; }
  getCardNum(): string | undefined { return this.cardNum; }

  setType(type: string): void { this.type = type; }
  getType(): string | undefined { return this.type; }

  setLastDigits(lastDigits: string): void { this.lastDigits = lastDigits; }
  getLastDigits(): string | undefined { return this.lastDigits; }

  setCardExpiry(cardExpiry: CardExpiry): void { this.cardExpiry = cardExpiry; }
  getCardExpiry(): CardExpiry | undefined { return this.cardExpiry; }

  setCvv(cvv: string): void { this.cvv = cvv; }
  getCvv(): string | undefined { return this.cvv; }

  setTrack1(track1: string): void { this.track1 = track1; }
  getTrack1(): string | undefined { return this.track1; }

  settrack2(track2: string): void { this.track2 = track2; }
  gettrack2(): string | undefined { return this.track2; }

  setStatus(status: string): void { this.status = status; }
  getStatus(): string | undefined { return this.status; }

  setProfile(profile: Profile): void { this.profile = profile; }
  getProfile(): Profile | undefined { return this.profile; }

  setError(error: PaysafeError): void { this.error = error; }
  getError(): PaysafeError | undefined { return this.error; }

}
