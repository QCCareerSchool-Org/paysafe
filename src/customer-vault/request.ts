import { createArray } from '../common/create-array';
import { Link } from '../common/link';
import { PaysafeError } from '../common/paysafe-error';

const ID_MAX_LENGTH = 36;

/**
 * abstract parent class of any Customer Vault API request object
 */
export abstract class Request {

  private id?: string;
  private links?: Link[];
  private error?: PaysafeError;

  constructor(resp?: Request) {
    if (!resp) {
      return;
    }
    if (typeof resp.id !== 'undefined') {
      this.id = resp.id;
    }
    if (typeof resp.links !== 'undefined') {
      this.links = createArray(resp.links, Link);
    }
    if (typeof resp.error !== 'undefined') {
      this.error = new PaysafeError(resp.error);
    }
  }

  public getId(): string | undefined { return this.id; }

  public getLinks(): Link[] | undefined { return this.links; }

  public getError(): PaysafeError | undefined { return this.error; }

}
