export declare class BillingDetails {
    private street?;
    private street2?;
    private city?;
    private state?;
    private zip?;
    private country?;
    private phone?;
    constructor(resp?: BillingDetails);
    setStreet(street: string): void;
    getStreet(): string | undefined;
    setStreet2(street2: string): void;
    getStreet2(): string | undefined;
    setCity(city: string): void;
    getCity(): string | undefined;
    setState(state: string): void;
    getState(): string | undefined;
    setZip(zip: string): void;
    getZip(): string | undefined;
    setCountry(country: string): void;
    getCountry(): string | undefined;
    setPhone(phone: string): void;
    getPhone(): string | undefined;
}
