export class DateOfBirth {

  day?: string;
  month?: string;
  year?: string;

  constructor(resp?: DateOfBirth) {
    if (!resp)
      return;
    this.day = resp.day;
    this.month = resp.month;
    this.year = resp.year;
  }

  setDay(day: string): void { this.day = day; }
  getDay(): string | undefined { return this.day; }
  
  setMonth(month: string): void { this.month = month; }
  getMonth(): string | undefined { return this.month; }
  
  setYear(year: string): void { this.year = year; }
  getYear(): string | undefined { return this.year; }

}
