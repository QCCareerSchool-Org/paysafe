import { SplitpayRequest } from './splitpay-request';
export declare type statusType = 'RECEIVED' | 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
export declare class Settlement extends SplitpayRequest {
    private availableToRefund?;
    private status?;
    constructor(resp?: Settlement);
    getAvailableToRefund(): number | undefined;
    setStatus(status: statusType): void;
    getStatus(): statusType | undefined;
}
