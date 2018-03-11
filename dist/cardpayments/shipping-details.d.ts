export declare class ShippingDetails {
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
    constructor(resp?: ShippingDetails);
    setCarrier(carrier: string): void;
    getCarrier(): string | undefined;
    setRecipientName(recipientName: string): void;
    getRecipientName(): string | undefined;
    setPhone(phone: string): void;
    getPhone(): string | undefined;
    setStreet(street: string): void;
    getStreet(): string | undefined;
    setStreet2(street2: string): void;
    getStreet2(): string | undefined;
    setCity(city: string): void;
    getCity(): string | undefined;
    setState(state: string): void;
    getState(): string | undefined;
    setCountry(country: string): void;
    getCountry(): string | undefined;
    setZip(zip: string): void;
    getZip(): string | undefined;
}
