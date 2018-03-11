export class MasterPass {

  private payPassWalletIndicator?: any;
	private authenticationMethod?: any;
	private cardEnrollmentMethod?: any;
	private masterCardAssignedId?: any;

  constructor(resp?: MasterPass) {
    if (!resp)
      return;
    this.payPassWalletIndicator = resp.payPassWalletIndicator;
    this.authenticationMethod = resp.authenticationMethod;
    this.cardEnrollmentMethod = resp.cardEnrollmentMethod;
    this.masterCardAssignedId = resp.masterCardAssignedId;
  }
    
  setCardEnrollmentMethod(cardEnrollmentMethod: any): void { this.cardEnrollmentMethod = cardEnrollmentMethod; }
  getCardEnrollmentMethod(): any | undefined { return this.cardEnrollmentMethod; }
  
  setMasterCardAssignedId(masterCardAssignedId: any): void { this.masterCardAssignedId = masterCardAssignedId; }
  getMasterCardAssignedId(): any | undefined { return this.masterCardAssignedId; }
  
  setPayPassWalletIndicator(payPassWalletIndicator: any): void { this.payPassWalletIndicator = payPassWalletIndicator; }
  getPayPassWalletIndicator(): any | undefined { return this.payPassWalletIndicator; }
  
  setAuthenticationMethod(authenticationMethod: any): void { this.authenticationMethod = authenticationMethod; }
  getAuthenticationMethod(): any | undefined { return this.authenticationMethod; }

}
