"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MasterPass {
    constructor(resp) {
        if (!resp)
            return;
        this.payPassWalletIndicator = resp.payPassWalletIndicator;
        this.authenticationMethod = resp.authenticationMethod;
        this.cardEnrollmentMethod = resp.cardEnrollmentMethod;
        this.masterCardAssignedId = resp.masterCardAssignedId;
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
