"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CardExpiry {
    constructor(resp) {
        if (!resp)
            return;
        this.month = resp.month;
        this.year = resp.year;
    }
    setMonth(month) { this.month = month; }
    getMonth() { return this.month; }
    setYear(year) { this.year = year; }
    getYear() { return this.year; }
}
exports.CardExpiry = CardExpiry;
