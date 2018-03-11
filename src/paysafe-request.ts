export class PaysafeRequest {

  apiUrl: string;
  method: string;

  constructor(apiUrl: string, method: string) {
    this.apiUrl = apiUrl;
    this.method = method;
  };

  public buildUrl(apiEndPoint: string): string {
    return apiEndPoint + "/" + this.apiUrl;
  }

}
