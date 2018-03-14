"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Server_1 = require("../Server");
class SystemController {
    constructor() {
        this.ServerServices = {
            method: 'get',
            actions: [(req, res, next, done) => {
                    res.json(Object.getOwnPropertyNames(Server_1.Server.services));
                    done();
                }]
        };
    }
}
exports.SystemController = SystemController;
