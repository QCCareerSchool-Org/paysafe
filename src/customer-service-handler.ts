import { PaysafeAPIClient } from './paysafe-api-client';

import { Address } from './customervault/address';
import { Card } from './customervault/card';
import { Profile } from './customervault/profile';
import { PaysafeError } from './paysafe-error';

const paths = {
  PROFILE: '/profiles',
  ADDRESS: '/addresses',
  CARD: '/cards',
  ACH_BANK_ACCOUNT: '/achbankaccounts',
  BACS_BANK_ACCOUNT: '/bacsbankaccounts',
  SEPA_BANK_ACCOUNT: '/sepabankaccounts',
  EFT_BANK_ACCOUNT: '/eftbankaccounts',
  MANDATE: '/mandates',
};

function createQuerystring(fields: string[]) {
  if (!fields.length) {
    return '';
  }
  return '?fields=' + fields.join(',');
}

export class CustomerServiceHandler {

  private paysafeApiClient: PaysafeAPIClient;

  constructor(p: PaysafeAPIClient) {
    this.paysafeApiClient = p;
  }

  /** verifies that the service is up and accessible */
  public monitor(): Promise<any> {
    return this.paysafeApiClient.get(this.paysafeApiClient.getEnvironment().host + '/customervault/monitor');
  }

  /**
   * create a new profile
   * @param profile the profile to create
   */
  public createProfile(profile: Profile): Promise<Profile> {

    return new Promise((resolve, reject) => {

      const uri = this.getURI(paths.PROFILE);

      this.paysafeApiClient.post(uri, profile).then((response) => {
        if (response) {
          return resolve(new Profile(response));
        }
        reject(new Error('empty response'));
      }).catch((err) => {
        reject(err);
      });
    });

  }

  /**
   * retrieve a profile
   * @param profile the profile to search for--must include id
   * @param fields an optional array of strings--possible strings are 'cards', 'addresses', 'achbankaccounts', 'bacsbankaccounts', 'eftbankaccounts', 'sepabankaccounts'
   */
  public getProfile(profileId: string, fields?: string[]): Promise<Profile> {

    return new Promise((resolve, reject) => {

      if (typeof profileId === 'undefined') {
        throw new Error('profileId is undefined');
      }

      const querystring = typeof fields !== 'undefined' ? createQuerystring(fields) : '';

      const uri = this.getURI(`${paths.PROFILE}/${profileId}${querystring}`);

      this.paysafeApiClient.get<Profile>(uri).then((response) => {
        if (response) {
          return resolve(new Profile(response));
        }
        reject(new Error('empty response'));
      }).catch((err) => {
        reject(err);
      });
    });

  }

  /**
   * create a new address for a profile
   * @param address the address to create--must have a profile, which must have an id
   */
  public createAddress(profileId: string, address: Address): Promise<Address> {

    return new Promise((resolve, reject) => {

      if (typeof profileId === 'undefined') {
        throw new Error('profileId is undefined');
      }

      if (typeof address === 'undefined') {
        throw new Error('address is undefined');
      }

      const uri = this.getURI(`${paths.PROFILE}/${profileId}/${paths.ADDRESS}`);

      this.paysafeApiClient.post(uri, address).then((response) => {
        if (response) {
          return resolve(new Address(response));
        }
        reject(new Error('empty response'));
      }).catch((err) => {
        reject(err);
      });
    });

  }

  public createCard(profileId: string, card: Card): Promise<Card> {
    return new Promise((resolve, reject) => {

      if (typeof profileId === 'undefined') {
        throw new Error('profileId undefined');
      }

      if (typeof card === 'undefined') {
        throw new Error('card is undefined');
      }

      const uri = this.getURI(`${paths.PROFILE}/${profileId}/${paths.CARD}`);

      this.paysafeApiClient.post(uri, card).then((response) => {
        if (response) {
          return resolve(new Card(response));
        }
        reject(new Error('empty response'));
      }).catch((err) => {
        reject(err);
      });
    });
  }

  public getCard(profileId: string, cardId: string): Promise<Card> {

    return new Promise((resolve, reject) => {

      if (typeof profileId === 'undefined') {
        throw new Error('profileId is undefined');
      }

      if (typeof cardId === 'undefined') {
        throw new Error('cardId is undefined');
      }

      const uri = this.getURI(`${paths.PROFILE}/${profileId}/${paths.CARD}/${cardId}`);

      this.paysafeApiClient.get<Card>(uri).then((response) => {
        if (response) {
          return resolve(new Card(response));
        }
        reject(new Error('empty response'));
      }).catch((err) => {
        reject(err);
      });
    });

  }

  public updateCard(profileId: string, card: Card): Promise<Card> {

    return new Promise((resolve, reject) => {

      if (typeof profileId === 'undefined') {
        throw new Error('profile id is undefined');
      }

      const cardId = card.getId();
      if (typeof cardId === 'undefined') {
        throw new Error('card.id is undefined');
      }

      const uri = this.getURI(`${paths.PROFILE}/${profileId}/${paths.CARD}/${cardId}`);

      this.paysafeApiClient.put(uri, card).then((response) => {
        if (response) {
          return resolve(new Card(response));
        }
        reject(new Error('empty response'));
      }).catch((err) => {
        reject(err);
      });
    });

  }

  public getAddress(profileId: string, addressId: string): Promise<Address> {

    return new Promise((resolve, reject) => {

      if (typeof profileId === 'undefined') {
        throw new Error('profileId is undefined');
      }

      if (typeof addressId === 'undefined') {
        throw new Error('addressId is undefined');
      }

      const uri = this.getURI(`${paths.PROFILE}/${profileId}/${paths.ADDRESS}/${addressId}`);

      this.paysafeApiClient.get<Address>(uri).then((response) => {
        if (response) {
          return resolve(new Address(response));
        }
        reject(new Error('empty response'));
      }).catch((err) => {
        reject(err);
      });
    });

  }

  public updateAddress(profileId: string, address: Address): Promise<Address> {

    return new Promise((resolve, reject) => {

      if (typeof profileId === 'undefined') {
        throw new Error('profile id is undefined');
      }

      const addressId = address.getId();
      if (typeof addressId === 'undefined') {
        throw new Error('address.id is undefined');
      }

      const uri = this.getURI(`${paths.PROFILE}/${profileId}/${paths.ADDRESS}/${addressId}`);

      this.paysafeApiClient.put(uri, address).then((response) => {
        if (response) {
          return resolve(new Address(response));
        }
        reject(new Error('empty response'));
      }).catch((err) => {
        reject(err);
      });
    });

  }

  private getURI(path: string) {
    return this.paysafeApiClient.getEnvironment().host + '/customervault/v1/' + path;
  }

}
