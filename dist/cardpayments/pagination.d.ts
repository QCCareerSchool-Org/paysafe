export declare class Pagination {
    private limit?;
    private offset?;
    private startDate?;
    private endDate?;
    constructor(resp?: Pagination);
    setLimit(limit: number): void;
    getLimit(): number | undefined;
    setOffset(offset: number): void;
    getOffset(): number | undefined;
    setStartDate(startDate: string): void;
    getStartDate(): string | undefined;
    setEndDate(endDate: string): void;
    getEndDate(): string | undefined;
}
