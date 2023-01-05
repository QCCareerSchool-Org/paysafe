import { DateOfBirth } from '../../common/date-of-birth';
export declare class Recipient {
    private dateOfBirth?;
    private zip?;
    private lastName?;
    private accountNumber?;
    constructor(resp?: Recipient);
    setDateOfBirth(dateOfBirth: DateOfBirth): void;
    getDateOfBirth(): DateOfBirth | undefined;
    setZip(zip: string): void;
    getZip(): string | undefined;
    setLastName(lastName: string): void;
    getLastName(): string | undefined;
    setAccountNumber(accountNumber: string): void;
    getAccountNumber(): string | undefined;
}
