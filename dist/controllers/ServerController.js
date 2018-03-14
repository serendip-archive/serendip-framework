"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Server_1 = require("../Server");
class ServerController {
    constructor() {
        this.routes = {
            method: 'get',
            actions: [(req, res, next, done) => {
                    res.json(Server_1.Server.routes.map((srvRoute) => {
                        return {
                            path: srvRoute.route,
                            method: srvRoute.method,
                            controller: srvRoute.controllerName,
                            endpoint: srvRoute.endpoint
                        };
                    }));
                    done();
                }]
        };
        this.services = {
            method: 'get',
            actions: [(req, res, next, done) => {
                    res.json(Object.getOwnPropertyNames(Server_1.Server.services));
                    done();
                }]
        };
    }
}
exports.ServerController = ServerController;
