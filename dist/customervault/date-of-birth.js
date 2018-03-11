"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DateOfBirth {
    constructor(resp) {
        if (!resp)
            return;
        this.day = resp.day;
        this.month = resp.month;
        this.year = resp.year;
    }
    setDay(day) { this.day = day; }
    getDay() { return this.day; }
    setMonth(month) { this.month = month; }
    getMonth() { return this.month; }
    setYear(year) { this.year = year; }
    getYear() { return this.year; }
}
exports.DateOfBirth = DateOfBirth;
