export declare class BillingAddress {
    private nickName?;
    private street?;
    private street2?;
    private city?;
    private state?;
    private zip?;
    private country?;
    constructor(resp?: BillingAddress);
    setNickName(nickName: string): void;
    getNickName(): string | undefined;
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
}
