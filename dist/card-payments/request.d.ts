import { Link } from '../common/link';
import { PaysafeError } from '../common/paysafe-error';
import { AcquirerResponse } from './lib/acquirer-response';
/**
 * abstract parent class of any Card Payments API request object
 */
export declare abstract class Request {
    private id?;
    private merchantRefNum?;
    private dupCheck?;
    private txnTime?;
    private riskReasonCode?;
    private acquirerResponse?;
    private childAccountNum?;
    private links?;
    private error?;
    constructor(resp?: Request);
    getId(): string | undefined;
    setMerchantRefNum(merchantRefNum: string): void;
    getMerchantRefNum(): string | undefined;
    setDupCheck(dupCheck: boolean): void;
    getDupCheck(): boolean | undefined;
    getTxnTime(): Date | undefined;
    getRiskReasonCode(): number[] | undefined;
    getAcquirerResponse(): AcquirerResponse | undefined;
    getChildAccountNum(): string | undefined;
    getLinks(): Link[] | undefined;
    getError(): PaysafeError | undefined;
}
