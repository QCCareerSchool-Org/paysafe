import { Request as CardPaymentRequest } from './card-payments/request';
import { Request as CustomerVaultRequest } from './customer-vault/request';
import { ServiceHandler as CardServiceHandler } from './card-payments/service-handler';
import { ServiceHandler as CustomerServiceHandler } from './customer-vault/service-handler';
import { ServiceHandler as DirectDebitServiceHandler } from './direct-debit/service-handler';
import { ServiceHandler as ThreeDSecureServiceHandler } from './three-d-secure/service-handler';
export declare type GeneralRequest = CardPaymentRequest | CustomerVaultRequest;
export declare type environmentType = 'LIVE' | 'TEST';
export declare class Paysafe {
    private apiKey;
    private apiPassword;
    private environment;
    private accountNumber;
    private cardServiceHandler?;
    private customerServiceHandler?;
    private directDebitServiceHandler?;
    private threeDSecureServiceHandler?;
    private maxSockets;
    private timeout;
    private baseRequest;
    constructor(apiKey: string, apiPassword: string, environment: environmentType, accountNumber: string);
    updateConfig(apiKey: string, apiPassword: string, environment: environmentType, accountNumber: string): void;
    getApiKey(): string;
    getApiPassword(): string;
    getEnvironment(): environmentType;
    getAccountNumber(): string;
    getCardServiceHandler(): CardServiceHandler;
    getDirectDebitServiceHandler(): DirectDebitServiceHandler;
    getCustomerServiceHandler(): CustomerServiceHandler;
    getThreeDSecureServiceHandler(): ThreeDSecureServiceHandler;
    get<T extends GeneralRequest>(uri: string, requestObject?: T): Promise<T>;
    post<T extends GeneralRequest>(uri: string, requestObject?: T): Promise<T>;
    put<T extends GeneralRequest>(uri: string, requestObject?: T): Promise<T>;
    delete<T extends GeneralRequest>(uri: string, requestObject?: T): Promise<T>;
    private process;
    private getHost;
}
