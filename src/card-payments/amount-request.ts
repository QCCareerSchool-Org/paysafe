import { Request } from './request';

const AMOUNT_MAX = 99999999999;

/**
 * abstract parent class of any Card Payments API request pbject that has an amount
 */
export abstract class AmountRequest extends Request {

  private amount?: number;

  constructor(resp?: AmountRequest) {
    super(resp);
    if (!resp) {
      return;
    }
    if (typeof resp.amount !== 'undefined') {
      this.amount = resp.amount;
    }
  }

  public setAmount(amount: number): void {
    if (amount > AMOUNT_MAX) {
      throw new Error('invalid amount');
    }
    this.amount = amount;
  }

  public getAmount(): number | undefined { return this.amount; }
}
