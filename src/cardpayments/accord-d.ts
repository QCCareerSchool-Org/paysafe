
const DEFERRED_PAYMENT = 'DEFERRED_PAYMENT';

export class AccordD {

  private financingType?: string;
  private plan?: string;
  private gracePeriod?: string;
  private term?: string;

  constructor(resp: AccordD) {
    if (!resp)
      return;
    this.financingType = resp.financingType;
    this.plan = resp.plan;
    this.gracePeriod = resp.gracePeriod;
    this.term = resp.term;
  }

  setFinancingType(financingType: string): void {
    this.financingType = financingType;
  }

  getFinancingType(): string | undefined {
    return this.financingType;
  }

  setPlan(plan: string): void {
    this.plan = plan;
  }

  getPlan(): string | undefined {
    return this.plan;
  }

  setGracePeriod(gracePeriod: string): void {
    this.gracePeriod = gracePeriod;
  }

  getGracePeriod(): string | undefined {
    return this.gracePeriod;
  }

  setTerm(term: string): void {
    this.term = term;
  }

  getTerm(): string | undefined {
    return this.term;
  }
  
}
