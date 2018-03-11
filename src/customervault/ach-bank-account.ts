import { PaysafeError } from "../paysafe-error";
import { Profile } from "./profile";

export class ACHBankAccount {

  private id?: string;
  private nickName?: string;
  private merchantRefNum?: string;
  private status?: string;
  private statusReason?: string;
  private accountNumber?: string;
  private accountHolderName?: string;
  private routingNumber?: string;
  private accountType?: string;
  private lastDigits?: string;
  private billingAddressId?: string;
  private paymentToken?: string;
  private payMethod?: string;
  private paymentDescriptor?: string;
  private error?: PaysafeError;
  private profile?: Profile;

  constructor(resp?: ACHBankAccount) {
    if (!resp)
      return;
    this.id = resp.id;
    this.nickName = resp.nickName;
    this.merchantRefNum = resp.merchantRefNum;
    this.status = resp.status;
    this.statusReason = resp.statusReason;
    this.accountNumber = resp.accountNumber;
    this.accountHolderName = resp.accountHolderName;
    this.routingNumber = resp.routingNumber;
    this.accountType = resp.accountType;
    this.lastDigits = resp.lastDigits;
    this.billingAddressId = resp.billingAddressId;
    this.paymentToken = resp.paymentToken;
    this.payMethod = resp.payMethod;
    this.paymentDescriptor = resp.paymentDescriptor;
    if (resp.error)
      this.error = new PaysafeError(resp.error);
    if (resp.profile)
      this.profile = new Profile(resp.profile);
  }

  setId(id: string): void { this.id = id; }
  getId(): string | undefined { return this.id; }
  
  setNickName(nickName: string): void { this.nickName = nickName; }
  getNickName(): string | undefined { return this.nickName; }
  
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
  
  setroutingNumber(routingNumber: string): void { this.routingNumber = routingNumber; }
  getroutingNumber(): string | undefined { return this.routingNumber; }
  
  setaccountType(accountType: string): void { this.accountType = accountType; }
  getaccountType(): string | undefined { return this.accountType; }
  
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
