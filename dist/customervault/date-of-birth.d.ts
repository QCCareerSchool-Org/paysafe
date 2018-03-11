export declare class DateOfBirth {
    private day?;
    private month?;
    private year?;
    constructor(resp?: DateOfBirth);
    setDay(day: string): void;
    getDay(): string | undefined;
    setMonth(month: string): void;
    getMonth(): string | undefined;
    setYear(year: string): void;
    getYear(): string | undefined;
}
