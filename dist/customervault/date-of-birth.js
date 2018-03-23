"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MIN_YEAR = 1900;
class DateOfBirth {
    constructor(resp) {
        if (!resp) {
            return;
        }
        if (typeof resp.day !== 'undefined') {
            this.day = resp.day;
        }
        if (typeof resp.month !== 'undefined') {
            this.month = resp.month;
        }
        if (typeof resp.year !== 'undefined') {
            this.year = resp.year;
        }
    }
    setDay(day) {
        if (day < 1 || day > 31) {
            throw new Error('invalid day');
        }
        this.day = day;
    }
    getDay() { return this.day; }
    setMonth(month) {
        if (month < 1 || month > 12) {
            throw new Error('invalid month');
        }
        this.month = month;
    }
    getMonth() { return this.month; }
    setYear(year) {
        if (year < MIN_YEAR || year > new Date().getFullYear()) {
            throw new Error('invalid year');
        }
        this.year = year;
    }
    getYear() { return this.year; }
}
exports.DateOfBirth = DateOfBirth;
