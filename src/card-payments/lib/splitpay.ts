export class Splitpay {

  private linkedAccount?: string;
  private account?: number;
  private percent?: number;

  public constructor(resp?: Splitpay) {
    if (typeof resp === 'undefined') {
      return;
    }
    if (typeof resp.linkedAccount !== 'undefined') {
      this.linkedAccount = resp.linkedAccount;
    }
    if (typeof resp.account !== 'undefined') {
      this.account = resp.account;
    }
    if (typeof resp.percent !== 'undefined') {
      this.percent = resp.percent;
    }
  }

}
