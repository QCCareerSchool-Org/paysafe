import { Profile } from './profile';
import { PaysafeError } from '../paysafe-error';

export class Address {

  id?: string;
  nickName?: string;
  street?: string;
  street2?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  recipientName?: string;
  phone?: string;
  profile?: Profile;
  error?: PaysafeError;
  status?: string;
  defaultShippingAddressIndicator?: 'true' | 'false';

  constructor(resp?: Address) {
    if (!resp)
      return;
    this.id = resp.id;
    this.nickName = resp.nickName;
    this.street = resp.street;
    this.street2 = resp.street2;
    this.city = resp.city;
    this.state = resp.state;
    this.zip = resp.zip;
    this.country = resp.country;
    this.recipientName = resp.recipientName;
    this.phone = resp.phone;
    if (resp.profile)
      this.profile = new Profile(resp.profile);
    if (resp.error)
      this.error = new PaysafeError(resp.error);
    this.status = resp.status;
    this.defaultShippingAddressIndicator = resp.defaultShippingAddressIndicator;
  }

  setId(id: string) { this.id = id; }
  getId(): string | undefined { return this.id; }

  setNickName(nickName: string) { this.nickName = nickName; }
  getNickName(): string | undefined { return this.nickName; }

  setStreet(street: string) { this.street = street; }
  getStreet(): string | undefined { return this.street; }

  setStreet2(street2: string) { this.street2 = street2; }
  getStreet2(): string | undefined { return this.street2; }

  setCity(city: string) { this.city = city; }
  getCity(): string | undefined { return this.city; }

  setState(state: string) { this.state = state; }
  getState(): string | undefined { return this.state; }

  setZip(zip: string) { this.zip = zip; }
  getZip(): string | undefined { return this.zip; }

  setCountry(country: string) { this.country = country; }
  getCountry(): string | undefined { return this.country; }

  setRecipientName(recipientName: string) { this.recipientName = recipientName; }
  getRecipientName(): string | undefined { return this.recipientName; }

  setPhone(phone: string) { this.phone = phone; }
  getPhone(): string | undefined { return this.phone; }

  setProfile(profile: Profile) { this.profile = profile; }
  getProfile(): Profile | undefined { return this.profile; }

  setError(error: PaysafeError) { this.error = error; }
  getError(): PaysafeError | undefined { return this.error; }

  setStatus(status: string) { this.status = status; }
  getStatus(): string | undefined { return this.status; }

  setDefaultShippingAddressIndicator(defaultShippingAddressIndicator: 'true' | 'false') { this.defaultShippingAddressIndicator = defaultShippingAddressIndicator; }
  getDefaultShippingAddressIndicator(): 'true' | 'false' | undefined { return this.defaultShippingAddressIndicator; }

}
