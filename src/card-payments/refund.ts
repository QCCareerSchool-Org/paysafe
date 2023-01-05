import { SplitpayRequest } from './splitpay-request';

export type RefundStatus = 'RECEIVED' | 'COMPLETED' | 'PENDING' | 'FAILED' | 'CANCELLED';

const AMOUNT_MAX = 99999999999;

export class Refund extends SplitpayRequest {

  private status?: RefundStatus;

  constructor(resp?: Refund) {
    super(resp);
    if (!resp) {
      return;
    }
    if (typeof resp.status !== 'undefined') {
      this.status = resp.status;
    }
  }

  public setStatus(status: RefundStatus): void { this.status = status; }
  public getStatus(): RefundStatus | undefined { return this.status; }
}
