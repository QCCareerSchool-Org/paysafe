import { RecipientDateOfBirth } from './recipient-date-of-birth';

export class VisaAdditionalAuthData {

  private recipientDateOfBirth?: RecipientDateOfBirth;
  private recipientZip?: string;
  private recipientLastName?: string;
  private recipientAccountNumber?: string;

  constructor(resp?: VisaAdditionalAuthData) {
    if (!resp) {
      return;
    }
    if (typeof resp.recipientDateOfBirth !== 'undefined') {
      this.recipientDateOfBirth = new RecipientDateOfBirth(resp.recipientDateOfBirth);
    }
    if (typeof resp.recipientZip !== 'undefined') {
      this.recipientZip = resp.recipientZip;
    }
    if (typeof resp.recipientLastName !== 'undefined') {
      this.recipientLastName = resp.recipientLastName;
    }
    if (typeof resp.recipientAccountNumber !== 'undefined') {
      this.recipientAccountNumber = resp.recipientAccountNumber;
    }
  }

  public setrecipientDateOfBirth(recipientDateOfBirth: RecipientDateOfBirth): void { this.recipientDateOfBirth = recipientDateOfBirth; }
  public getrecipientDateOfBirth(): RecipientDateOfBirth | undefined { return this.recipientDateOfBirth; }

  public setrecipientZip(recipientZip: string): void { this.recipientZip = recipientZip; }
  public getrecipientZip(): string | undefined { return this.recipientZip; }

  public setrecipientLastName(recipientLastName: string): void { this.recipientLastName = recipientLastName; }
  public getrecipientLastName(): string | undefined { return this.recipientLastName; }

  public setrecipientAccountNumber(recipientAccountNumber: string): void { this.recipientAccountNumber = recipientAccountNumber; }
  public getrecipientAccountNumber(): string | undefined { return this.recipientAccountNumber; }

}
