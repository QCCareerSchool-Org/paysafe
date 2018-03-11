export class Pagination {

  private limit?: number;
  private offset?: number;
  private startDate?: string;
  private endDate?: string;

  constructor(resp?: Pagination) {
    if (!resp)
      return;
    this.limit = resp.limit;
    this.offset = resp.offset;
    this.startDate = resp.startDate;
    this.endDate = resp.endDate;
  }

  setLimit(limit: number) { this.limit = limit }
  getLimit(): number | undefined { return this.limit; }
  setOffset(offset: number) { this.offset = offset; }
  getOffset(): number | undefined { return this.offset; }
  setStartDate(startDate: string) { this.startDate = startDate; }
  getStartDate(): string | undefined { return this.startDate; }
  setEndDate(endDate: string) { this.endDate = endDate; }
  getEndDate(): string | undefined { return this.endDate; }

}