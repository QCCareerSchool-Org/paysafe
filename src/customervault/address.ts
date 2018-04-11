import { PaysafeError } from '../paysafe-error';
import { RequestObject } from '../request-object';
import { Profile } from './profile';

export class Address extends RequestObject {

  private nickName?: string;
  private street?: string;
  private street2?: string;
  private city?: string;
  private state?: string;
  private zip?: string;
  private country?: string;
  private recipientName?: string;
  private phone?: string;
  private status?: string;
  private defaultShippingAddressIndicator?: boolean;

  constructor(resp?: Address) {
    super(resp);
    if (!resp) {
      return;
    }
    if (typeof resp.nickName !== 'undefined') {
      this.nickName = resp.nickName;
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
    if (typeof resp.recipientName !== 'undefined') {
      this.recipientName = resp.recipientName;
    }
    if (typeof resp.phone !== 'undefined') {
      this.phone = resp.phone;
    }
    if (typeof resp.status !== 'undefined') {
      this.status = resp.status;
    }
    if (typeof resp.defaultShippingAddressIndicator !== 'undefined') {
      this.defaultShippingAddressIndicator = resp.defaultShippingAddressIndicator;
    }
  }

  public setNickName(nickName: string) { this.nickName = nickName; }
  public getNickName(): string | undefined { return this.nickName; }

  public setStreet(street: string) { this.street = street; }
  public getStreet(): string | undefined { return this.street; }

  public setStreet2(street2: string) { this.street2 = street2; }
  public getStreet2(): string | undefined { return this.street2; }

  public setCity(city: string) { this.city = city; }
  public getCity(): string | undefined { return this.city; }

  public setState(state: string) { this.state = state; }
  public getState(): string | undefined { return this.state; }

  public setZip(zip: string) { this.zip = zip; }
  public getZip(): string | undefined { return this.zip; }

  public setCountry(country: string) { this.country = country; }
  public getCountry(): string | undefined { return this.country; }

  public setRecipientName(recipientName: string) { this.recipientName = recipientName; }
  public getRecipientName(): string | undefined { return this.recipientName; }

  public setPhone(phone: string) { this.phone = phone; }
  public getPhone(): string | undefined { return this.phone; }

  public setStatus(status: string) { this.status = status; }
  public getStatus(): string | undefined { return this.status; }

  public setDefaultShippingAddressIndicator(defaultShippingAddressIndicator: boolean) { this.defaultShippingAddressIndicator = defaultShippingAddressIndicator; }
  public getDefaultShippingAddressIndicator(): boolean | undefined { return this.defaultShippingAddressIndicator; }

}
