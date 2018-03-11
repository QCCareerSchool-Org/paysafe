import { Link } from '../common/link';
import { Authorization } from './authorization';
import { AcquirerResponse } from './acquirer-response';
import { PaysafeError } from '../paysafe-error';
export declare class Settlement {
    id?: any;
    merchantRefNum?: string;
    amount?: string;
    availableToRefund?: string;
    childAccountNum?: any;
    txnTime?: any;
    dupCheck?: any;
    status?: any;
    riskReasonCode?: any;
    acquirerResponse?: AcquirerResponse;
    authorization?: Authorization;
    links?: Link[];
    error?: PaysafeError;
    settlements?: Settlement[];
    originalMerchantRefNum?: string;
    mode?: any;
    currencyCode?: any;
    confirmationNumber?: any;
    authType?: any;
    constructor(resp?: Settlement);
    setOriginalMerchantRefNum(originalMerchantRefNum: string): void;
    getOriginalMerchantRefNum(): string | undefined;
    setAuthType(authType: any): void;
    getAuthType(): any | undefined;
    setConfirmationNumber(confirmationNumber: any): void;
    getConfirmationNumber(): any | undefined;
    setCurrencyCode(currencyCode: any): void;
    getCurrencyCode(): any | undefined;
    setMode(mode: any): void;
    getMode(): any | undefined;
    setSettlements(settlements: Settlement[]): void;
    getSettlements(): Settlement[] | undefined;
    setStatus(status: any): void;
    getStatus(): any | undefined;
    setLinks(links: Link[]): void;
    getLinks(): Link[] | undefined;
    setError(error: PaysafeError): void;
    getError(): PaysafeError | undefined;
    setAuthorization(authorization: Authorization): void;
    getAuthorization(): Authorization | undefined;
    setAvailableToRefund(availableToRefund: string): void;
    getAvailableToRefund(): string | undefined;
    setTxnTime(txnTime: any): void;
    getTxnTime(): any | undefined;
    setDupCheck(dupCheck: any): void;
    getDupCheck(): any | undefined;
    setChildAccountNum(childAccountNum: any): void;
    getChildAccountNum(): any | undefined;
    setAcquirerResponse(acquirerResponse: AcquirerResponse): void;
    getAcquirerResponse(): AcquirerResponse | undefined;
    setRiskReasonCode(riskReasonCode: any): void;
    getRiskReasonCode(): any | undefined;
    setAmount(amount: string): void;
    getAmount(): string | undefined;
    setMerchantRefNum(merchantRefNum: string): void;
    getMerchantRefNum(): string | undefined;
    setId(id: any): void;
    getId(): any | undefined;
}
