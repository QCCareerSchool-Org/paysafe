import { CardExpiry } from '../common/card-expiry';
import { BillingAddress } from './lib/billing-address';
import { Request } from './request';

export type CardCardType = 'AM' | 'DC' | 'DI' | 'MC' | 'VI';
export type CardStatus = 'ACTIVE';

export class Card extends Request {

  private nickName?: string;
  private merchantRefNum?: string;
  private holderName?: string;
  private cardNum?: string;
  private readonly cardBin?: string;
  private readonly lastDigits?: string;
  private cardExpiry?: CardExpiry;
  private readonly cardType?: CardCardType;
  private billingAddress?: BillingAddress;
  private billingAddressId?: string;
  private defaultCardIndicator?: boolean;
  private paymentToken?: string;
  private singleUseToken?: string;
  private readonly status?: CardStatus;

  constructor(resp?: Card) {
    super(resp);
    if (!resp) {
      return;
    }
    if (typeof resp.nickName !== 'undefined') {
      this.nickName = resp.nickName;
    }
    if (typeof resp.merchantRefNum !== 'undefined') {
      this.merchantRefNum = resp.merchantRefNum;
    }
    if (typeof resp.holderName !== 'undefined') {
      this.holderName = resp.holderName;
    }
    if (typeof resp.cardNum !== 'undefined') {
      this.cardNum = resp.cardNum;
    }
    if (typeof resp.cardBin !== 'undefined') {
      this.cardBin = resp.cardBin;
    }
    if (typeof resp.lastDigits !== 'undefined') {
      this.lastDigits = resp.lastDigits;
    }
    if (typeof resp.cardExpiry !== 'undefined') {
      this.cardExpiry = new CardExpiry(resp.cardExpiry);
    }
    if (typeof resp.cardType !== 'undefined') {
      this.cardType = resp.cardType;
    }
    if (typeof resp.billingAddress !== 'undefined') {
      this.billingAddress = new BillingAddress(resp.billingAddress);
    }
    if (typeof resp.billingAddressId !== 'undefined') {
      this.billingAddressId = resp.billingAddressId;
    }
    if (typeof resp.defaultCardIndicator !== 'undefined') {
      this.defaultCardIndicator = resp.defaultCardIndicator;
    }
    if (typeof resp.paymentToken !== 'undefined') {
      this.paymentToken = resp.paymentToken;
    }
    if (typeof resp.singleUseToken !== 'undefined') {
      this.singleUseToken = resp.singleUseToken;
    }
    if (typeof resp.status !== 'undefined') {
      this.status = resp.status;
    }
  }

  public setNickName(nickName: string): void { this.nickName = nickName; }
  public getNickName(): string | undefined { return this.nickName; }

  public setMerchantRefNum(merchantRefNum: string): void { this.merchantRefNum = merchantRefNum; }
  public getMerchantRefNum(): string | undefined { return this.merchantRefNum; }

  public setHolderName(holderName: string): void { this.holderName = holderName; }
  public getHolderName(): string | undefined { return this.holderName; }

  public setCardNum(cardNum: string): void { this.cardNum = cardNum; }
  public getCardNum(): string | undefined { return this.cardNum; }

  public getCardBin(): string | undefined { return this.cardBin; }

  public getLastDigits(): string | undefined { return this.lastDigits; }

  public setCardExpiry(cardExpiry: CardExpiry): void { this.cardExpiry = cardExpiry; }
  public getCardExpiry(): CardExpiry | undefined { return this.cardExpiry; }

  public getCardType(): CardCardType | undefined { return this.cardType; }

  public setBillingAddress(billingAddress: BillingAddress): void { this.billingAddress = billingAddress; }
  public getBillingAddress(): BillingAddress | undefined { return this.billingAddress; }

  public setBillingAddressId(billingAddressId: string): void { this.billingAddressId = billingAddressId; }
  public getBillingAddressId(): string | undefined { return this.billingAddressId; }

  public setDefaultCardIndicator(defaultCardIndicator: boolean): void { this.defaultCardIndicator = defaultCardIndicator; }
  public getDefaultCardIndicator(): boolean | undefined { return this.defaultCardIndicator; }

  public setPaymentToken(paymentToken: string): void { this.paymentToken = paymentToken; }
  public getPaymentToken(): string | undefined { return this.paymentToken; }

  public setSingleUseToken(singleUseToken: string): void { this.singleUseToken = singleUseToken; }
  public getSingleUseToken(): string | undefined { return this.singleUseToken; }

  public getStatus(): CardStatus | undefined { return this.status; }

}
