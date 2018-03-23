"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MerchantDescriptor {
    constructor(resp) {
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
    setDynamicDescriptor(dynamicDescriptor) {
        if (dynamicDescriptor.length > 20) {
            throw new Error('invalid dynamic descriptor--must be 20 characters or less');
        }
        this.dynamicDescriptor = dynamicDescriptor;
    }
    getDynamicDescriptor() { return this.dynamicDescriptor; }
    setPhone(phone) {
        if (phone.length > 13) {
            throw new Error('invalid phone number--must be 13 characters or less');
        }
        this.phone = phone;
    }
    getPhone() { return this.phone; }
}
exports.MerchantDescriptor = MerchantDescriptor;
