export class FieldError {

  private readonly field?: string;
  private readonly error?: string;

  constructor(resp?: FieldError) {
    if (!resp) {
      return;
    }
    if (typeof resp.field !== 'undefined') {
      this.field = resp.field;
    }
    if (typeof resp.error !== 'undefined') {
      this.error = resp.error;
    }
  }

  public getField(): string | undefined { return this.field; }

  public getError(): string | undefined { return this.error; }

}
