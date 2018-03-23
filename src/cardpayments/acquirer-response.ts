export class AcquirerResponse {

  private code?: string;
  private responseCode?: string;
  private avsCode?: string;
  private balanceResponse?: string;

  constructor(resp?: AcquirerResponse) {
    if (!resp) {
      return;
    }
    if (typeof resp.code !== 'undefined') {
      this.code = resp.code;
    }
    if (typeof resp.responseCode !== 'undefined') {
      this.responseCode = resp.responseCode;
    }
    if (typeof resp.avsCode !== 'undefined') {
      this.avsCode = resp.avsCode;
    }
    if (typeof resp.balanceResponse !== 'undefined') {
      this.balanceResponse = resp.balanceResponse;
    }
  }

  public setCode(code: string): void { this.code = code; }
  public getCode(): string | undefined { return this.code; }

  public setResponseCode(responseCode: string): void { this.responseCode = responseCode; }
  public getResponseCode(): string | undefined { return this.responseCode; }

  public setAvsCode(avsCode: string): void { this.avsCode = avsCode; }
  public getAvsCode(): string | undefined { return this.avsCode; }

  public setBalanceResponse(balanceResponse: string): void { this.balanceResponse = balanceResponse; }
  public getBalanceResponse(): string | undefined { return this.balanceResponse; }

}
