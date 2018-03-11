export declare class Link {
    private rel?;
    private href?;
    constructor(resp?: Link);
    setRel(rel: string): void;
    getRel(): string | undefined;
    setHref(href: string): void;
    getHref(): string | undefined;
}
