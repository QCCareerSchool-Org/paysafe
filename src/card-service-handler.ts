import { Authorization, statusType as authorizationStatusType } from './cardpayments/authorization';
import { Pagination } from './cardpayments/lib/pagination';
import { Refund } from './cardpayments/refund';
import { Settlement, statusType as settlementStatusType } from './cardpayments/settlement';
import { Verification } from './cardpayments/verification';
import { VoidAuth } from './cardpayments/void-auth';
import { PaysafeAPIClient } from './paysafe-api-client';

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

export class CardServiceHandler {

  constructor(private paysafeApiClient: PaysafeAPIClient) {
  }

  /** verifies that the service is up and accessible */
  public monitor(): Promise<any> {
    return this.paysafeApiClient.get(this.paysafeApiClient.getEnvironment().host + '/cardpayments/monitor');
  }

  /**
   * authorize a credit card transaction
   * @param authorization
   */
  public authorize(authorization: Authorization): Promise<Authorization> {

    return new Promise((resolve, reject) => {

      const uri = this.getURI(paths.AUTHORIZATION);

      this.paysafeApiClient.post(uri, authorization).then((response) => {
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

      const uri = this.getURI(`${paths.AUTHORIZATION}/${authorizationId}`);

      this.paysafeApiClient.put(uri, authorization).then((response) => {
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

      const uri = this.getURI(`${paths.AUTHORIZATION}/${authorizationId}`);

      this.paysafeApiClient.put(uri, authorization).then((response) => {
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

      const uri = this.getURI(`${paths.AUTHORIZATION}/${authorizationId}/${paths.VOIDAUTH}`);

      this.paysafeApiClient.post(uri, voidAuth).then((response) => {
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

      const uri = this.getURI(`${paths.AUTHORIZATION}/${authorizationId}/${paths.SETTLEMENT}`);

      this.paysafeApiClient.post(uri, settlement).then((response) => {
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

      const uri = this.getURI(`${paths.SETTLEMENT}/${settlementId}`);

      this.paysafeApiClient.put(uri, settlement).then((response) => {
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

      const uri = this.getURI(`${paths.SETTLEMENT}/${settlementId}/${paths.REFUND}`);

      this.paysafeApiClient.post(uri, refund).then((response) => {
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

      const uri = this.getURI(`${paths.REFUND}/${refundId}`);

      this.paysafeApiClient.post(uri, refund).then((response) => {
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

      const uri = this.getURI(`${paths.AUTHORIZATION}/${authorizationId}`);

      this.paysafeApiClient.get<Authorization>(uri).then((response) => {
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

      const uri = this.getURI(`${paths.VOIDAUTH}/${voidAuthId}`);

      this.paysafeApiClient.get<VoidAuth>(uri).then((response) => {
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

      const uri = this.getURI(searchPath + '?' + toInclude);

      this.paysafeApiClient.get(uri).then((response) => {
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

      const uri = this.getURI(`${paths.SETTLEMENT}/${settlementId}`);

      this.paysafeApiClient.get<Settlement>(uri).then((response) => {
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

      const uri = this.getURI(`${paths.REFUND}/${refundId}`);

      this.paysafeApiClient.get<Refund>(uri).then((response) => {
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

      const uri = this.getURI(paths.VERIFICATION);

      this.paysafeApiClient.post(uri, verification).then((response) => {
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

      const uri = this.getURI(`${paths.VERIFICATION}/${verificationId}`);

      this.paysafeApiClient.get<Verification>(uri).then((response) => {
        if (response) {
          return resolve(new Verification(response));
        }
        reject(new Error('empty response'));
      }).catch((err) => {
        reject(err);
      });

    });

  }

  private getURI(path: string) {
    return this.paysafeApiClient.getEnvironment().host + '/cardpayments/v1/accounts/' + this.paysafeApiClient.getAccountNumber() + '/' + path;
  }

}
