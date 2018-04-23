"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Link {
    constructor(resp) {
        if (!resp) {
            return;
        }
        if (typeof resp.rel !== 'undefined') {
            this.rel = resp.rel;
        }
        if (typeof resp.href !== 'undefined') {
            this.href = resp.href;
        }
    }
    getRel() { return this.rel; }
    getHref() { return this.href; }
}
exports.Link = Link;
