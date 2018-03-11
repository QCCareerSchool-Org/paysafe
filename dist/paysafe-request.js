"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PaysafeRequest {
    constructor(apiUrl, method) {
        this.apiUrl = apiUrl;
        this.method = method;
    }
    ;
    buildUrl(apiEndPoint) {
        return apiEndPoint + "/" + this.apiUrl;
    }
}
exports.PaysafeRequest = PaysafeRequest;
