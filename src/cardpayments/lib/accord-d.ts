const DEFERRED_PAYMENT = 'DEFERRED_PAYMENT';

export class AccordD {

  private financingType?: string;
  private plan?: string;
  private gracePeriod?: string;
  private term?: string;

  constructor(resp?: AccordD) {
    if (!resp) {
      return;
    }
    if (typeof resp.financingType !== 'undefined') {
      this.financingType = resp.financingType;
    }
    if (typeof resp.plan !== 'undefined') {
      this.plan = resp.plan;
    }
    if (typeof resp.gracePeriod !== 'undefined') {
      this.gracePeriod = resp.gracePeriod;
    }
    if (typeof resp.term !== 'undefined') {
      this.term = resp.term;
    }
  }

  public setFinancingType(financingType: string): void { this.financingType = financingType; }
  public getFinancingType(): string | undefined { return this.financingType; }

  public setPlan(plan: string): void { this.plan = plan; }
  public getPlan(): string | undefined { return this.plan; }

  public setGracePeriod(gracePeriod: string): void { this.gracePeriod = gracePeriod; }
  public getGracePeriod(): string | undefined { return this.gracePeriod; }

  public setTerm(term: string): void { this.term = term; }
  public getTerm(): string | undefined { return this.term; }

}
