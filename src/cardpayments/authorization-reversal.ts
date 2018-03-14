import { RequestObject } from '../request-object';

import { Link } from '../common/link';
import { createArray } from '../common/create-array';
import { Authorization } from './authorization';
import { AcquirerResponse } from './acquirer-response';
import { PaysafeError } from '../paysafe-error';

export class AuthorizationReversal extends RequestObject {

  private amount?: string;
  private childAccountNum?: any;
  private dupCheck?: any;
  private txnTime?: any;
  private status?: any;
  private riskReasonCode?: any;
  private acquirerResponse?: AcquirerResponse;
  private links?: Link[];
  private voidAuths?: AuthorizationReversal[];
  private authorization?: Authorization;

  constructor(resp?: AuthorizationReversal) {
    super(resp);
    if (!resp)
      return;
    this.amount = resp.amount;
    this.childAccountNum = resp.childAccountNum;
    this.dupCheck = resp.dupCheck;
    this.txnTime = resp.txnTime;
    this.status = resp.status;
    this.riskReasonCode = resp.riskReasonCode;
    if (resp.acquirerResponse)
      this.acquirerResponse = new AcquirerResponse(resp.acquirerResponse);
    if (resp.links)
      this.links = createArray(resp.links, Link);
    if (resp.voidAuths)
      this.voidAuths = createArray(resp.voidAuths, AuthorizationReversal);
    if (resp.authorization)
      this.authorization = new Authorization(resp.authorization);
  }

  setAuthorization(authorization: Authorization): void { this.authorization = authorization; }
  getAuthorization(): Authorization | undefined { return this.authorization; }
  deleteAuthorization(): void { delete this.authorization; }

  setVoidAuths(voidAuths: AuthorizationReversal[]): void { this.voidAuths = voidAuths; }
  getVoidAuths(): AuthorizationReversal[] | undefined { return this.voidAuths; }
  
  setLinks(links: Link[]): void { this.links = links; }
  getLinks(): Link[] | undefined { return this.links; }
  
  setTxnTime(txnTime: any): void { this.txnTime = txnTime; }
  getTxnTime(): any | undefined { return this.txnTime; }
  
  setDupCheck(dupCheck: any): void { this.dupCheck = dupCheck; }
  getDupCheck(): any | undefined { return this.dupCheck; }
  
  setAcquirerResponse(acquirerResponse: AcquirerResponse): void { this.acquirerResponse = acquirerResponse; }
  getAcquirerResponse(): AcquirerResponse | undefined { return this.acquirerResponse; }
  
  setRiskReasonCode(riskReasonCode: any): void { this.riskReasonCode = riskReasonCode; }
  getRiskReasonCode(): any | undefined { return this.riskReasonCode; }
  
  setChildAccountNum(childAccountNum: any): void { this.childAccountNum = childAccountNum; }
  getChildAccountNum(): any | undefined { return this.childAccountNum; }
  
  setAmount(amount: string): void { this.amount = amount; }
  getAmount(): string | undefined { return this.amount; }
   
  setStatus(status: any): void { this.status = status; }
  getStatus(): any | undefined { return this.status; }
  
}
