export class ShippingDetails {

  carrier?: string;
  shipMethod?: string;
  recipientName?: string;
  street?: string;
  street2?: string;
  city?: string;
  state?: string;
  country?: string;
  zip?: string;
  phone?: string;

  constructor(resp?: ShippingDetails) {
    if (!resp)
      return;
    this.carrier = resp.carrier;
    this.shipMethod = resp.shipMethod;
    this.recipientName = resp.recipientName;
    this.street = resp.street;
    this.street2 = resp.street2;
    this.city = resp.city;
    this.state = resp.state;
    this.country = resp.country;
    this.zip = resp.zip;
    this.phone = resp.phone;
  }

  setCarrier(carrier: string): void { this.carrier = carrier; }
  getCarrier(): string | undefined { return this.carrier; }
  setRecipientName(recipientName: string): void { this.recipientName = recipientName; }
  getRecipientName(): string | undefined { return this.recipientName; }
  setPhone(phone: string): void { this.phone = phone; }
  getPhone(): string | undefined { return this.phone; }
  setStreet(street: string): void { this.street = street; }
  getStreet(): string | undefined { return this.street; }
  setStreet2(street2: string): void { this.street2 = street2; }
  getStreet2(): string | undefined { return this.street2; }
  setCity(city: string): void { this.city = city; }
  getCity(): string | undefined { return this.city; }
  setState(state: string): void { this.state = state; }
  getState(): string | undefined { return this.state; }
  setCountry(country: string): void { this.country = country; }
  getCountry(): string | undefined { return this.country; }
  setZip(zip: string): void { this.zip = zip; }
  getZip(): string | undefined { return this.zip; }

}
