import { RequestObject } from "../request-object";
export declare class Authentication extends RequestObject {
    id?: string | undefined;
    eci?: string | undefined;
    cavv?: string | undefined;
    xid?: string | undefined;
    threeDEnrollment?: string | undefined;
    threeDResult?: string | undefined;
    signatureStatus?: string | undefined;
    constructor(resp?: Authentication);
    setSignatureStatus(signatureStatus: string): void;
    getSignatureStatus(): string | undefined;
    setThreeDResult(threeDResult: string): void;
    getThreeDResult(): string | undefined;
    setThreeDEnrollment(threeDEnrollment: string): void;
    getThreeDEnrollment(): string | undefined;
    setXid(xid: string): void;
    getXid(): string | undefined;
    setCavv(cavv: string): void;
    getCavv(): string | undefined;
    setEci(eci: string): void;
    getEci(): string | undefined;
    setId(id: string): void;
    getId(): string | undefined;
}
