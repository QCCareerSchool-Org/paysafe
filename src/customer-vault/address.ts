import { Request } from './request';

const NICK_NAME_MAX_LENGTH = 50;
const STREET_MAX_LENGTH = 50;
const STREET2_MAX_LENGTH = 50;
const CITY_MAX_LENGTH = 40;
const STATE_MAX_LENGTH = 40;
const ZIP_MAX_LENGTH = 10;
const COUNTRY_MAX_LENGTH = 2;
const RECIPIENT_NAME_MAX_LENGTH = 255;
const PHONE_MAX_LENGTH = 40;

export type AddressStatus = 'ACTIVE';

export class Address extends Request {

  private nickName?: string;
  private street?: string;
  private street2?: string;
  private city?: string;
  private state?: string;
  private zip?: string;
  private country?: string;
  private recipientName?: string;
  private phone?: string;
  private status?: AddressStatus;
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

  public setNickName(nickName: string) {
    if (nickName.length > NICK_NAME_MAX_LENGTH) {
      throw new Error('invalid nickName');
    }
    this.nickName = nickName;
  }
  public getNickName(): string | undefined { return this.nickName; }

  public setStreet(street: string) {
    if (street.length > STREET_MAX_LENGTH) {
      throw new Error('invalid street');
    }
    this.street = street;
  }
  public getStreet(): string | undefined { return this.street; }

  public setStreet2(street2: string) {
    if (street2.length > STREET2_MAX_LENGTH) {
      throw new Error('invalid street2');
    }
    this.street2 = street2;
  }
  public getStreet2(): string | undefined { return this.street2; }

  public setCity(city: string) {
    if (city.length > CITY_MAX_LENGTH) {
      throw new Error('invalid city');
    }
    this.city = city;
  }
  public getCity(): string | undefined { return this.city; }

  public setState(state: string) {
    if (state.length > STATE_MAX_LENGTH) {
      throw new Error('invalid state');
    }
    this.state = state;
  }
  public getState(): string | undefined { return this.state; }

  public setZip(zip: string) {
    if (zip.length > ZIP_MAX_LENGTH) {
      throw new Error('invalid zip');
    }
    this.zip = zip;
  }
  public getZip(): string | undefined { return this.zip; }

  public setCountry(country: string) {
    if (country.length > COUNTRY_MAX_LENGTH) {
      throw new Error('invalid country');
    }
    this.country = country;
  }
  public getCountry(): string | undefined { return this.country; }

  public setRecipientName(recipientName: string) {
    if (recipientName.length > RECIPIENT_NAME_MAX_LENGTH) {
      throw new Error('invalid recipientName');
    }
    this.recipientName = recipientName;
  }
  public getRecipientName(): string | undefined { return this.recipientName; }

  public setPhone(phone: string) {
    if (phone.length > PHONE_MAX_LENGTH) {
      throw new Error('invalid phone');
    }
    this.phone = phone;
  }
  public getPhone(): string | undefined { return this.phone; }

  public getStatus(): AddressStatus | undefined { return this.status; }

  public setDefaultShippingAddressIndicator(defaultShippingAddressIndicator: boolean) { this.defaultShippingAddressIndicator = defaultShippingAddressIndicator; }
  public getDefaultShippingAddressIndicator(): boolean | undefined { return this.defaultShippingAddressIndicator; }

}
