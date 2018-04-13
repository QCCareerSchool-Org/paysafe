import { Request } from './request';
export declare type statusType = 'ACTIVE';
export declare class Address extends Request {
    private nickName?;
    private street?;
    private street2?;
    private city?;
    private state?;
    private zip?;
    private country?;
    private recipientName?;
    private phone?;
    private status?;
    private defaultShippingAddressIndicator?;
    constructor(resp?: Address);
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
    setRecipientName(recipientName: string): void;
    getRecipientName(): string | undefined;
    setPhone(phone: string): void;
    getPhone(): string | undefined;
    getStatus(): statusType | undefined;
    setDefaultShippingAddressIndicator(defaultShippingAddressIndicator: boolean): void;
    getDefaultShippingAddressIndicator(): boolean | undefined;
}
