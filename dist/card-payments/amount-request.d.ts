import { Request } from './request';
/**
 * abstract parent class of any Card Payments API request pbject that has an amount
 */
export declare abstract class AmountRequest extends Request {
    private amount?;
    constructor(resp?: AmountRequest);
    setAmount(amount: number): void;
    getAmount(): number | undefined;
}
