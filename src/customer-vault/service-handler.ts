import { Paysafe } from '../index';
import { ACHBankAccount } from './ach-bank-account';
import { Address } from './address';
import { BACSBankAccount } from './bacs-bank-account';
import { Card } from './card';
import { Mandate } from './mandate';
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

  constructor(private readonly paysafe: Paysafe) { /* empty */ }

  /** verifies that the service is up and accessible */
  public async monitor(): Promise<any> {
    return this.paysafe.get('/customervault/monitor');
  }

  /**
   * create a new profile
   * @param profile the profile to create
   */
  public async createProfile(profile: Profile): Promise<Profile> {

    return new Promise((resolve, reject) => {

      if (typeof profile === 'undefined') {
        return reject(new Error('profile is undefined'));
      }

      const path = this.getPath(paths.PROFILE);

      this.paysafe.post(path, profile).then(response => {
        if (response) {
          return resolve(new Profile(response));
        }
        reject(new Error('empty response'));
      }).catch(err => {
        reject(err);
      });
    });

  }

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
  public async updateProfile(profileId: string, profile: Profile): Promise<Profile> {

    return new Promise((resolve, reject) => {

      if (typeof profileId === 'undefined') {
        return reject(new Error('profileId is undefined'));
      }

      if (typeof profile === 'undefined') {
        return reject(new Error('profile is undefined'));
      }

      const path = this.getPath(`${paths.PROFILE}/${profileId}`);

      this.paysafe.put(path, profile).then(response => {
        if (response) {
          return resolve(new Profile(response));
        }
        reject(new Error('empty response'));
      }).catch(err => {
        reject(err);
      });
    });

  }

  /**
   * retrieve a profile
   * @param profileId the id of the profile to search for
   * @param fields an optional array of strings--possible strings are 'cards', 'addresses', 'achbankaccounts', 'bacsbankaccounts', 'eftbankaccounts', 'sepabankaccounts'
   */
  public async getProfile(profileId: string, fields?: string[]): Promise<Profile> {

    return new Promise((resolve, reject) => {

      if (typeof profileId === 'undefined') {
        return reject(new Error('profileId is undefined'));
      }

      const querystring = typeof fields !== 'undefined' ? createQuerystring(fields) : '';

      const path = this.getPath(`${paths.PROFILE}/${profileId}${querystring}`);

      this.paysafe.get<Profile>(path).then(response => {
        if (response) {
          return resolve(new Profile(response));
        }
        reject(new Error('empty response'));
      }).catch(err => {
        reject(err);
      });
    });

  }

  /**
   * create a new address for a profile
   * @param profileId the id of the profile
   * @param address the address to create
   */
  public async createAddress(profileId: string, address: Address): Promise<Address> {

    return new Promise((resolve, reject) => {

      if (typeof profileId === 'undefined') {
        return reject(new Error('profileId is undefined'));
      }

      if (typeof address === 'undefined') {
        return reject(new Error('address is undefined'));
      }

      const path = this.getPath(`${paths.PROFILE}/${profileId}/${paths.ADDRESS}`);

      this.paysafe.post(path, address).then(response => {
        if (response) {
          return resolve(new Address(response));
        }
        reject(new Error('empty response'));
      }).catch(err => {
        reject(err);
      });
    });

  }

  public async getAddress(profileId: string, addressId: string): Promise<Address> {

    return new Promise((resolve, reject) => {

      if (typeof profileId === 'undefined') {
        return reject(new Error('profileId is undefined'));
      }

      if (typeof addressId === 'undefined') {
        return reject(new Error('addressId is undefined'));
      }

      const path = this.getPath(`${paths.PROFILE}/${profileId}/${paths.ADDRESS}/${addressId}`);

      this.paysafe.get<Address>(path).then(response => {
        if (response) {
          return resolve(new Address(response));
        }
        reject(new Error('empty response'));
      }).catch(err => {
        reject(err);
      });
    });

  }

  public async updateAddress(profileId: string, addressId: string, address: Address): Promise<Address> {

    return new Promise((resolve, reject) => {

      if (typeof profileId === 'undefined') {
        return reject(new Error('profileId is undefined'));
      }

      if (typeof addressId === 'undefined') {
        return reject(new Error('addressId is undefined'));
      }

      if (typeof address === 'undefined') {
        return reject(new Error('address is undefined'));
      }

      const path = this.getPath(`${paths.PROFILE}/${profileId}/${paths.ADDRESS}/${addressId}`);

      this.paysafe.put(path, address).then(response => {
        if (response) {
          return resolve(new Address(response));
        }
        reject(new Error('empty response'));
      }).catch(err => {
        reject(err);
      });
    });

  }

  public async createCard(profileId: string, card: Card): Promise<Card> {
    return new Promise((resolve, reject) => {

      if (typeof profileId === 'undefined') {
        return reject(new Error('profileId undefined'));
      }

      if (typeof card === 'undefined') {
        return reject(new Error('card is undefined'));
      }

      const path = this.getPath(`${paths.PROFILE}/${profileId}/${paths.CARD}`);

      this.paysafe.post(path, card).then(response => {
        if (response) {
          return resolve(new Card(response));
        }
        reject(new Error('empty response'));
      }).catch(err => {
        reject(err);
      });
    });

  }

  public async getCard(profileId: string, cardId: string): Promise<Card> {

    return new Promise((resolve, reject) => {

      if (typeof profileId === 'undefined') {
        return reject(new Error('profileId is undefined'));
      }

      if (typeof cardId === 'undefined') {
        return reject(new Error('cardId is undefined'));
      }

      const path = this.getPath(`${paths.PROFILE}/${profileId}/${paths.CARD}/${cardId}`);

      this.paysafe.get<Card>(path).then(response => {
        if (response) {
          return resolve(new Card(response));
        }
        reject(new Error('empty response'));
      }).catch(err => {
        reject(err);
      });
    });

  }

  public async updateCard(profileId: string, cardId: string, card: Card): Promise<Card> {

    return new Promise((resolve, reject) => {

      if (typeof profileId === 'undefined') {
        return reject(new Error('profileId is undefined'));
      }

      if (typeof cardId === 'undefined') {
        return reject(new Error('cardId is undefined'));
      }

      if (typeof card === 'undefined') {
        return reject(new Error('card is undefined'));
      }

      const path = this.getPath(`${paths.PROFILE}/${profileId}/${paths.CARD}/${cardId}`);

      this.paysafe.put(path, card).then(response => {
        if (response) {
          return resolve(new Card(response));
        }
        reject(new Error('empty response'));
      }).catch(err => {
        reject(err);
      });
    });

  }

  public async createACHBankAccount(profileId: string, achBankAccount: ACHBankAccount): Promise<ACHBankAccount> {

    return new Promise((resolve, reject) => {

      if (typeof profileId === 'undefined') {
        return reject(new Error('profileId is undefined'));
      }

      if (typeof achBankAccount === 'undefined') {
        return reject(new Error('achBankAccount is undefined'));
      }

      const path = this.getPath(`${paths.PROFILE}/${profileId}/${paths.ACH_BANK_ACCOUNT}`);

      this.paysafe.post(path, achBankAccount).then(response => {
        if (response) {
          return resolve(new ACHBankAccount(response));
        }
        reject(new Error('empty response'));
      }).catch(err => {
        reject(err);
      });
    });

  }

  public async createBACSBankAccount(profileId: string, bacsBankAccount: BACSBankAccount): Promise<BACSBankAccount> {

    return new Promise((resolve, reject) => {

      if (typeof profileId === 'undefined') {
        return reject(new Error('profileId is undefined'));
      }

      if (typeof bacsBankAccount === 'undefined') {
        return reject(new Error('bacsBankAccount is undefined'));
      }

      const path = this.getPath(`${paths.PROFILE}/${profileId}/${paths.BACS_BANK_ACCOUNT}`);

      this.paysafe.post(path, bacsBankAccount).then(response => {
        if (response) {
          return resolve(new BACSBankAccount(response));
        }
        reject(new Error('empty response'));
      }).catch(err => {
        reject(err);
      });
    });

  }

  public async createMandate(accountType: 'BACS' | 'SEPA', profileId: string, bankAccountId: string, mandate: Mandate): Promise<Mandate> {

    return new Promise((resolve, reject) => {

      if (typeof accountType === 'undefined') {
        return reject(new Error('accountType id is undefined'));
      }

      if (typeof profileId === 'undefined') {
        return reject(new Error('profileId is undefined'));
      }

      if (typeof bankAccountId === 'undefined') {
        return reject(new Error('bankAccountid is undefined'));
      }

      if (typeof mandate === 'undefined') {
        return reject(new Error('mandate is undefined'));
      }

      let path: string;
      if (accountType === 'BACS') {
        path = this.getPath(`${paths.PROFILE}/${profileId}/${paths.BACS_BANK_ACCOUNT}/${bankAccountId}/mandates`);
      } else if (accountType === 'SEPA') {
        path = this.getPath(`${paths.PROFILE}/${profileId}/${paths.SEPA_BANK_ACCOUNT}/${bankAccountId}/mandates`);
      } else {
        return reject(new Error('invalid accountType'));
      }

      this.paysafe.post(path, mandate).then(response => {
        if (response) {
          return resolve(new Mandate(response));
        }
        reject(new Error('empty response'));
      }).catch(err => {
        reject(err);
      });
    });

  }

  private getPath(path: string) {
    return '/customervault/v1/' + path;
  }

}
