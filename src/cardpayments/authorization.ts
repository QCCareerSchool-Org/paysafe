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

  private amount?: string;
  private settleWithAuth?: string;
  private availableToSettle?: string;
  private childAccountNum?: string;
  private card?: Card;
  private authentication?: Authentication;
  private authCode?: string;
  private profile?: Profile;
  private billingDetails?: BillingDetails;
  private shippingDetails?: ShippingDetails;
  private recurring?: string;
  private customerIp?: string;
  private dupCheck?: string;
  private keywords?: string;
  private merchantDescriptor?: MerchantDescriptor;
  private accordD?: AccordD;
  private description?: string;
  private masterPass?: MasterPass;
  private txnTime?: string;
  private currencyCode?: string;
  private avsResponse?: string;
  private cvvVerification?: string;
  private status?: string;
  private riskReasonCode?: string;
  private acquirerResponse?: AcquirerResponse;
  private visaAdditionalAuthData?: VisaAdditionalAuthData;
  private links?: Link[];
  private auths?: Authorization[];
  private settlements?: Settlement[];

  constructor(resp?: Authorization) {
    super(resp);
    if (!resp)
      return;
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

  setAmount(amount: string): void { this.amount = amount; }
  getAmount(): string | undefined { return this.amount; }

  setSettleWithAuth(settleWithAuth: string): void { this.settleWithAuth = settleWithAuth; }
  getSettleWithAuth(): string | undefined { return this.settleWithAuth; }

  setAvailableToSettle(availableToSettle: string): void { this.availableToSettle = availableToSettle; }
  getAvailableToSettle(): string | undefined { return this.availableToSettle; }

  setChildAccountNum(childAccountNum: string): void { this.childAccountNum = childAccountNum; }
  getChildAccountNum(): string | undefined { return this.childAccountNum; }

  setCard(card: Card): void { this.card = card; }
  getCard(): Card | undefined { return this.card; }

  setAuthentication(authentication: Authentication): void { this.authentication = authentication; }
  getAuthentication(): Authentication | undefined { return this.authentication; }

  setAuthCode(authCode: string): void { this.authCode = authCode; }
  getAuthCode(): string | undefined { return this.authCode; }

  setProfile(profile: Profile): void { this.profile = profile; }
  getProfile(): Profile | undefined { return this.profile; }

  setBillingDetails(billingDetails: BillingDetails): void { this.billingDetails = billingDetails; }
  getBillingDetails(): BillingDetails | undefined { return this.billingDetails; }

  setShippingDetails(shippingDetails: ShippingDetails): void { this.shippingDetails = shippingDetails; }
  getShippingDetails(): ShippingDetails | undefined { return this.shippingDetails; }

  setRecurring(recurring: string): void { this.recurring = recurring; }
  getRecurring(): string | undefined { return this.recurring; }

  setCustomerIp(customerIp: string): void { this.customerIp = customerIp; }
  getCustomerIp(): string | undefined { return this.customerIp; }

  setDupCheck(dupCheck: string): void { this.dupCheck = dupCheck; }
  getDupCheck(): string | undefined { return this.dupCheck; }

  setKeywords(keywords: string): void { this.keywords = keywords; }
  getKeywords(): string | undefined { return this.keywords; }

  setMerchantDescriptor(merchantDescriptor: MerchantDescriptor): void { this.merchantDescriptor = merchantDescriptor; }
  getMerchantDescriptor(): MerchantDescriptor | undefined { return this.merchantDescriptor; }

  setAccordD(accordD: AccordD): void { this.accordD = accordD; }
  getAccordD(): AccordD | undefined { return this.accordD; }

  setDescription(description: string): void { this.description = description; }
  getDescription(): string | undefined { return this.description; }

  setMasterPass(masterPass: MasterPass): void { this.masterPass = masterPass; }
  getMasterPass(): MasterPass | undefined { return this.masterPass; }

  setTxnTime(txnTime: string): void { this.txnTime = txnTime; }
  getTxnTime(): string | undefined { return this.txnTime; }

  setCurrencyCode(currencyCode: string): void { this.currencyCode = currencyCode; }
  getCurrencyCode(): string | undefined { return this.currencyCode; }

  setAvsResponse(avsResponse: string): void { this.avsResponse = avsResponse; }
  getAvsResponse(): string | undefined { return this.avsResponse; }

  setCvvVerification(cvvVerification: string): void { this.cvvVerification = cvvVerification; }
  getCvvVerification(): string | undefined { return this.cvvVerification; }

  setStatus(status: string): void { this.status = status; }
  getStatus(): string | undefined { return this.status; }

  setRiskReasonCode(riskReasonCode: string): void { this.riskReasonCode = riskReasonCode; }
  getRiskReasonCode(): string | undefined { return this.riskReasonCode; }

  setAcquirerResponse(acquirerResponse: AcquirerResponse): void { this.acquirerResponse = acquirerResponse; }
  getAcquirerResponse(): AcquirerResponse | undefined { return this.acquirerResponse; }

  setVisaAdditionalAuthData(visaAdditionalAuthData: VisaAdditionalAuthData): void { this.visaAdditionalAuthData = visaAdditionalAuthData; }
  getVisaAdditionalAuthData(): VisaAdditionalAuthData | undefined { return this.visaAdditionalAuthData; }

  setLinks(links: Link[]): void { this.links = links; }
  getLinks(): Link[] | undefined { return this.links; }

  setAuths(auths: Authorization[]): void { this.auths = auths; }
  getAuths(): Authorization[] | undefined { return this.auths; }

  setSettlements(settlements: Settlement[]): void { this.settlements = settlements; }
  getSettlements(): Settlement[] | undefined { return this.settlements; }

}
