"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ServerRequestHelpers(req) {
    req.useragent = () => {
        return req.headers["user-agent"].toString();
    };
    req.ip = () => {
        return req.connection.remoteAddress;
    };
    return req;
}
exports.ServerRequestHelpers = ServerRequestHelpers;
