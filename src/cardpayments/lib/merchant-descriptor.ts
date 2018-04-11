const DYNAMIC_DESCRIPTOR_MAX_LENGTH = 20;
const PHONE_MAX_LENGTH = 13;

export class MerchantDescriptor {

  private dynamicDescriptor?: string;
  private phone?: string;

  constructor(resp?: MerchantDescriptor) {
    if (!resp) {
      return;
    }
    if (typeof resp.dynamicDescriptor !== 'undefined') {
      this.dynamicDescriptor = resp.dynamicDescriptor;
    }
    if (typeof resp.phone !== 'undefined') {
      this.phone = resp.phone;
    }
  }

  public setDynamicDescriptor(dynamicDescriptor: string): void {
    if (dynamicDescriptor.length > DYNAMIC_DESCRIPTOR_MAX_LENGTH) {
      throw new Error('invalid dynamic descriptor--must be 20 characters or less');
    }
    this.dynamicDescriptor = dynamicDescriptor;
  }
  public getDynamicDescriptor(): string | undefined { return this.dynamicDescriptor; }

  public setPhone(phone: string): void {
    if (phone.length > PHONE_MAX_LENGTH) {
      throw new Error('invalid phone number--must be 13 characters or less');
    }
    this.phone = phone;
  }
  public getPhone(): string | undefined { return this.phone; }

}
