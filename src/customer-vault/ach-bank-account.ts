import { BillingAddress } from './lib/billing-address';
import { Request } from './request';

export type ACHBankAccountStatus = 'ACTIVE' | 'INVALID' | 'INACTIVE';
export type ACHBankAccountAccountType = 'CHECKING' | 'LOAN' | 'SAVINGS';

const NICK_NAME_MAX_LENGTH = 50;
const MERCHANT_REF_NUM_MAX_LENGTH = 255;
const ACCOUNT_NUMBER_MIN_LENGTH = 4;
const ACCOUNT_NUMBER_MAX_LENGTH = 7;
const ACCOUNT_HOLDER_NAME_MAX_LENGTH = 22;
const ROUTING_NUMBER_MAX_LENGTH = 9;
const BILLING_ADDRESS_ID_MAX_LENGTH = 36;
const PAYMENT_TOKEN_MAX_LENGTH = 50;

export class ACHBankAccount extends Request {

  private nickName?: string;
  private merchantRefNum?: string;
  private readonly status?: ACHBankAccountStatus;
  private readonly statusReason?: string;
  private accountNumber?: string;
  private accountHolderName?: string;
  private routingNumber?: string;
  private accountType?: ACHBankAccountAccountType;
  private readonly lastDigits?: string;
  private billingAddressId?: string;
  private billingAddress?: BillingAddress;
  private paymentToken?: string;

  constructor(resp?: ACHBankAccount) {
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
    if (typeof resp.routingNumber !== 'undefined') {
      this.routingNumber = resp.routingNumber;
    }
    if (typeof resp.accountType !== 'undefined') {
      this.accountType = resp.accountType;
    }
    if (typeof resp.lastDigits !== 'undefined') {
      this.lastDigits = resp.lastDigits;
    }
    if (typeof resp.billingAddressId !== 'undefined') {
      this.billingAddressId = resp.billingAddressId;
    }
    if (typeof resp.billingAddress !== 'undefined') {
      this.billingAddress = new BillingAddress(resp.billingAddress);
    }
    if (typeof resp.paymentToken !== 'undefined') {
      this.paymentToken = resp.paymentToken;
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

  public getStatus(): ACHBankAccountStatus | undefined { return this.status; }

  public getStatusReason(): string | undefined { return this.statusReason; }

  public setAccountNumber(accountNumber: string): void {
    if (accountNumber.length < ACCOUNT_NUMBER_MIN_LENGTH || accountNumber.length > ACCOUNT_NUMBER_MAX_LENGTH) {
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

  public setRoutingNumber(routingNumber: string): void {
    if (routingNumber.length > ROUTING_NUMBER_MAX_LENGTH) {
      throw new Error('invalid routingNumber');
    }
    this.routingNumber = routingNumber;
  }

  public getRoutingNumber(): string | undefined { return this.routingNumber; }

  public setAccountType(accountType: ACHBankAccountAccountType): void { this.accountType = accountType; }
  public getAccountType(): ACHBankAccountAccountType | undefined { return this.accountType; }

  public getLastDigits(): string | undefined { return this.lastDigits; }

  public setBillingAddress(billingAddress: BillingAddress): void { this.billingAddress = billingAddress; }
  public getBillingAddress(): BillingAddress | undefined { return this.billingAddress; }

  public setBillingAddressId(billingAddressId: string): void {
    if (billingAddressId.length > BILLING_ADDRESS_ID_MAX_LENGTH) {
      throw new Error('invalid billingAddressId');
    }
    this.billingAddressId = billingAddressId;
  }

  public getBillingAddressId(): string | undefined { return this.billingAddressId; }

  public setPaymentToken(paymentToken: string): void {
    if (paymentToken.length > PAYMENT_TOKEN_MAX_LENGTH) {
      throw new Error('invalid paymentToken');
    }
    this.paymentToken = paymentToken;
  }

  public getPaymentToken(): string | undefined { return this.paymentToken; }

}
