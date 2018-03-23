"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    setMonth(month) { this.month = month; }
    getMonth() { return this.month; }
    setYear(year) { this.year = year; }
    getYear() { return this.year; }
}
exports.CardExpiry = CardExpiry;
