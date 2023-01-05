import { SplitpayRequest } from './splitpay-request';
export type RefundStatus = 'RECEIVED' | 'COMPLETED' | 'PENDING' | 'FAILED' | 'CANCELLED';
export declare class Refund extends SplitpayRequest {
    private status?;
    constructor(resp?: Refund);
    setStatus(status: RefundStatus): void;
    getStatus(): RefundStatus | undefined;
}
