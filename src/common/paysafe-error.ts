import { createArray } from './create-array';
import { FieldError } from './field-error';
import { Link } from './link';

export class PaysafeError extends Error {

  public static create(code: number, message: string): PaysafeError {
    const err = new PaysafeError();
    err.setCode(code);
    err.setMessage(message);
    return err;
  }

  private code?: number;
  private details?: string[];
  private fieldErrors?: FieldError[];
  private links?: Link[];

  constructor(resp?: PaysafeError) {
    if (!resp) {
      super();
      return;
    }
    super(resp.message);
    if (typeof resp.code !== 'undefined') {
      if (typeof resp.code === 'number') {
        this.code = resp.code;
      } else if (typeof resp.code === 'string') {
        this.code = parseInt(resp.code, 10) || 0;
      }
    }
    if (typeof resp.details !== 'undefined') {
      if (Array.isArray(resp.details)) {
        this.details = resp.details;
      }
    }
    if (typeof resp.fieldErrors !== 'undefined') {
      this.fieldErrors = createArray(resp.fieldErrors, FieldError);
    }
    if (typeof resp.links !== 'undefined') {
      this.links = createArray(resp.links, Link);
    }
  }

  public setCode(code: number): void { this.code = code; }
  public getCode(): number | undefined { return this.code; }

  public setMessage(message: string): void { this.message = message; }
  public getMessage(): string | undefined { return this.message; }

  public getDetails(): string[] | undefined { return this.details; }

  public getFieldErrors(): FieldError[] | undefined { return this.fieldErrors; }

  public getLinks(): Link[] | undefined { return this.links; }

}
