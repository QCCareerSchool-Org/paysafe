export class MasterPass {

  private payPassWalletIndicator?: string;
  private authenticationMethod?: string;
  private cardEnrollmentMethod?: string;
  private masterCardAssignedId?: string;

  constructor(resp?: MasterPass) {
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

  public setCardEnrollmentMethod(cardEnrollmentMethod: string): void { this.cardEnrollmentMethod = cardEnrollmentMethod; }
  public getCardEnrollmentMethod(): string | undefined { return this.cardEnrollmentMethod; }

  public setMasterCardAssignedId(masterCardAssignedId: string): void { this.masterCardAssignedId = masterCardAssignedId; }
  public getMasterCardAssignedId(): string | undefined { return this.masterCardAssignedId; }

  public setPayPassWalletIndicator(payPassWalletIndicator: string): void { this.payPassWalletIndicator = payPassWalletIndicator; }
  public getPayPassWalletIndicator(): string | undefined { return this.payPassWalletIndicator; }

  public setAuthenticationMethod(authenticationMethod: string): void { this.authenticationMethod = authenticationMethod; }
  public getAuthenticationMethod(): string | undefined { return this.authenticationMethod; }

}
