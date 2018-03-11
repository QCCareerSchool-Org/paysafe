"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MerchantDescriptor {
    constructor(resp) {
        if (!resp)
            return;
        this.dynamicDescriptor = resp.dynamicDescriptor;
        this.phone = resp.phone;
    }
    setDynamicDescriptor(dynamicDescriptor) { this.dynamicDescriptor = dynamicDescriptor; }
    getDynamicDescriptor() { return this.dynamicDescriptor; }
    setPhone(phone) { this.phone = phone; }
    getPhone() { return this.phone; }
}
exports.MerchantDescriptor = MerchantDescriptor;
