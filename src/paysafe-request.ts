export class PaysafeRequest {

  public apiUrl: string;
  public method: string;

  constructor(apiUrl: string, method: string) {
    this.apiUrl = apiUrl;
    this.method = method;
  }

  public buildUrl(apiEndPoint: string): string {
    return apiEndPoint + '/' + this.apiUrl;
  }

}
