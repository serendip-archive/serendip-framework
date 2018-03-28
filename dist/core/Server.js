"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const useragent = require("useragent");
const controllers = require("../Controllers");
const services = require("../Services");
const topoSort = require("toposort");
/**
 *  Will contain everything that we need from server
 */
class Server {
    // usage : starting server from ./Start.js
    static bootstrap(opts, worker) {
        return new Server(opts, worker);
    }
    // passing worker from Start.js 
    constructor(opts, worker) {
        var port = opts.port || parseInt(process.env.port);
        Server.worker = worker;
        Server.app = express();
        Server.routes = [];
        Server.services = {};
        Server.addServices(services, opts.services).then(() => {
            this.middlewareConfig();
            this.routerConfig();
            Server.addRoutes(controllers, opts.controllers);
            // Listen to port after configs done
            Server.app.listen(port, () => {
                console.log(`worker ${Server.worker.id} running http server at port ${port}`);
            });
        }).catch((err) => {
            console.log(err);
        });
    }
    /**
     * configuring middlewares in express
     */
    async middlewareConfig() {
        Server.app.use((req, res, next) => {
            var ua = useragent.parse(req.headers["user-agent"].toString()).toString();
            console.log(`${req.method} [${req.path}] from "${req.ip}" ${ua}`);
            next();
        });
        Server.app.use(bodyParser.json());
    }
    static async addServices(...serviceContainer) {
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
    static addRoutes(...controllerContainer) {
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
                    if (endpoint.customRoute)
                        if (!endpoint.customRoute.startsWith('/'))
                            endpoint.customRoute = '/' + endpoint.customRoute;
                    var serverRoute = {
                        route: endpoint.customRoute || controllerUrl,
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
    /**
     * registering our Server.routes to express
    */
    async routerConfig() {
        Server.app.use(function (req, res) {
            var requestReceived = Date.now();
            // finding controller by path
            var srvRoute = Server.routes.find((value) => {
                return value.route.toLowerCase() == req.path.toLowerCase() && value.method.trim().toLowerCase() == req.method.trim().toLowerCase();
            });
            // Check if controller exist and requested method matches 
            if (!srvRoute)
                return res.status(404).send('controller not found');
            // creating object from controllerClass 
            // Reason : basically because we need to run constructor
            var controllerObject = srvRoute.controllerObject;
            //controllerObject[srvRoute.function](req, res);
            var actions = (controllerObject[srvRoute.endpoint].actions);
            // starting from first action
            var actionIndex = 0;
            var executeAction = function (passedModel) {
                actions[actionIndex](req, res, function next(model) {
                    // Execute next
                    actionIndex++;
                    executeAction(model);
                }, function done() {
                    res.end();
                    console.log(`request answered in ${Date.now() - requestReceived}ms`);
                }, passedModel);
            };
            // Execute first one
            executeAction(null);
        });
    }
}
exports.Server = Server;
