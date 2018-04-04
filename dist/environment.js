"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Environment {
    constructor(host, maxSockets, timeout) {
        this.host = host;
        this.maxSockets = maxSockets;
        this.timeout = timeout;
    }
}
exports.Environment = Environment;
const MAX_SOCKETS = 10;
const TIMEOUT = 600; // 60 seconds
exports.LIVE = new Environment('https://api.paysafe.com', MAX_SOCKETS, TIMEOUT);
exports.TEST = new Environment('https://api.test.paysafe.com', MAX_SOCKETS, TIMEOUT);
