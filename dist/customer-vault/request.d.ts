/**
 * abstract parent class of any Customer Vault API request object
 */
export declare abstract class Request {
    private id?;
    constructor(resp?: Request);
    getId(): string | undefined;
}
