import { AmountRequest } from './amount-request';
export declare type statusType = 'RECEIVED' | 'COMPLETED' | 'FAILED';
export declare class VoidAuth extends AmountRequest {
    private status?;
    constructor(resp?: VoidAuth);
    setStatus(status: statusType): void;
    getStatus(): statusType | undefined;
}
