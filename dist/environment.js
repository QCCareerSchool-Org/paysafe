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
exports.LIVE = new Environment('https://api.paysafe.com', 10, 30000);
exports.TEST = new Environment('https://api.test.paysafe.com', 10, 30000);
