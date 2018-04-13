import { PaysafeError } from '../common/paysafe-error';

const ID_MAX_LENGTH = 36;

/**
 * abstract parent class of any Customer Vault API request object
 */
export abstract class Request {

  private id?: string;

  constructor(resp?: Request) {
    if (!resp) {
      return;
    }
    if (typeof resp.id !== 'undefined') {
      this.id = resp.id;
    }
  }

  public getId(): string | undefined { return this.id; }

}
