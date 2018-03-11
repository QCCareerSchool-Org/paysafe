export declare class BillingDetails {
    street?: string;
    street2?: string;
    city?: string;
    state?: string;
    country?: string;
    zip?: string;
    phone?: string;
    useAsShippingAddress?: 'true' | 'false';
    constructor(resp?: BillingDetails);
    setUseAsShippingAddress(useAsShippingAddress: 'true' | 'false'): void;
    getUseAsShippingAddress(): string | undefined;
    setPhone(phone: string): void;
    getPhone(): string | undefined;
    setZip(zip: string): void;
    getZip(): string | undefined;
    setState(state: string): void;
    getState(): string | undefined;
    setCountry(country: string): void;
    getCountry(): string | undefined;
    setCity(city: string): void;
    getCity(): string | undefined;
    setStreet2(street2: string): void;
    getStreet2(): string | undefined;
    setStreet(street: string): void;
    getStreet(): string | undefined;
}
