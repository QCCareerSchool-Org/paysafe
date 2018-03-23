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
    setRel(rel) { this.rel = rel; }
    getRel() { return this.rel; }
    setHref(href) { this.href = href; }
    getHref() { return this.href; }
}
exports.Link = Link;
