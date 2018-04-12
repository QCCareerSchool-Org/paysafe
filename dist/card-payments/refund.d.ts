import { SplitpayRequest } from './splitpay-request';
export declare type statusType = 'RECEIVED' | 'COMPLETED' | 'PENDING' | 'FAILED' | 'CANCELLED';
export declare class Refund extends SplitpayRequest {
    private status?;
    constructor(resp?: Refund);
    setStatus(status: statusType): void;
    getStatus(): statusType | undefined;
}
