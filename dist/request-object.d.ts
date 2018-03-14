import { PaysafeError } from "./paysafe-error";
export declare abstract class RequestObject {
    private id?;
    private merchantRefNum?;
    private error?;
    constructor(resp?: RequestObject);
    setId(id: string): void;
    getId(): string | undefined;
    deleteId(): void;
    setMerchantRefNum(merchantRefNum: string): void;
    getMerchantRefNum(): string | undefined;
    setError(error: PaysafeError): void;
    getError(): PaysafeError | undefined;
}
