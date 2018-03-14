import { ControllerEndpoint, Server } from "../Server";

export class ServerController {

    routes: ControllerEndpoint = {
        method: 'get',
        actions: [(req, res, next, done) => {
            res.json(Server.routes.map((srvRoute) => {

                return {
                    path: srvRoute.route,
                    method: srvRoute.method,
                    controller : srvRoute.controllerName,
                    endpoint : srvRoute.endpoint
                }

            }));
            done();

        }]

    }

    services: ControllerEndpoint = {
        method: 'get',
        actions: [(req, res, next, done) => {
            res.json(Object.getOwnPropertyNames(Server.services));
            done();

        }]

    }

}