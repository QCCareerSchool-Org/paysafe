import { Paysafe } from '../index';

import { Address } from './address';
import { Card } from './card';
import { Profile } from './profile';

const paths = {
  PROFILE: 'profiles',
  ADDRESS: 'addresses',
  CARD: 'cards',
  ACH_BANK_ACCOUNT: 'achbankaccounts',
  BACS_BANK_ACCOUNT: 'bacsbankaccounts',
  SEPA_BANK_ACCOUNT: 'sepabankaccounts',
  EFT_BANK_ACCOUNT: 'eftbankaccounts',
  MANDATE: 'mandates',
};

function createQuerystring(fields: string[]) {
  if (!fields.length) {
    return '';
  }
  return '?fields=' + fields.join(',');
}

export class ServiceHandler {

  constructor(private paysafe: Paysafe) { }

  /** verifies that the service is up and accessible */
  public monitor(): Promise<any> {
    return this.paysafe.get('/customervault/monitor');
  }

  /**
   * create a new profile
   * @param profile the profile to create
   */
  public createProfile(profile: Profile): Promise<Profile> {

    return new Promise((resolve, reject) => {

      const path = this.getPath(paths.PROFILE);

      this.paysafe.post(path, profile).then((response) => {
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

      const path = this.getPath(`${paths.PROFILE}/${profileId}${querystring}`);

      this.paysafe.get<Profile>(path).then((response) => {
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

      const path = this.getPath(`${paths.PROFILE}/${profileId}/${paths.ADDRESS}`);

      this.paysafe.post(path, address).then((response) => {
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

      const path = this.getPath(`${paths.PROFILE}/${profileId}/${paths.CARD}`);

      this.paysafe.post(path, card).then((response) => {
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

      const path = this.getPath(`${paths.PROFILE}/${profileId}/${paths.CARD}/${cardId}`);

      this.paysafe.get<Card>(path).then((response) => {
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

      const path = this.getPath(`${paths.PROFILE}/${profileId}/${paths.CARD}/${cardId}`);

      this.paysafe.put(path, card).then((response) => {
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

      const path = this.getPath(`${paths.PROFILE}/${profileId}/${paths.ADDRESS}/${addressId}`);

      this.paysafe.get<Address>(path).then((response) => {
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

      const path = this.getPath(`${paths.PROFILE}/${profileId}/${paths.ADDRESS}/${addressId}`);

      this.paysafe.put(path, address).then((response) => {
        if (response) {
          return resolve(new Address(response));
        }
        reject(new Error('empty response'));
      }).catch((err) => {
        reject(err);
      });
    });

  }

  private getPath(path: string) {
    return '/customervault/v1/' + path;
  }

}
