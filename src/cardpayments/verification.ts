import { Link } from '../common/link';
import { createArray } from '../common/create-array';
import { RequestObject } from '../request-object';

import { AccordD } from './accord-d';
import { AcquirerResponse } from './acquirer-response';
import { Authentication } from './authentication';
import { BillingDetails } from './billing-details';
import { Card } from './card';
import { MerchantDescriptor } from './merchant-descriptor';
import { ShippingDetails } from './shipping-details';

import { Profile } from '../customervault/profile';
import { PaysafeError } from '../paysafe-error';


export class Verification extends RequestObject {

  id?: any;
  merchantRefNum?: string;
  childAccountNum?: any;
  card?: Card;
  authCode?: any;
  profile?: any;
  billingDetails?: BillingDetails;
  customerIp?: any;
  dupCheck?: any;
  description?: any;
  txnTime?: any;
  currencyCode?: any;
  avsResponse?: any;
  cvvVerification?: any;
  error?: PaysafeError;
  status?: any;
  riskReasonCode?: any;
  acquirerResponse?: AcquirerResponse;
  links?: Link[];
  verifications?: Verification[];
  accordD?: AccordD;
  merchantDescriptor?: MerchantDescriptor;
  shippingDetails?: ShippingDetails;
  authentication?: Authentication;

  constructor(resp?: Verification) {
    super();
    if (!resp)
      return;
  }

  setAccordD(accordD: AccordD): void { this.accordD = accordD; }
  getAccordD(): AccordD | undefined { return this.accordD; }
  setMerchantDescriptor(merchantDescriptor: MerchantDescriptor): void { this.merchantDescriptor = merchantDescriptor; }
  getMerchantDescriptor(): MerchantDescriptor | undefined { return this.merchantDescriptor; }
  setShippingDetails(shippingDetails: ShippingDetails): void { this.shippingDetails = shippingDetails; }
  getShippingDetails(): ShippingDetails | undefined { return this.shippingDetails; }
  setAuthentication(authentication: Authentication): void { this.authentication = authentication; }
  getAuthentication(): Authentication | undefined { return this.authentication; }
  setVerifications(verifications: Verification[]): void { this.verifications = verifications; }
  getVerifications(): Verification[] | undefined { return this.verifications; }
  setLinks(links: Link[]): void { this.links = links; }
  getLinks(): Link[] | undefined { return this.links; }
  setCvvVerification(cvvVerification: any): void { this.cvvVerification = cvvVerification; }
  getCvvVerification(): any | undefined { return this.cvvVerification; }
  setAvsResponse(avsResponse: any): void { this.avsResponse = avsResponse; }
  getAvsResponse(): any | undefined { return this.avsResponse; }
  setCurrencyCode(currencyCode: any): void { this.currencyCode = currencyCode; }
  getCurrencyCode(): any | undefined { return this.currencyCode; }
  setDescription(description: any): void { this.description = description; }
  getDescription(): any | undefined { return this.description; }
  setCustomerIp(customerIp: any): void { this.customerIp = customerIp; }
  getCustomerIp(): any | undefined { return this.customerIp; }
  setBillingDetails(billingDetails: BillingDetails): void { this.billingDetails = billingDetails; }
  getBillingDetails(): BillingDetails | undefined { return this.billingDetails; }
  setProfile(profile: any): void { this.profile = profile; }
  getProfile(): any | undefined { return this.profile; }
  setAuthCode(authCode: any): void { this.authCode = authCode; }
  getAuthCode(): any | undefined { return this.authCode; }
  setCard(card: Card): void { this.card = card; }
  getCard(): Card | undefined { return this.card; }
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
  setError(error: PaysafeError): void { this.error = error; }
  getError(): PaysafeError | undefined { return this.error; }
  setMerchantRefNum(merchantRefNum: any): void { this.merchantRefNum = merchantRefNum; }
  getMerchantRefNum(): any | undefined { return this.merchantRefNum; }
  setId(id: any): void { this.id = id; }
  getId(): any | undefined { return this.id; }
}
