export declare class CardExpiry {
    private month?;
    private year?;
    constructor(resp?: CardExpiry);
    setMonth(month: number): void;
    getMonth(): number | undefined;
    setYear(year: number): void;
    getYear(): number | undefined;
}
