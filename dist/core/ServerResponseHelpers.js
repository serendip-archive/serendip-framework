"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ServerResponseHelpers(res) {
    res.send = (data) => {
        res.write(data);
        res.end();
    };
    res.json = (data) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(data));
    };
    return res;
}
exports.ServerResponseHelpers = ServerResponseHelpers;
