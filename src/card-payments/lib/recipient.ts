import { DateOfBirth } from '../../common/date-of-birth';

const ZIP_MAX_LENGTH = 10;
const LAST_NAME_MAX_LENGTH = 255;
const ACCOUNT_NUMBER_MAX_LENGTH = 25;

export class Recipient {

  private dateOfBirth?: DateOfBirth;
  private zip?: string;
  private lastName?: string;
  private accountNumber?: string;

  constructor(resp?: Recipient) {
    if (!resp) {
      return;
    }
    if (typeof resp.dateOfBirth !== 'undefined') {
      this.dateOfBirth = new DateOfBirth(resp.dateOfBirth);
    }
    if (typeof resp.zip !== 'undefined') {
      this.zip = resp.zip;
    }
    if (typeof resp.lastName !== 'undefined') {
      this.lastName = resp.lastName;
    }
    if (typeof resp.accountNumber !== 'undefined') {
      this.accountNumber = resp.accountNumber;
    }
  }

  public setDateOfBirth(dateOfBirth: DateOfBirth): void { this.dateOfBirth = dateOfBirth; }
  public getDateOfBirth(): DateOfBirth | undefined { return this.dateOfBirth; }

  public setZip(zip: string): void {
    if (zip.length > ZIP_MAX_LENGTH) {
      throw new Error('invalid zip');
    }
    this.zip = zip;
  }

  public getZip(): string | undefined { return this.zip; }

  public setLastName(lastName: string): void {
    if (lastName.length > LAST_NAME_MAX_LENGTH) {
      throw new Error('invalid lastName');
    }
    this.lastName = lastName;
  }

  public getLastName(): string | undefined { return this.lastName; }

  public setAccountNumber(accountNumber: string): void {
    if (accountNumber.length > ACCOUNT_NUMBER_MAX_LENGTH) {
      throw new Error('invalid accountNumber');
    }
    this.accountNumber = accountNumber;
  }

  public getAccountNumber(): string | undefined { return this.accountNumber; }

}
