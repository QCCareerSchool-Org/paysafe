"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MIN_MONTH = 1;
const MAX_MONTH = 12;
const MIN_YEAR = 1900;
const MAX_YEAR = 2200;
class CardExpiry {
    constructor(resp) {
        if (!resp) {
            return;
        }
        if (typeof resp.month !== 'undefined') {
            this.month = resp.month;
        }
        if (typeof resp.year !== 'undefined') {
            this.year = resp.year;
        }
    }
    setMonth(month) {
        if (month < MIN_MONTH || month > MAX_MONTH) {
            throw new Error('invalid expiry year');
        }
        this.month = month;
    }
    getMonth() { return this.month; }
    setYear(year) {
        if (year < MIN_YEAR || year > MAX_YEAR) {
            throw new Error('invalid expiry year');
        }
        this.year = year;
    }
    getYear() { return this.year; }
}
exports.CardExpiry = CardExpiry;
