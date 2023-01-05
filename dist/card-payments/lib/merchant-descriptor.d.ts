export declare class MerchantDescriptor {
    private dynamicDescriptor?;
    private phone?;
    constructor(resp?: MerchantDescriptor);
    setDynamicDescriptor(dynamicDescriptor: string): void;
    getDynamicDescriptor(): string | undefined;
    setPhone(phone: string): void;
    getPhone(): string | undefined;
}
