export declare class MerchantDescriptor {
    dynamicDescriptor?: string;
    phone?: string;
    constructor(resp?: MerchantDescriptor);
    setDynamicDescriptor(dynamicDescriptor: string): void;
    getDynamicDescriptor(): string | undefined;
    setPhone(phone: string): void;
    getPhone(): string | undefined;
}
