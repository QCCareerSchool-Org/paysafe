import { SplitpayRequest } from './splitpay-request';

export type SettlementStatus = 'RECEIVED' | 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';

const AMOUNT_MAX = 99999999999;

export class Settlement extends SplitpayRequest {

  private readonly availableToRefund?: number;
  private status?: SettlementStatus;

  constructor(resp?: Settlement) {
    super(resp);
    if (!resp) {
      return;
    }
    if (typeof resp.availableToRefund !== 'undefined') {
      this.availableToRefund = resp.availableToRefund;
    }
    if (typeof resp.status !== 'undefined') {
      this.status = resp.status;
    }
  }

  public getAvailableToRefund(): number | undefined { return this.availableToRefund; }

  public setStatus(status: SettlementStatus): void { this.status = status; }
  public getStatus(): SettlementStatus | undefined { return this.status; }

}
