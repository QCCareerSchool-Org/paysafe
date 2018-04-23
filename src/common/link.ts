export class Link {

  private rel?: string;
  private href?: string;

  constructor(resp?: Link) {
    if (!resp) {
      return;
    }
    if (typeof resp.rel !== 'undefined') {
      this.rel = resp.rel;
    }
    if (typeof resp.href !== 'undefined') {
      this.href = resp.href;
    }
  }

  public getRel(): string | undefined { return this.rel; }

  public getHref(): string | undefined { return this.href; }

}
