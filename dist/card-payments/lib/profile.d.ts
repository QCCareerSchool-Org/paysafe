export declare class Profile {
    private firstName?;
    private lastName?;
    private email?;
    constructor(resp?: Profile);
    setFirstName(firstName: string): void;
    getFirstName(): string | undefined;
    setLastName(lastName: string): void;
    getLastName(): string | undefined;
    setEmail(email: string): void;
    getEmail(): string | undefined;
}
