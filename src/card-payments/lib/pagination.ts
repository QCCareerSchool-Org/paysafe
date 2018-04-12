export class Pagination {

  private limit?: number;
  private offset?: number;
  private startDate?: string;
  private endDate?: string;

  constructor(resp?: Pagination) {
    if (!resp) {
      return;
    }
    if (typeof resp.limit !== 'undefined') {
      this.limit = resp.limit;
    }
    if (typeof resp.offset !== 'undefined') {
      this.offset = resp.offset;
    }
    if (typeof resp.startDate !== 'undefined') {
      this.startDate = resp.startDate;
    }
    if (typeof resp.endDate !== 'undefined') {
      this.endDate = resp.endDate;
    }
  }

  public setLimit(limit: number) { this.limit = limit; }
  public getLimit(): number | undefined { return this.limit; }

  public setOffset(offset: number) { this.offset = offset; }
  public getOffset(): number | undefined { return this.offset; }

  public setStartDate(startDate: string) { this.startDate = startDate; }
  public getStartDate(): string | undefined { return this.startDate; }

  public setEndDate(endDate: string) { this.endDate = endDate; }
  public getEndDate(): string | undefined { return this.endDate; }

}
