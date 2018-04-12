import { createArray } from '../common/create-array';
import { Link } from '../common/link';

import { SplitpayRequest } from './splitpay-request';

import { Settlement } from './settlement';

import { AccordD } from './lib/accord-d';
import { Authentication } from './lib/authentication';
import { BillingDetails } from './lib/billing-details';
import { Card } from './lib/card';
import { Level2level3 } from './lib/level2level3';
// import { MasterPass } from './lib/master-pass';
import { MerchantDescriptor } from './lib/merchant-descriptor';
import { Profile } from './lib/profile';
import { Recipient } from './lib/recipient';
import { ShippingDetails } from './lib/shipping-details';
import { Splitpay } from './lib/splitpay';
// import { VisaAdditionalAuthData } from './lib/visa-additional-auth-data';

export type recurringType = 'INITIAL' | 'RECURRING';
export type avsResponseType = 'MATCH' | 'MATCH_ADDRESS_ONLY' | 'MATCH_ZIP_ONLY' | 'NO_MATCH' | 'NOT_PROCESSED' | 'UNKNOWN';
export type cvvVerificationType = 'MATCH' | 'NO_MATCH' | 'NOT_PROCESSED' | 'UNKNOWN';
export type statusType = 'RECEIVED' | 'COMPLETED' | 'HELD' | 'FAILED' | 'CANCELLED';

export class Authorization extends SplitpayRequest {

  private card?: Card;
  private authentication?: Authentication;
  private profile?: Profile;
  private billingDetails?: BillingDetails;
  private shippingDetails?: ShippingDetails;
  private recurring?: recurringType;
  private customerIp?: string;
  private keywords?: string[];
  private merchantDescriptor?: MerchantDescriptor;
  private accordD?: AccordD;
  private description?: string;
  private recipient?: Recipient;
  private level2level3?: Level2level3;
  private settleWithAuth?: boolean;
  private availableToSettle?: number;
  private authCode?: string;
  private currencyCode?: string;
  private avsResponse?: avsResponseType;
  private cvvVerification?: cvvVerificationType;
  private status?: statusType;

  private settlements?: Settlement[];

  constructor(resp?: Authorization) {
    super(resp);
    if (!resp) {
      return;
    }
    if (typeof resp.card !== 'undefined') {
      this.card = new Card(resp.card);
    }
    if (typeof resp.authentication !== 'undefined') {
      this.authentication = new Authentication(resp.authentication);
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
    if (typeof resp.keywords !== 'undefined') {
      this.keywords = resp.keywords.slice(0);
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
    if (typeof resp.recipient !== 'undefined') {
      this.recipient = new Recipient(resp.recipient);
    }
    if (typeof resp.level2level3 !== 'undefined') {
      this.level2level3 = new Level2level3(resp.level2level3);
    }
    if (typeof resp.settleWithAuth !== 'undefined') {
      this.settleWithAuth = resp.settleWithAuth;
    }
    if (typeof resp.availableToSettle !== 'undefined') {
      this.availableToSettle = resp.availableToSettle;
    }
    if (typeof resp.authCode !== 'undefined') {
      this.authCode = resp.authCode;
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
    if (typeof resp.settlements !== 'undefined') {
      this.settlements = createArray(resp.settlements, Settlement);
    }
  }

  public setCard(card: Card): void { this.card = card; }
  public getCard(): Card | undefined { return this.card; }

  public setAuthentication(authentication: Authentication): void { this.authentication = authentication; }
  public getAuthentication(): Authentication | undefined { return this.authentication; }

  public setProfile(profile: Profile): void { this.profile = profile; }
  public getProfile(): Profile | undefined { return this.profile; }

  public setBillingDetails(billingDetails: BillingDetails): void { this.billingDetails = billingDetails; }
  public getBillingDetails(): BillingDetails | undefined { return this.billingDetails; }

  public setShippingDetails(shippingDetails: ShippingDetails): void { this.shippingDetails = shippingDetails; }
  public getShippingDetails(): ShippingDetails | undefined { return this.shippingDetails; }

  public setRecurring(recurring: recurringType): void { this.recurring = recurring; }
  public getRecurring(): recurringType | undefined { return this.recurring; }

  public setCustomerIp(customerIp: string): void { this.customerIp = customerIp; }
  public getCustomerIp(): string | undefined { return this.customerIp; }

  public setKeywords(keywords: string[]): void { this.keywords = keywords; }
  public getKeywords(): string[] | undefined { return this.keywords; }

  public setMerchantDescriptor(merchantDescriptor: MerchantDescriptor): void { this.merchantDescriptor = merchantDescriptor; }
  public getMerchantDescriptor(): MerchantDescriptor | undefined { return this.merchantDescriptor; }

  public setAccordD(accordD: AccordD): void { this.accordD = accordD; }
  public getAccordD(): AccordD | undefined { return this.accordD; }

  public setDescription(description: string): void { this.description = description; }
  public getDescription(): string | undefined { return this.description; }

  public setRecipient(recipient: Recipient): void { this.recipient = recipient; }
  public getRecipient(): Recipient | undefined { return this.recipient; }

  public setLevel2level3(level2level3: Level2level3): void { this.level2level3 = level2level3; }
  public getLevel2level3(): Level2level3 | undefined { return this.level2level3; }

  public setSettleWithAuth(settleWithAuth: boolean): void { this.settleWithAuth = settleWithAuth; }
  public getSettleWithAuth(): boolean | undefined { return this.settleWithAuth; }

  public getAvailableToSettle(): number | undefined { return this.availableToSettle; }

  public getAuthCode(): string | undefined { return this.authCode; }

  public setCurrencyCode(currencyCode: string): void { this.currencyCode = currencyCode; }
  public getCurrencyCode(): string | undefined { return this.currencyCode; }

  public getAvsResponse(): avsResponseType | undefined { return this.avsResponse; }

  public getCvvVerification(): cvvVerificationType | undefined { return this.cvvVerification; }

  public setStatus(status: statusType): void { this.status = status; }
  public getStatus(): statusType | undefined { return this.status; }

  public setSettlements(settlements: Settlement[]): void { this.settlements = settlements; }
  public getSettlements(): Settlement[] | undefined { return this.settlements; }

}
