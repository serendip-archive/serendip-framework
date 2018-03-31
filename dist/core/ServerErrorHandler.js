"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ServerError {
    constructor(code, message, errorId, more_info) {
        this.code = code;
        this.message = message;
        if (errorId)
            this.errorId = errorId;
        if (more_info)
            this.more_info = more_info;
    }
}
exports.ServerError = ServerError;
