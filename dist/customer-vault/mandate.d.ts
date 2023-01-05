import { Request } from './request';
export type MandateStatus = 'INITIAL' | 'PENDING' | 'DECLINED' | 'BATCHED' | 'ACTIVE' | 'CANCELLED' | 'REJECTED' | 'DISPUTED' | 'INACTIVE';
export declare class Mandate extends Request {
    private reference?;
    private bankAccountId?;
    private status?;
    private paymentToken?;
    private statusChangeDate?;
    private statusReasonCode?;
    private statusReason?;
    constructor(resp?: Mandate);
    setReference(reference: string): void;
    getReference(): string | undefined;
    getBankAccountId(): string | undefined;
    getStatus(): MandateStatus | undefined;
    getStatusChangeDate(): Date | undefined;
    getStatusReasonCode(): string | undefined;
    getStatusReason(): string | undefined;
    setPaymentToken(paymentToken: string): void;
    getPaymentToken(): string | undefined;
}
