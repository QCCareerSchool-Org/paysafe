import { createArray } from '../common/create-array';
import { Request } from './request';
import { AccordD } from './lib/accord-d';
import { Authentication } from './lib/authentication';
import { BillingDetails } from './lib/billing-details';
import { Card } from './lib/card';
import { MerchantDescriptor } from './lib/merchant-descriptor';
import { Profile } from './lib/profile';
import { ShippingDetails } from './lib/shipping-details';

export type VerificationStatus = 'RECEIVED' | 'COMPLETED' | 'FAILED';

export class Verification extends Request {

  private card?: Card;
  private authCode?: string;
  private profile?: Profile;
  private billingDetails?: BillingDetails;
  private customerIp?: string;
  private description?: string;
  private currencyCode?: string;
  private avsResponse?: string;
  private cvvVerification?: string;
  private status?: VerificationStatus;
  private verifications?: Verification[];
  private accordD?: AccordD;
  private merchantDescriptor?: MerchantDescriptor;
  private shippingDetails?: ShippingDetails;
  private authentication?: Authentication;

  constructor(resp?: Verification) {
    super(resp);
    if (!resp) {
      return;
    }
    if (typeof resp.card !== 'undefined') {
      this.card = new Card(resp.card);
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
    if (typeof resp.customerIp !== 'undefined') {
      this.customerIp = resp.customerIp;
    }
    if (typeof resp.description !== 'undefined') {
      this.description = resp.description;
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
    if (typeof resp.verifications !== 'undefined') {
      this.verifications = createArray(resp.verifications, Verification);
    }
    if (typeof resp.accordD !== 'undefined') {
      this.accordD = new AccordD(resp.accordD);
    }
    if (typeof resp.merchantDescriptor !== 'undefined') {
      this.merchantDescriptor = new MerchantDescriptor(resp.merchantDescriptor);
    }
    if (typeof resp.shippingDetails !== 'undefined') {
      this.shippingDetails = new ShippingDetails(resp.shippingDetails);
    }
    if (typeof resp.authentication !== 'undefined') {
      this.authentication = new Authentication(resp.authentication);
    }
  }

  public setAccordD(accordD: AccordD): void { this.accordD = accordD; }
  public getAccordD(): AccordD | undefined { return this.accordD; }

  public setMerchantDescriptor(merchantDescriptor: MerchantDescriptor): void { this.merchantDescriptor = merchantDescriptor; }
  public getMerchantDescriptor(): MerchantDescriptor | undefined { return this.merchantDescriptor; }

  public setShippingDetails(shippingDetails: ShippingDetails): void { this.shippingDetails = shippingDetails; }
  public getShippingDetails(): ShippingDetails | undefined { return this.shippingDetails; }

  public setAuthentication(authentication: Authentication): void { this.authentication = authentication; }
  public getAuthentication(): Authentication | undefined { return this.authentication; }

  public setVerifications(verifications: Verification[]): void { this.verifications = verifications; }
  public getVerifications(): Verification[] | undefined { return this.verifications; }

  public setCvvVerification(cvvVerification: string): void { this.cvvVerification = cvvVerification; }
  public getCvvVerification(): string | undefined { return this.cvvVerification; }

  public setAvsResponse(avsResponse: string): void { this.avsResponse = avsResponse; }
  public getAvsResponse(): string | undefined { return this.avsResponse; }

  public setCurrencyCode(currencyCode: string): void { this.currencyCode = currencyCode; }
  public getCurrencyCode(): string | undefined { return this.currencyCode; }

  public setDescription(description: string): void { this.description = description; }
  public getDescription(): string | undefined { return this.description; }

  public setCustomerIp(customerIp: string): void { this.customerIp = customerIp; }
  public getCustomerIp(): string | undefined { return this.customerIp; }

  public setBillingDetails(billingDetails: BillingDetails): void { this.billingDetails = billingDetails; }
  public getBillingDetails(): BillingDetails | undefined { return this.billingDetails; }

  public setProfile(profile: Profile): void { this.profile = profile; }
  public getProfile(): Profile | undefined { return this.profile; }

  public getAuthCode(): string | undefined { return this.authCode; }

  public setCard(card: Card): void { this.card = card; }
  public getCard(): Card | undefined { return this.card; }

  public setStatus(status: VerificationStatus): void { this.status = status; }
  public getStatus(): VerificationStatus | undefined { return this.status; }

}
