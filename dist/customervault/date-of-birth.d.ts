export declare class DateOfBirth {
    private day?;
    private month?;
    private year?;
    constructor(resp?: DateOfBirth);
    setDay(day: number): void;
    getDay(): number | undefined;
    setMonth(month: number): void;
    getMonth(): number | undefined;
    setYear(year: number): void;
    getYear(): number | undefined;
}
