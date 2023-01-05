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
     *
     * Note: You must provide all of the elements of the profile when you are updating it,
     * including the elements that are not changing. Elements that are part of an existing
     * profile but that are not included in the update request will be set to null in the
     * resulting profile, with the exception of the status element.
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
    updateAddress(profileId: string, addressId: string, address: Address): Promise<Address>;
    createCard(profileId: string, card: Card): Promise<Card>;
    getCard(profileId: string, cardId: string): Promise<Card>;
    updateCard(profileId: string, cardId: string, card: Card): Promise<Card>;
    createACHBankAccount(profileId: string, achBankAccount: ACHBankAccount): Promise<ACHBankAccount>;
    createBACSBankAccount(profileId: string, bacsBankAccount: BACSBankAccount): Promise<BACSBankAccount>;
    createMandate(accountType: 'BACS' | 'SEPA', profileId: string, bankAccountId: string, mandate: Mandate): Promise<Mandate>;
    private getPath;
}
