"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const useragent = require("useragent");
function ServerRequestHelpers(req) {
    req.useragent = () => {
        return useragent.parse(req.headers["user-agent"].toString());
    };
    return req;
}
exports.ServerRequestHelpers = ServerRequestHelpers;
