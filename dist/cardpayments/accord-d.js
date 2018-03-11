"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DEFERRED_PAYMENT = 'DEFERRED_PAYMENT';
class AccordD {
    constructor(resp) {
        if (!resp)
            return;
        this.financingType = resp.financingType;
        this.plan = resp.plan;
        this.gracePeriod = resp.gracePeriod;
        this.term = resp.term;
    }
    setFinancingType(financingType) {
        this.financingType = financingType;
    }
    getFinancingType() {
        return this.financingType;
    }
    setPlan(plan) {
        this.plan = plan;
    }
    getPlan() {
        return this.plan;
    }
    setGracePeriod(gracePeriod) {
        this.gracePeriod = gracePeriod;
    }
    getGracePeriod() {
        return this.gracePeriod;
    }
    setTerm(term) {
        this.term = term;
    }
    getTerm() {
        return this.term;
    }
}
exports.AccordD = AccordD;
