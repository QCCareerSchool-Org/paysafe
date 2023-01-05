const MIN_MONTH = 1;
const MAX_MONTH = 12;
const MIN_YEAR = 1900;
const MAX_YEAR = 2200;

export class CardExpiry {

  private month?: number;
  private year?: number;

  constructor(resp?: CardExpiry) {
    if (!resp) {
      return;
    }
    if (typeof resp.month !== 'undefined') {
      this.month = resp.month;
    }
    if (typeof resp.year !== 'undefined') {
      this.year = resp.year;
    }
  }

  public setMonth(month: number): void {
    if (month < MIN_MONTH || month > MAX_MONTH) {
      throw new Error('invalid expiry year');
    }
    this.month = month;
  }

  public getMonth(): number | undefined { return this.month; }

  public setYear(year: number): void {
    if (year < MIN_YEAR || year > MAX_YEAR) {
      throw new Error('invalid expiry year');
    }
    this.year = year;
  }

  public getYear(): number | undefined { return this.year; }

}
