"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const pathMatch = require("path-match");
const url = require("url");
const qs = require("qs");
const path = require("path");
const fs = require("fs");
const mime = require("mime-types");
const _ = require("underscore");
class ServerRouter {
    constructor() { }
    static processRequestToStatic(req, res, callback, staticPath) {
        var filePath = path.join(staticPath || _1.Server.staticPath, req.url.split("?")[0]);
        fs.stat(filePath, (err, stat) => {
            if (err) {
                res.writeHead(404);
                res.end();
                return callback(404);
            }
            if (stat.isDirectory())
                filePath = path.join(filePath, "index.html");
            fs.exists(filePath, exist => {
                if (exist) {
                    res.writeHead(200, {
                        "Content-Type": mime.lookup(filePath).toString()
                    });
                    var readStream = fs.createReadStream(filePath);
                    readStream.pipe(res);
                    callback(200, filePath);
                }
                else {
                    res.writeHead(404);
                    res.end();
                    return callback(404);
                }
            });
        });
    }
    static findSrvRoute(req, matchMethod) {
        var parsedUrl = url.parse(req.url);
        var path = parsedUrl.pathname;
        // finding controller by path
        var srvRoute = _1.Server.routes.find(route => {
            // Check if controller exist and requested method matches
            var matcher = ServerRouter.routerPathMatcher(route.route);
            var params = matcher(path);
            if (params !== false) {
                req.query = qs.parse(parsedUrl.query);
                req.params = params;
                if (matchMethod) {
                    if (route.method.toLowerCase() != req.method.toLowerCase())
                        return false;
                }
                return true;
            }
            return false;
        });
        return srvRoute;
    }
    // FIXME: needs refactor
    static executeRoute(srvRoute, req, res) {
        // creating object from controllerClass
        // Reason : basically because we need to run constructor
        var controllerObject = srvRoute.controllerObject;
        var actions = _.clone(controllerObject[srvRoute.endpoint].actions);
        if (controllerObject["onRequest"])
            actions.unshift(controllerObject["onRequest"]);
        _1.Server.middlewares.forEach(middle => actions.unshift(middle));
        // starting from first action
        return ServerRouter.executeActions(req, res, null, actions, 0);
    }
    static executeActions(req, res, passedModel, actions, actionIndex) {
        return new Promise(async (resolve, reject) => {
            res.on("finish", () => resolve());
            var action;
            try {
                action = actions[actionIndex](req, res, function _next(model) {
                    if (model)
                        if (model.constructor)
                            if (model.constructor.name == "ServerError") {
                                reject(model);
                                return;
                            }
                    // Execute next
                    actionIndex++;
                    if (actions.length == actionIndex) {
                        return resolve(model);
                    }
                    try {
                        ServerRouter.executeActions(req, res, model, actions, actionIndex);
                    }
                    catch (error) { }
                }, function _done(statusCode, statusMessage) {
                    res.statusCode = statusCode || 200;
                    res.statusMessage = statusMessage;
                    res.end();
                    resolve();
                }, passedModel);
            }
            catch (error) {
                reject(error);
            }
            if (action && action.then)
                action
                    .then(data => { })
                    .catch((e) => {
                    reject(new _1.ServerError(500, e ? e.message : ""));
                });
        });
    }
    static routeIt(req, res, srvRoute) {
        return new Promise((resolve, reject) => {
            if (!srvRoute) {
                // Check if controller exist and requested method matches
                var err = new _1.ServerError(404, `[${req.method.toUpperCase()} ${req.url}] route not found !`);
                reject(err);
                return;
            }
            var authService = _1.Server.services["AuthService"];
            if (!authService)
                ServerRouter.executeRoute(srvRoute, req, res)
                    .then(data => {
                    resolve(data);
                })
                    .catch(e => {
                    reject(e);
                });
            else
                authService
                    .authorizeRequest(req, srvRoute.controllerName, srvRoute.endpoint, srvRoute.publicAccess)
                    .then(() => {
                    ServerRouter.executeRoute(srvRoute, req, res)
                        .then(data => {
                        resolve(data);
                    })
                        .catch(e => {
                        reject(e);
                    });
                })
                    .catch(e => {
                    reject(e);
                });
        });
    }
}
ServerRouter.routerPathMatcher = pathMatch({
    // path-to-regexp options
    sensitive: false,
    strict: false,
    end: false
});
exports.ServerRouter = ServerRouter;
