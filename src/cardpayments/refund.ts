import { createArray } from '../common/create-array';
import { Link } from '../common/link';
import { PaysafeError } from '../paysafe-error';
import { RequestObject } from '../request-object';

import { Settlement } from './settlement';

import { AcquirerResponse } from './lib/acquirer-response';
import { Splitpay } from './lib/splitpay';

export type statusType = 'RECEIVED' | 'COMPLETED' | 'PENDING' | 'FAILED' | 'CANCELLED';

export class Refund extends RequestObject {

  private merchantRefNum?: string;
  private amount?: number;
  private childAccountNum?: string;
  private dupCheck?: boolean;
  private txnTime?: string;
  private status?: statusType;
  private riskReasonCode?: number[];
  private acquirerResponse?: AcquirerResponse;
  private splitpay?: Splitpay | Splitpay[];
  private links?: Link[];

  constructor(resp?: Refund) {
    super(resp);
    if (!resp) {
      return;
    }
    if (typeof resp.merchantRefNum !== 'undefined') {
      this.merchantRefNum = resp.merchantRefNum;
    }
    if (typeof resp.amount !== 'undefined') {
      this.amount = resp.amount;
    }
    if (typeof resp.childAccountNum !== 'undefined') {
      this.childAccountNum = resp.childAccountNum;
    }
    if (typeof resp.dupCheck !== 'undefined') {
      this.dupCheck = resp.dupCheck;
    }
    if (typeof resp.txnTime !== 'undefined') {
      this.txnTime = resp.txnTime;
    }
    if (typeof resp.status !== 'undefined') {
      this.status = resp.status;
    }
    if (typeof resp.riskReasonCode !== 'undefined') {
      this.riskReasonCode = resp.riskReasonCode.slice(0);
    }
    if (typeof resp.acquirerResponse !== 'undefined') {
      this.acquirerResponse = new AcquirerResponse(resp.acquirerResponse);
    }
    if (typeof resp.splitpay !== 'undefined') {
      if (Array.isArray(resp.splitpay)) {
        this.splitpay = createArray(resp.splitpay, Splitpay);
      } else {
        this.splitpay = new Splitpay(resp.splitpay);
      }
    }
    if (typeof resp.links !== 'undefined') {
      this.links = createArray(resp.links, Link);
    }
  }

  public setMerchantRefNum(merchantRefNum: string): void { this.merchantRefNum = merchantRefNum; }
  public getMerchantRefNum(): string | undefined { return this.merchantRefNum; }

  public setAmount(amount: number): void { this.amount = amount; }
  public getAmount(): number | undefined { return this.amount; }

  public setChildAccountNum(childAccountNum: string): void { this.childAccountNum = childAccountNum; }
  public getChildAccountNum(): string | undefined { return this.childAccountNum; }

  public setDupCheck(dupCheck: boolean): void { this.dupCheck = dupCheck; }
  public getDupCheck(): boolean | undefined { return this.dupCheck; }

  public setTxnTime(txnTime: string): void { this.txnTime = txnTime; }
  public getTxnTime(): string | undefined { return this.txnTime; }

  public setStatus(status: statusType): void { this.status = status; }
  public getStatus(): statusType | undefined { return this.status; }

  public setRiskReasonCode(riskReasonCode: number[]): void { this.riskReasonCode = riskReasonCode; }
  public getRiskReasonCode(): number[] | undefined { return this.riskReasonCode; }

  public setAcquirerResponse(acquirerResponse: AcquirerResponse): void { this.acquirerResponse = acquirerResponse; }
  public getAcquirerResponse(): AcquirerResponse | undefined { return this.acquirerResponse; }

  public setSplitpay(splitpay: Splitpay | Splitpay[]): void { this.splitpay = splitpay; }
  public getSplitpay(): Splitpay | Splitpay[] | undefined { return this.splitpay; }

  public setLinks(links: Link[]): void { this.links = links; }
  public getLinks(): Link[] | undefined { return this.links; }

}
