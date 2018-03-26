import * as Constants from './constants';
import { PaysafeAPIClient } from './paysafe-api-client';
import { PaysafeRequest } from './paysafe-request';

import { Card } from './cardpayments/card';
import { Address } from './customervault/address';
import { Profile } from './customervault/profile';
import { PaysafeError } from './paysafe-error';

const HEALTH_BEAT_URL = 'customervault/monitor';
const URI = 'customervault/v1';

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

function prepareURI(path: string, paysafeClient: PaysafeAPIClient) {
  return URI + path;
}

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
    const requestObj = new PaysafeRequest(HEALTH_BEAT_URL, Constants.GET);
    return this.paysafeApiClient.processRequest(requestObj);
  }

  /**
   * create a new profile
   * @param profile the profile to create
   */
  public createProfile(profile: Profile): Promise<Profile> {

    return new Promise((resolve, reject) => {

      const requestObj = new PaysafeRequest(prepareURI(paths.PROFILE, this.paysafeApiClient), Constants.POST);

      this.paysafeApiClient.processRequest(requestObj, profile).then((response) => {
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
  public getProfile(profile: Profile, fields?: string[]): Promise<Profile> {

    return new Promise((resolve, reject) => {

      if (typeof profile === 'undefined') {
        throw new Error('profile is undefined');
      }

      const profileId = profile.getId();
      if (typeof profileId === 'undefined') {
        throw new Error('profile.id is undefined');
      }

      const querystring = typeof fields !== 'undefined' ? createQuerystring(fields) : '';

      const requestObj = new PaysafeRequest(prepareURI(`${paths.PROFILE}/${profileId}${querystring}`, this.paysafeApiClient), Constants.GET);

      this.paysafeApiClient.processRequest(requestObj, profile).then((response) => {
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
  public createAddress(address: Address): Promise<Address> {

    return new Promise((resolve, reject) => {

      if (typeof address === 'undefined') {
        throw new Error('address is undefined');
      }

      const profile = address.getProfile();
      if (typeof profile === 'undefined') {
        throw new Error('address.profile is undefined');
      }

      const profileId = profile.getId();
      if (typeof profileId === 'undefined') {
        throw new Error('address.profile.id is undefined');
      }

      address.deleteProfile();

      const requestObj = new PaysafeRequest(prepareURI(`${paths.PROFILE}/${profileId}${paths.ADDRESS}`, this.paysafeApiClient), Constants.POST);

      this.paysafeApiClient.processRequest(requestObj, address).then((response) => {
        if (response) {
          return resolve(new Address(response));
        }
        reject(new Error('empty response'));
      }).catch((err) => {
        reject(err);
      });
    });

  }

  public createCard(card: Card): Promise<Card> {
    return new Promise((resolve, reject) => {

      if (typeof card === 'undefined') {
        throw new Error('card is undefined');
      }

      const profile = card.getProfile();
      if (typeof profile === 'undefined') {
        throw new Error('card.profile is undefined');
      }

      const profileId = profile.getId();
      if (typeof profileId === 'undefined') {
        throw new Error('card.profile.id is undefined');
      }

      card.deleteProfile();

      const requestObj = new PaysafeRequest(prepareURI(`${paths.PROFILE}/${profileId}${paths.CARD}`, this.paysafeApiClient), Constants.POST);

      this.paysafeApiClient.processRequest(requestObj, card).then((response) => {
        if (response) {
          return resolve(new Card(response));
        }
        reject(new Error('empty response'));
      }).catch((err) => {
        reject(err);
      });
    });
  }

  public getCard(card: Card): Promise<Card> {

    return new Promise((resolve, reject) => {

      const cardId = card.getId();
      if (typeof cardId === 'undefined') {
        throw new Error('card id is missing');
      }

      const profile = card.getProfile();
      if (typeof profile === 'undefined') {
        throw new Error('profile is missing');
      }

      const profileId = profile.getId();
      if (typeof profileId === 'undefined') {
        throw new Error('profile id is missing');
      }

      card.deleteProfile();

      const requestObj = new PaysafeRequest(prepareURI(`${paths.PROFILE}/${profileId}${paths.CARD}/${cardId}`, this.paysafeApiClient), Constants.GET);

      this.paysafeApiClient.processRequest<Card>(requestObj).then((response) => {
        if (response) {
          return resolve(new Card(response));
        }
        reject(new Error('empty response'));
      }).catch((err) => {
        reject(err);
      });
    });

  }

  public updateCard(card: Card): Promise<Card> {

    return new Promise((resolve, reject) => {

      const cardId = card.getId();
      if (typeof cardId === 'undefined') {
        throw new Error('card id is missing');
      }

      const profile = card.getProfile();
      if (typeof profile === 'undefined') {
        throw new Error('profile is missing');
      }

      const profileId = profile.getId();
      if (typeof profileId === 'undefined') {
        throw new Error('profile id is missing');
      }

      card.deleteProfile();

      const requestObj = new PaysafeRequest(prepareURI(`${paths.PROFILE}/${profileId}${paths.CARD}/${cardId}`, this.paysafeApiClient), Constants.PUT);

      this.paysafeApiClient.processRequest(requestObj, card).then((response) => {
        if (response) {
          return resolve(new Card(response));
        }
        reject(new Error('empty response'));
      }).catch((err) => {
        reject(err);
      });
    });

  }

}
