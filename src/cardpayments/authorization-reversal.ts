import { createArray } from '../common/create-array';
import { Link } from '../common/link';
import { PaysafeError } from '../paysafe-error';
import { RequestObject } from '../request-object';
import { AcquirerResponse } from './acquirer-response';
import { Authorization } from './authorization';

export class AuthorizationReversal extends RequestObject {

  private amount?: number;
  private childAccountNum?: string;
  private dupCheck?: boolean;
  private txnTime?: string;
  private status?: string;
  private riskReasonCode?: string;
  private acquirerResponse?: AcquirerResponse;
  private links?: Link[];
  private voidAuths?: AuthorizationReversal[];
  private authorization?: Authorization;

  constructor(resp?: AuthorizationReversal) {
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
    if (typeof resp.links !== 'undefined') {
      this.links = createArray(resp.links, Link);
    }
    if (typeof resp.voidAuths !== 'undefined') {
      this.voidAuths = createArray(resp.voidAuths, AuthorizationReversal);
    }
    if (typeof resp.authorization !== 'undefined') {
      this.authorization = new Authorization(resp.authorization);
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

  public setLinks(links: Link[]): void { this.links = links; }
  public getLinks(): Link[] | undefined { return this.links; }

  public setVoidAuths(voidAuths: AuthorizationReversal[]): void { this.voidAuths = voidAuths; }
  public getVoidAuths(): AuthorizationReversal[] | undefined { return this.voidAuths; }

  public setAuthorization(authorization: Authorization): void { this.authorization = authorization; }
  public getAuthorization(): Authorization | undefined { return this.authorization; }
  public deleteAuthorization(): void { delete this.authorization; }

}
