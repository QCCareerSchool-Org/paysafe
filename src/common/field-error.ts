export class FieldError {

  private field?: string;
  private error?: string;

  constructor(resp?: FieldError) {
    if (!resp)
      return;
    this.field = resp.field;
    this.error = resp.error;
  }

  setField(field: string): void { this.field = field; }
	getField(): string | undefined { return this.field; }
	setError(error: string): void { this.error = error; }
	getError(): string | undefined { return this.error; }

}
