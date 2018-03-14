import { PaysafeError } from "./paysafe-error";

export abstract class RequestObject {

  private id?: string;
  private merchantRefNum?: string;
  private error?: PaysafeError;

  constructor(resp?: RequestObject) {
    if (!resp)
      return;
    this.id = resp.id;
    this.merchantRefNum = resp.merchantRefNum;
    if (typeof resp.error !== 'undefined')
      this.error = new PaysafeError(resp.error);
  }

  setId(id: string): void { this.id = id; }
  getId(): string | undefined { return this.id; }
  deleteId(): void { delete this.id; }

  setMerchantRefNum(merchantRefNum: string): void { this.merchantRefNum = merchantRefNum; }
  getMerchantRefNum(): string | undefined { return this.merchantRefNum; }

  setError(error: PaysafeError): void { this.error = error; }
  getError(): PaysafeError | undefined { return this.error; }

}
