export declare class MasterPass {
    private payPassWalletIndicator?;
    private authenticationMethod?;
    private cardEnrollmentMethod?;
    private masterCardAssignedId?;
    constructor(resp?: MasterPass);
    setCardEnrollmentMethod(cardEnrollmentMethod: string): void;
    getCardEnrollmentMethod(): string | undefined;
    setMasterCardAssignedId(masterCardAssignedId: string): void;
    getMasterCardAssignedId(): string | undefined;
    setPayPassWalletIndicator(payPassWalletIndicator: string): void;
    getPayPassWalletIndicator(): string | undefined;
    setAuthenticationMethod(authenticationMethod: string): void;
    getAuthenticationMethod(): string | undefined;
}
