import { Paysafe } from '../index';
import { Address } from './address';
import { Card } from './card';
import { Mandate } from './mandate';
import { Profile } from './profile';
import { ACHBankAccount } from './ach-bank-account';
import { BACSBankAccount } from './bacs-bank-account';
export declare class ServiceHandler {
    private paysafe;
    constructor(paysafe: Paysafe);
    /** verifies that the service is up and accessible */
    monitor(): Promise<any>;
    /**
     * create a new profile
     * @param profile the profile to create
     */
    createProfile(profile: Profile): Promise<Profile>;
    /**
     * updates an existing profile
     * @param profileId the id of the profile to update
     * @param profile the new profile
     */
    updateProfile(profileId: string, profile: Profile): Promise<Profile>;
    /**
     * retrieve a profile
     * @param profileId the id of the profile to search for
     * @param fields an optional array of strings--possible strings are 'cards', 'addresses', 'achbankaccounts', 'bacsbankaccounts', 'eftbankaccounts', 'sepabankaccounts'
     */
    getProfile(profileId: string, fields?: string[]): Promise<Profile>;
    /**
     * create a new address for a profile
     * @param profileId the id of the profile
     * @param address the address to create
     */
    createAddress(profileId: string, address: Address): Promise<Address>;
    getAddress(profileId: string, addressId: string): Promise<Address>;
    updateAddress(profileId: string, address: Address): Promise<Address>;
    createCard(profileId: string, card: Card): Promise<Card>;
    getCard(profileId: string, cardId: string): Promise<Card>;
    updateCard(profileId: string, card: Card): Promise<Card>;
    createACHBankAccount(profileId: string, achBankAccount: ACHBankAccount): Promise<ACHBankAccount>;
    createBACSBankAccount(profileId: string, bacsBankAccount: BACSBankAccount): Promise<BACSBankAccount>;
    createMandate(accountType: 'BACS' | 'SEPA', profileId: string, bankAccountId: string, mandate: Mandate): Promise<Mandate>;
    private getPath(path);
}
