import { PaysafeError } from './paysafe-error';
/**
 * parent object of any object that can be sent as a request body
 */
export declare abstract class RequestObject {
    private id?;
    private error?;
    constructor(resp?: RequestObject);
    getId(): string | undefined;
    getError(): PaysafeError | undefined;
}
