import { Link } from '../common/link';
import { PaysafeError } from '../common/paysafe-error';
/**
 * abstract parent class of any Customer Vault API request object
 */
export declare abstract class Request {
    private id?;
    private links?;
    private error?;
    constructor(resp?: Request);
    getId(): string | undefined;
    getLinks(): Link[] | undefined;
    getError(): PaysafeError | undefined;
}
