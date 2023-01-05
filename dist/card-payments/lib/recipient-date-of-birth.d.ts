export declare class RecipientDateOfBirth {
    private day?;
    private month?;
    private year?;
    constructor(resp?: RecipientDateOfBirth);
    setDay(day: number): void;
    getDay(): number | undefined;
    setMonth(month: number): void;
    getMonth(): number | undefined;
    setYear(year: number): void;
    getYear(): number | undefined;
}
