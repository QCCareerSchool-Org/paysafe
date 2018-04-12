import { createArray } from '../common/create-array';
import { Link } from '../common/link';

import { AmountRequest } from './amount-request';

import { Authorization } from './authorization';

import { AcquirerResponse } from './lib/acquirer-response';

export type statusType = 'RECEIVED' | 'COMPLETED' | 'FAILED';

const AMOUNT_MAX = 99999999999;

export class VoidAuth extends AmountRequest {

  private status?: statusType;

  constructor(resp?: VoidAuth) {
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
