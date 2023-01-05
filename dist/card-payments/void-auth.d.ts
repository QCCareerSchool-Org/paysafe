import { AmountRequest } from './amount-request';
export type VoidAuthStatus = 'RECEIVED' | 'COMPLETED' | 'FAILED';
export declare class VoidAuth extends AmountRequest {
    private status?;
    constructor(resp?: VoidAuth);
    setStatus(status: VoidAuthStatus): void;
    getStatus(): VoidAuthStatus | undefined;
}
