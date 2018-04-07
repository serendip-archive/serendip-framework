"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ua = require("useragent");
function ServerRequestHelpers(req) {
    req.useragent = () => {
        return ua.parse(req.headers["user-agent"].toString());
    };
    req.client = () => {
        if (req.headers["client"] != undefined)
            return req.headers["client"].toString();
        else
            return null;
    };
    req.ip = () => {
        return req.connection.remoteAddress;
    };
    if (!req.body)
        req.body = {};
    return req;
}
exports.ServerRequestHelpers = ServerRequestHelpers;
