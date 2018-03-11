export declare class AccordD {
    private financingType?;
    private plan?;
    private gracePeriod?;
    private term?;
    constructor(resp: AccordD);
    setFinancingType(financingType: string): void;
    getFinancingType(): string | undefined;
    setPlan(plan: string): void;
    getPlan(): string | undefined;
    setGracePeriod(gracePeriod: string): void;
    getGracePeriod(): string | undefined;
    setTerm(term: string): void;
    getTerm(): string | undefined;
}
