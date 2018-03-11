export declare class FieldError {
    private field?;
    private error?;
    constructor(resp?: FieldError);
    setField(field: string): void;
    getField(): string | undefined;
    setError(error: string): void;
    getError(): string | undefined;
}
