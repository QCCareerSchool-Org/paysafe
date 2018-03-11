import { PaysafeError } from '../paysafe-error';
import { createArray } from '../common/create-array';
import { Link } from '../common/link';

import { AccordD } from './accord-d';
import { Authentication } from './authentication';
import { Card } from './card';

import { Profile } from '../customervault/profile';
import { BillingDetails } from './billing-details';
import { ShippingDetails } from './shipping-details';

import { MasterPass } from './master-pass';
import { AcquirerResponse } from './acquirer-response';
import { VisaAdditionalAuthData } from './visa-additional-auth-data';
import { MerchantDescriptor } from './merchant-descriptor';
import { Settlement } from './settlement';
import { RequestObject } from '../request-object';

export class Authorization extends RequestObject {

  id?: string;
  merchantRefNum?: string;
  amount?: string;
  settleWithAuth?: any;
  availableToSettle?: any;
  childAccountNum?: any;
  card?: any;
  authentication?: Authentication;
  authCode?: any;
  profile?: any;
  billingDetails?: BillingDetails;
  shippingDetails?: ShippingDetails;
  recurring?: any;
  customerIp?: any;
  dupCheck?: any;
  keywords?: any;
  merchantDescriptor?: MerchantDescriptor;
  accordD?: AccordD;
  description?: any;
  masterPass?: MasterPass;
  txnTime?: any;
  currencyCode?: any;
  avsResponse?: any;
  cvvVerification?: any;
  error?: PaysafeError;
  status?: any;
  riskReasonCode?: any;
  acquirerResponse?: AcquirerResponse;
  visaAdditionalAuthData?: VisaAdditionalAuthData;
  links?: Link[];
  auths?: Authorization[];
  settlements?: Settlement[];

  constructor(resp?: Authorization) {
    super();
    if (!resp)
      return;
    this.id = resp.id;
    this.merchantRefNum = resp.merchantRefNum;
    this.amount = resp.amount;
    this.settleWithAuth = resp.settleWithAuth;
    this.availableToSettle = resp.availableToSettle;
    this.childAccountNum = resp.childAccountNum;
    if (resp.card)
      this.card = new Card(resp.card);
    if (resp.authentication)
      this.authentication = new Authentication(resp.authentication);
    this.authCode = resp.authCode;
    if (resp.profile)
      this.profile = new Profile(resp.profile);
    if (resp.billingDetails)
      this.billingDetails = new BillingDetails(resp.billingDetails);
    if (resp.shippingDetails)
      this.shippingDetails = new ShippingDetails(resp.shippingDetails);
    this.recurring = resp.recurring;
    this.customerIp = resp.customerIp;
    this.dupCheck = resp.dupCheck;
    this.keywords = resp.keywords;
    if (resp.merchantDescriptor)
      this.merchantDescriptor = new MerchantDescriptor(resp.merchantDescriptor);
    if (resp.accordD)
      this.accordD = new AccordD(resp.accordD);
    this.description = resp.description;
    if (resp.masterPass)
      this.masterPass = new MasterPass(resp.masterPass);
    this.txnTime = resp.txnTime;
    this.currencyCode = resp.currencyCode;
    this.avsResponse = resp.avsResponse;
    this.cvvVerification = resp.cvvVerification;
    if (resp.error)
      this.error = new PaysafeError(resp.error);
    this.status = resp.status;
    this.riskReasonCode = resp.riskReasonCode;
    if (resp.acquirerResponse)
      this.acquirerResponse = new AcquirerResponse(resp.acquirerResponse);
    if (resp.visaAdditionalAuthData)
      this.visaAdditionalAuthData = new VisaAdditionalAuthData(resp.visaAdditionalAuthData);
    if (resp.links)
      this.links = createArray(resp.links, Link);
    if (resp.auths)
      this.auths = createArray(resp.auths, Authorization);
    if (resp.settlements)
      this.settlements = createArray(resp.settlements, Settlement);
  }

  setSettlements(settlements: Settlement[]): void { this.settlements = settlements; }
  getSettlements(): Settlement[] | undefined { return this.settlements; }
  setAuths(auths: Authorization[]): void { this.auths = auths; }
  getAuths(): Authorization[] | undefined { return this.auths; }
  setLinks(links: Link[]): void { this.links = links; }
  getLinks(): Link[] | undefined { return this.links; }
  setShippingDetails(shippingDetails: ShippingDetails): void { this.shippingDetails = shippingDetails; }
  getShippingDetails(): ShippingDetails | undefined { return this.shippingDetails; }
  setVisaAdditionalAuthData(visaAdditionalAuthData: VisaAdditionalAuthData): void { this.visaAdditionalAuthData = visaAdditionalAuthData; }
  getVisaAdditionalAuthData(): VisaAdditionalAuthData | undefined { return this.visaAdditionalAuthData; }
  setAcquirerResponse(acquirerResponse: AcquirerResponse): void { this.acquirerResponse = acquirerResponse; }
  getAcquirerResponse(): AcquirerResponse | undefined { return this.acquirerResponse; }
  setRiskReasonCode(riskReasonCode: any): void { this.riskReasonCode = riskReasonCode; }
  getRiskReasonCode(): any | undefined { return this.riskReasonCode; }
  setError(error: PaysafeError): void { this.error = error; }
  getError(): PaysafeError | undefined { return this.error; }
  setCvvVerification(cvvVerification: any): void { this.cvvVerification = cvvVerification; }
  getCvvVerification(): any | undefined { return this.cvvVerification; }
  setAvsResponse(avsResponse: any): void { this.avsResponse = avsResponse; }
  getAvsResponse(): any | undefined { return this.avsResponse; }
  setCurrencyCode(currencyCode: any): void { this.currencyCode = currencyCode; }
  getCurrencyCode(): any | undefined { return this.currencyCode; }
  setTxnTime(txnTime: any): void { this.txnTime = txnTime; }
  getTxnTime(): any | undefined { return this.txnTime; }
  setMasterPass(masterPass: MasterPass): void { this.masterPass = masterPass; }
  getMasterPass(): MasterPass | undefined { return this.masterPass; }
  setDescription(description: any): void { this.description = description; }
  getDescription(): any | undefined { return this.description; }
  setAccordD(accordD: AccordD): void { this.accordD = accordD; }
  getAccordD(): AccordD | undefined { return this.accordD; }
  setMerchantDescriptor(merchantDescriptor: MerchantDescriptor): void { this.merchantDescriptor = merchantDescriptor; }
  getMerchantDescriptor(): MerchantDescriptor | undefined { return this.merchantDescriptor; }
  setCard(card: Card): void { this.card = card; }
  getCard(): Card | undefined { return this.card; }
  setKeywords(keywords: any): void { this.keywords = keywords; }
  getKeywords(): any | undefined { return this.keywords; }
  setDupCheck(dupCheck: any): void { this.dupCheck = dupCheck; }
  getDupCheck(): any | undefined { return this.dupCheck; }
  setRecurring(recurring: any): void { this.recurring = recurring; }
  getRecurring(): any | undefined { return this.recurring; }
  setBillingDetails(billingDetails: BillingDetails): void { this.billingDetails = billingDetails; }
  getBillingDetails(): BillingDetails | undefined { return this.billingDetails; }
  setProfile(profile: any): void { this.profile = profile; }
  getProfile(): any | undefined { return this.profile; }
  setAuthCode(authCode: any): void { this.authCode = authCode; }
  getAuthCode(): any | undefined { return this.authCode; }
  setCustomerIp(customerIp: any): void { this.customerIp = customerIp; }
  getCustomerIp(): any | undefined { return this.customerIp; }
  setAuthentication(authentication: Authentication): void { this.authentication = authentication; }
  getAuthentication(): Authentication | undefined { return this.authentication; }
  setChildAccountNum(childAccountNum: any): void { this.childAccountNum = childAccountNum; }
  getChildAccountNum(): any | undefined { return this.childAccountNum; }
  setAvailableToSettle(availableToSettle: any): void { this.availableToSettle = availableToSettle; }
  getAvailableToSettle(): any | undefined { return this.availableToSettle; }
  setSettleWithAuth(settleWithAuth: any): void{ this.settleWithAuth = settleWithAuth; }
  getSettleWithAuth(): any | undefined { return this.settleWithAuth; }
  setAmount(amount: string): void { this.amount = amount; }
  getAmount(): string | undefined { return this.amount; }
  setMerchantRefNum(merchantRefNum: string): void { this.merchantRefNum = merchantRefNum; }
  getMerchantRefNum(): string | undefined { return this.merchantRefNum; }
  setStatus(status: any): void { this.status = status; }
  getStatus(): any | undefined { return this.status; }
  setId(id: string): void { this.id = id; }
  getId(): string | undefined { return this.id; }

}
