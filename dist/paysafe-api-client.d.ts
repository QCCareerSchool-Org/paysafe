import { Environment } from './environment';
import { RequestObject } from './request-object';
import { PaysafeError } from './paysafe-error';
import { PaysafeRequest } from './paysafe-request';
import { CardServiceHandler } from './card-service-handler';
import { DirectDebitServiceHandler } from './direct-debit-service-handler';
import { CustomerServiceHandler } from './customer-service-handler';
import { ThreeDSecureServiceHandler } from './three-d-secure-service-handler';
export declare class PaysafeAPIClient {
    private apiKey;
    private apiPassword;
    private environment;
    private accountNumber;
    private cardServiceHandler?;
    private customerServiceHandler?;
    private directDebitServiceHandler?;
    private threeDSecureServiceHandler?;
    classes: {
        [key: string]: any;
    };
    constructor(apiKey: string, apiPassword: string, environment: Environment, accountNumber: string);
    updateConfig(apiKey: string, apiPassword: string, environment: Environment, accountNumber: string): void;
    error(code: number, message: string): PaysafeError;
    getApiKey(): string;
    getApiPassword(): string;
    getEnvironment(): Environment;
    getAccountNumber(): string;
    getCardServiceHandler(): CardServiceHandler;
    getDirectDebitServiceHandler(): DirectDebitServiceHandler;
    getCustomerServiceHandler(): CustomerServiceHandler;
    getThreeDSecureServiceHandler(): ThreeDSecureServiceHandler;
    processRequest(PaysafeRequest: PaysafeRequest, requestObject?: RequestObject): Promise<any>;
}
