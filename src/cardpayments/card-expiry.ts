export class CardExpiry {

  month?: string;
  year?: string;

  constructor(resp?: CardExpiry) {
    if (!resp)
      return;
    this.month = resp.month;
    this.year = resp.year;
  }

  setMonth(month: string): void { this.month = month; }
  getMonth(): string | undefined { return this.month; }
  setYear(year: string): void { this.year = year; }
  getYear(): string | undefined { return this.year; }

}
