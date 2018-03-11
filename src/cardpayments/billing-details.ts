export class BillingDetails {

  private street?: string;
  private street2?: string;
  private city?: string;
  private state?: string;
  private zip?: string;
  private country?: string;
  private phone?: string;
  private useAsShippingAddress?: 'true' | 'false';

  constructor(resp?: BillingDetails) {
    if (!resp)
      return;
    this.street = resp.street;
    this.street2 = resp.street2;
    this.city = resp.city;
    this.state = resp.state;
    this.zip = resp.zip;
    this.country = resp.country;
    this.phone = resp.phone;
    this.useAsShippingAddress = resp.useAsShippingAddress;
  }

  setStreet(street: string): void { this.street = street; }
  getStreet(): string | undefined { return this.street; }

  setStreet2(street2: string): void { this.street2 = street2; }
  getStreet2(): string | undefined { return this.street2; }

  setCity(city: string): void { this.city = city; }
  getCity(): string | undefined { return this.city; }

  setState(state: string): void { this.state = state; }
  getState(): string | undefined { return this.state; }

  setZip(zip: string): void { this.zip = zip; }
  getZip(): string | undefined { return this.zip; }

  setCountry(country: string): void { this.country = country; }
  getCountry(): string | undefined { return this.country; }

  setPhone(phone: string): void { this.phone = phone; }
  getPhone(): string | undefined { return this.phone; }

  setUseAsShippingAddress(useAsShippingAddress: 'true' | 'false'): void { this.useAsShippingAddress = useAsShippingAddress; }
  getUseAsShippingAddress(): string | undefined { return this.useAsShippingAddress; }

}
