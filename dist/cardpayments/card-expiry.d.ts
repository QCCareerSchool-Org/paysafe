export declare class CardExpiry {
    month?: string;
    year?: string;
    constructor(resp?: CardExpiry);
    setMonth(month: string): void;
    getMonth(): string | undefined;
    setYear(year: string): void;
    getYear(): string | undefined;
}
