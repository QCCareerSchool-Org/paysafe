import { createArray } from '../common/create-array';
import { Link } from '../common/link';

import { SplitpayRequest } from './splitpay-request';

import { Settlement } from './settlement';

import { AcquirerResponse } from './lib/acquirer-response';
import { Splitpay } from './lib/splitpay';

export type statusType = 'RECEIVED' | 'COMPLETED' | 'PENDING' | 'FAILED' | 'CANCELLED';

const AMOUNT_MAX = 99999999999;

export class Refund extends SplitpayRequest {

  private status?: statusType;

  constructor(resp?: Refund) {
    super(resp);
    if (!resp) {
      return;
    }
    if (typeof resp.status !== 'undefined') {
      this.status = resp.status;
    }
  }

  public setStatus(status: statusType): void { this.status = status; }
  public getStatus(): statusType | undefined { return this.status; }

}
