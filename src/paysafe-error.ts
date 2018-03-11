import { createArray } from './common/create-array';
import { FieldError } from './common/field-error';
import { Link } from './common/link';

export class PaysafeError extends Error {

  private code?: number;
  private links?: Link[];
  private fieldErrors?: FieldError[];
  private details?: string;

  constructor(resp?: PaysafeError) {
    if (!resp) {
      super();
      return;
    }
    super(resp.message);
    this.code = resp.code;
    if (resp.links)
      this.links = createArray(resp.links, Link);
    if (resp.fieldErrors)
      this.fieldErrors = createArray(resp.fieldErrors, FieldError);
    this.details = resp.details;
  }

  setCode(code: number): void { this.code = code; }
  getCode(): number | undefined { return this.code; }
  setMessage(message: string): void { this.message = message; }
  getMessage(): string | undefined { return this.message; }
  setLinks(links: Link[]): void { this.links = links; }
  getLinks(): Link[] | undefined { return this.links; }
  setFieldErrors(fieldErrors: FieldError[]): void { this.fieldErrors = fieldErrors; }
  getFieldErrors(): FieldError[] | undefined { return this.fieldErrors; }
  setDetails(details: string): void { this.details = details; }
  getDetails(): string | undefined { return this.details; }

}
