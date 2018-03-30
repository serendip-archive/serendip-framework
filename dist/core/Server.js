"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const http = require("http");
const controllers = require("../Controllers");
const services = require("../Services");
const Async = require("async");
const _1 = require(".");
const topoSort = require("toposort");
const ServerRouter_1 = require("./ServerRouter");
/**
 *  Will contain everything that we need from server
 */
class Server {
    // passing worker from Start.js 
    constructor(opts, worker) {
        var port = opts.port || parseInt(process.env.port);
        // Cluster worker
        Server.worker = worker;
        Server.middlewares = opts.middlewares || [];
        // adding basic middlewares to begging of middlewares array
        Server.middlewares.unshift(bodyParser.json());
        Server.middlewares.unshift(bodyParser.urlencoded({ extended: false }));
        Async.series([
            (cb) => this.addServices(services, opts.services).then(() => cb(null, null)),
            (cb) => this.addRoutes(controllers, opts.controllers).then(() => cb(null, null))
        ], () => {
            Server.httpServer = http.createServer(function (req, res) {
                req = _1.ServerRequestHelpers(req);
                res = _1.ServerResponseHelpers(res);
                ServerRouter_1.ServerRouter.routeIt(req, res);
            });
            Server.httpServer.listen(port, function () {
                console.log(`worker ${worker.id} running http server at port ${port}`);
            });
            // Listen to port after configs done
        });
    }
    // usage : starting server from ./Start.js
    static bootstrap(opts, worker) {
        return new Server(opts, worker);
    }
    async addServices(...serviceContainer) {
        var servicesToStart = [];
        var dependenciesToSort = [];
        serviceContainer.forEach((servicesToRegister) => {
            if (!servicesToRegister)
                return;
            // Getting name of controller classes in ./controllers folder
            var serviceNames = Object.getOwnPropertyNames(servicesToRegister).filter(val => {
                // We just use classes that ends with 'Controller'
                if (val.endsWith('Service'))
                    return val;
            });
            // iterating trough controller classes
            serviceNames.forEach(function (serviceName) {
                if (servicesToRegister[serviceName].dependencies)
                    servicesToRegister[serviceName].dependencies.forEach((val) => {
                        dependenciesToSort.push([serviceName, val]);
                    });
                servicesToStart[serviceName] = servicesToRegister[serviceName];
            });
        });
        var sortedDependencies = topoSort(dependenciesToSort).reverse();
        return new Promise((resolve, reject) => {
            function startService(index) {
                var serviceName = sortedDependencies[index];
                var serviceObject = new servicesToStart[serviceName];
                Server.services[serviceName] = serviceObject;
                serviceObject.start().then(() => {
                    console.log(`☑ ${serviceName}`);
                    if (sortedDependencies.length > index + 1)
                        startService(index + 1);
                    else
                        resolve();
                }).catch((err) => {
                    reject(err);
                });
            }
            startService(0);
        });
    }
    /**
    * Add controllers to express router
    * Notice : all controllers should end with 'Controller'
    * Notice : controller methods should start with requested method ex : get,post,put,delete
    */
    async addRoutes(...controllerContainer) {
        controllerContainer.forEach((controllersToRegister) => {
            if (!controllersToRegister)
                return;
            // Getting name of controller classes in ./controllers folder
            var controllerClassToRegister = Object.getOwnPropertyNames(controllersToRegister).filter(val => {
                // We just use classes that ends with 'Controller'
                if (val.endsWith('Controller'))
                    return val;
            });
            // iterating trough controller classes
            controllerClassToRegister.forEach(function (controllerClassName) {
                var objToRegister = new controllersToRegister[controllerClassName];
                // iterating trough controller endpoint in class
                Object.getOwnPropertyNames(objToRegister).forEach(function (controllerEndpointName) {
                    var endpoint = objToRegister[controllerEndpointName];
                    if (!endpoint)
                        return;
                    if (!endpoint.method || !endpoint.actions)
                        return;
                    // Defining controllerUrl for this controllerMethod
                    var controllerUrl = `/api/${controllerClassName.replace('Controller', '')}/${controllerEndpointName}`;
                    if (endpoint.route)
                        if (!endpoint.route.startsWith('/'))
                            endpoint.route = '/' + endpoint.route;
                    var serverRoute = {
                        route: endpoint.route || controllerUrl,
                        method: endpoint.method,
                        endpoint: controllerEndpointName,
                        controllerName: controllerClassName,
                        controllerObject: objToRegister,
                    };
                    console.log(`☑ [${serverRoute.method.toUpperCase()}] ${serverRoute.route} | ${serverRoute.controllerName} > ${serverRoute.endpoint}`);
                    Server.routes.push(serverRoute);
                });
            });
        });
    }
}
/**
 * routes which server router will respond to
 * and feel free to add your routes to it
 */
Server.routes = [];
Server.services = {};
exports.Server = Server;
