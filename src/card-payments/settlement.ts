import { createArray } from '../common/create-array';
import { Link } from '../common/link';

import { SplitpayRequest } from './splitpay-request';

import { Authorization } from './authorization';

import { AcquirerResponse } from './lib/acquirer-response';
import { Splitpay } from './lib/splitpay';

export type statusType = 'RECEIVED' | 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';

const AMOUNT_MAX = 99999999999;

export class Settlement extends SplitpayRequest {

  private availableToRefund?: number;
  private status?: statusType;

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

  public setStatus(status: statusType): void { this.status = status; }
  public getStatus(): statusType | undefined { return this.status; }

}
