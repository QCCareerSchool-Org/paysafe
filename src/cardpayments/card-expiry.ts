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

  public setMonth(month: number): void { this.month = month; }
  public getMonth(): number | undefined { return this.month; }

  public setYear(year: number): void { this.year = year; }
  public getYear(): number | undefined { return this.year; }

}
