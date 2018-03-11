import { Link } from '../common/link';
import { createArray } from '../common/create-array';
import { Authorization } from './authorization';
import { AcquirerResponse } from './acquirer-response';
import { PaysafeError } from '../paysafe-error';

export class Settlement {

  id?: any;
  merchantRefNum?: string;
  amount?: string;
  availableToRefund?: string;
  childAccountNum?: any;
  txnTime?: any;
  dupCheck?: any;
  status?: any;
  riskReasonCode?: any;
  acquirerResponse?: AcquirerResponse;
  authorization?: Authorization;
  links?: Link[];
  error?: PaysafeError;
  settlements?: Settlement[];
  originalMerchantRefNum?: string;
  mode?: any;
  currencyCode?: any;
  confirmationNumber?: any;
  authType?: any;

  constructor(resp?: Settlement) {
    if (!resp)
      return;
    this.id = resp.id;
    this.merchantRefNum = resp.merchantRefNum;
    this.amount = resp.amount;
    this.availableToRefund = resp.availableToRefund;
    this.childAccountNum = resp.childAccountNum;
    this.txnTime = resp.txnTime;
    this.dupCheck = resp.dupCheck;
    this.status = resp.status;
    this.riskReasonCode = resp.riskReasonCode;
    if (resp.acquirerResponse)
      this.acquirerResponse = new AcquirerResponse(resp.acquirerResponse);
    if (resp.authorization)
      this.authorization = new Authorization(resp.authorization);
    if (resp.links)
      this.links = createArray(resp.links, Link);
    if (resp.error)
      this.error = new PaysafeError(resp.error);
    if (resp.settlements)
      this.settlements = createArray(resp.settlements, Settlement);
    this.originalMerchantRefNum = resp.originalMerchantRefNum;
    this.mode = resp.mode;
    this.currencyCode = resp.currencyCode;
    this.confirmationNumber = resp.confirmationNumber;
    this.authType = resp.authType;
  }

  setOriginalMerchantRefNum(originalMerchantRefNum: string): void { this.originalMerchantRefNum = originalMerchantRefNum; }
  getOriginalMerchantRefNum(): string | undefined { return this.originalMerchantRefNum; };
  setAuthType(authType: any): void { this.authType = authType; }
  getAuthType(): any | undefined { return this.authType; }
  setConfirmationNumber(confirmationNumber: any): void { this.confirmationNumber = confirmationNumber; }
  getConfirmationNumber(): any | undefined { return this.confirmationNumber; }
  setCurrencyCode(currencyCode: any): void { this.currencyCode = currencyCode; }
  getCurrencyCode(): any | undefined { return this.currencyCode; }
  setMode(mode: any): void { this.mode = mode; }
  getMode(): any | undefined { return this.mode; }
  setSettlements(settlements: Settlement[]): void { this.settlements = settlements; }
  getSettlements(): Settlement[] | undefined { return this.settlements; };
  setStatus(status: any): void { this.status = status; }
  getStatus(): any | undefined { return this.status; }
  setLinks(links: Link[]): void { this.links = links; }
  getLinks(): Link[] | undefined { return this.links; }
  setError(error: PaysafeError): void { this.error = error; }
  getError(): PaysafeError | undefined { return this.error; }
  setAuthorization(authorization: Authorization): void { this.authorization = authorization; }
  getAuthorization(): Authorization | undefined { return this.authorization; }
  setAvailableToRefund(availableToRefund: string): void { this.availableToRefund = availableToRefund; }
  getAvailableToRefund(): string | undefined { return this.availableToRefund; }
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
  setMerchantRefNum(merchantRefNum: string): void { this.merchantRefNum = merchantRefNum; }
  getMerchantRefNum(): string | undefined { return this.merchantRefNum; }
  setId(id: any): void { this.id = id; }
  getId(): any | undefined { return this.id; }

}