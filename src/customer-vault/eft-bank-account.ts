import { PaysafeError } from '../common/paysafe-error';
import { Profile } from './profile';

export class EFTBankAccount {

  private id?: string;
  private nickName?: string;
  private merchantRefNum?: string;
  private status?: string;
  private statusReason?: string;
  private accountNumber?: string;
  private accountHolderName?: string;
  private transitNumber?: string;
  private institutionId?: string;
  private lastDigits?: string;
  private billingAddressId?: string;
  private paymentToken?: string;
  private payMethod?: string;
  private paymentDescriptor?: string;
  private profile?: Profile;
  private error?: PaysafeError;

  constructor(resp?: EFTBankAccount) {
    if (!resp)
      return;
    this.id = resp.id;
    this.nickName = resp.nickName;
    this.merchantRefNum = resp.merchantRefNum;
    this.status = resp.status;
    this.statusReason = resp.statusReason;
    this.accountNumber = resp.accountNumber;
    this.accountHolderName = resp.accountHolderName;
    this.transitNumber = resp.transitNumber;
    this.institutionId = resp.institutionId;
    this.lastDigits = resp.lastDigits;
    this.billingAddressId = resp.billingAddressId;
    this.paymentToken = resp.paymentToken;
    this.payMethod = resp.payMethod;
    this.paymentDescriptor = resp.paymentDescriptor;
    if (resp.profile)
      this.profile = new Profile(resp.profile);
    if (resp.error)
      this.error = new PaysafeError(resp.error);
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

  settransitNumber(transitNumber: string): void { this.transitNumber = transitNumber; }
  gettransitNumber(): string | undefined { return this.transitNumber; }

  setinstitutionId(institutionId: string): void { this.institutionId = institutionId; }
  getinstitutionId(): string | undefined { return this.institutionId; }

  setlastDigits(lastDigits: string): void { this.lastDigits = lastDigits; }
  getlastDigits(): string | undefined { return this.lastDigits; }

  setbillingAddressId(billingAddressId: string): void { this.billingAddressId = billingAddressId; }
  getbillingAddressId(): string | undefined { return this.billingAddressId; }

  setpaymentToken(paymentToken: string): void { this.paymentToken = paymentToken; }
  getpaymentToken(): string | undefined { return this.paymentToken; }

  setpayMethod(payMethod: string): void { this.payMethod = payMethod; }
  getpayMethod(): string | undefined { return this.payMethod; }

  setpaymentDescriptor(paymentDescriptor: string): void { this.paymentDescriptor = paymentDescriptor; }
  getpaymentDescriptor(): string | undefined { return this.paymentDescriptor; }

  setProfile(profile: Profile): void { this.profile = profile; }
  getProfile(): Profile | undefined { return this.profile; }

  setError(error: PaysafeError): void { this.error = error; }
  getError(): PaysafeError | undefined { return this.error; }

}
