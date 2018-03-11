import { RecipientDateOfBirth } from './recipient-date-of-birth';
export declare class VisaAdditionalAuthData {
    private recipientDateOfBirth?;
    private recipientZip?;
    private recipientLastName?;
    private recipientAccountNumber?;
    constructor(resp?: VisaAdditionalAuthData);
    setrecipientDateOfBirth(recipientDateOfBirth: RecipientDateOfBirth): void;
    getrecipientDateOfBirth(): RecipientDateOfBirth | undefined;
    setrecipientZip(recipientZip: string): void;
    getrecipientZip(): string | undefined;
    setrecipientLastName(recipientLastName: string): void;
    getrecipientLastName(): string | undefined;
    setrecipientAccountNumber(recipientAccountNumber: string): void;
    getrecipientAccountNumber(): string | undefined;
}
