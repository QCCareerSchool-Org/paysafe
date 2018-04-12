import { PaysafeError } from '../common/paysafe-error';

const ID_MAX_LENGTH = 36;

/**
 * parent object of any object that can be sent as a request body
 */
export abstract class Request {

  private id?: string;
  private error?: PaysafeError;

  constructor(resp?: Request) {
    if (!resp) {
      return;
    }
    if (typeof resp.id !== 'undefined') {
      this.id = resp.id;
    }
    if (typeof resp.error !== 'undefined') {
      this.error = new PaysafeError(resp.error);
    }
  }

  // public setId(id: string): void { if (id.length > ID_MAX_LENGTH) { throw new Error('invalid id'); } this.id = id; }
  public getId(): string | undefined { return this.id; }
  // public deleteId(): void { delete this.id; }

  // public setError(error: PaysafeError): void { this.error = error; }
  public getError(): PaysafeError | undefined { return this.error; }

}
