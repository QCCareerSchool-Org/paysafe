import { createArray } from '../common/create-array';
import { BillingAddress } from './lib/billing-address';
import { Mandate } from './mandate';
import { Request } from './request';

const NICK_NAME_MAX_LENGTH = 50;
const MERCHANT_REF_NUM_MAX_LENGTH = 255;
const ACCOUNT_NUMBER_LENGTH = 8;
const ACCOUNT_HOLDER_NAME_MAX_LENGTH = 18;
const SORT_CODE_LENGTH = 6;
const BILLING_ADDRESS_ID_MAX_LENGTH = 36;
const PAYMENT_TOKEN_MAX_LENGTH = 50;

export type BACSBankAccountStatus = 'ACTIVE' | 'INVALID' | 'INACTIVE';

export class BACSBankAccount extends Request {

  private nickName?: string;
  private merchantRefNum?: string;
  private readonly status?: BACSBankAccountStatus;
  private readonly statusReason?: string;
  private accountNumber?: string;
  private accountHolderName?: string;
  private sortCode?: string;
  private readonly lastDigits?: string;
  private billingAddress?: BillingAddress;
  private billingAddressId?: string;
  private paymentToken?: string;
  private readonly mandates?: Mandate[];

  constructor(resp?: BACSBankAccount) {
    super(resp);
    if (!resp) {
      return;
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
    if (typeof resp.sortCode !== 'undefined') {
      this.sortCode = resp.sortCode;
    }
    if (typeof resp.lastDigits !== 'undefined') {
      this.lastDigits = resp.lastDigits;
    }
    if (typeof resp.billingAddress !== 'undefined') {
      this.billingAddress = new BillingAddress(resp.billingAddress);
    }
    if (typeof resp.billingAddressId !== 'undefined') {
      this.billingAddressId = resp.billingAddressId;
    }
    if (typeof resp.paymentToken !== 'undefined') {
      this.paymentToken = resp.paymentToken;
    }
    if (typeof resp.mandates !== 'undefined') {
      if (!Array.isArray(resp.mandates)) {
        throw new Error('mandates should be an array');
      }
      this.mandates = createArray(resp.mandates, Mandate);
    }
  }

  public setNickName(nickName: string): void {
    if (nickName.length > NICK_NAME_MAX_LENGTH) {
      throw new Error('invalid nickName');
    }
    this.nickName = nickName;
  }

  public getNickName(): string | undefined { return this.nickName; }

  public setMerchantRefNum(merchantRefNum: string): void {
    if (merchantRefNum.length > MERCHANT_REF_NUM_MAX_LENGTH) {
      throw new Error('invalid merchantRefNum');
    }
    this.merchantRefNum = merchantRefNum;
  }

  public getMerchantRefNum(): string | undefined { return this.merchantRefNum; }

  public getStatus(): BACSBankAccountStatus | undefined { return this.status; }

  public getStatusReason(): string | undefined { return this.statusReason; }

  public setAccountNumber(accountNumber: string): void {
    if (accountNumber.length !== ACCOUNT_NUMBER_LENGTH) {
      throw new Error('invalid accountNumber');
    }
    this.accountNumber = accountNumber;
  }

  public getAccountNumber(): string | undefined { return this.accountNumber; }

  public setAccountHolderName(accountHolderName: string): void {
    if (accountHolderName.length > ACCOUNT_HOLDER_NAME_MAX_LENGTH) {
      throw new Error('invalid accountHolderName');
    }
    this.accountHolderName = accountHolderName;
  }

  public getAccountHolderName(): string | undefined { return this.accountHolderName; }

  public setSortCode(sortCode: string): void {
    if (sortCode.length !== SORT_CODE_LENGTH) {
      throw new Error('invalid sortCode');
    }
    this.sortCode = sortCode;
  }

  public getSortCode(): string | undefined { return this.sortCode; }

  public setBillingAddress(billingAddress: BillingAddress): void { this.billingAddress = billingAddress; }
  public getBillingAddress(): BillingAddress | undefined { return this.billingAddress; }

  public setBillingAddressId(billingAddressId: string): void {
    if (billingAddressId.length > BILLING_ADDRESS_ID_MAX_LENGTH) {
      throw new Error('invalid billingAddressId');
    }
    this.billingAddressId = billingAddressId;
  }

  public getBillingAddressId(): string | undefined { return this.billingAddressId; }

  public getMandates(): Mandate[] | undefined { return this.mandates; }

  public getLastDigits(): string | undefined { return this.lastDigits; }

  public setPaymentToken(paymentToken: string): void {
    if (paymentToken.length > PAYMENT_TOKEN_MAX_LENGTH) {
      throw new Error('invalid paymentToken');
    }
    this.paymentToken = paymentToken;
  }

  public getPaymentToken(): string | undefined { return this.paymentToken; }

}
