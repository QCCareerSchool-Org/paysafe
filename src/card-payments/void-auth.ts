import { AmountRequest } from './amount-request';

export type VoidAuthStatus = 'RECEIVED' | 'COMPLETED' | 'FAILED';

const AMOUNT_MAX = 99999999999;

export class VoidAuth extends AmountRequest {

  private status?: VoidAuthStatus;

  constructor(resp?: VoidAuth) {
    super(resp);
    if (!resp) {
      return;
    }
    if (typeof resp.status !== 'undefined') {
      this.status = resp.status;
    }
  }

  public setStatus(status: VoidAuthStatus): void { this.status = status; }
  public getStatus(): VoidAuthStatus | undefined { return this.status; }

}
