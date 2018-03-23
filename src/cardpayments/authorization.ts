import { createArray } from '../common/create-array';
import { Link } from '../common/link';
import { Profile } from '../customervault/profile';
import { PaysafeError } from '../paysafe-error';
import { RequestObject } from '../request-object';
import { AccordD } from './accord-d';
import { AcquirerResponse } from './acquirer-response';
import { Authentication } from './authentication';
import { BillingDetails } from './billing-details';
import { Card } from './card';
import { MasterPass } from './master-pass';
import { MerchantDescriptor } from './merchant-descriptor';
import { Settlement } from './settlement';
import { ShippingDetails } from './shipping-details';
import { VisaAdditionalAuthData } from './visa-additional-auth-data';

export class Authorization extends RequestObject {

  private merchantRefNum?: string;
  private amount?: number;
  private settleWithAuth?: boolean;
  private availableToSettle?: number;
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
    if (!resp) {
      return;
    }
    if (typeof resp.merchantRefNum !== 'undefined') {
      this.merchantRefNum = resp.merchantRefNum;
    }
    if (typeof resp.amount !== 'undefined') {
      this.amount = resp.amount;
    }
    if (typeof resp.settleWithAuth !== 'undefined') {
      this.settleWithAuth = resp.settleWithAuth;
    }
    if (typeof resp.availableToSettle !== 'undefined') {
      this.availableToSettle = resp.availableToSettle;
    }
    if (typeof resp.childAccountNum !== 'undefined') {
      this.childAccountNum = resp.childAccountNum;
    }
    if (typeof resp.card !== 'undefined') {
      this.card = new Card(resp.card);
    }
    if (typeof resp.authentication !== 'undefined') {
      this.authentication = new Authentication(resp.authentication);
    }
    if (typeof resp.authCode !== 'undefined') {
      this.authCode = resp.authCode;
    }
    if (typeof resp.profile !== 'undefined') {
      this.profile = new Profile(resp.profile);
    }
    if (typeof resp.billingDetails !== 'undefined') {
      this.billingDetails = new BillingDetails(resp.billingDetails);
    }
    if (typeof resp.shippingDetails !== 'undefined') {
      this.shippingDetails = new ShippingDetails(resp.shippingDetails);
    }
    if (typeof resp.recurring !== 'undefined') {
      this.recurring = resp.recurring;
    }
    if (typeof resp.customerIp !== 'undefined') {
      this.customerIp = resp.customerIp;
    }
    if (typeof resp.dupCheck !== 'undefined') {
      this.dupCheck = resp.dupCheck;
    }
    if (typeof resp.keywords !== 'undefined') {
      this.keywords = resp.keywords;
    }
    if (typeof resp.merchantDescriptor !== 'undefined') {
      this.merchantDescriptor = new MerchantDescriptor(resp.merchantDescriptor);
    }
    if (typeof resp.accordD !== 'undefined') {
      this.accordD = new AccordD(resp.accordD);
    }
    if (typeof resp.description !== 'undefined') {
      this.description = resp.description;
    }
    if (typeof resp.masterPass !== 'undefined') {
      this.masterPass = new MasterPass(resp.masterPass);
    }
    if (typeof resp.txnTime !== 'undefined') {
      this.txnTime = resp.txnTime;
    }
    if (typeof resp.currencyCode !== 'undefined') {
      this.currencyCode = resp.currencyCode;
    }
    if (typeof resp.avsResponse !== 'undefined') {
      this.avsResponse = resp.avsResponse;
    }
    if (typeof resp.cvvVerification !== 'undefined') {
      this.cvvVerification = resp.cvvVerification;
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
    if (typeof resp.visaAdditionalAuthData !== 'undefined') {
      this.visaAdditionalAuthData = new VisaAdditionalAuthData(resp.visaAdditionalAuthData);
    }
    if (typeof resp.links !== 'undefined') {
      this.links = createArray(resp.links, Link);
    }
    if (typeof resp.auths !== 'undefined') {
      this.auths = createArray(resp.auths, Authorization);
    }
    if (typeof resp.settlements !== 'undefined') {
      this.settlements = createArray(resp.settlements, Settlement);
    }
  }

  public setMerchantRefNum(merchantRefNum: string): void { this.merchantRefNum = merchantRefNum; }
  public getMerchantRefNum(): string | undefined { return this.merchantRefNum; }

  public setAmount(amount: number): void { this.amount = amount; }
  public getAmount(): number | undefined { return this.amount; }

  public setSettleWithAuth(settleWithAuth: boolean): void { this.settleWithAuth = settleWithAuth; }
  public getSettleWithAuth(): boolean | undefined { return this.settleWithAuth; }

  public setAvailableToSettle(availableToSettle: number): void { this.availableToSettle = availableToSettle; }
  public getAvailableToSettle(): number | undefined { return this.availableToSettle; }

  public setChildAccountNum(childAccountNum: string): void { this.childAccountNum = childAccountNum; }
  public getChildAccountNum(): string | undefined { return this.childAccountNum; }

  public setCard(card: Card): void { this.card = card; }
  public getCard(): Card | undefined { return this.card; }

  public setAuthentication(authentication: Authentication): void { this.authentication = authentication; }
  public getAuthentication(): Authentication | undefined { return this.authentication; }

  public setAuthCode(authCode: string): void { this.authCode = authCode; }
  public getAuthCode(): string | undefined { return this.authCode; }

  public setProfile(profile: Profile): void { this.profile = profile; }
  public getProfile(): Profile | undefined { return this.profile; }

  public setBillingDetails(billingDetails: BillingDetails): void { this.billingDetails = billingDetails; }
  public getBillingDetails(): BillingDetails | undefined { return this.billingDetails; }

  public setShippingDetails(shippingDetails: ShippingDetails): void { this.shippingDetails = shippingDetails; }
  public getShippingDetails(): ShippingDetails | undefined { return this.shippingDetails; }

  public setRecurring(recurring: string): void { this.recurring = recurring; }
  public getRecurring(): string | undefined { return this.recurring; }

  public setCustomerIp(customerIp: string): void { this.customerIp = customerIp; }
  public getCustomerIp(): string | undefined { return this.customerIp; }

  public setDupCheck(dupCheck: string): void { this.dupCheck = dupCheck; }
  public getDupCheck(): string | undefined { return this.dupCheck; }

  public setKeywords(keywords: string): void { this.keywords = keywords; }
  public getKeywords(): string | undefined { return this.keywords; }

  public setMerchantDescriptor(merchantDescriptor: MerchantDescriptor): void { this.merchantDescriptor = merchantDescriptor; }
  public getMerchantDescriptor(): MerchantDescriptor | undefined { return this.merchantDescriptor; }

  public setAccordD(accordD: AccordD): void { this.accordD = accordD; }
  public getAccordD(): AccordD | undefined { return this.accordD; }

  public setDescription(description: string): void { this.description = description; }
  public getDescription(): string | undefined { return this.description; }

  public setMasterPass(masterPass: MasterPass): void { this.masterPass = masterPass; }
  public getMasterPass(): MasterPass | undefined { return this.masterPass; }

  public setTxnTime(txnTime: string): void { this.txnTime = txnTime; }
  public getTxnTime(): string | undefined { return this.txnTime; }

  public setCurrencyCode(currencyCode: string): void { this.currencyCode = currencyCode; }
  public getCurrencyCode(): string | undefined { return this.currencyCode; }

  public setAvsResponse(avsResponse: string): void { this.avsResponse = avsResponse; }
  public getAvsResponse(): string | undefined { return this.avsResponse; }

  public setCvvVerification(cvvVerification: string): void { this.cvvVerification = cvvVerification; }
  public getCvvVerification(): string | undefined { return this.cvvVerification; }

  public setStatus(status: string): void { this.status = status; }
  public getStatus(): string | undefined { return this.status; }

  public setRiskReasonCode(riskReasonCode: string): void { this.riskReasonCode = riskReasonCode; }
  public getRiskReasonCode(): string | undefined { return this.riskReasonCode; }

  public setAcquirerResponse(acquirerResponse: AcquirerResponse): void { this.acquirerResponse = acquirerResponse; }
  public getAcquirerResponse(): AcquirerResponse | undefined { return this.acquirerResponse; }

  public setVisaAdditionalAuthData(visaAdditionalAuthData: VisaAdditionalAuthData): void { this.visaAdditionalAuthData = visaAdditionalAuthData; }
  public getVisaAdditionalAuthData(): VisaAdditionalAuthData | undefined { return this.visaAdditionalAuthData; }

  public setLinks(links: Link[]): void { this.links = links; }
  public getLinks(): Link[] | undefined { return this.links; }

  public setAuths(auths: Authorization[]): void { this.auths = auths; }
  public getAuths(): Authorization[] | undefined { return this.auths; }

  public setSettlements(settlements: Settlement[]): void { this.settlements = settlements; }
  public getSettlements(): Settlement[] | undefined { return this.settlements; }

}
