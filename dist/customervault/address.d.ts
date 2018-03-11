import { Profile } from './profile';
import { PaysafeError } from '../paysafe-error';
export declare class Address {
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
    constructor(resp?: Address);
    setDefaultShippingAddressIndicator(defaultShippingAddressIndicator: 'true' | 'false'): void;
    getDefaultShippingAddressIndicator(): 'true' | 'false' | undefined;
    setStatus(status: string): void;
    getStatus(): string | undefined;
    setError(error: PaysafeError): void;
    getError(): PaysafeError | undefined;
    setPhone(phone: string): void;
    getPhone(): string | undefined;
    setProfile(profile: Profile): void;
    getProfile(): Profile | undefined;
    setRecipientName(recipientName: string): void;
    getRecipientName(): string | undefined;
    setCountry(country: string): void;
    getCountry(): string | undefined;
    setZip(zip: string): void;
    getZip(): string | undefined;
    setState(state: string): void;
    getState(): string | undefined;
    setCity(city: string): void;
    getCity(): string | undefined;
    setStreet2(street2: string): void;
    getStreet2(): string | undefined;
    setStreet(street: string): void;
    getStreet(): string | undefined;
    setNickName(nickName: string): void;
    getNickName(): string | undefined;
    setId(id: string): void;
    getId(): string | undefined;
}
