import { RecipientDateOfBirth } from './recipient-date-of-birth';

export class VisaAdditionalAuthData {

  recipientDateOfBirth?: RecipientDateOfBirth;
  recipientZip?: string;
  recipientLastName?: string;
  recipientAccountNumber?: string;

  constructor(resp?: VisaAdditionalAuthData) {
    if (!resp)
      return;
    if (resp.recipientDateOfBirth)
      this.recipientDateOfBirth = new RecipientDateOfBirth(resp.recipientDateOfBirth);
    this.recipientZip = resp.recipientZip;
    this.recipientLastName = resp.recipientLastName;
    this.recipientAccountNumber = resp.recipientAccountNumber;
  }

  setrecipientDateOfBirth(recipientDateOfBirth: RecipientDateOfBirth): void { this.recipientDateOfBirth = recipientDateOfBirth; }
  getrecipientDateOfBirth(): RecipientDateOfBirth | undefined { return this.recipientDateOfBirth; }
  setrecipientZip(recipientZip: string): void { this.recipientZip = recipientZip; }
  getrecipientZip(): string | undefined { return this.recipientZip; }
  setrecipientLastName(recipientLastName: string): void { this.recipientLastName = recipientLastName; }
  getrecipientLastName(): string | undefined { return this.recipientLastName; }
  setrecipientAccountNumber(recipientAccountNumber: string): void { this.recipientAccountNumber = recipientAccountNumber; }
  getrecipientAccountNumber(): string | undefined { return this.recipientAccountNumber; }

}
