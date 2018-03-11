export declare class RecipientDateOfBirth {
    private day?;
    private month?;
    private year?;
    constructor(resp?: RecipientDateOfBirth);
    setDay(day: string): void;
    getDay(): string | undefined;
    setMonth(month: string): void;
    getMonth(): string | undefined;
    setYear(year: string): void;
    getYear(): string | undefined;
}
