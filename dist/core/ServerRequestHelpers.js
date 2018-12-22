"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ua = require("useragent");
const reqIp = require("request-ip");
function ServerRequestHelpers(req) {
    req.useragent = () => {
        if (!req.headers["user-agent"])
            return '';
        return ua.parse(req.headers["user-agent"].toString());
    };
    req.client = () => {
        if (req.headers["clientid"] != undefined)
            return req.headers["clientid"].toString();
        else
            return null;
    };
    req.ip = () => {
        return reqIp.getClientIp(req);
    };
    if (!req.body)
        req.body = {};
    return req;
}
exports.ServerRequestHelpers = ServerRequestHelpers;
