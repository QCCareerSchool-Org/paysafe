import { FieldError } from './common/field-error';
import { Link } from './common/link';
export declare class PaysafeError extends Error {
    private code?;
    private details?;
    private fieldErrors?;
    private links?;
    constructor(resp?: PaysafeError);
    setCode(code: number): void;
    getCode(): number | undefined;
    setMessage(message: string): void;
    getMessage(): string | undefined;
    setDetails(details: string): void;
    getDetails(): string | undefined;
    setFieldErrors(fieldErrors: FieldError[]): void;
    getFieldErrors(): FieldError[] | undefined;
    setLinks(links: Link[]): void;
    getLinks(): Link[] | undefined;
}
