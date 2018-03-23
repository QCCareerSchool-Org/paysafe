export class FieldError {

  private field?: string;
  private error?: string;

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

  public setField(field: string): void { this.field = field; }
  public getField(): string | undefined { return this.field; }
  public setError(error: string): void { this.error = error; }
  public getError(): string | undefined { return this.error; }

}
