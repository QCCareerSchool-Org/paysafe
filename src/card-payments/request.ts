import { createArray } from '../common/create-array';
import { Link } from '../common/link';
import { PaysafeError } from '../common/paysafe-error';
import { AcquirerResponse } from './lib/acquirer-response';

const MERCHANT_REF_NUM_MAX_LENGTH = 255;

/**
 * abstract parent class of any Card Payments API request
 */
export abstract class Request {

  private id?: string;
  private merchantRefNum?: string;
  private dupCheck?: boolean;
  private txnTime?: Date;
  private riskReasonCode?: number[];
  private acquirerResponse?: AcquirerResponse;
  private childAccountNum?: string;
  private links?: Link[];
  private error?: PaysafeError;

  constructor(resp?: Request) {
    if (!resp) {
      return;
    }
    if (typeof resp.id !== 'undefined') {
      this.id = resp.id;
    }
    if (typeof resp.merchantRefNum !== 'undefined') {
      this.merchantRefNum = resp.merchantRefNum;
    }
    if (typeof resp.dupCheck !== 'undefined') {
      this.dupCheck = resp.dupCheck;
    }
    if (typeof resp.txnTime !== 'undefined') {
      this.txnTime = new Date(resp.txnTime);
    }
    if (typeof resp.riskReasonCode !== 'undefined') {
      this.riskReasonCode = resp.riskReasonCode.slice(0);
    }
    if (typeof resp.acquirerResponse !== 'undefined') {
      this.acquirerResponse = new AcquirerResponse(resp.acquirerResponse);
    }
    if (typeof resp.childAccountNum !== 'undefined') {
      this.childAccountNum = resp.childAccountNum;
    }
    if (typeof resp.links !== 'undefined') {
      this.links = createArray(resp.links, Link);
    }
    if (typeof resp.error !== 'undefined') {
      this.error = new PaysafeError(resp.error);
    }
  }

  public getId(): string | undefined { return this.id; }

  public setMerchantRefNum(merchantRefNum: string): void {
    if (merchantRefNum.length > MERCHANT_REF_NUM_MAX_LENGTH) {
      throw new Error('invalid merchantRefNum');
    }
    this.merchantRefNum = merchantRefNum;
  }
  public getMerchantRefNum(): string | undefined { return this.merchantRefNum; }

  public setDupCheck(dupCheck: boolean): void { this.dupCheck = dupCheck; }
  public getDupCheck(): boolean | undefined { return this.dupCheck; }

  public setTxnTime(txnTime: Date): void { this.txnTime = new Date(txnTime); }
  public getTxnTime(): Date | undefined { return this.txnTime; }

  public getRiskReasonCode(): number[] | undefined { return this.riskReasonCode; }

  public getAcquirerResponse(): AcquirerResponse | undefined { return this.acquirerResponse; }

  public getChildAccountNum(): string | undefined { return this.childAccountNum; }

  public getLinks(): Link[] | undefined { return this.links; }

  public getError(): PaysafeError | undefined { return this.error; }

}
