import { PaysafeError } from '../common/paysafe-error';
import { Profile } from './profile';
export declare class EFTBankAccount {
    private id?;
    private nickName?;
    private merchantRefNum?;
    private status?;
    private statusReason?;
    private accountNumber?;
    private accountHolderName?;
    private transitNumber?;
    private institutionId?;
    private lastDigits?;
    private billingAddressId?;
    private paymentToken?;
    private payMethod?;
    private paymentDescriptor?;
    private profile?;
    private error?;
    constructor(resp?: EFTBankAccount);
    setId(id: string): void;
    getId(): string | undefined;
    setnickName(nickName: string): void;
    getnickName(): string | undefined;
    setmerchantRefNum(merchantRefNum: string): void;
    getmerchantRefNum(): string | undefined;
    setStatus(status: string): void;
    getStatus(): string | undefined;
    setstatusReason(statusReason: string): void;
    getstatusReason(): string | undefined;
    setaccountNumber(accountNumber: string): void;
    getaccountNumber(): string | undefined;
    setaccountHolderName(accountHolderName: string): void;
    getaccountHolderName(): string | undefined;
    settransitNumber(transitNumber: string): void;
    gettransitNumber(): string | undefined;
    setinstitutionId(institutionId: string): void;
    getinstitutionId(): string | undefined;
    setlastDigits(lastDigits: string): void;
    getlastDigits(): string | undefined;
    setbillingAddressId(billingAddressId: string): void;
    getbillingAddressId(): string | undefined;
    setpaymentToken(paymentToken: string): void;
    getpaymentToken(): string | undefined;
    setpayMethod(payMethod: string): void;
    getpayMethod(): string | undefined;
    setpaymentDescriptor(paymentDescriptor: string): void;
    getpaymentDescriptor(): string | undefined;
    setProfile(profile: Profile): void;
    getProfile(): Profile | undefined;
    setError(error: PaysafeError): void;
    getError(): PaysafeError | undefined;
}