import { RequestObject } from "../request-object";

export class Authentication extends RequestObject {

  private eci?: string | undefined;
  private cavv?: string | undefined;
  private xid?: string | undefined;
  private threeDEnrollment?: string | undefined;
  private threeDResult?: string | undefined;
  private signatureStatus?: string | undefined;

  constructor(resp?: Authentication) {
    super(resp);
    if (!resp)
      return;
    this.eci = resp.eci;
    this.cavv = resp.cavv;
    this.xid = resp.xid;
    this.threeDEnrollment = resp.threeDEnrollment;
    this.threeDResult = resp.threeDResult;
    this.signatureStatus = resp.signatureStatus;
  }

  setEci(eci: string): void { this.eci = eci; }
  getEci(): string | undefined { return this.eci; }

  setCavv(cavv: string): void { this.cavv = cavv; }
  getCavv(): string | undefined { return this.cavv; }

  setXid(xid: string): void { this.xid = xid; }
  getXid(): string | undefined { return this.xid; }

  setThreeDEnrollment(threeDEnrollment: string): void { this.threeDEnrollment = threeDEnrollment; }
  getThreeDEnrollment(): string | undefined { return this.threeDEnrollment; }

  setThreeDResult(threeDResult: string): void { this.threeDResult = threeDResult; }
  getThreeDResult(): string | undefined { return this.threeDResult; }

  setSignatureStatus(signatureStatus: string): void { this.signatureStatus = signatureStatus; }
  getSignatureStatus(): string | undefined { return this.signatureStatus; }

}
