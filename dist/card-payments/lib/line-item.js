"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineItem = void 0;
const DESCRIPTION_MAX_LENGTH = 50;
const PRODUCT_CODE_MAX_LENGTH = 12;
const QUANTITY_MAX = 99999999999;
const QUANTITY_MAX_DECIMALS = 4;
const UNIT_AMOUNT_MAX = 99999999999;
const TAX_RATE_MAX = 100;
const TAX_RATE_MAX_DECIMALS = 2;
const TAX_AMOUNT_MAX = 99999999999;
const TOTAL_AMOUNT_MAX = 99999999999;
class LineItem {
    constructor(resp) {
        if (typeof resp === 'undefined') {
            return;
        }
        if (typeof resp.description !== 'undefined') {
            this.description = resp.description;
        }
        if (typeof resp.productCode !== 'undefined') {
            this.productCode = resp.productCode;
        }
        if (typeof resp.quanity !== 'undefined') {
            this.quanity = resp.quanity;
        }
        if (typeof resp.unitAmount !== 'undefined') {
            this.unitAmount = resp.unitAmount;
        }
        if (typeof resp.taxRate !== 'undefined') {
            this.taxRate = resp.taxRate;
        }
        if (typeof resp.taxAmount !== 'undefined') {
            this.taxAmount = resp.taxAmount;
        }
        if (typeof resp.totalAmount !== 'undefined') {
            this.totalAmount = resp.totalAmount;
        }
    }
}
exports.LineItem = LineItem;
