import { createArray } from '../common/create-array';
import { Link } from '../common/link';
import { PaysafeError } from '../common/paysafe-error';
import { Mandate } from './mandate';
import { Profile } from './profile';

export class SEPABankAccount {

  private id?: string;
  private nickName?: string;
  private merchantRefNum?: string;
  private status?: string;
  private statusReason?: string;
  private iban?: string;
  private accountHolderName?: string;
  private bic?: string;
  private mandates?: Mandate | Mandate[];
  private lastDigits?: string;
  private billingAddressId?: string;
  private paymentToken?: string;
  private mandateReference?: string;
  private error?: PaysafeError;
  private profile?: Profile;
  private links?: Link[];

  constructor(resp?: SEPABankAccount) {
    if (!resp) {
      return;
    }
    this.id = resp.id;
    this.nickName = resp.nickName;
    this.merchantRefNum = resp.merchantRefNum;
    this.status = resp.status;
    this.statusReason = resp.statusReason;
    this.iban = resp.iban;
    this.accountHolderName = resp.accountHolderName;
    this.bic = resp.bic;
    if (resp.mandates) {
      if (resp.mandates instanceof Array) {
        this.mandates = createArray(resp.mandates, Mandate);
      } else {
        this.mandates = new Mandate(resp.mandates);
      }
    }
    this.lastDigits = resp.lastDigits;
    this.billingAddressId = resp.billingAddressId;
    this.paymentToken = resp.paymentToken;
    this.mandateReference = resp.mandateReference;
    if (resp.error) {
      this.error = new PaysafeError(resp.error);
    }
    if (resp.profile) {
      this.profile = new Profile(resp.profile);
    }
    if (resp.links) {
      this.links = createArray(resp.links, Link);
    }
  }

  public setId(id: string): void { this.id = id; }
  public getId(): string | undefined { return this.id; }

  public setnickName(nickName: string): void { this.nickName = nickName; }
  public getnickName(): string | undefined { return this.nickName; }

  public setmerchantRefNum(merchantRefNum: string): void { this.merchantRefNum = merchantRefNum; }
  public getmerchantRefNum(): string | undefined { return this.merchantRefNum; }

  public setStatus(status: string): void { this.status = status; }
  public getStatus(): string | undefined { return this.status; }

  public setstatusReason(statusReason: string): void { this.statusReason = statusReason; }
  public getstatusReason(): string | undefined { return this.statusReason; }

  public setiban(iban: string): void { this.iban = iban; }
  public getiban(): string | undefined { return this.iban; }

  public setaccountHolderName(accountHolderName: string): void { this.accountHolderName = accountHolderName; }
  public getaccountHolderName() { return this.accountHolderName; }

  public setbic(bic: string): void { this.bic = bic; }
  public getbic(): string | undefined { return this.bic; }

  public setmandates(mandates: Mandate | Mandate[]): void { this.mandates = mandates; }
  public getmandates(): Mandate | Mandate[] | undefined { return this.mandates; }

  public setlastDigits(lastDigits: string): void { this.lastDigits = lastDigits; }
  public getlastDigits(): string | undefined { return this.lastDigits; }

  public setbillingAddressId(billingAddressId: string): void { this.billingAddressId = billingAddressId; }
  public getbillingAddressId(): string | undefined { return this.billingAddressId; }

  public setpaymentToken(paymentToken: string): void { this.paymentToken = paymentToken; }
  public getpaymentToken(): string | undefined { return this.paymentToken; }

  public setProfile(profile: Profile): void { this.profile = profile; }
  public getProfile(): Profile | undefined { return this.profile; }

  public setmandateReference(mandateReference: string): void { this.mandateReference = mandateReference; }
  public getmandateReference(): string | undefined { return this.mandateReference; }

  public setError(error: PaysafeError): void { this.error = error; }
  public getError(): PaysafeError | undefined { return this.error; }

  public setLinks(links: Link[]): void { this.links = links; }
  public getLinks(): Link[] | undefined { return this.links; }

}
