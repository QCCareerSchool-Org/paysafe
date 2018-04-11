import { createArray } from './common/create-array';
import { FieldError } from './common/field-error';
import { Link } from './common/link';

export class PaysafeError extends Error {

  private code?: number;
  private details?: string;
  private fieldErrors?: FieldError[];
  private links?: Link[];

  constructor(resp?: PaysafeError) {
    if (!resp) {
      super();
      return;
    }
    super(resp.message);
    if (typeof resp.code !== 'undefined') {
      this.code = resp.code;
    }
    if (typeof resp.details !== 'undefined') {
      this.details = resp.details;
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

  public setDetails(details: string): void { this.details = details; }
  public getDetails(): string | undefined { return this.details; }

  public setFieldErrors(fieldErrors: FieldError[]): void { this.fieldErrors = fieldErrors; }
  public getFieldErrors(): FieldError[] | undefined { return this.fieldErrors; }

  public setLinks(links: Link[]): void { this.links = links; }
  public getLinks(): Link[] | undefined { return this.links; }

}
