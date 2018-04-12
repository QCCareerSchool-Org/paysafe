import { createArray } from '../common/create-array';
import { AmountRequest } from './amount-request';
import { Splitpay } from './lib/splitpay';

const AMOUNT_MAX = 99999999999;

/**
 * abstract parent class of any Card Payments API request
 */
export abstract class SplitpayRequest extends AmountRequest {

  private splitpay?: Splitpay | Splitpay[];

  constructor(resp?: SplitpayRequest) {
    super(resp);
    if (!resp) {
      return;
    }
    if (typeof resp.splitpay !== 'undefined') {
      if (Array.isArray(resp.splitpay)) {
        this.splitpay = createArray(resp.splitpay, Splitpay);
      } else {
        this.splitpay = new Splitpay(resp.splitpay);
      }
    }
  }

  public setSplitpay(splitpay: Splitpay | Splitpay[]): void { this.splitpay = splitpay; }
  public getSplitpay(): Splitpay | Splitpay[] | undefined { return this.splitpay; }

}
