import { Authorization, statusType } from './cardpayments/authorization';
import { AuthorizationReversal } from './cardpayments/authorization-reversal';
import { Pagination } from './cardpayments/pagination';
import { Refund } from './cardpayments/refund';
import { Settlement } from './cardpayments/settlement';
import { Verification } from './cardpayments/verification';
import { PaysafeAPIClient } from './paysafe-api-client';

import * as Constants from './constants';
import { PaysafeRequest } from './paysafe-request';

const HEALTH_BEAT_URL = 'cardpayments/monitor';
const URI = 'cardpayments/v1';

const paths = {
  AUTHORIZATION: '/auths',
  SETTLEMENT: '/settlements',
  REFUND: '/refunds',
  AUTHORIZATIONREVERSAL: '/voidauths',
  VERIFICATION: '/verifications',
};

const status = {
  RECEIVED: 'RECEIVED',
  PENDING: 'PENDING',
  PROCESSING: 'PROCESSING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  CANCELLED: 'CANCELLED',
};

const BAD_REQUEST = 400;

function prepareURI(path: string, paysafeClient: PaysafeAPIClient) {
  return URI + '/accounts/' + paysafeClient.getAccountNumber() + path;
}

export class CardServiceHandler {

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
   * authorize a credit card transaction
   * @param authorization
   */
  public authorize(authorization: Authorization): Promise<Authorization> {

    return new Promise((resolve, reject) => {

      const requestObj = new PaysafeRequest(prepareURI(paths.AUTHORIZATION, this.paysafeApiClient), Constants.POST);

      this.paysafeApiClient.processRequest(requestObj, authorization).then((response) => {
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
  public approveHeldAuth(authorization: Authorization): Promise<Authorization> {

    return new Promise((resolve, reject) => {
      const authorizationId = authorization.getId();
      if (typeof authorizationId === 'undefined') {
        return reject(this.paysafeApiClient.error(BAD_REQUEST, 'InvalidRequestException : Auth id is missing in CardServiceHandler : approveHeldAuth'));
      }

      authorization.deleteId();
      authorization.setStatus(status.COMPLETED as statusType);

      const requestObj = new PaysafeRequest(prepareURI(`${paths.AUTHORIZATION}/${authorizationId}`, this.paysafeApiClient), Constants.PUT);

      this.paysafeApiClient.processRequest(requestObj, authorization).then((response) => {
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
  public cancelHeldAuth(authorization: Authorization): Promise<Authorization> {

    return new Promise((resolve, reject) => {

      const authorizationId = authorization.getId();
      if (typeof authorizationId === 'undefined') {
        return reject(this.paysafeApiClient.error(BAD_REQUEST, 'InvalidRequestException : Auth id is missing in CardServiceHandler : cancelHeldAuth'));
      }

      authorization.deleteId();
      authorization.setStatus(status.CANCELLED as statusType);

      const requestObj = new PaysafeRequest(prepareURI(`${paths.AUTHORIZATION}/${authorizationId}`, this.paysafeApiClient), Constants.PUT);

      this.paysafeApiClient.processRequest(requestObj, authorization).then((response) => {
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
  public reverseAuth(authorizationReversal: AuthorizationReversal): Promise<AuthorizationReversal> {

    return new Promise((resolve, reject) => {

      const authorization = authorizationReversal.getAuthorization();
      if (typeof authorization === 'undefined') {
        return reject(this.paysafeApiClient.error(BAD_REQUEST, 'InvalidRequestException : authReversal.auth is missing in CardServiceHandler : reverseAuth'));
      }

      const authorizationId = authorization.getId();
      if (typeof authorizationId === 'undefined') {
        return reject(this.paysafeApiClient.error(BAD_REQUEST, 'InvalidRequestException : authReversal.auth.id is missing in CardServiceHandler : reverseAuth'));
      }

      authorizationReversal.deleteAuthorization();

      const requestObj = new PaysafeRequest(prepareURI(`${paths.AUTHORIZATION}/${authorizationId}/${paths.AUTHORIZATIONREVERSAL}`, this.paysafeApiClient), Constants.POST);

      this.paysafeApiClient.processRequest(requestObj, authorizationReversal).then((response) => {
        if (response) {
          return resolve(new AuthorizationReversal(response));
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
  public settlement(settlement: Settlement): Promise<Settlement> {

    return new Promise((resolve, reject) => {

      const authorization = settlement.getAuthorization();
      if (typeof authorization === 'undefined') {
        return reject(this.paysafeApiClient.error(BAD_REQUEST, 'InvalidRequestException : settle.auth is missing in CardServiceHandler : settlement'));
      }

      const authorizationId = authorization.getId();
      if (typeof authorizationId === 'undefined') {
        return reject(this.paysafeApiClient.error(BAD_REQUEST, 'InvalidRequestException : settle.auth.id is missing in CardServiceHandler : settlement'));
      }

      settlement.deleteAuthorization();

      const requestObj = new PaysafeRequest(prepareURI(`${paths.AUTHORIZATION}/${authorizationId}/${paths.SETTLEMENT}`, this.paysafeApiClient), Constants.POST);

      this.paysafeApiClient.processRequest(requestObj, settlement).then((response) => {
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
  public cancelSettlement(settlement: Settlement): Promise<Settlement> {
    return new Promise((resolve, reject) => {

      const settlementId = settlement.getId();
      if (typeof settlementId === 'undefined') {
        return reject(this.paysafeApiClient.error(BAD_REQUEST, 'InvalidRequestException : settlement id is missing in CardServiceHandler : cancelSettlement'));
      }

      settlement.deleteId();
      settlement.setStatus(status.CANCELLED);

      const requestObj = new PaysafeRequest(prepareURI(`${paths.SETTLEMENT}/${settlementId}`, this.paysafeApiClient), Constants.PUT);

      this.paysafeApiClient.processRequest(requestObj, settlement).then((response) => {
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
  public refund(refund: Refund): Promise<Refund> {

    return new Promise((resolve, reject) => {

      const settlements = refund.getSettlements();
      if (typeof settlements === 'undefined') {
        return reject(this.paysafeApiClient.error(BAD_REQUEST, 'InvalidRequestException : refund.settlement is missing in CardServiceHandler : refund'));
      }

      const settlementsId = settlements.getId();
      if (typeof settlementsId === 'undefined') {
        return reject(this.paysafeApiClient.error(BAD_REQUEST, 'InvalidRequestException : refund.settlement.id is missing in CardServiceHandler : refund'));
      }

      refund.deleteSettlements();

      const requestObj = new PaysafeRequest(prepareURI(`${paths.SETTLEMENT}/${settlementsId}/${paths.REFUND}`, this.paysafeApiClient), Constants.POST);

      this.paysafeApiClient.processRequest(requestObj, refund).then((response) => {
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
  public cancelRefund(refund: Refund): Promise<Refund> {

    return new Promise((resolve, reject) => {

      const refundId = refund.getId();
      if (typeof refundId === 'undefined') {
        return reject(this.paysafeApiClient.error(BAD_REQUEST, 'InvalidRequestException : settlement.id is missing in CardServiceHandler : cancelRefund'));
      }

      refund.deleteId();
      refund.setStatus(status.CANCELLED);

      const requestObj = new PaysafeRequest(prepareURI(`${paths.REFUND}/${refundId}`, this.paysafeApiClient), Constants.POST);

      this.paysafeApiClient.processRequest(requestObj, refund).then((response) => {
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
  public getAuth(authorization: Authorization): Promise<Authorization> {

    return new Promise((resolve, reject) => {

      const authorizationId = authorization.getId();
      if (typeof authorizationId === 'undefined') {
        return reject(this.paysafeApiClient.error(BAD_REQUEST, 'InvalidRequestException : authorization.id is missing in CardServiceHandler : getAuth'));
      }

      authorization.deleteId();

      const PaysafeRequestObj = new PaysafeRequest(prepareURI(`${paths.AUTHORIZATION}/${authorizationId}`, this.paysafeApiClient), Constants.GET);

      this.paysafeApiClient.processRequest<Authorization>(PaysafeRequestObj).then((response) => {
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
  public getAuthReversal(authorizationReversal: AuthorizationReversal): Promise<AuthorizationReversal> {

    return new Promise((resolve, reject) => {

      const authorizationReversalId = authorizationReversal.getId();
      if (typeof authorizationReversalId === 'undefined') {
        return reject(this.paysafeApiClient.error(BAD_REQUEST, 'InvalidRequestException : Reverse Auth id is missing in CardServiceHandler : getAuthReversal'));
      }

      authorizationReversal.deleteId();

      const requestObj = new PaysafeRequest(prepareURI(`${paths.AUTHORIZATIONREVERSAL}/${authorizationReversalId}`, this.paysafeApiClient), Constants.GET);
      this.paysafeApiClient.processRequest<AuthorizationReversal>(requestObj).then((response) => {
        if (response) {
          return resolve(new AuthorizationReversal(response));
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
      throw this.paysafeApiClient.error(BAD_REQUEST, 'merchObj.merchantRefNum is undefined');
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
        return reject(this.paysafeApiClient.error(BAD_REQUEST, 'InvalidRequestException : Please provide merchant ref number for search'));
      }

      const className = merchObj.constructor.name;
      const searchPath = (paths as any)[className.toUpperCase()] as string;
      if (typeof searchPath === 'undefined') {
        return reject(this.paysafeApiClient.error(BAD_REQUEST, 'InvalidClassException : Please provide valid class name for search'));
      }

      let toInclude: string;
      try {
        toInclude = this.searchMerchantRefCommon(merchObj, pagination);
      } catch (err) {
        return reject(err);
      }

      const requestObj = new PaysafeRequest(prepareURI(searchPath + '?' + toInclude, this.paysafeApiClient), Constants.GET);

      this.paysafeApiClient.processRequest(requestObj).then((response) => {
        if (response) {
          return resolve(new this.paysafeApiClient.classes[className](response));
        }
        reject(new Error('empty response'));
      }).catch((err) => {
        reject(err);
      });

    });

  }

  public getSettlement(settlement: Settlement): Promise<Settlement> {

    return new Promise((resolve, reject) => {

      const settlementId = settlement.getId();
      if (typeof settlementId === 'undefined') {
        return reject(this.paysafeApiClient.error(BAD_REQUEST, 'InvalidRequestException : Settlement id is missing in CardServiceHandler : getSettlement'));
      }

      settlement.deleteId();

      const requestObj = new PaysafeRequest(prepareURI(`${paths.SETTLEMENT}/${settlementId}`, this.paysafeApiClient), Constants.GET);
      this.paysafeApiClient.processRequest<Settlement>(requestObj).then((response) => {
        if (response) {
          return resolve(new Settlement(response));
        }
        reject(new Error('empty response'));
      }).catch((err) => {
        reject(err);
      });

    });

  }

  public getRefund(refund: Refund): Promise<Refund> {

    return new Promise((resolve, reject) => {

      const refundId = refund.getId();
      if (typeof refundId === 'undefined') {
        return reject(this.paysafeApiClient.error(BAD_REQUEST, 'InvalidRequestException : Refund id is missing in CardServiceHandler : getRefund'));
      }

      refund.deleteId();

      const requestObj = new PaysafeRequest(prepareURI(`${paths.REFUND}/${refundId}`, this.paysafeApiClient), Constants.GET);
      this.paysafeApiClient.processRequest<Refund>(requestObj).then((response) => {
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

      const requestObj = new PaysafeRequest(prepareURI(`${paths.VERIFICATION}`, this.paysafeApiClient), Constants.POST);
      this.paysafeApiClient.processRequest(requestObj, verification).then((response) => {
        if (response) {
          return resolve(new Verification(response));
        }
        reject(new Error('empty response'));
      }).catch((err) => {
        reject(err);
      });

    });

  }

  public getVerification(verification: Refund): Promise<Verification> {

    return new Promise((resolve, reject) => {

      const verificationId = verification.getId();
      if (typeof verificationId === 'undefined') {
        return reject(this.paysafeApiClient.error(BAD_REQUEST, 'InvalidRequestException : Refund id is missing in CardServiceHandler : getRefund'));
      }

      verification.deleteId();

      const requestObj = new PaysafeRequest(prepareURI(`${paths.VERIFICATION}/${verificationId}`, this.paysafeApiClient), Constants.GET);
      this.paysafeApiClient.processRequest<Verification>(requestObj).then((response) => {
        if (response) {
          return resolve(new Verification(response));
        }
        reject(new Error('empty response'));
      }).catch((err) => {
        reject(err);
      });

    });

  }

}
