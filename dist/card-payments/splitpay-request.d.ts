import { AmountRequest } from './amount-request';
import { Splitpay } from './lib/splitpay';
/**
 * abstract parent class of any Card Payments API request
 */
export declare abstract class SplitpayRequest extends AmountRequest {
    private splitpay?;
    constructor(resp?: SplitpayRequest);
    setSplitpay(splitpay: Splitpay | Splitpay[]): void;
    getSplitpay(): Splitpay | Splitpay[] | undefined;
}
