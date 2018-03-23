import * as Environments from './environment';
import { PaysafeError } from './paysafe-error';
import { PaysafeRequest } from './paysafe-request';
import { RequestObject } from './request-object';
import { CardServiceHandler } from './card-service-handler';
import { CustomerServiceHandler } from './customer-service-handler';
import { DirectDebitServiceHandler } from './direct-debit-service-handler';
import { ThreeDSecureServiceHandler } from './three-d-secure-service-handler';
export declare class PaysafeAPIClient {
    classes: {
        [key: string]: any;
    };
    private apiKey;
    private apiPassword;
    private environment;
    private accountNumber;
    private cardServiceHandler?;
    private customerServiceHandler?;
    private directDebitServiceHandler?;
    private threeDSecureServiceHandler?;
    constructor(apiKey: string, apiPassword: string, environment: 'TEST' | 'LIVE', accountNumber: string);
    updateConfig(apiKey: string, apiPassword: string, environment: Environments.Environment, accountNumber: string): void;
    error(code: number, message: string): PaysafeError;
    getApiKey(): string;
    getApiPassword(): string;
    getEnvironment(): Environments.Environment;
    getAccountNumber(): string;
    getCardServiceHandler(): CardServiceHandler;
    getDirectDebitServiceHandler(): DirectDebitServiceHandler;
    getCustomerServiceHandler(): CustomerServiceHandler;
    getThreeDSecureServiceHandler(): ThreeDSecureServiceHandler;
    processRequest<T extends RequestObject>(paysafeRequest: PaysafeRequest, requestObject?: T): Promise<T>;
}
