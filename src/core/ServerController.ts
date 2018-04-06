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

                    route = _.omit(route, 'controllerObject');

                    return route;
                });
                res.json(model);
            }
        ]
    }


    services: ServerEndpointInterface = {
        method: 'get',
        publicAccess : true,
        actions: [
            (req, res, next, done) => {
                var model = _.keys(Server.services);
                res.json(model);
            }
        ]
    }


}