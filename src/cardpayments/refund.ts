import { createArray } from '../common/create-array';
import { Link } from '../common/link';
import { PaysafeError } from '../paysafe-error';
import { RequestObject } from '../request-object';
import { AcquirerResponse } from './acquirer-response';
import { Settlement } from './settlement';

export class Refund extends RequestObject {

  private amount?: number;
  private childAccountNum?: string;
  private dupCheck?: boolean;
  private txnTime?: string;
  private status?: string;
  private riskReasonCode?: string;
  private acquirerResponse?: AcquirerResponse;
  private settlements?: Settlement;
  private links?: Link[];
  private refunds?: Refund[];
  private currencyCode?: string;
  private originalMerchantRefNum?: string;
  private mode?: string;
  private authType?: string;
  private confirmationNumber?: string;

  constructor(resp?: Refund) {
    super(resp);
    if (!resp) {
      return;
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
      this.riskReasonCode = resp.riskReasonCode;
    }
    if (typeof resp.acquirerResponse !== 'undefined') {
      this.acquirerResponse = new AcquirerResponse(resp.acquirerResponse);
    }
    if (typeof resp.settlements !== 'undefined') {
      this.settlements = new Settlement(resp.settlements);
    }
    if (typeof resp.links !== 'undefined') {
      this.links = createArray(resp.links, Link);
    }
    if (typeof resp.refunds !== 'undefined') {
      this.refunds = createArray(resp.refunds, Refund);
    }
    if (typeof resp.currencyCode !== 'undefined') {
      this.currencyCode = resp.currencyCode;
    }
    if (typeof resp.originalMerchantRefNum !== 'undefined') {
      this.originalMerchantRefNum = resp.originalMerchantRefNum;
    }
    if (typeof resp.mode !== 'undefined') {
      this.mode = resp.mode;
    }
    if (typeof resp.authType !== 'undefined') {
      this.authType = resp.authType;
    }
    if (typeof resp.confirmationNumber !== 'undefined') {
      this.confirmationNumber = resp.confirmationNumber;
    }
  }

  public setAmount(amount: number): void { this.amount = amount; }
  public getAmount(): number | undefined { return this.amount; }

  public setChildAccountNum(childAccountNum: string): void { this.childAccountNum = childAccountNum; }
  public getChildAccountNum(): string | undefined { return this.childAccountNum; }

  public setDupCheck(dupCheck: boolean): void { this.dupCheck = dupCheck; }
  public getDupCheck(): boolean | undefined { return this.dupCheck; }

  public setTxnTime(txnTime: string): void { this.txnTime = txnTime; }
  public getTxnTime(): string | undefined { return this.txnTime; }

  public setStatus(status: string): void { this.status = status; }
  public getStatus(): string | undefined { return this.status; }

  public setRiskReasonCode(riskReasonCode: string): void { this.riskReasonCode = riskReasonCode; }
  public getRiskReasonCode(): string | undefined { return this.riskReasonCode; }

  public setAcquirerResponse(acquirerResponse: AcquirerResponse): void { this.acquirerResponse = acquirerResponse; }
  public getAcquirerResponse(): AcquirerResponse | undefined { return this.acquirerResponse; }

  public setSettlements(settlements: Settlement): void { this.settlements = settlements; }
  public getSettlements(): Settlement | undefined { return this.settlements; }
  public deleteSettlements(): void { delete this.settlements; }

  public setLinks(links: Link[]): void { this.links = links; }
  public getLinks(): Link[] | undefined { return this.links; }

  public setRefunds(refunds: Refund[]): void { this.refunds = refunds; }
  public getRefunds(): Refund[] | undefined { return this.refunds; }

  public setCurrencyCode(currencyCode: string): void { this.currencyCode = currencyCode; }
  public getCurrencyCode(): string | undefined { return this.currencyCode; }

  public setOriginalMerchantRefNum(originalMerchantRefNum: string): void { this.originalMerchantRefNum = originalMerchantRefNum; }
  public getOriginalMerchantRefNum(): string | undefined { return this.originalMerchantRefNum; }

  public setMode(mode: string): void { this.mode = mode; }
  public getMode(): string | undefined { return this.mode; }

  public setAuthType(authType: string): void { this.authType = authType; }
  public getAuthType(): string | undefined { return this.authType; }

  public setConfirmationNumber(confirmationNumber: string): void { this.confirmationNumber = confirmationNumber; }
  public getConfirmationNumber(): string | undefined { return this.confirmationNumber; }

}
