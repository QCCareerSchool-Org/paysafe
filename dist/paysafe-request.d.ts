export declare class PaysafeRequest {
    apiUrl: string;
    method: string;
    constructor(apiUrl: string, method: string);
    buildUrl(apiEndPoint: string): string;
}
