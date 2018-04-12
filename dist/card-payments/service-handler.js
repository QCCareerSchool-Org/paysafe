"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authorization_1 = require("./authorization");
const refund_1 = require("./refund");
const settlement_1 = require("./settlement");
const verification_1 = require("./verification");
const void_auth_1 = require("./void-auth");
const paths = {
    AUTHORIZATION: 'auths',
    SETTLEMENT: 'settlements',
    REFUND: 'refunds',
    VOIDAUTH: 'voidauths',
    VERIFICATION: 'verifications',
};
const searchByMerchantRefNumClasses = {
    Authorization: authorization_1.Authorization,
    Settlement: settlement_1.Settlement,
    Refund: refund_1.Refund,
    VoidAuth: void_auth_1.VoidAuth,
    Verification: verification_1.Verification,
};
class ServiceHandler {
    constructor(paysafe) {
        this.paysafe = paysafe;
    }
    /** verifies that the service is up and accessible */
    monitor() {
        return this.paysafe.get('/cardpayments/monitor');
    }
    /**
     * authorize a credit card transaction
     * @param authorization
     */
    authorize(authorization) {
        return new Promise((resolve, reject) => {
            const path = this.getPath(paths.AUTHORIZATION);
            this.paysafe.post(path, authorization).then((response) => {
                if (response) {
                    return resolve(new authorization_1.Authorization(response));
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
    approveHeldAuth(authorizationId) {
        return new Promise((resolve, reject) => {
            if (typeof authorizationId === 'undefined') {
                return reject(new Error('authorizationId is undefined'));
            }
            const authorization = new authorization_1.Authorization();
            authorization.setStatus('COMPLETED');
            const path = this.getPath(`${paths.AUTHORIZATION}/${authorizationId}`);
            this.paysafe.put(path, authorization).then((response) => {
                if (response) {
                    return resolve(new authorization_1.Authorization(response));
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
    cancelHeldAuth(authorizationId) {
        return new Promise((resolve, reject) => {
            if (typeof authorizationId === 'undefined') {
                return reject(new Error('authorizationId is undefined'));
            }
            const authorization = new authorization_1.Authorization();
            authorization.setStatus('CANCELLED');
            const path = this.getPath(`${paths.AUTHORIZATION}/${authorizationId}`);
            this.paysafe.put(path, authorization).then((response) => {
                if (response) {
                    return resolve(new authorization_1.Authorization(response));
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
    void(authorizationId, voidAuth) {
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
                    return resolve(new void_auth_1.VoidAuth(response));
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
    settle(authorizationId, settlement) {
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
                    return resolve(new settlement_1.Settlement(response));
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
    cancelSettlement(settlementId) {
        return new Promise((resolve, reject) => {
            if (typeof settlementId === 'undefined') {
                return reject(new Error('settlementId is undefined'));
            }
            const settlement = new settlement_1.Settlement();
            settlement.setStatus('CANCELLED');
            const path = this.getPath(`${paths.SETTLEMENT}/${settlementId}`);
            this.paysafe.put(path, settlement).then((response) => {
                if (response) {
                    return resolve(new settlement_1.Settlement(response));
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
    refund(settlementId, refund) {
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
                    return resolve(new refund_1.Refund(response));
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
    cancelRefund(refundId) {
        return new Promise((resolve, reject) => {
            if (typeof refundId === 'undefined') {
                return reject(new Error('refundId is undefined'));
            }
            const refund = new refund_1.Refund();
            refund.setStatus('CANCELLED');
            const path = this.getPath(`${paths.REFUND}/${refundId}`);
            this.paysafe.post(path, refund).then((response) => {
                if (response) {
                    return resolve(new refund_1.Refund(response));
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
    getAuth(authorizationId) {
        return new Promise((resolve, reject) => {
            if (typeof authorizationId === 'undefined') {
                return reject(new Error('authorizationId undefined'));
            }
            const path = this.getPath(`${paths.AUTHORIZATION}/${authorizationId}`);
            this.paysafe.get(path).then((response) => {
                if (response) {
                    return resolve(new authorization_1.Authorization(response));
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
    getVoid(voidAuthId) {
        return new Promise((resolve, reject) => {
            if (typeof voidAuthId === 'undefined') {
                return reject(new Error('voidAuthId is undefined'));
            }
            const path = this.getPath(`${paths.VOIDAUTH}/${voidAuthId}`);
            this.paysafe.get(path).then((response) => {
                if (response) {
                    return resolve(new void_auth_1.VoidAuth(response));
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
    searchMerchantRefCommon(merchObj, pagination) {
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
    searchByMerchantRef(merchObj, pagination) {
        return new Promise((resolve, reject) => {
            if (typeof merchObj.merchantRefNum === 'undefined') {
                return reject(new Error());
            }
            const className = merchObj.constructor.name;
            const searchPath = paths[className.toUpperCase()];
            if (typeof searchPath === 'undefined') {
                return reject(new Error());
            }
            let toInclude;
            try {
                toInclude = this.searchMerchantRefCommon(merchObj, pagination);
            }
            catch (err) {
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
    getSettlement(settlementId) {
        return new Promise((resolve, reject) => {
            if (typeof settlementId === 'undefined') {
                return reject(new Error('settlemntId is undefined'));
            }
            const path = this.getPath(`${paths.SETTLEMENT}/${settlementId}`);
            this.paysafe.get(path).then((response) => {
                if (response) {
                    return resolve(new settlement_1.Settlement(response));
                }
                reject(new Error('empty response'));
            }).catch((err) => {
                reject(err);
            });
        });
    }
    getRefund(refundId) {
        return new Promise((resolve, reject) => {
            if (typeof refundId === 'undefined') {
                return reject(new Error('refundId is undefined'));
            }
            const path = this.getPath(`${paths.REFUND}/${refundId}`);
            this.paysafe.get(path).then((response) => {
                if (response) {
                    return resolve(new refund_1.Refund(response));
                }
                reject(new Error('empty response'));
            }).catch((err) => {
                reject(err);
            });
        });
    }
    verify(verification) {
        return new Promise((resolve, reject) => {
            const path = this.getPath(paths.VERIFICATION);
            this.paysafe.post(path, verification).then((response) => {
                if (response) {
                    return resolve(new verification_1.Verification(response));
                }
                reject(new Error('empty response'));
            }).catch((err) => {
                reject(err);
            });
        });
    }
    getVerification(verificationId) {
        return new Promise((resolve, reject) => {
            if (typeof verificationId === 'undefined') {
                return reject(new Error('verificationId is undefined'));
            }
            const path = this.getPath(`${paths.VERIFICATION}/${verificationId}`);
            this.paysafe.get(path).then((response) => {
                if (response) {
                    return resolve(new verification_1.Verification(response));
                }
                reject(new Error('empty response'));
            }).catch((err) => {
                reject(err);
            });
        });
    }
    getPath(path) {
        return '/cardpayments/v1/accounts/' + this.paysafe.getAccountNumber() + '/' + path;
    }
}
exports.ServiceHandler = ServiceHandler;
