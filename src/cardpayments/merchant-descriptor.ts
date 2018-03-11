export class MerchantDescriptor {

  private dynamicDescriptor?: string;
  private phone?: string;

  constructor(resp?: MerchantDescriptor) {
    if (!resp)
      return;
    this.dynamicDescriptor = resp.dynamicDescriptor;
    this.phone = resp.phone;
  }

  setDynamicDescriptor(dynamicDescriptor: string): void { this.dynamicDescriptor = dynamicDescriptor; }
  getDynamicDescriptor(): string | undefined { return this.dynamicDescriptor; }
  
  setPhone(phone: string): void { this.phone = phone; }
  getPhone(): string | undefined { return this.phone; }

}
