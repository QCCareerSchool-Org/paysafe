import { createArray } from '../common/create-array';
import { Link } from '../common/link';
import { Mandate } from './mandate';
import { PaysafeError } from '../paysafe-error';
import { Profile } from './profile';

export class BACSBankAccount {

  private id?: string;
  private nickName?: string;
  private merchantRefNum?: string;
  private status?: string;
  private statusReason?: string;
  private accountNumber?: string;
  private accountHolderName?: string;
  private sortCode?: string;
  private billingAddressId?: string;
  private mandates?: Mandate | Mandate[];
  private lastDigits?: string;
  private paymentToken?: string;
  private mandateReference?: string;
  private error?: PaysafeError;
  private profile?: Profile;
  private links?: Link[];

  constructor(resp?: BACSBankAccount) {
    if (!resp)
      return;
    this.id = resp.id;
    this.nickName = resp.nickName;
    this.merchantRefNum = resp.merchantRefNum;
    this.status = resp.status;
    this.statusReason = resp.statusReason;
    this.accountNumber = resp.accountNumber;
    this.accountHolderName = resp.accountHolderName;
    this.sortCode = resp.sortCode;
    this.billingAddressId = resp.billingAddressId;
    if (resp.mandates) {
      if (resp.mandates instanceof Array)
        this.mandates = createArray(resp.mandates, Mandate);
      else
        this.mandates = new Mandate(resp.mandates);
    }
    this.lastDigits = resp.lastDigits;
    this.paymentToken = resp.paymentToken;
    this.mandateReference = resp.mandateReference;
    if (resp.error)
      this.error = new PaysafeError(resp.error);
    if (resp.profile)
      this.profile = new Profile(resp.profile);
    if (resp.links)
      this.links = createArray(resp.links, Link);
  }

  setId(id: string): void { this.id = id; }
  getId(): string | undefined { return this.id; }

  setnickName(nickName: string): void { this.nickName = nickName; }
  getnickName(): string | undefined { return this.nickName; }

  setmerchantRefNum(merchantRefNum: string): void { this.merchantRefNum = merchantRefNum; }
  getmerchantRefNum(): string | undefined { return this.merchantRefNum; }

  setStatus(status: string): void { this.status = status; }
  getStatus(): string | undefined { return this.status; }

  setstatusReason(statusReason: string): void { this.statusReason = statusReason; }
  getstatusReason(): string | undefined { return this.statusReason; }
  
  setaccountNumber(accountNumber: string): void { this.accountNumber = accountNumber; }
  getaccountNumber(): string | undefined { return this.accountNumber; }

  setaccountHolderName(accountHolderName: string): void { this.accountHolderName = accountHolderName; }
  getaccountHolderName(): string | undefined { return this.accountHolderName; }
  
  setsortCode(sortCode: string): void { this.sortCode = sortCode; }
  getsortCode(): string | undefined { return this.sortCode; }
  
  setbillingAddressId(billingAddressId: string): void { this.billingAddressId = billingAddressId; }
  getbillingAddressId(): string | undefined { return this.billingAddressId; }
  
  setmandates(mandates: Mandate | Mandate[]): void { this.mandates = mandates; }
  getmandates(): Mandate | Mandate[] | undefined { return this.mandates; }
  
  setlastDigits(lastDigits: string): void { this.lastDigits = lastDigits; }
  getlastDigits(): string | undefined { return this.lastDigits; }
  
  setpaymentToken(paymentToken: string): void { this.paymentToken = paymentToken; }
  getpaymentToken(): string | undefined { return this.paymentToken; }
  
  setmandateReference(mandateReference: string): void { this.mandateReference = mandateReference; }
  getmandateReference(): string | undefined { return this.mandateReference; }
  
  setError(error: PaysafeError): void { this.error = error; }
  getError(): PaysafeError | undefined { return this.error; }
  
  setProfile(profile: Profile): void { this.profile = profile; }
  getProfile(): Profile | undefined { return this.profile; }
  
  setLinks(links: Link[]): void { this.links = links; }
  getLinks(): Link[] | undefined { return this.links; }

}
