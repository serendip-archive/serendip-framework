"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const async = require("async");
const express = require("express");
const bodyParser = require("body-parser");
const useragent = require("useragent");
const controllers = require("./controllers");
const mongodb_1 = require("mongodb");
const services_1 = require("./services");
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
        var port = parseInt(process.env.port);
        Server.worker = worker;
        Server.app = express();
        Server.routes = [];
        // Running configs as series
        async.series([this.dbConfig, this.middlewareConfig, this.controllerConfig], () => {
            Server.setServerRoutes(controllers);
            // Set controllers from Start
            if (opts.controllersToRegister)
                Server.setServerRoutes(opts.controllersToRegister);
            // console.log(Server.controllers);
            // Listen to port after configs done
            Server.app.listen(opts.port || port, () => {
                console.log(`worker ${Server.worker.id} running http server at port ${port}`);
            });
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
    /**
     *  filing Server.db that will use in entire system
     */
    async dbConfig() {
        // Reading these two from .env file
        var mongoUrl = process.env.mongoUrl;
        var dbName = process.env.mongoDb;
        // Creating mongoDB client from mongoUrl
        var mongoClient = await mongodb_1.MongoClient.connect(mongoUrl);
        Server.db = mongoClient.db(dbName);
        // Checking any collection that not exist in db and then creating them
        services_1.DbService.createCollectionsIfNotExists();
    }
    /**
    * Add controllers to express router
    * Notice : all controllers should end with 'Controller'
    * Notice : controller methods should start with requested method ex : get,post,put,delete
    */
    static setServerRoutes(controllersToRegister) {
        var _serverControllers = [];
        // Getting name of controller classes in ./controllers folder
        var controllerClassToRegister = Object.getOwnPropertyNames(controllersToRegister).filter(val => {
            // We just use classes that ends with 'Controller'
            if (val.endsWith('Controller'))
                return val;
        });
        // iterating trough controller classes
        controllerClassToRegister.forEach(function (controllerClassName) {
            //  console.log(new controllersToRegister[controllerClassName]);
            // iterating trough controller methods in class
            var objToRegister = new controllersToRegister[controllerClassName];
            Object.getOwnPropertyNames(objToRegister).forEach(function (controllerEndpointName) {
                var endpoint = objToRegister[controllerEndpointName];
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
                    controller: controllersToRegister[controllerClassName]
                };
                console.log(`route registered => [${serverRoute.method.toUpperCase()}] ${serverRoute.route} | ${serverRoute.controller.name} > ${serverRoute.endpoint}`);
                _serverControllers.push(serverRoute);
                Server.routes.push(serverRoute);
            });
        });
        return _serverControllers;
    }
    /**
     * registering our Server.routes to express
    */
    async controllerConfig() {
        Server.app.use(function (req, res) {
            var requestReceived = Date.now();
            // finding controller by path
            var srvRoute = Server.routes.find((value) => {
                return value.route.toLowerCase() == req.path.toLowerCase();
            });
            // Check if controller exist and requested method matches 
            if (!srvRoute || srvRoute.method.trim().toLowerCase() != req.method.trim().toLowerCase())
                return res.status(404).send('controller not found');
            // creating object from controllerClass 
            // Reason : basically because we need to run constructor
            var controllerObject = new srvRoute.controller();
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
