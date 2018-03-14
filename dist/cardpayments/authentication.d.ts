import { RequestObject } from "../request-object";
export declare class Authentication extends RequestObject {
    private eci?;
    private cavv?;
    private xid?;
    private threeDEnrollment?;
    private threeDResult?;
    private signatureStatus?;
    constructor(resp?: Authentication);
    setEci(eci: string): void;
    getEci(): string | undefined;
    setCavv(cavv: string): void;
    getCavv(): string | undefined;
    setXid(xid: string): void;
    getXid(): string | undefined;
    setThreeDEnrollment(threeDEnrollment: string): void;
    getThreeDEnrollment(): string | undefined;
    setThreeDResult(threeDResult: string): void;
    getThreeDResult(): string | undefined;
    setSignatureStatus(signatureStatus: string): void;
    getSignatureStatus(): string | undefined;
}
