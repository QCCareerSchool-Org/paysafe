"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Pagination {
    constructor(resp) {
        if (!resp) {
            return;
        }
        if (typeof resp.limit !== 'undefined') {
            this.limit = resp.limit;
        }
        if (typeof resp.offset !== 'undefined') {
            this.offset = resp.offset;
        }
        if (typeof resp.startDate !== 'undefined') {
            this.startDate = resp.startDate;
        }
        if (typeof resp.endDate !== 'undefined') {
            this.endDate = resp.endDate;
        }
    }
    setLimit(limit) { this.limit = limit; }
    getLimit() { return this.limit; }
    setOffset(offset) { this.offset = offset; }
    getOffset() { return this.offset; }
    setStartDate(startDate) { this.startDate = startDate; }
    getStartDate() { return this.startDate; }
    setEndDate(endDate) { this.endDate = endDate; }
    getEndDate() { return this.endDate; }
}
exports.Pagination = Pagination;
