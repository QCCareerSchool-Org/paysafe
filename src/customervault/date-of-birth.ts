const MIN_YEAR = 1900;

export class DateOfBirth {

  private day?: number;
  private month?: number;
  private year?: number;

  constructor(resp?: DateOfBirth) {
    if (!resp) {
      return;
    }
    if (typeof resp.day !== 'undefined') {
      this.day = resp.day;
    }
    if (typeof resp.month !== 'undefined') {
      this.month = resp.month;
    }
    if (typeof resp.year !== 'undefined') {
      this.year = resp.year;
    }
  }

  public setDay(day: number): void {
    if (day < 1 || day > 31) {
      throw new Error('invalid day');
    }
    this.day = day;
  }
  public getDay(): number | undefined { return this.day; }

  public setMonth(month: number): void {
    if (month < 1 || month > 12) {
      throw new Error('invalid month');
    }
    this.month = month;
  }
  public getMonth(): number | undefined { return this.month; }

  public setYear(year: number): void {
    if (year < MIN_YEAR || year > new Date().getFullYear()) {
      throw new Error('invalid year');
    }
    this.year = year;
  }
  public getYear(): number | undefined { return this.year; }

}
