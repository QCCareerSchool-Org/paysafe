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

  private childAccountNum?: any;
  private card?: Card;
  private authCode?: any;
  private profile?: any;
  private billingDetails?: BillingDetails;
  private customerIp?: any;
  private dupCheck?: any;
  private description?: any;
  private txnTime?: any;
  private currencyCode?: any;
  private avsResponse?: any;
  private cvvVerification?: any;
  private status?: any;
  private riskReasonCode?: any;
  private acquirerResponse?: AcquirerResponse;
  private links?: Link[];
  private verifications?: Verification[];
  private accordD?: AccordD;
  private merchantDescriptor?: MerchantDescriptor;
  private shippingDetails?: ShippingDetails;
  private authentication?: Authentication;

  constructor(resp?: Verification) {
    super(resp);
    if (!resp)
      return;
    this.childAccountNum = resp.childAccountNum;
    if (resp.card)
      this.card = new Card(resp.card);
    this.authCode = resp.authCode;
    if (resp.profile)
      this.profile = new Profile(resp.profile);
    if (resp.billingDetails)
      this.billingDetails = new BillingDetails(resp.billingDetails);
    this.customerIp = resp.customerIp;
    this.dupCheck = resp.dupCheck;
    this.description = resp.description;
    this.txnTime = resp.txnTime;
    this.currencyCode = resp.currencyCode;
    this.avsResponse = resp.avsResponse;
    this.cvvVerification = resp.cvvVerification;
    this.status = resp.status;
    this.riskReasonCode = resp.riskReasonCode;
    if (this.acquirerResponse)
      this.acquirerResponse = new AcquirerResponse(resp.acquirerResponse);
    if (resp.links)
      this.links = createArray(resp.links, Link);
    if (resp.verifications)
      this.verifications = createArray(resp.verifications, Verification);
    if (resp.accordD)
      this.accordD = new AccordD(resp.accordD);
    if (resp.merchantDescriptor)
      this.merchantDescriptor = new MerchantDescriptor(resp.merchantDescriptor);
    if (resp.shippingDetails)
      this.shippingDetails = new ShippingDetails(resp.shippingDetails);
    if (resp.authentication)
      this.authentication = new Authentication(resp.authentication);
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

}
