export class AcquirerResponse {

  code?: string;
  responseCode?: string;
  avsCode?: string;
  balanceResponse?: string;

  constructor(resp?: AcquirerResponse) {
    if (!resp)
      return;
    this.code = resp.code;
    this.responseCode = resp.responseCode;
    this.avsCode = resp.avsCode;
    this.balanceResponse = resp.balanceResponse;
  }

  setBalanceResponse(balanceResponse: string): void { this.balanceResponse = balanceResponse; }
  getBalanceResponse(): string | undefined { return this.balanceResponse; }
  setAvsCode(avsCode: string): void { this.avsCode = avsCode; }
  getAvsCode(): string | undefined { return this.avsCode; }
  setResponseCode(responseCode: string): void { this.responseCode = responseCode; }
  getResponseCode(): string | undefined { return this.responseCode; }
  setCode(code: string): void { this.code = code; }
  getCode(): string | undefined { return this.code; }

}
