import { ServerEndpointInterface, Server } from ".";
import * as _ from 'underscore';

export class ServerController {

    constructor() {


    }

    routes: ServerEndpointInterface = {
        method: 'get',
        actions: [
            (req, res, next, done) => {
                var model = _.map(Server.routes, (route) => {
                    return _.omit(route, 'controllerObject');
                });
                res.json(model);
            }
        ]
    }


    services: ServerEndpointInterface = {
        method: 'get',
        actions: [
            (req, res, next, done) => {
                var model = _.keys(Server.services);
                res.json(model);
            }
        ]
    }


}