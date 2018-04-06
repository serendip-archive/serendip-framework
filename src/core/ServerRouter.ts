import { ServerRequestInterface, ServerResponseInterface, ServerRouteInterface, Server, ServerEndpointActionInterface, ServerError } from ".";
import * as pathMatch from 'path-match'
import * as url from 'url';
import * as qs from 'qs';
import { AuthService } from "..";

export class ServerRouter {




    constructor() {


    }

    static routerPathMatcher = pathMatch({
        // path-to-regexp options 
        sensitive: false,
        strict: false,
        end: false,
    });


    static async routeIt(req: ServerRequestInterface, res: ServerResponseInterface) {

        var requestReceived = Date.now();
        var parsedUrl = url.parse(req.url);
        var path = parsedUrl.pathname;

        // finding controller by path
        var srvRoute: ServerRouteInterface = Server.routes.find((value) => {

            var matcher = ServerRouter.routerPathMatcher(value.route);

            var params = matcher(path);
            if (params !== false) {

                req.query = qs.parse(parsedUrl.query);
                req.params = params;
                return true;
            }

            return false;

        });

        // Check if controller exist and requested method matches 
        if (!srvRoute || srvRoute == undefined || srvRoute.method.toLowerCase() != req.method.toLowerCase()) {

            res.statusCode = 404;
            res.send(`[${req.method.toUpperCase()} ${path}] route not found !`);
            return;

        }



        var authService: AuthService = Server.services["AuthService"];

        try {
            await authService.authorizeRequest(req, srvRoute.controllerName, srvRoute.endpoint,srvRoute.publicAccess);
        } catch (e) {

            res.statusCode = 401;
            res.send(e.message);
            return;
        }



        // creating object from controllerClass 
        // Reason : basically because we need to run constructor
        var controllerObject = srvRoute.controllerObject;

        var actions: ServerEndpointActionInterface[] = (controllerObject[srvRoute.endpoint].actions);


        // starting from first action
        var actionIndex = 0;

        var executeActions = function (passedModel) {

            actions[actionIndex](req, res, function _next(model) {


                if (model)
                    if (model.constructor)
                        if (model.constructor.name == "ServerError") {

                            res.json(model);
                            return;

                        }

                // Execute next
                actionIndex++;

                if (actions.length == actionIndex) {
                    console.log(`request answered in ${Date.now() - requestReceived}ms`)
                    res.end();
                    return;
                }

                executeActions(model);


            }, function _done() {

                res.end();
                console.log(`request answered in ${Date.now() - requestReceived}ms`)

            },
                passedModel);


        };

        // starting from first action
        var middleIndex = 0;

        var executeMiddles = function () {
            Server.middlewares[middleIndex](req, res, function _next() {

                // Execute next
                middleIndex++;

                if (Server.middlewares.length == middleIndex) {
                    //if all middlewares successfully executed, its time to begin executing actions
                    executeActions(null);
                    return;
                }

                executeMiddles();

            }, function _done() {
                res.end();
            });
        };


        // if there is no middleware registered we go straightly to endpoint actions
        if (Server.middlewares.length > 0)
            // begin executing middlewares
            executeMiddles();
        else
            executeActions(null);


    }




}