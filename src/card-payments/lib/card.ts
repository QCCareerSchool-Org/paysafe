import { CardExpiry } from '../../common/card-expiry';

export type cardType = 'AM' | 'DC' | 'JC' | 'MC' | 'MD' | 'SO' | 'VI' | 'VD' | 'VE';

export class Card {

  private paymentToken?: string;
  private singleUseToken?: string;
  private cardNum?: string;
  private type?: cardType;
  private lastDigits?: string;
  private cardExpiry?: CardExpiry;
  private cvv?: string;
  private track1?: string;
  private track2?: string;

  constructor(resp?: Card) {
    if (!resp) {
      return;
    }
    if (typeof resp.paymentToken !== 'undefined') {
      this.paymentToken = resp.paymentToken;
    }
    if (typeof resp.singleUseToken !== 'undefined') {
      this.singleUseToken = resp.singleUseToken;
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
  }

  public setPaymentToken(paymentToken: string): void { this.paymentToken = paymentToken; }
  public getPaymentToken(): string | undefined { return this.paymentToken; }

  public setSingleUseToken(singleUseToken: string): void { this.singleUseToken = singleUseToken; }
  public getSingleUseToken(): string | undefined { return this.singleUseToken; }

  public setCardNum(cardNum: string): void { this.cardNum = cardNum; }
  public getCardNum(): string | undefined { return this.cardNum; }

  public setType(type: cardType): void { this.type = type; }
  public getType(): cardType | undefined { return this.type; }

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

}
