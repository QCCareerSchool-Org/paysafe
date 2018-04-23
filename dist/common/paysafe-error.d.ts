import { FieldError } from './field-error';
import { Link } from './link';
export declare class PaysafeError extends Error {
    static create(code: number, message: string): PaysafeError;
    private code?;
    private details?;
    private fieldErrors?;
    private links?;
    constructor(resp?: PaysafeError);
    setCode(code: number): void;
    getCode(): number | undefined;
    setMessage(message: string): void;
    getMessage(): string | undefined;
    getDetails(): string[] | undefined;
    getFieldErrors(): FieldError[] | undefined;
    getLinks(): Link[] | undefined;
}
