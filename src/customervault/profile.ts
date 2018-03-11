import { createArray } from '../common/create-array';
import { PaysafeError } from '../paysafe-error';

import { Card } from '../cardpayments/card';

import { DateOfBirth } from './date-of-birth';
import { Address } from './address';
import { ACHBankAccount } from './ach-bank-account';
import { EFTBankAccount } from './eft-bank-account';
import { BACSBankAccount } from './bacs-bank-account';
import { SEPABankAccount } from './sepa-bank-account';

export class Profile {

  id?: string;
  status?: string;
  merchantCustomerId?: string;
  locale?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  dateOfBirth?: DateOfBirth;
  ip?: string;
  gender?: string;
  nationality?: string;
  email?: string;
  phone?: string;
  cellPhone?: string;
  paymentToken?: string;
  addresses?: Address | Address[];
  cards?: Card | Card[];
  achbankaccounts?: ACHBankAccount | ACHBankAccount[];
  bacsbankaccounts?: BACSBankAccount | BACSBankAccount[];
  eftbankaccounts?: EFTBankAccount | EFTBankAccount[];
  sepabankaccounts?: SEPABankAccount | SEPABankAccount[];
  error?: PaysafeError;

  constructor(resp?: Profile) {
    if (!resp)
      return;
  }

  setId(id: string): void { this.id = id; }
  getId(): string | undefined { return this.id; }
  
  setStatus(status: string): void { this.status = status; }
  getStatus(): string | undefined { return this.status; }
  
  setMerchantCustomerId(merchantCustomerId: string): void { this.merchantCustomerId = merchantCustomerId; }
  getMerchantCustomerId(): string | undefined { return this.merchantCustomerId; }
  
  setLocale(locale: string): void { this.locale = locale; }
  getLocale(): string | undefined { return this.locale; }
  
  setFirstName(firstName: string): void { this.firstName = firstName; }
  getFirstName(): string | undefined { return this.firstName; }
  
  setMiddleName(middleName: string): void { this.middleName = middleName; }
  getMiddleName(): string | undefined { return this.middleName; }
  
  setLastName(lastName: string): void { this.lastName = lastName; }
  getLastName(): string | undefined { return this.lastName; }
  
  setDateOfBirth(dateOfBirth: DateOfBirth): void { this.dateOfBirth = dateOfBirth; }
  getDateOfBirth(): DateOfBirth | undefined { return this.dateOfBirth; }
  
  setIp(ip: string): void { this.ip = ip; }
  getIp(): string | undefined { return this.ip; }
  
  setGender(gender: string): void { this.gender = gender; }
  getGender(): string | undefined { return this.gender; }
  
  setNationality(nationality: string): void { this.nationality = nationality; }
  getNationality(): string | undefined { return this.nationality; }
  
  setEmail(email: string): void { this.email = email; }
  getEmail(): string | undefined { return this.email; }
  
  setPhone(phone: string): void { this.phone = phone; }
  getPhone(): string | undefined { return this.phone; }
  
  setCellPhone(cellPhone: string): void { this.cellPhone = cellPhone; }
  getCellPhone(): string | undefined { return this.cellPhone; }
  
  setPaymentToken(paymentToken: string): void { this.paymentToken = paymentToken; }
  getPaymentToken(): string | undefined { return this.paymentToken; }
  
  setAddresses(addresses: Address | Address[]): void { this.addresses = addresses; }
  getAddresses(): Address | Address[] | undefined { return this.addresses; }
  
  setCards(cards: Card | Card[]): void { this.cards = cards }
  getCards(): Card | Card[] | undefined { return this.cards; }
  
  setACHBankAccounts(achbankaccounts: ACHBankAccount | ACHBankAccount[]): void { this.achbankaccounts = achbankaccounts; }
  getACHBankAccounts(): ACHBankAccount | ACHBankAccount[] | undefined { return this.achbankaccounts; }
  
  setBACSBankAccounts(bacsbankaccounts: BACSBankAccount | BACSBankAccount[]): void { this.bacsbankaccounts = bacsbankaccounts; }
  getBACSBankAccounts(): BACSBankAccount | BACSBankAccount[] | undefined { return this.bacsbankaccounts; }
  
  setEFTBankAccounts(eftbankaccounts: EFTBankAccount| EFTBankAccount[]): void { this.eftbankaccounts = eftbankaccounts; }
  getEFTBankAccounts(): EFTBankAccount | EFTBankAccount[] | undefined { return this.eftbankaccounts; }
  
  setSEPABankAccounts(sepabankaccounts: SEPABankAccount | SEPABankAccount[]): void { this.sepabankaccounts = sepabankaccounts; }
  getSEPABankAccounts(): SEPABankAccount | SEPABankAccount[] | undefined { return this.sepabankaccounts; }
  
  setError(error: PaysafeError): void { this.error = error; }
  getError(): PaysafeError | undefined { return this.error; }

}
