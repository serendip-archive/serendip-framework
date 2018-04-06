"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const _ = require("underscore");
class ServerController {
    constructor() {
        this.routes = {
            method: 'get',
            actions: [
                (req, res, next, done) => {
                    var model = _.map(_1.Server.routes, (route) => {
                        route = _.omit(route, 'controllerObject');
                        return route;
                    });
                    res.json(model);
                }
            ]
        };
        this.services = {
            method: 'get',
            publicAccess: true,
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
