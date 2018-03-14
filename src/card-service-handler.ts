import { PaysafeAPIClient } from './paysafe-api-client';
import { Authorization } from './cardpayments/authorization';
import { AuthorizationReversal } from './cardpayments/authorization-reversal';
import { Settlement } from './cardpayments/settlement';
import { Refund } from './cardpayments/refund';
import { Pagination } from './cardpayments/pagination';
import { Verification } from './cardpayments/verification';

import * as Constants from './constants';
import { PaysafeRequest } from './paysafe-request';

const HEALTH_BEAT_URL = 'cardpayments/monitor';
const URI = 'cardpayments/v1';

const paths = {
  AUTHORIZATION: '/auths',
  SETTLEMENT: '/settlements',
  REFUND: '/refunds',
  AUTHORIZATIONREVERSAL: '/voidauths',
  VERIFICATION: '/verifications'
};

const status = {
  RECEIVED: 'RECEIVED',
  PENDING: 'PENDING',
  PROCESSING: 'PROCESSING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  CANCELLED: 'CANCELLED'
};


function prepareURI(path: string, paysafeClient: PaysafeAPIClient) {
  return URI + "/accounts/" + paysafeClient.getAccountNumber() + path;
};

export class CardServiceHandler {

  private paysafeApiClient: PaysafeAPIClient;

  constructor(p: PaysafeAPIClient) {
    this.paysafeApiClient = p;
  }

  /** ? */
  monitor(): Promise<any> {
    const requestObj = new PaysafeRequest(HEALTH_BEAT_URL, Constants.GET);
    return this.paysafeApiClient.processRequest(requestObj);
  }

  /**
   * authorize a credit card transaction
   * @param authorization
   */
  authorize(authorization: Authorization): Promise<Authorization> {

    return new Promise((resolve, reject) => {

      const requestObj = new PaysafeRequest(prepareURI(paths.AUTHORIZATION, this.paysafeApiClient), Constants.POST);

      this.paysafeApiClient.processRequest(requestObj, authorization).then((response) => {
        resolve(response ? new Authorization(response) : response);
      }).catch((err) => {
        reject(err);
      });

    });
  }

  /**
   * approve a held authorization
   * @param authorization
   */
  approveHeldAuth(authorization: Authorization): Promise<Authorization> {

    return new Promise((resolve, reject) => {
      const authorizationId = authorization.getId();
      if (typeof authorizationId === 'undefined')
        return reject(this.paysafeApiClient.error(400, 'InvalidRequestException : Auth id is missing in CardServiceHandler : approveHeldAuth'));

      authorization.deleteId();
      authorization.setStatus(status.COMPLETED);

      var requestObj = new PaysafeRequest(prepareURI(`${paths.AUTHORIZATION}/${authorizationId}`, this.paysafeApiClient), Constants.PUT);

      this.paysafeApiClient.processRequest(requestObj, authorization).then((response) => {
        resolve(response ? new Authorization(response) : response);
      }).catch((err) => {
        reject(err);
      });

    });

  }

  /**
   * cancel a held authorization
   * @param authorization
   */
  cancelHeldAuth(authorization: Authorization): Promise<Authorization> {

    return new Promise((resolve, reject) => {

      const authorizationId = authorization.getId();
      if (typeof authorizationId === 'undefined')
        return reject(this.paysafeApiClient.error(400, 'InvalidRequestException : Auth id is missing in CardServiceHandler : cancelHeldAuth'));

      authorization.deleteId();
      authorization.setStatus(status.CANCELLED);

      var requestObj = new PaysafeRequest(prepareURI(`${paths.AUTHORIZATION}/${authorizationId}`, this.paysafeApiClient), Constants.PUT);

      this.paysafeApiClient.processRequest(requestObj, authorization).then((response) => {
        resolve(response ? new Authorization(response) : response);
      }).catch((err) => {
        reject(err);
      });

    });

  }

  /**
   * reverse an authorization
   * @param authorizationReversal
   */
  reverseAuth(authorizationReversal: AuthorizationReversal): Promise<Authorization> {

    return new Promise((resolve, reject) => {

      const authorization = authorizationReversal.getAuthorization();
      if (typeof authorization === 'undefined')
        return reject(this.paysafeApiClient.error(400, 'InvalidRequestException : authReversal.auth is missing in CardServiceHandler : reverseAuth'));

      const authorizationId = authorization.getId();
      if (typeof authorizationId === 'undefined')
        return reject(this.paysafeApiClient.error(400, 'InvalidRequestException : authReversal.auth.id is missing in CardServiceHandler : reverseAuth'));

      authorizationReversal.deleteAuthorization();

      const requestObj = new PaysafeRequest(prepareURI(`${paths.AUTHORIZATION}/${authorizationId}/${paths.AUTHORIZATIONREVERSAL}`, this.paysafeApiClient), Constants.POST);

      this.paysafeApiClient.processRequest(requestObj, authorizationReversal).then((response) => {
        resolve(response ? new AuthorizationReversal(response) : response);
      }).catch((err) => {
        reject(err);
      });

    });

  }

  /**
   * settle
   * @param settlement
    */
  settlement(settlement: Settlement): Promise<Settlement> {

    return new Promise((resolve, reject) => {

      const authorization = settlement.getAuthorization();
      if (typeof authorization === 'undefined')
        return reject(this.paysafeApiClient.error(400, 'InvalidRequestException : settle.auth is missing in CardServiceHandler : settlement'));

      const authorizationId = authorization.getId();
      if (typeof authorizationId === 'undefined')
        return reject(this.paysafeApiClient.error(400, 'InvalidRequestException : settle.auth.id is missing in CardServiceHandler : settlement'));

      settlement.deleteAuthorization();

      var requestObj = new PaysafeRequest(prepareURI(`${paths.AUTHORIZATION}/${authorizationId}/${paths.SETTLEMENT}`, this.paysafeApiClient), Constants.POST);

      this.paysafeApiClient.processRequest(requestObj, settlement).then((response) => {
        resolve(response ? new Settlement(response) : response);
      }).catch((err) => {
        reject(err);
      });

    });

  }

  /**
   * cancel a settlement
   * @param settlement
   */
  cancelSettlement(settlement: Settlement): Promise<Settlement> {
    return new Promise((resolve, reject) => {

      const settlementId = settlement.getId();
      if (typeof settlementId === 'undefined')
        return reject(this.paysafeApiClient.error(400, 'InvalidRequestException : settlement id is missing in CardServiceHandler : cancelSettlement'));

      settlement.deleteId();
      settlement.setStatus(status.CANCELLED);

      const requestObj = new PaysafeRequest(prepareURI(`${paths.SETTLEMENT}/${settlementId}`, this.paysafeApiClient), Constants.PUT);

      this.paysafeApiClient.processRequest(requestObj, settlement).then((response) => {
        resolve(response ? new Settlement(response) : response);
      }).catch((err) => {
        reject(err);
      });

    });

  }

  /**
   * refund a credit card
   * @param refund 
   */
  refund(refund: Refund): Promise<Refund> {

    return new Promise((resolve, reject) => {

      const settlements = refund.getSettlements();
      if (typeof settlements === 'undefined')
        return reject(this.paysafeApiClient.error(400, 'InvalidRequestException : refund.settlement is missing in CardServiceHandler : refund'));

      const settlementsId = settlements.getId();
      if (typeof settlementsId === 'undefined')
        return reject(this.paysafeApiClient.error(400, 'InvalidRequestException : refund.settlement.id is missing in CardServiceHandler : refund'));

      refund.deleteSettlements();

      var requestObj = new PaysafeRequest(prepareURI(`${paths.SETTLEMENT}/${settlementsId}/${paths.REFUND}`, this.paysafeApiClient), Constants.POST);

      this.paysafeApiClient.processRequest(requestObj, refund).then((response) => {
        resolve(response ? new Refund(response) : response);
      }).catch((err) => {
        reject(err);
      });

    });

  }

  /**
   * cancel a refund
   * @param refund 
   */
  cancelRefund(refund: Refund): Promise<Refund> {

    return new Promise((resolve, reject) => {

      const refundId = refund.getId();
      if (typeof refundId === 'undefined')
        return reject(this.paysafeApiClient.error(400, 'InvalidRequestException : settlement.id is missing in CardServiceHandler : cancelRefund'));

      refund.deleteId();
      refund.setStatus(status.CANCELLED);

      var requestObj = new PaysafeRequest(prepareURI(`${paths.REFUND}/${refundId}`, this.paysafeApiClient), Constants.POST);

      this.paysafeApiClient.processRequest(requestObj, refund).then((response) => {
        resolve(response ? new Refund(response) : response);
      }).catch((err) => {
        reject(err);
      });

    });

  }


  getAuth(authorization: Authorization): Promise<Authorization> {

    return new Promise((resolve, reject) => {

      const authorizationId = authorization.getId();
      if (typeof authorizationId === 'undefined')
        return reject(this.paysafeApiClient.error(400, 'InvalidRequestException : authorization.id is missing in CardServiceHandler : getAuth'));

      authorization.deleteId();

      const PaysafeRequestObj = new PaysafeRequest(prepareURI(`${paths.AUTHORIZATION}/${authorizationId}`, this.paysafeApiClient), Constants.GET);

      this.paysafeApiClient.processRequest(PaysafeRequestObj).then((response) => {
        resolve(response ? new Authorization(response) : response);
      }).catch((err) => {
        reject(err);
      });

    });

  }

  /**
   * 
   * @param authorizationReversal 
   */
  getAuthReversal(authorizationReversal: AuthorizationReversal): Promise<AuthorizationReversal> {
    return new Promise((resolve, reject) => {

      const authorizationReversalId = authorizationReversal.getId();
      if (typeof authorizationReversalId === 'undefined')
        return reject(this.paysafeApiClient.error(400, 'InvalidRequestException : Reverse Auth id is missing in CardServiceHandler : getAuthReversal'));

      authorizationReversal.deleteId();

      const requestObj = new PaysafeRequest(prepareURI(`${paths.AUTHORIZATIONREVERSAL}/${authorizationReversalId}`, this.paysafeApiClient), Constants.GET);
      this.paysafeApiClient.processRequest(requestObj).then((response) => {
        resolve(response ? new AuthorizationReversal(response) : response);
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
  searchMerchantRefCommon(merchObj: any, pagination: Pagination) {
    if (typeof merchObj.merchantRefNum === 'undefined')
      throw this.paysafeApiClient.error(400, 'merchObj.merchantRefNum is undefined');
    let toInclude = "merchantRefNum=" + merchObj.merchantRefNum;
    if (pagination) {
      if (pagination.getLimit())
        toInclude += "&limit=" + pagination.getLimit();
      if (pagination.getOffset())
        toInclude += "&offset=" + pagination.getOffset();
      if (pagination.getStartDate())
        toInclude += "&startDate=" + pagination.getStartDate();
      if (pagination.getEndDate())
        toInclude += "&endDate=" + pagination.getEndDate();
    }
    return toInclude;
  }


  searchByMerchantRef(merchObj: any, pagination: Pagination): Promise<any> {

    return new Promise((resolve, reject) => {

      if (typeof (merchObj as any).merchantRefNum === 'undefined')
        return reject(this.paysafeApiClient.error(400, 'InvalidRequestException : Please provide merchant ref number for search'));

      const className = merchObj.constructor.name;
      const searchPath = <string>(<any>paths)[className.toUpperCase()];
      if (typeof searchPath === 'undefined')
        return reject(this.paysafeApiClient.error(400, 'InvalidClassException : Please provide valid class name for search'));

      let toInclude: string;
      try {
        toInclude = this.searchMerchantRefCommon(merchObj, pagination);
      } catch (err) {
        return reject(err);
      }

      const requestObj = new PaysafeRequest(prepareURI(searchPath + "?" + toInclude, this.paysafeApiClient), Constants.GET);

      this.paysafeApiClient.processRequest(requestObj).then((response) => {
        resolve(response ? new this.paysafeApiClient.classes[className](response) : response);
      }).catch((err) => {
        reject(err);
      });

    });

  }

}
