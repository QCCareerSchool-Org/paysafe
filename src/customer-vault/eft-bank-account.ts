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
  // private profile?: Profile;
  private error?: PaysafeError;

  constructor(resp?: EFTBankAccount) {
    if (!resp) {
      return;
    }
    if (typeof resp.id !== 'undefined') {
      this.id = resp.id;
    }
    if (typeof resp.nickName !== 'undefined') {
      this.nickName = resp.nickName;
    }
    if (typeof resp.merchantRefNum !== 'undefined') {
      this.merchantRefNum = resp.merchantRefNum;
    }
    if (typeof resp.status !== 'undefined') {
      this.status = resp.status;
    }
    if (typeof resp.statusReason !== 'undefined') {
      this.statusReason = resp.statusReason;
    }
    if (typeof resp.accountNumber !== 'undefined') {
      this.accountNumber = resp.accountNumber;
    }
    if (typeof resp.accountHolderName !== 'undefined') {
      this.accountHolderName = resp.accountHolderName;
    }
    if (typeof resp.transitNumber !== 'undefined') {
      this.transitNumber = resp.transitNumber;
    }
    if (typeof resp.institutionId !== 'undefined') {
      this.institutionId = resp.institutionId;
    }
    if (typeof resp.lastDigits !== 'undefined') {
      this.lastDigits = resp.lastDigits;
    }
    if (typeof resp.billingAddressId !== 'undefined') {
      this.billingAddressId = resp.billingAddressId;
    }
    if (typeof resp.paymentToken !== 'undefined') {
      this.paymentToken = resp.paymentToken;
    }
    if (typeof resp.payMethod !== 'undefined') {
      this.payMethod = resp.payMethod;
    }
    if (typeof resp.paymentDescriptor !== 'undefined') {
      this.paymentDescriptor = resp.paymentDescriptor;
    }
    // if (typeof resp.profile !== 'undefined') {
    //   this.profile = new Profile(resp.profile);
    // }
    if (typeof resp.error !== 'undefined') {
      this.error = new PaysafeError(resp.error);
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

  public setaccountNumber(accountNumber: string): void { this.accountNumber = accountNumber; }
  public getaccountNumber(): string | undefined { return this.accountNumber; }

  public setaccountHolderName(accountHolderName: string): void { this.accountHolderName = accountHolderName; }
  public getaccountHolderName(): string | undefined { return this.accountHolderName; }

  public settransitNumber(transitNumber: string): void { this.transitNumber = transitNumber; }
  public gettransitNumber(): string | undefined { return this.transitNumber; }

  public setinstitutionId(institutionId: string): void { this.institutionId = institutionId; }
  public getinstitutionId(): string | undefined { return this.institutionId; }

  public setlastDigits(lastDigits: string): void { this.lastDigits = lastDigits; }
  public getlastDigits(): string | undefined { return this.lastDigits; }

  public setbillingAddressId(billingAddressId: string): void { this.billingAddressId = billingAddressId; }
  public getbillingAddressId(): string | undefined { return this.billingAddressId; }

  public setpaymentToken(paymentToken: string): void { this.paymentToken = paymentToken; }
  public getpaymentToken(): string | undefined { return this.paymentToken; }

  public setpayMethod(payMethod: string): void { this.payMethod = payMethod; }
  public getpayMethod(): string | undefined { return this.payMethod; }

  public setpaymentDescriptor(paymentDescriptor: string): void { this.paymentDescriptor = paymentDescriptor; }
  public getpaymentDescriptor(): string | undefined { return this.paymentDescriptor; }

  // public setProfile(profile: Profile): void { this.profile = profile; }
  // public getProfile(): Profile | undefined { return this.profile; }

  public setError(error: PaysafeError): void { this.error = error; }
  public getError(): PaysafeError | undefined { return this.error; }

}
