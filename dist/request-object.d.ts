import { PaysafeError } from './paysafe-error';
export declare abstract class RequestObject {
    private id?;
    private error?;
    constructor(resp?: RequestObject);
    setId(id: string): void;
    getId(): string | undefined;
    deleteId(): void;
    setError(error: PaysafeError): void;
    getError(): PaysafeError | undefined;
}
