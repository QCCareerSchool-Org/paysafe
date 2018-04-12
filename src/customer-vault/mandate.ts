import { PaysafeError } from '../common/paysafe-error';
import { BACSBankAccount } from './bacs-bank-account';
import { Profile } from './profile';
import { SEPABankAccount } from './sepa-bank-account';

export class Mandate {

  private id?: string;
  private reference?: string;
  private bankAccountId?: string;
  private statusChangeDate?: string;
  private statusReasonCode?: string;
  private statusReason?: string;
  private paymentToken?: string;
  private error?: PaysafeError;
  private status?: string;
  private profiles?: Profile;
  private sepabankaccounts?: SEPABankAccount;
  private bacsbankaccounts?: BACSBankAccount;

  constructor(resp?: Mandate) {
    if (!resp)
      return;
    this.id = resp.id;
    this.reference = resp.reference;
    this.bankAccountId = resp.bankAccountId;
    this.statusChangeDate = resp.statusChangeDate;
    this.statusReasonCode = resp.statusReasonCode;
    this.statusReason = resp.statusReason;
    this.paymentToken = resp.paymentToken;
    if (resp.error)
      this.error = new PaysafeError(resp.error);
    this.status = resp.status;
    if (resp.profiles)
      this.profiles = new Profile(resp.profiles);
    if (resp.sepabankaccounts)
      this.sepabankaccounts = new SEPABankAccount(resp.sepabankaccounts);
    if (resp.bacsbankaccounts)
      this.bacsbankaccounts = new BACSBankAccount(resp.bacsbankaccounts);
  }

  setId(id: string): void { this.id = id; }
  getId() { return this.id; }

  setreference(reference: string): void { this.reference = reference; }
  getreference() { return this.reference; }

  setbankAccountId(bankAccountId: string): void { this.bankAccountId = bankAccountId; }
  getbankAccountId() { return this.bankAccountId; }

  setStatus(status: string): void { this.status = status; }
  getStatus() { return this.status; }

  setstatusChangeDate(statusChangeDate: string): void { this.statusChangeDate = statusChangeDate; }
  getstatusChangeDate() { return this.statusChangeDate; }

  setstatusReasonCode(statusReasonCode: string): void { this.statusReasonCode = statusReasonCode; }
  getstatusReasonCode() { return this.statusReasonCode; }

  setstatusReason(statusReason: string): void { this.statusReason = statusReason; }
  getstatusReason() { return this.statusReason; }

  setpaymentToken(paymentToken: string): void { this.paymentToken = paymentToken; }
  getpaymentToken() { return this.paymentToken; }

  setError(error: PaysafeError): void { this.error = error; }
  getError() { return this.error; }

  setprofiles(profiles: Profile): void { this.profiles = profiles; }
  getprofiles() { return this.profiles; }

  setsepabankaccounts(sepabankaccounts: SEPABankAccount): void { this.sepabankaccounts = sepabankaccounts; }
  getsepabankaccounts() { return this.sepabankaccounts; }

  setbacsbankaccounts(bacsbankaccounts: BACSBankAccount): void { this.bacsbankaccounts = bacsbankaccounts; }
  getbacsbankaccounts() { return this.bacsbankaccounts; }

}
