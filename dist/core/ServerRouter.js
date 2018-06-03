"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const pathMatch = require("path-match");
const url = require("url");
const qs = require("qs");
const path = require("path");
const fs = require("fs");
const mime = require("mime-types");
class ServerRouter {
    constructor() {
    }
    static processRequestToStatic(req, res) {
        var filePath = path.join(_1.Server.staticPath, req.url.split('?')[0]);
        fs.stat(filePath, (err, stat) => {
            if (err) {
                res.writeHead(404);
                res.end();
                return;
            }
            if (stat.isDirectory())
                filePath = path.join(filePath, 'index.html');
            fs.exists(filePath, (exist) => {
                if (exist) {
                    res.writeHead(200, {
                        'Content-Type': mime.lookup(filePath).toString()
                    });
                    var readStream = fs.createReadStream(filePath);
                    readStream.pipe(res);
                }
                else {
                    res.writeHead(404);
                    res.end();
                }
            });
        });
    }
    static findSrvRoute(req) {
        var parsedUrl = url.parse(req.url);
        var path = parsedUrl.pathname;
        // finding controller by path
        var srvRoute = _1.Server.routes.find((route) => {
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
    static executeRoute(srvRoute, req, res) {
        return new Promise((resolve, reject) => {
            // creating object from controllerClass 
            // Reason : basically because we need to run constructor
            var controllerObject = srvRoute.controllerObject;
            var actions = (controllerObject[srvRoute.endpoint].actions);
            if (controllerObject["onRequest"])
                actions.unshift(controllerObject["onRequest"]);
            _1.Server.middlewares.forEach((middle) => actions.unshift(middle));
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
                    resolve(actionIndex);
                }, passedModel);
            };
            executeActions(null);
        });
    }
    static routeIt(req, res) {
        return new Promise((resolve, reject) => {
            var authService = _1.Server.services["AuthService"];
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
                var err = new _1.ServerError(404, `[${req.method.toUpperCase()} ${req.url}] route not found !`);
                res.statusCode = 404;
                res.json(err);
                return reject(err);
            }
            authService.findClientById(req.client()).then(client => {
                if (client) {
                    var clientUrl = url.parse(client.url);
                    res.setHeader('Access-Control-Allow-Origin', clientUrl.protocol + '//' + clientUrl.host);
                }
                if (!client)
                    if (_1.Server.opts.cors)
                        res.setHeader('Access-Control-Allow-Origin', _1.Server.opts.cors);
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
                    res.json(new _1.ServerError(401, e.message));
                });
            });
        });
    }
}
ServerRouter.routerPathMatcher = pathMatch({
    // path-to-regexp options 
    sensitive: false,
    strict: false,
    end: false,
});
exports.ServerRouter = ServerRouter;
