export class Link {

  private rel?: string;
  private href?: string;

  constructor(resp?: Link) {
    if (!resp)
      return;
    this.rel = resp.rel;
    this.href = resp.href;
  }

  setRel(rel: string): void { this.rel = rel; }
	getRel(): string | undefined { return this.rel; }
	setHref(href: string): void { this.href = href; }
	getHref(): string | undefined { return this.href; }

}
