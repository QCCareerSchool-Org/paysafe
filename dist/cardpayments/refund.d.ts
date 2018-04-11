import { Link } from '../common/link';
import { RequestObject } from '../request-object';
import { AcquirerResponse } from './lib/acquirer-response';
import { Splitpay } from './lib/splitpay';
export declare type statusType = 'RECEIVED' | 'COMPLETED' | 'PENDING' | 'FAILED' | 'CANCELLED';
export declare class Refund extends RequestObject {
    private merchantRefNum?;
    private amount?;
    private childAccountNum?;
    private dupCheck?;
    private txnTime?;
    private status?;
    private riskReasonCode?;
    private acquirerResponse?;
    private splitpay?;
    private links?;
    constructor(resp?: Refund);
    setMerchantRefNum(merchantRefNum: string): void;
    getMerchantRefNum(): string | undefined;
    setAmount(amount: number): void;
    getAmount(): number | undefined;
    setChildAccountNum(childAccountNum: string): void;
    getChildAccountNum(): string | undefined;
    setDupCheck(dupCheck: boolean): void;
    getDupCheck(): boolean | undefined;
    setTxnTime(txnTime: string): void;
    getTxnTime(): string | undefined;
    setStatus(status: statusType): void;
    getStatus(): statusType | undefined;
    setRiskReasonCode(riskReasonCode: number[]): void;
    getRiskReasonCode(): number[] | undefined;
    setAcquirerResponse(acquirerResponse: AcquirerResponse): void;
    getAcquirerResponse(): AcquirerResponse | undefined;
    setSplitpay(splitpay: Splitpay | Splitpay[]): void;
    getSplitpay(): Splitpay | Splitpay[] | undefined;
    setLinks(links: Link[]): void;
    getLinks(): Link[] | undefined;
}
