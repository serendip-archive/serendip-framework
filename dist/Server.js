"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const async = require("async");
const express = require("express");
const bodyParser = require("body-parser");
const useragent = require("useragent");
const routes = require("./routes");
const mongodb_1 = require("mongodb");
const services_1 = require("./services");
// Will contain everything that we need from server
class Server {
    // usage : starting server from ./Start.js
    static bootstrap(worker) {
        return new Server(worker);
    }
    // passing worker from Start.js 
    constructor(worker) {
        var port = parseInt(process.env.port);
        Server.worker = worker;
        Server.app = express();
        Server.Routes = this.getServerRoutes();
        // Running configs as series
        async.series([this.dbConfig, this.middlewareConfig, this.routeConfig], () => {
            console.log(Server.Routes);
            // Listen to port after configs done
            Server.app.listen(port, function () {
                console.log(`worker ${worker.id} running http server at port ${port}`);
            });
        });
    }
    async middlewareConfig() {
        Server.app.use((req, res, next) => {
            var ua = useragent.parse(req.headers["user-agent"].toString()).toString();
            req.ipv4 = req.ip.split(':').reverse()[0];
            console.log(`${req.method} [${req.path}] from "${req.ipv4}" ${ua}`);
            next();
        });
        Server.app.use(bodyParser.json());
    }
    // filing Server.db that will use in entire system
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
    // configuring express routes from ./routes folder
    // Notice : all routes should end with 'Route'
    // Notice : route methods should start with 'get' or 'post'
    getServerRoutes() {
        var _serverRoutes = [];
        // Getting name of route classes in ./routes folder
        var routeClassToRegister = Object.getOwnPropertyNames(routes).filter(val => {
            // We just use classes that ends with 'Route'
            if (val.endsWith('Route'))
                return val;
        });
        // iterating trough route classes
        routeClassToRegister.forEach(function (routeClassName) {
            // iterating trough route methods in class
            Object.getOwnPropertyNames(routes[routeClassName].prototype).forEach(function (routeFunction) {
                if (routeFunction == "constructor")
                    return;
                // Defining routeUrl for this routeMethod
                var routeUrl = `/api/${routeClassName.replace('Route', '')}/${routeFunction.replace("get", "").replace("post", "")}`;
                _serverRoutes.push({ path: routeUrl, function: routeFunction, class: routeClassName });
            });
        });
        return _serverRoutes;
    }
    async routeConfig() {
        Server.app.use(function (req, res) {
            // finding route by path
            var route = Server.Routes.find((value) => {
                return value.path.toLowerCase() == req.path.toLowerCase();
            });
            // Check if route exist and requested method matches 
            if (!route || !route.function.startsWith(req.method.toLowerCase()))
                return res.status(404).send('route not found');
            // creating object from routeClass 
            // Reason : basically because we need to run constructor
            var routeObject = new routes[route.class];
            routeObject[route.function](req, res);
        });
    }
}
exports.Server = Server;
