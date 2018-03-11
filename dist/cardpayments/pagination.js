"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Pagination {
    constructor(resp) {
        if (!resp)
            return;
        this.limit = resp.limit;
        this.offset = resp.offset;
        this.startDate = resp.startDate;
        this.endDate = resp.endDate;
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
