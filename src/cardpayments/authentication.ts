import { RequestObject } from "../request-object";

export class Authentication extends RequestObject {

  id?: string | undefined;
  eci?: string | undefined;
  cavv?: string | undefined;
  xid?: string | undefined;
  threeDEnrollment?: string | undefined;
  threeDResult?: string | undefined;
  signatureStatus?: string | undefined;

  constructor(resp?: Authentication) {
    super();
    if (!resp)
      return;
    this.id = resp.id;
    this.eci = resp.eci;
    this.cavv = resp.cavv;
    this.xid = resp.xid;
    this.threeDEnrollment = resp.threeDEnrollment;
    this.signatureStatus = resp.signatureStatus;

  }

  setSignatureStatus(signatureStatus: string): void { this.signatureStatus = signatureStatus; }
  getSignatureStatus(): string | undefined { return this.signatureStatus; }
  setThreeDResult(threeDResult: string): void { this.threeDResult = threeDResult; }
  getThreeDResult(): string | undefined { return this.threeDResult; }
  setThreeDEnrollment(threeDEnrollment: string): void { this.threeDEnrollment = threeDEnrollment; }
  getThreeDEnrollment(): string | undefined { return this.threeDEnrollment; }
  setXid(xid: string): void { this.xid = xid; }
  getXid(): string | undefined { return this.xid; }
  setCavv(cavv: string): void { this.cavv = cavv; }
  getCavv(): string | undefined { return this.cavv; }
  setEci(eci: string): void { this.eci = eci; }
  getEci(): string | undefined { return this.eci; }
  setId(id: string): void { this.id = id; }
  getId(): string | undefined { return this.id; }

}
