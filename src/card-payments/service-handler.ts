import { Paysafe } from '../index';

import { Authorization } from './authorization';
import { Refund } from './refund';
import { Settlement } from './settlement';
import { Verification } from './verification';
import { VoidAuth } from './void-auth';

import { Pagination } from './lib/pagination';

const paths = {
  AUTHORIZATION: 'auths',
  SETTLEMENT: 'settlements',
  REFUND: 'refunds',
  VOIDAUTH: 'voidauths',
  VERIFICATION: 'verifications',
};

const searchByMerchantRefNumClasses: { [key: string]: any } = {
  Authorization,
  Settlement,
  Refund,
  VoidAuth,
  Verification,
};

export class ServiceHandler {

  constructor(private paysafe: Paysafe) { }

  /** verifies that the service is up and accessible */
  public monitor(): Promise<any> {
    return this.paysafe.get('/cardpayments/monitor');
  }

  /**
   * authorize a credit card transaction
   * @param authorization
   */
  public authorize(authorization: Authorization): Promise<Authorization> {

    return new Promise((resolve, reject) => {

      const path = this.getPath(paths.AUTHORIZATION);

      this.paysafe.post(path, authorization).then((response) => {
        if (response) {
          return resolve(new Authorization(response));
        }
        reject(new Error('empty response'));
      }).catch((err) => {
        reject(err);
      });

    });
  }

  /**
   * approve a held authorization
   * @param authorization
   */
  public approveHeldAuth(authorizationId: string): Promise<Authorization> {

    return new Promise((resolve, reject) => {

      if (typeof authorizationId === 'undefined') {
        return reject(new Error('authorizationId is undefined'));
      }

      const authorization = new Authorization();
      authorization.setStatus('COMPLETED');

      const path = this.getPath(`${paths.AUTHORIZATION}/${authorizationId}`);

      this.paysafe.put(path, authorization).then((response) => {
        if (response) {
          return resolve(new Authorization(response));
        }
        reject(new Error('empty response'));
      }).catch((err) => {
        reject(err);
      });

    });

  }

  /**
   * cancel a held authorization
   * @param authorization
   */
  public cancelHeldAuth(authorizationId: string): Promise<Authorization> {

    return new Promise((resolve, reject) => {

      if (typeof authorizationId === 'undefined') {
        return reject(new Error('authorizationId is undefined'));
      }

      const authorization = new Authorization();
      authorization.setStatus('CANCELLED');

      const path = this.getPath(`${paths.AUTHORIZATION}/${authorizationId}`);

      this.paysafe.put(path, authorization).then((response) => {
        if (response) {
          return resolve(new Authorization(response));
        }
        reject(new Error('empty response'));
      }).catch((err) => {
        reject(err);
      });

    });

  }

  /**
   * reverse an authorization
   * @param authorizationReversal
   */
  public void(authorizationId: string, voidAuth: VoidAuth): Promise<VoidAuth> {

    return new Promise((resolve, reject) => {

      if (typeof authorizationId === 'undefined') {
        return reject(new Error('authorizationId is undefined'));
      }

      if (typeof voidAuth === 'undefined') {
        return reject(new Error('voidAuth is undefined'));
      }

      const path = this.getPath(`${paths.AUTHORIZATION}/${authorizationId}/${paths.VOIDAUTH}`);

      this.paysafe.post(path, voidAuth).then((response) => {
        if (response) {
          return resolve(new VoidAuth(response));
        }
        reject(new Error('empty response'));
      }).catch((err) => {
        reject(err);
      });

    });

  }

  /**
   * settle
   * @param settlement
   */
  public settle(authorizationId: string, settlement: Settlement): Promise<Settlement> {

    return new Promise((resolve, reject) => {

      if (typeof authorizationId === 'undefined') {
        return reject(new Error('authorizationId is undefined'));
      }

      if (typeof settlement === 'undefined') {
        return reject(new Error('settlement is undefined'));
      }

      const path = this.getPath(`${paths.AUTHORIZATION}/${authorizationId}/${paths.SETTLEMENT}`);

      this.paysafe.post(path, settlement).then((response) => {
        if (response) {
          return resolve(new Settlement(response));
        }
        reject(new Error('empty response'));
      }).catch((err) => {
        reject(err);
      });

    });

  }

  /**
   * cancel a settlement
   * @param settlement
   */
  public cancelSettlement(settlementId: string): Promise<Settlement> {
    return new Promise((resolve, reject) => {

      if (typeof settlementId === 'undefined') {
        return reject(new Error('settlementId is undefined'));
      }

      const settlement = new Settlement();
      settlement.setStatus('CANCELLED');

      const path = this.getPath(`${paths.SETTLEMENT}/${settlementId}`);

      this.paysafe.put(path, settlement).then((response) => {
        if (response) {
          return resolve(new Settlement(response));
        }
        reject(new Error('empty response'));
      }).catch((err) => {
        reject(err);
      });

    });

  }

  /**
   * refund a credit card
   * @param refund
   */
  public refund(settlementId: string, refund: Refund): Promise<Refund> {

    return new Promise((resolve, reject) => {

      if (typeof settlementId === 'undefined') {
        return reject(new Error('settlementId is undefined'));
      }

      if (typeof refund === 'undefined') {
        return reject(new Error('refund is undefined'));
      }

      const path = this.getPath(`${paths.SETTLEMENT}/${settlementId}/${paths.REFUND}`);

      this.paysafe.post(path, refund).then((response) => {
        if (response) {
          return resolve(new Refund(response));
        }
        reject(new Error('empty response'));
      }).catch((err) => {
        reject(err);
      });

    });

  }

  /**
   * cancel a refund
   * @param refund
   */
  public cancelRefund(refundId: string): Promise<Refund> {

    return new Promise((resolve, reject) => {

      if (typeof refundId === 'undefined') {
        return reject(new Error('refundId is undefined'));
      }

      const refund = new Refund();
      refund.setStatus('CANCELLED');

      const path = this.getPath(`${paths.REFUND}/${refundId}`);

      this.paysafe.post(path, refund).then((response) => {
        if (response) {
          return resolve(new Refund(response));
        }
        reject(new Error('empty response'));
      }).catch((err) => {
        reject(err);
      });

    });

  }

  /**
   * retreive an authorization
   * @param authorization
   */
  public getAuth(authorizationId: string): Promise<Authorization> {

    return new Promise((resolve, reject) => {

      if (typeof authorizationId === 'undefined') {
        return reject(new Error('authorizationId undefined'));
      }

      const path = this.getPath(`${paths.AUTHORIZATION}/${authorizationId}`);

      this.paysafe.get<Authorization>(path).then((response) => {
        if (response) {
          return resolve(new Authorization(response));
        }
        reject(new Error('empty response'));
      }).catch((err) => {
        reject(err);
      });

    });

  }

  /**
   * retrieve an authorization reversal
   * @param authorizationReversal
   */
  public getVoid(voidAuthId: string): Promise<VoidAuth> {

    return new Promise((resolve, reject) => {

      if (typeof voidAuthId === 'undefined') {
        return reject(new Error('voidAuthId is undefined'));
      }

      const path = this.getPath(`${paths.VOIDAUTH}/${voidAuthId}`);

      this.paysafe.get<VoidAuth>(path).then((response) => {
        if (response) {
          return resolve(new VoidAuth(response));
        }
        reject(new Error('empty response'));
      }).catch((err) => {
        reject(err);
      });

    });

  }

  /**
   * prepares a query string for searches by merchantRefNum
   * @param merchObj
   * @param pagination
   */
  public searchMerchantRefCommon(merchObj: any, pagination: Pagination) {
    if (typeof merchObj.merchantRefNum === 'undefined') {
      throw new Error('merchObj.merchantRefNum is undefined');
    }
    let toInclude = 'merchantRefNum=' + merchObj.merchantRefNum;
    if (pagination) {
      if (pagination.getLimit()) {
        toInclude += '&limit=' + pagination.getLimit();
      }
      if (pagination.getOffset()) {
        toInclude += '&offset=' + pagination.getOffset();
      }
      if (pagination.getStartDate()) {
        toInclude += '&startDate=' + pagination.getStartDate();
      }
      if (pagination.getEndDate()) {
        toInclude += '&endDate=' + pagination.getEndDate();
      }
    }
    return toInclude;
  }

  /**
   * Find all entities of a particular type by their merchant reference number.
   * E.g., pass in an Authorization to find Authorizations.
   * @param merchObj
   * @param pagination
   */
  public searchByMerchantRef(merchObj: any, pagination: Pagination): Promise<any> {

    return new Promise((resolve, reject) => {

      if (typeof (merchObj as any).merchantRefNum === 'undefined') {
        return reject(new Error());
      }

      const className = merchObj.constructor.name;
      const searchPath = (paths as any)[className.toUpperCase()] as string;
      if (typeof searchPath === 'undefined') {
        return reject(new Error());
      }

      let toInclude: string;
      try {
        toInclude = this.searchMerchantRefCommon(merchObj, pagination);
      } catch (err) {
        return reject(err);
      }

      const path = this.getPath(searchPath + '?' + toInclude);

      this.paysafe.get(path).then((response) => {
        if (response) {
          return resolve(new searchByMerchantRefNumClasses[className](response));
        }
        reject(new Error('empty response'));
      }).catch((err) => {
        reject(err);
      });

    });

  }

  public getSettlement(settlementId: string): Promise<Settlement> {

    return new Promise((resolve, reject) => {

      if (typeof settlementId === 'undefined') {
        return reject(new Error('settlemntId is undefined'));
      }

      const path = this.getPath(`${paths.SETTLEMENT}/${settlementId}`);

      this.paysafe.get<Settlement>(path).then((response) => {
        if (response) {
          return resolve(new Settlement(response));
        }
        reject(new Error('empty response'));
      }).catch((err) => {
        reject(err);
      });

    });

  }

  public getRefund(refundId: string): Promise<Refund> {

    return new Promise((resolve, reject) => {

      if (typeof refundId === 'undefined') {
        return reject(new Error('refundId is undefined'));
      }

      const path = this.getPath(`${paths.REFUND}/${refundId}`);

      this.paysafe.get<Refund>(path).then((response) => {
        if (response) {
          return resolve(new Refund(response));
        }
        reject(new Error('empty response'));
      }).catch((err) => {
        reject(err);
      });

    });

  }

  public verify(verification: Verification): Promise<Verification> {

    return new Promise((resolve, reject) => {

      const path = this.getPath(paths.VERIFICATION);

      this.paysafe.post(path, verification).then((response) => {

        if (response) {
          return resolve(new Verification(response));
        }
        reject(new Error('empty response'));
      }).catch((err) => {
        reject(err);
      });

    });

  }

  public getVerification(verificationId: string): Promise<Verification> {

    return new Promise((resolve, reject) => {

      if (typeof verificationId === 'undefined') {
        return reject(new Error('verificationId is undefined'));
      }

      const path = this.getPath(`${paths.VERIFICATION}/${verificationId}`);

      this.paysafe.get<Verification>(path).then((response) => {
        if (response) {
          return resolve(new Verification(response));
        }
        reject(new Error('empty response'));
      }).catch((err) => {
        reject(err);
      });

    });

  }

  private getPath(path: string) {
    return '/cardpayments/v1/accounts/' + this.paysafe.getAccountNumber() + '/' + path;
  }

}
