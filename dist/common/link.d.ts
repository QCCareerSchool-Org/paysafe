export declare class Link {
    private rel?;
    private href?;
    constructor(resp?: Link);
    getRel(): string | undefined;
    getHref(): string | undefined;
}
