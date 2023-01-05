const FIRST_NAME_MAX_LENGTH = 80;
const LAST_NAME_MAX_LENGTH = 80;
const EMAIL_MAX_LENGTH = 255;

export class Profile {

  private firstName?: string;
  private lastName?: string;
  private email?: string;

  constructor(resp?: Profile) {
    if (!resp) {
      return;
    }
    if (typeof resp.firstName !== 'undefined') {
      this.firstName = resp.firstName;
    }
    if (typeof resp.lastName !== 'undefined') {
      this.lastName = resp.lastName;
    }
    if (typeof resp.email !== 'undefined') {
      this.email = resp.email;
    }
  }

  public setFirstName(firstName: string): void {
    if (firstName.length > FIRST_NAME_MAX_LENGTH) {
      throw new Error('invalid firstName');
    }
    this.firstName = firstName;
  }

  public getFirstName(): string | undefined { return this.firstName; }

  public setLastName(lastName: string): void {
    if (lastName.length > LAST_NAME_MAX_LENGTH) {
      throw new Error('invalid lastName');
    }
    this.lastName = lastName;
  }

  public getLastName(): string | undefined { return this.lastName; }

  public setEmail(email: string): void {
    if (email.length > EMAIL_MAX_LENGTH) {
      throw new Error('invalid email');
    }
    this.email = email;
  }

  public getEmail(): string | undefined { return this.email; }

}
