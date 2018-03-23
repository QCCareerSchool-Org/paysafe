"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MasterPass {
    constructor(resp) {
        if (!resp) {
            return;
        }
        if (typeof resp.payPassWalletIndicator !== 'undefined') {
            this.payPassWalletIndicator = resp.payPassWalletIndicator;
        }
        if (typeof resp.authenticationMethod !== 'undefined') {
            this.authenticationMethod = resp.authenticationMethod;
        }
        if (typeof resp.cardEnrollmentMethod !== 'undefined') {
            this.cardEnrollmentMethod = resp.cardEnrollmentMethod;
        }
        if (typeof resp.masterCardAssignedId !== 'undefined') {
            this.masterCardAssignedId = resp.masterCardAssignedId;
        }
    }
    setCardEnrollmentMethod(cardEnrollmentMethod) { this.cardEnrollmentMethod = cardEnrollmentMethod; }
    getCardEnrollmentMethod() { return this.cardEnrollmentMethod; }
    setMasterCardAssignedId(masterCardAssignedId) { this.masterCardAssignedId = masterCardAssignedId; }
    getMasterCardAssignedId() { return this.masterCardAssignedId; }
    setPayPassWalletIndicator(payPassWalletIndicator) { this.payPassWalletIndicator = payPassWalletIndicator; }
    getPayPassWalletIndicator() { return this.payPassWalletIndicator; }
    setAuthenticationMethod(authenticationMethod) { this.authenticationMethod = authenticationMethod; }
    getAuthenticationMethod() { return this.authenticationMethod; }
}
exports.MasterPass = MasterPass;
