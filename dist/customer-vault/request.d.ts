import { PaysafeError } from '../common/paysafe-error';
/**
 * parent object of any object that can be sent as a request body
 */
export declare abstract class Request {
    private id?;
    private error?;
    constructor(resp?: Request);
    getId(): string | undefined;
    getError(): PaysafeError | undefined;
}
