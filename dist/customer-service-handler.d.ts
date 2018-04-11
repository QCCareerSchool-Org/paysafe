import { PaysafeAPIClient } from './paysafe-api-client';
import { Address } from './customervault/address';
import { Card } from './customervault/card';
import { Profile } from './customervault/profile';
export declare class CustomerServiceHandler {
    private paysafeApiClient;
    constructor(p: PaysafeAPIClient);
    /** verifies that the service is up and accessible */
    monitor(): Promise<any>;
    /**
     * create a new profile
     * @param profile the profile to create
     */
    createProfile(profile: Profile): Promise<Profile>;
    /**
     * retrieve a profile
     * @param profile the profile to search for--must include id
     * @param fields an optional array of strings--possible strings are 'cards', 'addresses', 'achbankaccounts', 'bacsbankaccounts', 'eftbankaccounts', 'sepabankaccounts'
     */
    getProfile(profileId: string, fields?: string[]): Promise<Profile>;
    /**
     * create a new address for a profile
     * @param address the address to create--must have a profile, which must have an id
     */
    createAddress(profileId: string, address: Address): Promise<Address>;
    createCard(profileId: string, card: Card): Promise<Card>;
    getCard(profileId: string, cardId: string): Promise<Card>;
    updateCard(profileId: string, card: Card): Promise<Card>;
    getAddress(profileId: string, addressId: string): Promise<Address>;
    updateAddress(profileId: string, address: Address): Promise<Address>;
    private getURI(path);
}
