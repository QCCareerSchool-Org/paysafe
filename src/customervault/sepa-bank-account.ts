import { Link } from "../common/link";
import { Mandate } from "./mandate";
import { PaysafeError } from "../paysafe-error";
import { Profile } from "./profile";
import { createArray } from "../common/create-array";

export class SEPABankAccount {

  id?: string;
  nickName?: string;
  merchantRefNum?: string;
  status?: string;
  statusReason?: string;
  iban?: string;
  accountHolderName?: string;
  bic?: string;
  mandates?: Mandate | Mandate[];
  lastDigits?: string;
  billingAddressId?: string;
  paymentToken?: string;
  mandateReference?: string;
  error?: PaysafeError;
  profile?: Profile;
  links?: Link[];

  constructor(resp?: SEPABankAccount) {
    if (!resp)
      return;
    this.id = resp.id;
    this.nickName = resp.nickName;
    this.merchantRefNum = resp.merchantRefNum;
    this.status = resp.status;
    this.statusReason = resp.statusReason;
    this.iban = resp.iban;
    this.accountHolderName = resp.accountHolderName;
    this.bic = resp.bic;
    if (resp.mandates) {
      if (resp.mandates instanceof Array)
        this.mandates = createArray(resp.mandates, Mandate);
      else
        this.mandates = new Mandate(resp.mandates);
    }
    this.lastDigits = resp.lastDigits;
    this.billingAddressId = resp.billingAddressId;
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

  setiban(iban: string): void { this.iban = iban; }
  getiban(): string | undefined { return this.iban; }

  setaccountHolderName(accountHolderName: string): void { this.accountHolderName = accountHolderName; }
  getaccountHolderName() { return this.accountHolderName; }

  setbic(bic: string): void { this.bic = bic; }
  getbic(): string | undefined { return this.bic; }

  setmandates(mandates: Mandate | Mandate[]): void { this.mandates = mandates; }
  getmandates(): Mandate | Mandate[] | undefined { return this.mandates; }

  setlastDigits(lastDigits: string): void { this.lastDigits = lastDigits; }
  getlastDigits(): string | undefined { return this.lastDigits; }

  setbillingAddressId(billingAddressId: string): void { this.billingAddressId = billingAddressId; }
  getbillingAddressId(): string | undefined { return this.billingAddressId; }

  setpaymentToken(paymentToken: string): void { this.paymentToken = paymentToken; }
  getpaymentToken(): string | undefined { return this.paymentToken; }

  setProfile(profile: Profile): void { this.profile = profile; }
  getProfile(): Profile | undefined { return this.profile; }

  setmandateReference(mandateReference: string): void { this.mandateReference = mandateReference; }
  getmandateReference(): string | undefined { return this.mandateReference; }

  setError(error: PaysafeError): void { this.error = error; }
  getError(): PaysafeError | undefined { return this.error; }

  setLinks(links: Link[]): void { this.links = links; }
  getLinks(): Link[] | undefined { return this.links; }

}
