import { FieldError } from './common/field-error';
import { Link } from './common/link';
export declare class PaysafeError extends Error {
    private code?;
    private links?;
    private fieldErrors?;
    private details?;
    constructor(resp?: PaysafeError);
    setCode(code: number): void;
    getCode(): number | undefined;
    setMessage(message: string): void;
    getMessage(): string | undefined;
    setLinks(links: Link[]): void;
    getLinks(): Link[] | undefined;
    setFieldErrors(fieldErrors: FieldError[]): void;
    getFieldErrors(): FieldError[] | undefined;
    setDetails(details: string): void;
    getDetails(): string | undefined;
}
