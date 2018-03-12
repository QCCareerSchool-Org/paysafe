import { Link } from '../common/link';
import { RequestObject } from '../request-object';
import { Authorization } from './authorization';
import { AcquirerResponse } from './acquirer-response';
import { PaysafeError } from '../paysafe-error';
export declare class AuthorizationReversal extends RequestObject {
    private id?;
    private merchantRefNum?;
    private amount?;
    private childAccountNum?;
    private dupCheck?;
    private txnTime?;
    private error?;
    private status?;
    private riskReasonCode?;
    private acquirerResponse?;
    private links?;
    private voidAuths?;
    private authorization?;
    constructor(resp?: AuthorizationReversal);
    setAuthorization(authorization: Authorization): void;
    getAuthorization(): Authorization | undefined;
    deleteAuthorization(): void;
    setVoidAuths(voidAuths: AuthorizationReversal[]): void;
    getVoidAuths(): AuthorizationReversal[] | undefined;
    setLinks(links: Link[]): void;
    getLinks(): Link[] | undefined;
    setTxnTime(txnTime: any): void;
    getTxnTime(): any | undefined;
    setDupCheck(dupCheck: any): void;
    getDupCheck(): any | undefined;
    setAcquirerResponse(acquirerResponse: AcquirerResponse): void;
    getAcquirerResponse(): AcquirerResponse | undefined;
    setRiskReasonCode(riskReasonCode: any): void;
    getRiskReasonCode(): any | undefined;
    setError(error: PaysafeError): void;
    getError(): PaysafeError | undefined;
    setChildAccountNum(childAccountNum: any): void;
    getChildAccountNum(): any | undefined;
    setAmount(amount: string): void;
    getAmount(): string | undefined;
    setMerchantRefNum(merchantRefNum: string): void;
    getMerchantRefNum(): string | undefined;
    setStatus(status: any): void;
    getStatus(): any | undefined;
    setId(id: any): void;
    getId(): any | undefined;
    deleteId(): void;
}
