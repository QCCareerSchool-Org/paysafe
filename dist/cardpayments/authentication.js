"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request_object_1 = require("../request-object");
class Authentication extends request_object_1.RequestObject {
    constructor(resp) {
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
