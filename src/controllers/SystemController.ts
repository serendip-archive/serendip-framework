import { ControllerEndpoint, Server } from "../Server";

export class SystemController {


    ServerServices: ControllerEndpoint = {
        method: 'get',
        actions: [(req, res, next, done) => {

            res.json(Server.services);
            done();

        }]

    }

}