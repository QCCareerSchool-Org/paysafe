"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request_object_1 = require("../request-object");
class Authentication extends request_object_1.RequestObject {
    constructor(resp) {
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
    setSignatureStatus(signatureStatus) { this.signatureStatus = signatureStatus; }
    getSignatureStatus() { return this.signatureStatus; }
    setThreeDResult(threeDResult) { this.threeDResult = threeDResult; }
    getThreeDResult() { return this.threeDResult; }
    setThreeDEnrollment(threeDEnrollment) { this.threeDEnrollment = threeDEnrollment; }
    getThreeDEnrollment() { return this.threeDEnrollment; }
    setXid(xid) { this.xid = xid; }
    getXid() { return this.xid; }
    setCavv(cavv) { this.cavv = cavv; }
    getCavv() { return this.cavv; }
    setEci(eci) { this.eci = eci; }
    getEci() { return this.eci; }
    setId(id) { this.id = id; }
    getId() { return this.id; }
}
exports.Authentication = Authentication;
