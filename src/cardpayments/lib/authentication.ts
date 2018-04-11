export class Authentication {

  private eci?: string;
  private cavv?: string;
  private xid?: string;
  private threeDEnrollment?: string;
  private threeDResult?: string;
  private signatureStatus?: string;

  constructor(resp?: Authentication) {
    if (!resp) {
      return;
    }
    if (typeof resp.eci !== 'undefined') {
      this.eci = resp.eci;
    }
    if (typeof resp.cavv !== 'undefined') {
      this.cavv = resp.cavv;
    }
    if (typeof resp.xid !== 'undefined') {
      this.xid = resp.xid;
    }
    if (typeof resp.threeDEnrollment !== 'undefined') {
      this.threeDEnrollment = resp.threeDEnrollment;
    }
    if (typeof resp.threeDResult !== 'undefined') {
      this.threeDResult = resp.threeDResult;
    }
    if (typeof resp.signatureStatus !== 'undefined') {
      this.signatureStatus = resp.signatureStatus;
    }
  }

  public setEci(eci: string): void { this.eci = eci; }
  public getEci(): string | undefined { return this.eci; }

  public setCavv(cavv: string): void { this.cavv = cavv; }
  public getCavv(): string | undefined { return this.cavv; }

  public setXid(xid: string): void { this.xid = xid; }
  public getXid(): string | undefined { return this.xid; }

  public setThreeDEnrollment(threeDEnrollment: string): void { this.threeDEnrollment = threeDEnrollment; }
  public getThreeDEnrollment(): string | undefined { return this.threeDEnrollment; }

  public setThreeDResult(threeDResult: string): void { this.threeDResult = threeDResult; }
  public getThreeDResult(): string | undefined { return this.threeDResult; }

  public setSignatureStatus(signatureStatus: string): void { this.signatureStatus = signatureStatus; }
  public getSignatureStatus(): string | undefined { return this.signatureStatus; }

}
