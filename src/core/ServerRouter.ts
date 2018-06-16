import { ServerRequestInterface, ServerResponseInterface, ServerRouteInterface, Server, ServerEndpointActionInterface, ServerError } from ".";
import * as pathMatch from 'path-match'
import * as url from 'url';
import * as qs from 'qs';
import { AuthService } from "..";
import * as path from 'path'
import * as fs from 'fs'
import * as http from 'http'
import * as mime from 'mime-types'

export class ServerRouter {



    constructor() {


    }


    static processRequestToStatic(req: http.IncomingMessage, res: http.ServerResponse): void {


        var filePath = path.join(Server.staticPath, req.url.split('?')[0]);
        fs.stat(filePath, (err, stat) => {

            if (err) {
                res.writeHead(404);
                res.end();

                return;

            }

            if (stat.isDirectory())
                filePath = path.join(filePath, 'index.html')

            fs.exists(filePath, (exist) => {

                if (exist) {

                    res.writeHead(200, {
                        'Content-Type': mime.lookup(filePath).toString()
                    });

                    var readStream = fs.createReadStream(filePath);
                    readStream.pipe(res);

                } else {

                    res.writeHead(404);
                    res.end();

                }

            })

        });


    }


    static routerPathMatcher = pathMatch({
        // path-to-regexp options 
        sensitive: false,
        strict: false,
        end: false,
    });

    static findSrvRoute(req): ServerRouteInterface {

        var parsedUrl = url.parse(req.url);
        var path = parsedUrl.pathname;


        // finding controller by path
        var srvRoute: ServerRouteInterface = Server.routes.find((route) => {

            // Check if controller exist and requested method matches 
            if (route.method.toLowerCase() != req.method.toLowerCase())
                return false;


            var matcher = ServerRouter.routerPathMatcher(route.route);

            var params = matcher(path);

            if (params !== false) {

                req.query = qs.parse(parsedUrl.query);
                req.params = params;
                return true;
            }

            return false;

        });

        return srvRoute;

    }


    static executeRoute(srvRoute: ServerRouteInterface, req: ServerRequestInterface, res: ServerResponseInterface): Promise<number> {

        return new Promise((resolve, reject) => {


            // creating object from controllerClass 
            // Reason : basically because we need to run constructor
            var controllerObject = srvRoute.controllerObject;

            var actions: ServerEndpointActionInterface[] = (controllerObject[srvRoute.endpoint].actions);

            if (controllerObject["onRequest"])
                actions.unshift(controllerObject["onRequest"]);

            Server.middlewares.forEach((middle) => actions.unshift(middle));



            // starting from first action
            var actionIndex = 0;

            res.on('finish', () => resolve(actionIndex));


            var executeActions = function (passedModel) {

                actions[actionIndex](req, res, function _next(model) {


                    if (model)
                        if (model.constructor)
                            if (model.constructor.name == "ServerError") {

                                reject(model);
                                return;

                            }

                    // Execute next
                    actionIndex++;

                    if (actions.length == actionIndex)
                        return resolve(actionIndex);


                    executeActions(model);


                }, function _done() {
                    res.statusCode = 200;
                    res.end();
                    resolve(actionIndex);
                },
                    passedModel);


            };

            executeActions(null);

        });
    }

    static routeIt(req: ServerRequestInterface, res: ServerResponseInterface): Promise<void> {

        return new Promise((resolve, reject) => {

            if (Server.opts.cors)
                res.setHeader('Access-Control-Allow-Origin', Server.opts.cors);

            res.setHeader('Access-Control-Allow-Headers', 'clientid, Authorization, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
            res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");

            if (req.method === 'OPTIONS') {


                res.setHeader('Access-Control-Allow-Origin', '*');
                res.statusCode = 200;
                res.end();
                resolve();
                return;



            }


            // finding controller by path
            var srvRoute = ServerRouter.findSrvRoute(req);

            // Check if controller exist and requested method matches 
            if (!srvRoute) {

                var err = new ServerError(404, `[${req.method.toUpperCase()} ${req.url}] route not found !`);
                res.statusCode = 404;
                res.json(err);
                return reject(err);

            }


            var authService: AuthService = Server.services["AuthService"];

            if (!authService)
                ServerRouter.executeRoute(srvRoute, req, res).then(() => {

                    resolve();
                }).catch(e => {
                    reject(e);
                    res.statusCode = e.code;
                    res.json(e);
                });
            else
                authService.findClientById(req.client()).then(client => {

                    if (client) {
                        var clientUrl = url.parse(client.url);
                        res.setHeader('Access-Control-Allow-Origin', clientUrl.protocol + '//' + clientUrl.host);
                    }



                    authService.authorizeRequest(req, srvRoute.controllerName, srvRoute.endpoint, srvRoute.publicAccess).then(() => {

                        ServerRouter.executeRoute(srvRoute, req, res).then(() => {
                            resolve();
                        }).catch(e => {
                            reject(e);
                            res.statusCode = e.code;
                            res.json(e);
                        });


                    }).catch((e) => {

                        reject(e);
                        res.statusCode = 401;
                        res.json(new ServerError(401, e.message));

                    });


                });
        });






    }




}