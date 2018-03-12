import { PaysafeAPIClient } from './paysafe-api-client';
import { Authorization } from './cardpayments/authorization';
import { AuthorizationReversal } from './cardpayments/authorization-reversal';
import { Settlement } from './cardpayments/settlement';
import { Refund } from './cardpayments/refund';
import { Pagination } from './cardpayments/pagination';
export declare class CardServiceHandler {
    private paysafeApiClient;
    constructor(p: PaysafeAPIClient);
    /** ? */
    monitor(): Promise<any>;
    /**
     * authorize a credit card transaction
     * @param authorization
     */
    authorize(authorization: Authorization): Promise<Authorization>;
    /**
     * approve a held authorization
     * @param authorization
     */
    approveHeldAuth(authorization: Authorization): Promise<Authorization>;
    /**
     * cancel a held authorization
     * @param authorization
     */
    cancelHeldAuth(authorization: Authorization): Promise<Authorization>;
    /**
     * reverse an authorization
     * @param authorizationReversal
     */
    reverseAuth(authorizationReversal: AuthorizationReversal): Promise<Authorization>;
    /**
     * settle
     * @param settlement
      */
    settlement(settlement: Settlement): Promise<Settlement>;
    /**
     * cancel a settlement
     * @param settlement
     */
    cancelSettlement(settlement: Settlement): Promise<Settlement>;
    /**
     * refund a credit card
     * @param refund
     */
    refund(refund: Refund): Promise<Refund>;
    /**
     * cancel a refund
     * @param refund
     */
    cancelRefund(refund: Refund): Promise<Refund>;
    getAuth(authorization: Authorization): Promise<Authorization>;
    /**
     *
     * @param authorizationReversal
     */
    getAuthReversal(authorizationReversal: AuthorizationReversal): Promise<AuthorizationReversal>;
    /**
     * prepares a query string for searches by merchantRefNum
     * @param merchObj
     * @param pagination
     */
    searchMerchantRefCommon(merchObj: any, pagination: Pagination): string;
    searchByMerchantRef(merchObj: any, pagination: Pagination): Promise<any>;
}
