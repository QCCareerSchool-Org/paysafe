export declare class FieldError {
    private field?;
    private error?;
    constructor(resp?: FieldError);
    getField(): string | undefined;
    getError(): string | undefined;
}
