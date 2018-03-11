export declare class CardExpiry {
    private month?;
    private year?;
    constructor(resp?: CardExpiry);
    setMonth(month: string): void;
    getMonth(): string | undefined;
    setYear(year: string): void;
    getYear(): string | undefined;
}
