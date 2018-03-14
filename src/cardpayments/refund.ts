import { Link } from '../common/link';
import { createArray } from '../common/create-array';
import { Settlement } from './settlement';
import { AcquirerResponse } from './acquirer-response';
import { RequestObject } from '../request-object';
import { PaysafeError } from '../paysafe-error';

export class Refund extends RequestObject {

  private amount?: string;
  private childAccountNum?: any;
  private dupCheck?: any;
  private txnTime?: any;
  private status?: any;
  private riskReasonCode?: any;
  private acquirerResponse?: AcquirerResponse;
  private settlements?: Settlement;
  private links?: Link[];
  private refunds?: Refund[];
  private currencyCode?: string;
  private originalMerchantRefNum?: string;
  private mode: any;
  private authType: any;
  private confirmationNumber: any;

  constructor(resp?: Refund) {
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
    if (resp.settlements)
      this.settlements = new Settlement(resp.settlements);
    if (resp.links)
      this.links = createArray(resp.links, Link);
    if (resp.refunds)
      this.refunds = createArray(resp.refunds, Refund);
    this.currencyCode = resp.currencyCode;
    this.originalMerchantRefNum = resp.originalMerchantRefNum;
    this.mode = resp.mode;
    this.authType = resp.authType;
    this.confirmationNumber = resp.confirmationNumber;
  }

  setConfirmationNumber(confirmationNumber: any): void { this.confirmationNumber = confirmationNumber; }
  getConfirmationNumber(): any | undefined { return this.confirmationNumber; }

  setAuthType(authType: any): void { this.authType = authType; }
  getAuthType(): any | undefined { return this.authType; }

  setMode(mode: any): void { this.mode = mode; }
  getMode(): any | undefined { return this.mode; }

  setOriginalMerchantRefNum(originalMerchantRefNum: string): void { this.originalMerchantRefNum = originalMerchantRefNum; }
  getOriginalMerchantRefNum(): string | undefined { return this.originalMerchantRefNum; }

  setCurrencyCode(currencyCode: string): void { this.currencyCode = currencyCode; }
  getCurrencyCode(): string | undefined { return this.currencyCode; }

  setRefunds(refunds: Refund[]): void { this.refunds = refunds; }
  getRefunds(): Refund[] | undefined { return this.refunds; }

  setStatus(status: any): void { this.status = status; }
  getStatus(): any | undefined { return this.status; }

  setLinks(links: Link[]): void { this.links = links; }
  getLinks(): Link[] | undefined { return this.links; }

  setSettlements(settlements: Settlement): void { this.settlements = settlements; }
  getSettlements(): Settlement | undefined { return this.settlements; }
  deleteSettlements(): void { delete this.settlements; }

  setTxnTime(txnTime: any): void { this.txnTime = txnTime; }
  getTxnTime(): any | undefined { return this.txnTime; }

  setDupCheck(dupCheck: any): void { this.dupCheck = dupCheck; }
  getDupCheck(): any | undefined { return this.dupCheck; }

  setChildAccountNum(childAccountNum: any): void { this.childAccountNum = childAccountNum; }
  getChildAccountNum(): any | undefined { return this.childAccountNum; }

  setAcquirerResponse(acquirerResponse: AcquirerResponse): void { this.acquirerResponse = acquirerResponse; }
  getAcquirerResponse(): AcquirerResponse | undefined { return this.acquirerResponse; }

  setRiskReasonCode(riskReasonCode: any): void { this.riskReasonCode = riskReasonCode; }
  getRiskReasonCode(): any | undefined { return this.riskReasonCode; }

  setAmount(amount: string): void { this.amount = amount; }
  getAmount(): string | undefined { return this.amount; }

}
