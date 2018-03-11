export declare class MasterPass {
    private payPassWalletIndicator?;
    private authenticationMethod?;
    private cardEnrollmentMethod?;
    private masterCardAssignedId?;
    constructor(resp?: MasterPass);
    setCardEnrollmentMethod(cardEnrollmentMethod: any): void;
    getCardEnrollmentMethod(): any | undefined;
    setMasterCardAssignedId(masterCardAssignedId: any): void;
    getMasterCardAssignedId(): any | undefined;
    setPayPassWalletIndicator(payPassWalletIndicator: any): void;
    getPayPassWalletIndicator(): any | undefined;
    setAuthenticationMethod(authenticationMethod: any): void;
    getAuthenticationMethod(): any | undefined;
}
