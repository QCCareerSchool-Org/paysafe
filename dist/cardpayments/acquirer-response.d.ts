export declare class AcquirerResponse {
    private code?;
    private responseCode?;
    private avsCode?;
    private balanceResponse?;
    constructor(resp?: AcquirerResponse);
    setBalanceResponse(balanceResponse: string): void;
    getBalanceResponse(): string | undefined;
    setAvsCode(avsCode: string): void;
    getAvsCode(): string | undefined;
    setResponseCode(responseCode: string): void;
    getResponseCode(): string | undefined;
    setCode(code: string): void;
    getCode(): string | undefined;
}
