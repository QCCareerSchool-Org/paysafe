export class BillingDetails {

  street?: string;
  street2?: string;
  city?: string;
  state?: string;
  country?: string;
  zip?: string;
  phone?: string;
  useAsShippingAddress?: 'true' | 'false';

  constructor(resp?: BillingDetails) {
    if (!resp)
      return;
    this.street = resp.street;
    this.street2 = resp.street2;
    this.city = resp.city;
    this.state = resp.state;
    this.country = resp.country;
    this.zip = resp.zip;
    this.phone = resp.phone;
    this.useAsShippingAddress = resp.useAsShippingAddress;
  }

  setUseAsShippingAddress(useAsShippingAddress: 'true' | 'false'): void { this.useAsShippingAddress = useAsShippingAddress; }
  getUseAsShippingAddress(): string | undefined { return this.useAsShippingAddress; }
  setPhone(phone: string): void { this.phone = phone; }
  getPhone(): string | undefined { return this.phone; }
  setZip(zip: string): void { this.zip = zip; }
  getZip(): string | undefined { return this.zip; }
  setState(state: string): void { this.state = state; }
  getState(): string | undefined { return this.state; }
  setCountry(country: string): void { this.country = country; }
  getCountry(): string | undefined { return this.country; }
  setCity(city: string): void { this.city = city; }
  getCity(): string | undefined { return this.city; }
  setStreet2(street2: string): void { this.street2 = street2; }
  getStreet2(): string | undefined { return this.street2; }
  setStreet(street: string): void { this.street = street; }
  getStreet(): string | undefined { return this.street; }

}
