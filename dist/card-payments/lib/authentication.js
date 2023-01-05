"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authentication = void 0;
class Authentication {
    constructor(resp) {
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
    setEci(eci) { this.eci = eci; }
    getEci() { return this.eci; }
    setCavv(cavv) { this.cavv = cavv; }
    getCavv() { return this.cavv; }
    setXid(xid) { this.xid = xid; }
    getXid() { return this.xid; }
    setThreeDEnrollment(threeDEnrollment) { this.threeDEnrollment = threeDEnrollment; }
    getThreeDEnrollment() { return this.threeDEnrollment; }
    setThreeDResult(threeDResult) { this.threeDResult = threeDResult; }
    getThreeDResult() { return this.threeDResult; }
    setSignatureStatus(signatureStatus) { this.signatureStatus = signatureStatus; }
    getSignatureStatus() { return this.signatureStatus; }
}
exports.Authentication = Authentication;
