import { Link } from '../common/link';
import { PaysafeError } from '../common/paysafe-error';
import { Mandate } from './mandate';
import { Profile } from './profile';
export declare class SEPABankAccount {
    private id?;
    private nickName?;
    private merchantRefNum?;
    private status?;
    private statusReason?;
    private iban?;
    private accountHolderName?;
    private bic?;
    private mandates?;
    private lastDigits?;
    private billingAddressId?;
    private paymentToken?;
    private mandateReference?;
    private error?;
    private profile?;
    private links?;
    constructor(resp?: SEPABankAccount);
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
    setiban(iban: string): void;
    getiban(): string | undefined;
    setaccountHolderName(accountHolderName: string): void;
    getaccountHolderName(): string | undefined;
    setbic(bic: string): void;
    getbic(): string | undefined;
    setmandates(mandates: Mandate | Mandate[]): void;
    getmandates(): Mandate | Mandate[] | undefined;
    setlastDigits(lastDigits: string): void;
    getlastDigits(): string | undefined;
    setbillingAddressId(billingAddressId: string): void;
    getbillingAddressId(): string | undefined;
    setpaymentToken(paymentToken: string): void;
    getpaymentToken(): string | undefined;
    setProfile(profile: Profile): void;
    getProfile(): Profile | undefined;
    setmandateReference(mandateReference: string): void;
    getmandateReference(): string | undefined;
    setError(error: PaysafeError): void;
    getError(): PaysafeError | undefined;
    setLinks(links: Link[]): void;
    getLinks(): Link[] | undefined;
}