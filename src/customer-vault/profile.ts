import { createArray } from '../common/create-array';
import { DateOfBirth } from '../common/date-of-birth';

import { Request } from './request';

import { Address } from './address';
import { Card } from './card';

import { ACHBankAccount } from './ach-bank-account';
import { BACSBankAccount } from './bacs-bank-account';
import { EFTBankAccount } from './eft-bank-account';
import { SEPABankAccount } from './sepa-bank-account';

export type ProfileStatus = 'INITIAL' | 'ACTIVE';
export type ProfileLocale = 'en_US' | 'fr_CA' | 'en_GB';
export type ProfileGender = 'M' | 'F';

const STATUSES = ['INITIAL', 'ACTIVE'];
const MERCHANT_CUSTOMER_ID_MAX_LENGTH = 100;
const LOCALES = ['en_US', 'fr_CA', 'en_GB'];
const FIRST_NAME_MAX_LENGTH = 80;
const MIDDLE_NAME_MAX_LENGTH = 80;
const LAST_NAME_MAX_LENGTH = 80;
const IP_MAX_LENGTH = 46;
const GENDERS = ['M', 'F'];
const NATIONALITY_MAX_LENGTH = 30;
const EMAIL_MAX_LENGTH = 255;
const PHONE_MAX_LENGTH = 40;
const CELL_PHONE_MAX_LENGTH = 40;
const PAYMENT_TOKEN_MAX_LENGTH = 50;

export class Profile extends Request {

  private status?: ProfileStatus;
  private merchantCustomerId?: string;
  private locale?: ProfileLocale;
  private firstName?: string;
  private middleName?: string;
  private lastName?: string;
  private dateOfBirth?: DateOfBirth;
  private ip?: string;
  private gender?: ProfileGender;
  private nationality?: string;
  private email?: string;
  private phone?: string;
  private cellPhone?: string;
  private paymentToken?: string;
  private addresses?: Address[];
  private card?: Card;
  private cards?: Card[];
  private achBankAccount?: ACHBankAccount;
  private achBankAccounts?: ACHBankAccount[];
  private bacsBankAccount?: BACSBankAccount;
  private bacsBankAccounts?: BACSBankAccount[];
  private eftBankAccount?: EFTBankAccount;
  private eftBankAccounts?: EFTBankAccount[];
  private sepaBankAccount?: SEPABankAccount;
  private sepaBankAccounts?: SEPABankAccount[];

  constructor(resp?: Profile) {
    super(resp);
    if (!resp) {
      return;
    }
    if (typeof resp.status !== 'undefined') {
      this.status = resp.status;
    }
    if (typeof resp.merchantCustomerId !== 'undefined') {
      this.merchantCustomerId = resp.merchantCustomerId;
    }
    if (typeof resp.locale !== 'undefined') {
      this.locale = resp.locale;
    }
    if (typeof resp.firstName !== 'undefined') {
      this.firstName = resp.firstName;
    }
    if (typeof resp.middleName !== 'undefined') {
      this.middleName = resp.middleName;
    }
    if (typeof resp.lastName !== 'undefined') {
      this.lastName = resp.lastName;
    }
    if (typeof resp.dateOfBirth !== 'undefined') {
      this.dateOfBirth = new DateOfBirth(resp.dateOfBirth);
    }
    if (typeof resp.ip !== 'undefined') {
      this.ip = resp.ip;
    }
    if (typeof resp.gender !== 'undefined') {
      this.gender = resp.gender;
    }
    if (typeof resp.nationality !== 'undefined') {
      this.nationality = resp.nationality;
    }
    if (typeof resp.email !== 'undefined') {
      this.email = resp.email;
    }
    if (typeof resp.phone !== 'undefined') {
      this.phone = resp.phone;
    }
    if (typeof resp.cellPhone !== 'undefined') {
      this.cellPhone = resp.cellPhone;
    }
    if (typeof resp.paymentToken !== 'undefined') {
      this.paymentToken = resp.paymentToken;
    }
    if (typeof resp.addresses !== 'undefined') {
      this.addresses = createArray(resp.addresses, Address);
    }
    if (typeof resp.card !== 'undefined') {
      this.card = new Card(resp.card);
    }
    if (typeof resp.cards !== 'undefined') {
      if (!Array.isArray(resp.cards)) {
        throw new Error('cards should be an array');
      }
      this.cards = createArray(resp.cards, Card);
    }
    if (typeof resp.achBankAccount !== 'undefined') {
        this.achBankAccount = resp.achBankAccount;
    }
    if (typeof resp.achBankAccounts !== 'undefined') {
      if (!Array.isArray(resp.achBankAccounts)) {
        throw new Error('achBankAccounts should be an array');
      }
      this.achBankAccounts = createArray(resp.achBankAccounts, ACHBankAccount);
    }
    if (typeof resp.eftBankAccount !== 'undefined') {
      this.eftBankAccount = resp.eftBankAccount;
    }
    if (typeof resp.eftBankAccounts !== 'undefined') {
      if (!Array.isArray(resp.eftBankAccounts)) {
        throw new Error('eftBankAccounts should be an array');
      }
      this.eftBankAccounts = createArray(resp.eftBankAccounts, EFTBankAccount);
    }
    if (typeof resp.bacsBankAccount !== 'undefined') {
      this.bacsBankAccount = resp.bacsBankAccount;
    }
    if (typeof resp.bacsBankAccounts !== 'undefined') {
      if (!Array.isArray(resp.bacsBankAccounts)) {
        throw new Error('bacsBankAccounts should be an array');
      }
      this.bacsBankAccounts = createArray(resp.bacsBankAccounts, BACSBankAccount);
    }
    if (typeof resp.sepaBankAccount !== 'undefined') {
      this.sepaBankAccount = resp.sepaBankAccount;
    }
    if (typeof resp.sepaBankAccounts !== 'undefined') {
      if (!Array.isArray(resp.sepaBankAccounts)) {
        throw new Error('sepaBankAccounts should be an array');
      }
      this.sepaBankAccounts = createArray(resp.sepaBankAccounts, SEPABankAccount);
    }
  }

  public setStatus(status: ProfileStatus): void {
    if (STATUSES.indexOf(status) === -1) {
      throw new Error('invalid status');
    }
    this.status = status;
  }
  public getStatus(): ProfileStatus | undefined { return this.status; }

  public setMerchantCustomerId(merchantCustomerId: string): void {
    if (merchantCustomerId.length > MERCHANT_CUSTOMER_ID_MAX_LENGTH) {
      throw new Error('invalid merchantCustomerId');
    }
    this.merchantCustomerId = merchantCustomerId;
  }
  public getMerchantCustomerId(): string | undefined { return this.merchantCustomerId; }

  public setLocale(locale: ProfileLocale): void {
    if (LOCALES.indexOf(locale) === -1) {
      throw new Error('invalid locale');
    }
    this.locale = locale;
  }
  public getLocale(): ProfileLocale | undefined { return this.locale; }

  public setFirstName(firstName: string): void {
    if (firstName.length > FIRST_NAME_MAX_LENGTH) {
      throw new Error('invalid firstName');
    }
    this.firstName = firstName;
  }
  public getFirstName(): string | undefined { return this.firstName; }

  public setMiddleName(middleName: string): void {
    if (middleName.length > MIDDLE_NAME_MAX_LENGTH) {
      throw new Error('invalid middleName');
    }
    this.middleName = middleName;
  }
  public getMiddleName(): string | undefined { return this.middleName; }

  public setLastName(lastName: string): void {
    if (lastName.length > LAST_NAME_MAX_LENGTH) {
      throw new Error('invalid lastName');
    }
    this.lastName = lastName;
  }
  public getLastName(): string | undefined { return this.lastName; }

  public setDateOfBirth(dateOfBirth: DateOfBirth): void {
    if (!(dateOfBirth instanceof DateOfBirth)) {
      throw new Error('invalid dateOfBirth');
    }
    this.dateOfBirth = dateOfBirth;
  }
  public getDateOfBirth(): DateOfBirth | undefined { return this.dateOfBirth; }

  public setIp(ip: string): void {
    if (ip.length > IP_MAX_LENGTH) {
      throw new Error('invalid ip');
    }
    this.ip = ip;
  }
  public getIp(): string | undefined { return this.ip; }

  public setGender(gender: ProfileGender): void {
    if (GENDERS.indexOf(gender) === -1) {
      throw new Error('invalid gender');
    }
    this.gender = gender;
  }
  public getGender(): ProfileGender | undefined { return this.gender; }

  public setNationality(nationality: string): void {
    if (nationality.length > NATIONALITY_MAX_LENGTH) {
      throw new Error('invalid nationality');
    }
    this.nationality = nationality;
  }
  public getNationality(): string | undefined { return this.nationality; }

  public setEmail(email: string): void {
    if (email.length > EMAIL_MAX_LENGTH) {
      throw new Error('invalid email');
    }
    this.email = email;
  }
  public getEmail(): string | undefined { return this.email; }

  public setPhone(phone: string): void {
    if (phone.length > PHONE_MAX_LENGTH) {
      throw new Error('invalid phone');
    }
    this.phone = phone;
  }
  public getPhone(): string | undefined { return this.phone; }

  public setCellPhone(cellPhone: string): void {
    if (cellPhone.length > CELL_PHONE_MAX_LENGTH) {
      throw new Error('invalid cellPhone');
    }
    this.cellPhone = cellPhone;
  }
  public getCellPhone(): string | undefined { return this.cellPhone; }

  public setPaymentToken(paymentToken: string): void {
    if (paymentToken.length > PAYMENT_TOKEN_MAX_LENGTH) {
      throw new Error('payment token exceeds maximum length');
    }
    this.paymentToken = paymentToken;
  }
  public getPaymentToken(): string | undefined { return this.paymentToken; }

  public setAddresses(addresses: Address | Address[]): void {
    if (!Array.isArray(addresses)) {
      throw new Error('addresses must be an array');
    }
    for (const a of addresses) {
      if (!(a instanceof Address)) {
        throw new Error('invalid addresses');
      }
    }
    this.addresses = addresses;
  }
  public getAddresses(): Address | Address[] | undefined { return this.addresses; }

  public setCard(card: Card): void {
    if (!(card instanceof Card)) {
      throw new Error('invalid card');
    }
    this.card = card;
  }
  public getCard(): Card | undefined { return this.card; }

  public setCards(cards: Card[]): void {
    if (!Array.isArray(cards)) {
      throw new Error('cards must be an array');
    }
    for (const c of cards) {
      if (!(c instanceof Card)) {
        throw new Error('invalid card');
      }
    }
    this.cards = cards;
  }
  public getCards(): Card[] | undefined { return this.cards; }

  public setACHBankAccount(achBankAccount: ACHBankAccount): void {
    if (!(achBankAccount instanceof ACHBankAccount)) {
      throw new Error('invalid achBankAccount');
    }
    this.achBankAccount = achBankAccount;
  }
  public getACHBankAccount(): ACHBankAccount | undefined { return this.achBankAccount; }

  public getACHBankAccounts(): ACHBankAccount[] | undefined { return this.achBankAccounts; }

  public setBACSBankAccount(bacsBankAccount: BACSBankAccount): void {
    if (!(bacsBankAccount instanceof BACSBankAccount)) {
      throw new Error('invalid bacsBankAccount');
    }
    this.bacsBankAccount = bacsBankAccount;
  }
  public getBACSBankAccount(): BACSBankAccount | undefined { return this.bacsBankAccount; }

  public getBACSBankAccounts(): BACSBankAccount[] | undefined { return this.bacsBankAccounts; }

  public setEFTBankAccount(eftBankAccount: EFTBankAccount): void {
    if (!(eftBankAccount instanceof EFTBankAccount)) {
      throw new Error('invalid eftBankAccount');
    }
    this.eftBankAccount = eftBankAccount;
  }
  public getEFTBankAccount(): EFTBankAccount | undefined { return this.eftBankAccount; }

  public getEFTBankAccounts(): EFTBankAccount[] | undefined { return this.eftBankAccounts; }

  public setSEPABankAccount(sepaBankAccount: SEPABankAccount): void {
    if (!(sepaBankAccount instanceof SEPABankAccount)) {
      throw new Error('invalid sepaBankAccount');
    }
    this.sepaBankAccount = sepaBankAccount;
  }
  public getSEPABankAccount(): SEPABankAccount | undefined { return this.sepaBankAccount; }

  public getSEPABankAccounts(): SEPABankAccount[] | undefined { return this.sepaBankAccounts; }

}
