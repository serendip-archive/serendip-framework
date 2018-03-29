"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const pathMatch = require("path-match");
const url = require("url");
const qs = require("qs");
class ServerRouter {
    constructor() {
    }
    static routeIt(req, res) {
        var requestReceived = Date.now();
        var parsedUrl = url.parse(req.url);
        var path = parsedUrl.pathname;
        // finding controller by path
        var srvRoute = _1.Server.routes.find((value) => {
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
        if (!srvRoute || srvRoute == undefined) {
            res.statusCode = 404;
            res.send(`[${path}] route not found !`);
            return;
        }
        // creating object from controllerClass 
        // Reason : basically because we need to run constructor
        var controllerObject = srvRoute.controllerObject;
        var actions = (controllerObject[srvRoute.endpoint].actions);
        // starting from first action
        var actionIndex = 0;
        var executeActions = function (passedModel) {
            actions[actionIndex](req, res, function _next(model) {
                // Execute next
                actionIndex++;
                if (actions.length == actionIndex) {
                    console.log(`request answered in ${Date.now() - requestReceived}ms`);
                    res.end();
                    return;
                }
                executeActions(model);
            }, function _done() {
                res.end();
                console.log(`request answered in ${Date.now() - requestReceived}ms`);
            }, passedModel);
        };
        // starting from first action
        var middleIndex = 0;
        var executeMiddles = function () {
            _1.Server.middlewares[middleIndex](req, res, function _next() {
                // Execute next
                middleIndex++;
                if (_1.Server.middlewares.length == middleIndex) {
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
        if (_1.Server.middlewares.length > 0)
            // begin executing middlewares
            executeMiddles();
        else
            executeActions(null);
    }
}
ServerRouter.routerPathMatcher = pathMatch({
    // path-to-regexp options 
    sensitive: false,
    strict: false,
    end: false,
});
exports.ServerRouter = ServerRouter;
