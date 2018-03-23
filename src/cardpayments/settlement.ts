import { createArray } from '../common/create-array';
import { Link } from '../common/link';
import { PaysafeError } from '../paysafe-error';
import { RequestObject } from '../request-object';
import { AcquirerResponse } from './acquirer-response';
import { Authorization } from './authorization';

export class Settlement extends RequestObject {

  private amount?: number;
  private availableToRefund?: number;
  private childAccountNum?: string;
  private txnTime?: string;
  private dupCheck?: boolean;
  private status?: string;
  private riskReasonCode?: string;
  private acquirerResponse?: AcquirerResponse;
  private authorization?: Authorization;
  private links?: Link[];
  private settlements?: Settlement[];
  private originalMerchantRefNum?: string;
  private mode?: string;
  private currencyCode?: string;
  private confirmationNumber?: string;
  private authType?: string;

  constructor(resp?: Settlement) {
    super(resp);
    if (!resp) {
      return;
    }
    if (typeof resp.amount !== 'undefined') {
      this.amount = resp.amount;
    }
    if (typeof resp.availableToRefund !== 'undefined') {
      this.availableToRefund = resp.availableToRefund;
    }
    if (typeof resp.childAccountNum !== 'undefined') {
      this.childAccountNum = resp.childAccountNum;
    }
    if (typeof resp.txnTime !== 'undefined') {
      this.txnTime = resp.txnTime;
    }
    if (typeof resp.dupCheck !== 'undefined') {
      this.dupCheck = resp.dupCheck;
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
    if (typeof resp.authorization !== 'undefined') {
      this.authorization = new Authorization(resp.authorization);
    }
    if (typeof resp.links !== 'undefined') {
      this.links = createArray(resp.links, Link);
    }
    if (typeof resp.settlements !== 'undefined') {
      this.settlements = createArray(resp.settlements, Settlement);
    }
    if (typeof resp.originalMerchantRefNum !== 'undefined') {
      this.originalMerchantRefNum = resp.originalMerchantRefNum;
    }
    if (typeof resp.mode !== 'undefined') {
      this.mode = resp.mode;
    }
    if (typeof resp.currencyCode !== 'undefined') {
      this.currencyCode = resp.currencyCode;
    }
    if (typeof resp.confirmationNumber !== 'undefined') {
      this.confirmationNumber = resp.confirmationNumber;
    }
    if (typeof resp.authType !== 'undefined') {
      this.authType = resp.authType;
    }
  }

  public setAmount(amount: number): void { this.amount = amount; }
  public getAmount(): number | undefined { return this.amount; }

  public setAvailableToRefund(availableToRefund: number): void { this.availableToRefund = availableToRefund; }
  public getAvailableToRefund(): number | undefined { return this.availableToRefund; }

  public setChildAccountNum(childAccountNum: string): void { this.childAccountNum = childAccountNum; }
  public getChildAccountNum(): string | undefined { return this.childAccountNum; }

  public setTxnTime(txnTime: string): void { this.txnTime = txnTime; }
  public getTxnTime(): string | undefined { return this.txnTime; }

  public setDupCheck(dupCheck: boolean): void { this.dupCheck = dupCheck; }
  public getDupCheck(): boolean | undefined { return this.dupCheck; }

  public setStatus(status: string): void { this.status = status; }
  public getStatus(): string | undefined { return this.status; }

  public setRiskReasonCode(riskReasonCode: string): void { this.riskReasonCode = riskReasonCode; }
  public getRiskReasonCode(): string | undefined { return this.riskReasonCode; }

  public setAcquirerResponse(acquirerResponse: AcquirerResponse): void { this.acquirerResponse = acquirerResponse; }
  public getAcquirerResponse(): AcquirerResponse | undefined { return this.acquirerResponse; }

  public setAuthorization(authorization: Authorization): void { this.authorization = authorization; }
  public getAuthorization(): Authorization | undefined { return this.authorization; }
  public deleteAuthorization(): void { delete this.authorization; }

  public setLinks(links: Link[]): void { this.links = links; }
  public getLinks(): Link[] | undefined { return this.links; }

  public setSettlements(settlements: Settlement[]): void { this.settlements = settlements; }
  public getSettlements(): Settlement[] | undefined { return this.settlements; }

  public setMode(mode: string): void { this.mode = mode; }
  public getMode(): string | undefined { return this.mode; }

  public setCurrencyCode(currencyCode: string): void { this.currencyCode = currencyCode; }
  public getCurrencyCode(): string | undefined { return this.currencyCode; }

  public setAuthType(authType: string): void { this.authType = authType; }
  public getAuthType(): string | undefined { return this.authType; }

  public setConfirmationNumber(confirmationNumber: string): void { this.confirmationNumber = confirmationNumber; }
  public getConfirmationNumber(): string | undefined { return this.confirmationNumber; }

  public setOriginalMerchantRefNum(originalMerchantRefNum: string): void { this.originalMerchantRefNum = originalMerchantRefNum; }
  public getOriginalMerchantRefNum(): string | undefined { return this.originalMerchantRefNum; }

}
