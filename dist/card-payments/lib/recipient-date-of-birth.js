"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipientDateOfBirth = void 0;
const MIN_DAY = 1;
const MAX_DAY = 31;
const MIN_MONTH = 1;
const MAX_MONTH = 12;
const MIN_YEAR = 1900;
const MAX_YEAR = 2200;
class RecipientDateOfBirth {
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
        if (day < MIN_DAY || day > MAX_DAY) {
            throw new Error('invalid day');
        }
        this.day = day;
    }
    getDay() { return this.day; }
    setMonth(month) {
        if (month < MIN_MONTH || month > MAX_MONTH) {
            throw new Error('invalid day');
        }
        this.month = month;
    }
    getMonth() { return this.month; }
    setYear(year) {
        if (year < MIN_YEAR || year > MAX_YEAR) {
            throw new Error('invalid day');
        }
        this.year = year;
    }
    getYear() { return this.year; }
}
exports.RecipientDateOfBirth = RecipientDateOfBirth;
