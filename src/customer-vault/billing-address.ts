export class BillingAddress {

  private nickName?: string;
  private street?: string;
  private street2?: string;
  private city?: string;
  private state?: string;
  private zip?: string;
  private country?: string;

  constructor(resp?: BillingAddress) {
    if (!resp) {
      return;
    }
    if (typeof resp.street !== 'undefined') {
      this.street = resp.street;
    }
    if (typeof resp.street2 !== 'undefined') {
      this.street2 = resp.street2;
    }
    if (typeof resp.city !== 'undefined') {
      this.city = resp.city;
    }
    if (typeof resp.state !== 'undefined') {
      this.state = resp.state;
    }
    if (typeof resp.zip !== 'undefined') {
      this.zip = resp.zip;
    }
    if (typeof resp.country !== 'undefined') {
      this.country = resp.country;
    }
  }

  public setNickName(nickName: string): void { this.nickName = nickName; }
  public getNickName(): string | undefined { return this.nickName; }

  public setStreet(street: string): void { this.street = street; }
  public getStreet(): string | undefined { return this.street; }

  public setStreet2(street2: string): void { this.street2 = street2; }
  public getStreet2(): string | undefined { return this.street2; }

  public setCity(city: string): void { this.city = city; }
  public getCity(): string | undefined { return this.city; }

  public setState(state: string): void { this.state = state; }
  public getState(): string | undefined { return this.state; }

  public setZip(zip: string): void { this.zip = zip; }
  public getZip(): string | undefined { return this.zip; }

  public setCountry(country: string): void { this.country = country; }
  public getCountry(): string | undefined { return this.country; }

}
