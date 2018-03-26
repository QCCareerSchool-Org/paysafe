import { Authorization } from './cardpayments/authorization';
import { AuthorizationReversal } from './cardpayments/authorization-reversal';
import { Pagination } from './cardpayments/pagination';
import { Refund } from './cardpayments/refund';
import { Settlement } from './cardpayments/settlement';
import { Verification } from './cardpayments/verification';
import { PaysafeAPIClient } from './paysafe-api-client';
export declare class CardServiceHandler {
    private paysafeApiClient;
    constructor(p: PaysafeAPIClient);
    /** verifies that the service is up and accessible */
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
    reverseAuth(authorizationReversal: AuthorizationReversal): Promise<AuthorizationReversal>;
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
    /**
     * retreive an authorization
     * @param authorization
     */
    getAuth(authorization: Authorization): Promise<Authorization>;
    /**
     * retrieve an authorization reversal
     * @param authorizationReversal
     */
    getAuthReversal(authorizationReversal: AuthorizationReversal): Promise<AuthorizationReversal>;
    /**
     * prepares a query string for searches by merchantRefNum
     * @param merchObj
     * @param pagination
     */
    searchMerchantRefCommon(merchObj: any, pagination: Pagination): string;
    /**
     * Find all entities of a particular type by their merchant reference number.
     * E.g., pass in an Authorization to find Authorizations.
     * @param merchObj
     * @param pagination
     */
    searchByMerchantRef(merchObj: any, pagination: Pagination): Promise<any>;
    getSettlement(settlement: Settlement): Promise<Settlement>;
    getRefund(refund: Refund): Promise<Refund>;
    verify(verification: Verification): Promise<Verification>;
    getVerification(verification: Refund): Promise<Verification>;
}
