import { SplitpayRequest } from './splitpay-request';
export type SettlementStatus = 'RECEIVED' | 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
export declare class Settlement extends SplitpayRequest {
    private availableToRefund?;
    private status?;
    constructor(resp?: Settlement);
    getAvailableToRefund(): number | undefined;
    setStatus(status: SettlementStatus): void;
    getStatus(): SettlementStatus | undefined;
}
