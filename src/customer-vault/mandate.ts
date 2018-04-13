import { Request } from './request';

const REFERENCE_MAX_LENGTH = 35; // 10 for BACS, 35 for SEPA
const PAYMENT_TOKEN_MAX_LENGTH = 50;

export type statusType = 'INITIAL' | 'PENDING' | 'DECLINED' | 'BATCHED' | 'ACTIVE' | 'CANCELLED' | 'REJECTED' | 'DISPUTED' | 'INACTIVE';
export class Mandate extends Request {

  private reference?: string;
  private bankAccountId?: string;
  private status?: statusType;
  private paymentToken?: string;
  private statusChangeDate?: Date;
  private statusReasonCode?: string;
  private statusReason?: string;

  constructor(resp?: Mandate) {
    super(resp);
    if (!resp) {
      return;
    }
    if (typeof resp.reference !== 'undefined') {
      this.reference = resp.reference;
    }
    if (typeof resp.bankAccountId !== 'undefined') {
      this.bankAccountId = resp.bankAccountId;
    }
    if (typeof resp.status !== 'undefined') {
      this.status = resp.status;
    }
    if (typeof resp.paymentToken !== 'undefined') {
      this.paymentToken = resp.paymentToken;
    }
    if (typeof resp.statusChangeDate !== 'undefined') {
      this.statusChangeDate = new Date(resp.statusChangeDate);
    }
    if (typeof resp.statusReasonCode !== 'undefined') {
      this.statusReasonCode = resp.statusReasonCode;
    }
    if (typeof resp.statusReason !== 'undefined') {
      this.statusReason = resp.statusReason;
    }
  }

  public setReference(reference: string): void {
    if (reference.length > REFERENCE_MAX_LENGTH) {
      throw new Error('invalid reference');
    }
    this.reference = reference;
  }
  public getReference(): string | undefined { return this.reference; }

  public getBankAccountId(): string | undefined { return this.bankAccountId; }

  public getStatus(): statusType | undefined { return this.status; }

  public getStatusChangeDate(): Date | undefined { return this.statusChangeDate; }

  public getStatusReasonCode(): string | undefined { return this.statusReasonCode; }

  public getStatusReason(): string | undefined { return this.statusReason; }

  public setPaymentToken(paymentToken: string): void {
    if (paymentToken.length > PAYMENT_TOKEN_MAX_LENGTH) {
      throw new Error('invalid paymentToken');
    }
    this.paymentToken = paymentToken;
  }
  public getPaymentToken(): string | undefined { return this.paymentToken; }

}
