"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ServerError extends Error {
    constructor(code, message, id) {
        super(message);
        this.code = code;
        this.description = message;
        this.stacktrace = this.stack;
        if (id)
            this.id = id;
    }
}
exports.ServerError = ServerError;
