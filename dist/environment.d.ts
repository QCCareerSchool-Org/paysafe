export declare class Environment {
    maxSockets: number;
    timeout: number;
    host: string;
    constructor(host: string, maxSockets: number, timeout: number);
}
export declare const LIVE: Environment;
export declare const TEST: Environment;
