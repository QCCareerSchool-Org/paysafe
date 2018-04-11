import { Authorization } from './cardpayments/authorization';
import { Pagination } from './cardpayments/lib/pagination';
import { Refund } from './cardpayments/refund';
import { Settlement } from './cardpayments/settlement';
import { Verification } from './cardpayments/verification';
import { VoidAuth } from './cardpayments/void-auth';
import { PaysafeAPIClient } from './paysafe-api-client';
export declare class CardServiceHandler {
    private paysafeApiClient;
    constructor(paysafeApiClient: PaysafeAPIClient);
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
    approveHeldAuth(authorizationId: string): Promise<Authorization>;
    /**
     * cancel a held authorization
     * @param authorization
     */
    cancelHeldAuth(authorizationId: string): Promise<Authorization>;
    /**
     * reverse an authorization
     * @param authorizationReversal
     */
    void(authorizationId: string, voidAuth: VoidAuth): Promise<VoidAuth>;
    /**
     * settle
     * @param settlement
     */
    settle(authorizationId: string, settlement: Settlement): Promise<Settlement>;
    /**
     * cancel a settlement
     * @param settlement
     */
    cancelSettlement(settlementId: string): Promise<Settlement>;
    /**
     * refund a credit card
     * @param refund
     */
    refund(settlementId: string, refund: Refund): Promise<Refund>;
    /**
     * cancel a refund
     * @param refund
     */
    cancelRefund(refundId: string): Promise<Refund>;
    /**
     * retreive an authorization
     * @param authorization
     */
    getAuth(authorizationId: string): Promise<Authorization>;
    /**
     * retrieve an authorization reversal
     * @param authorizationReversal
     */
    getVoid(voidAuthId: string): Promise<VoidAuth>;
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
    getSettlement(settlementId: string): Promise<Settlement>;
    getRefund(refundId: string): Promise<Refund>;
    verify(verification: Verification): Promise<Verification>;
    getVerification(verificationId: string): Promise<Verification>;
    private getURI(path);
}
