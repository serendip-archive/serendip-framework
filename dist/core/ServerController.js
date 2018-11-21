"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const _ = require("underscore");
class ServerController {
    constructor() {
        this.clusterTesting = {
            publicAccess: true,
            route: "/api/server/cluster-testing",
            method: "get",
            actions: [
                (req, res, next, done) => {
                    res.write("received in worker " + _1.Server.worker.id);
                    res.end();
                }
            ]
        };
        this.routes = {
            method: "get",
            actions: [
                (req, res, next, done) => {
                    setTimeout(() => {
                        next();
                    }, 200);
                },
                (req, res, next, done) => {
                    var model = _.map(_1.Server.routes, route => {
                        route = _.omit(route, "controllerObject");
                        return route;
                    });
                    res.json(model);
                }
            ]
        };
        this.services = {
            method: "get",
            actions: [
                (req, res, next, done) => {
                    var model = _.keys(_1.Server.services);
                    res.json(model);
                }
            ]
        };
    }
}
exports.ServerController = ServerController;
