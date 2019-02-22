"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../server");
const chalk_1 = require("chalk");
const bodyParser = require("body-parser");
const http = require("http");
const https = require("https");
const _ = require("underscore");
const fs = require("fs");
const ws = require("ws");
const path = require("path");
const mime = require("mime-types");
const HttpResponseHelpers_1 = require("./HttpResponseHelpers");
const HttpRequestHelpers_1 = require("./HttpRequestHelpers");
const HttpRouter_1 = require("./HttpRouter");
const sUtil = require("serendip-utility");
class HttpService {
    constructor() {
        // adding basic middlewares to begging of middlewares array
        HttpService.options.middlewares.unshift(bodyParser.json({ limit: HttpService.options.bodyParserLimit }));
        HttpService.options.middlewares.unshift(bodyParser.urlencoded({
            limit: HttpService.options.bodyParserLimit,
            extended: false
        }));
    }
    static get dependencies() {
        return HttpService.options.controllers
            .map(p => sUtil.functions.args(p))
            .reduceRight((prev, current) => {
            return prev.concat(current);
        })
            .filter(p => sUtil.text.capitalizeFirstLetter(p) != "HttpService");
    }
    /**
   
     * Notice : all controllers should end with 'Controller'
     * Notice : controller methods should start with requested method ex : get,post,put,delete
     */
    addRoutes() {
        var result = [];
        if (HttpService.options.controllers &&
            HttpService.options.controllers.length > 0)
            if (server_1.Server.opts.logging == "info")
                console.log(chalk_1.default.blueBright `HttpService > Registering controller routes...`);
        // iterating trough controller classes
        HttpService.options.controllers.forEach(controller => {
            var objToRegister = new controller(...sUtil.functions
                .args(controller)
                .map(p => server_1.Server.services[sUtil.text.capitalizeFirstLetter(p)]));
            // iterating trough controller endpoint in class
            Object.getOwnPropertyNames(objToRegister).forEach(controllerEndpointName => {
                var endpoint = objToRegister[controllerEndpointName];
                if (!endpoint)
                    return;
                if (!endpoint.method || !endpoint.actions)
                    return;
                // Defining controllerUrl for this controllerMethod
                var controllerUrl = `/api/${controller.apiPrefix ? controller.apiPrefix + "/" : ""}${controller.name.replace("Controller", "")}/${controllerEndpointName}`.toLowerCase();
                if (endpoint.route)
                    if (!endpoint.route.startsWith("/"))
                        endpoint.route = "/" + endpoint.route;
                var serverRoute = {
                    route: endpoint.route || controllerUrl,
                    isStream: endpoint.isStream,
                    method: endpoint.method,
                    publicAccess: endpoint.publicAccess || false,
                    endpoint: controllerEndpointName,
                    controllerName: controller.name,
                    controllerObject: objToRegister
                };
                serverRoute.route = serverRoute.route.toLowerCase();
                serverRoute.method = serverRoute.method.toLowerCase();
                result.push(serverRoute);
                if (server_1.Server.opts.logging == "info")
                    console.log(chalk_1.default `{green ☑}  [${serverRoute.method.toUpperCase()}] {magenta ${serverRoute.route}} | {gray ${serverRoute.controllerName} > ${serverRoute.endpoint}}`);
            });
        });
        HttpService.routes = result;
    }
    static configure(opts) {
        HttpService.options = _.extend(HttpService.options, opts);
    }
    async start() {
        try {
            this.addRoutes();
        }
        catch (error) {
            console.log("error while adding routes to HttpService", error);
            throw error;
        }
        if (HttpService.options.httpPort === null) {
            return;
        }
        this.httpServer = http.createServer();
        if (HttpService.options.cert && HttpService.options.key) {
            this.httpsServer = https.createServer({
                cert: fs.readFileSync(HttpService.options.cert),
                key: fs.readFileSync(HttpService.options.key)
            });
        }
        if (HttpService.options.httpsOnly) {
            this.httpsServer.on("request", HttpService.processRequest);
            this.httpServer.on("request", this.redirectToHttps(HttpService.options.httpPort, HttpService.options.httpsPort));
        }
        else {
            if (this.httpsServer)
                this.httpsServer.on("request", HttpService.processRequest);
            this.httpServer.on("request", HttpService.processRequest);
        }
        await new Promise((resolve, reject) => {
            this.httpServer.listen(HttpService.options.httpPort, () => {
                if (server_1.Server.services["WebSocketService"]) {
                    this.wsServer = new ws.Server({ noServer: true });
                    this.httpServer.on("upgrade", (req, socket, head) => {
                        this.wsServer.handleUpgrade(req, socket, head, ws => {
                            server_1.Server.services["WebSocketService"].connectionEmitter.emit("connection", ws, req);
                        });
                    });
                }
                if (server_1.Server.opts.logging == "info")
                    console.log(chalk_1.default.blueBright(`HttpService > worker ${server_1.Server.worker.id} running http server at port ${HttpService.options.httpPort}`));
                if (!this.httpsServer)
                    return resolve();
                else
                    this.httpsServer.listen(HttpService.options.httpsPort, () => {
                        if (server_1.Server.opts.logging == "info")
                            console.log(chalk_1.default.blueBright(`HttpService > worker ${server_1.Server.worker.id} running https server at port ${HttpService.options.httpsPort}`));
                        return resolve();
                    });
            });
        });
    }
    static async processRequest(req, res) {
        var requestReceived = Date.now();
        req = HttpRequestHelpers_1.HttpRequestHelpers(req);
        res = HttpResponseHelpers_1.HttpResponseHelpers(res);
        const logString = () => {
            return `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} | [${req.method}] "${req.url}" ${req.ip()}/${req.user ? req.user.username : ""} ${req.useragent()} ${res.statusCode} ${Date.now() -
                requestReceived}ms ${res.statusMessage}`;
        };
        res.on("finish", () => {
            console.log(logString());
        });
        if (HttpService.options.beforeMiddlewares &&
            HttpService.options.beforeMiddlewares.length > 0) {
            await HttpRouter_1.HttpRouter.executeActions(req, res, null, HttpService.options.beforeMiddlewares, 0);
            if (res.finished)
                return;
        }
        if (server_1.Server.opts.logging == "info")
            console.info(chalk_1.default.gray(`${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} | [${req.method}] "${req.url}" ${req.ip()}/${req.useragent()}`));
        // finding controller by path
        if (HttpService.options.cors)
            res.setHeader("Access-Control-Allow-Origin", HttpService.options.cors);
        res.setHeader("Access-Control-Allow-Headers", "clientid, Authorization , Content-Type, Accept");
        res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
        var srvRoute = HttpRouter_1.HttpRouter.findSrvRoute(req, HttpService.routes, true);
        if (req.method === "OPTIONS") {
            if (HttpRouter_1.HttpRouter.findSrvRoute(req, HttpService.routes, false)) {
                res.statusCode = 200;
                res.end();
                return;
            }
            else {
                res.statusCode = 400;
                res.end();
                return;
            }
        }
        else {
            if (!srvRoute) {
                if (HttpService.options.staticPath) {
                    HttpService.processRequestToStatic(req, res, (code, filePath) => { });
                    return;
                }
                else {
                    res.statusCode = 404;
                    res.statusMessage = req.url + " not found";
                    res.end();
                    return;
                }
            }
        }
        HttpRouter_1.HttpRouter.routeIt(req, res, HttpService.options.middlewares, srvRoute)
            .then(data => {
            // Request gone through all middlewares and actions for matched route
            if (req.method.toLowerCase() != "options" && srvRoute) {
                if (!srvRoute.isStream)
                    if (!res.finished)
                        if (data)
                            res.json(data);
                        else
                            res.end();
                if (server_1.Server.opts.logging == "info")
                    console.info(`${logString()} ${srvRoute.isStream ? " stream started!" : ""}`);
            }
        })
            .catch((e) => {
            if (!res.finished) {
                res.statusCode = e.code || 500;
                res.statusMessage = e.message || e.Message;
                res.json(_.pick(e, "code", "description"));
                if (!res.finished)
                    res.end();
            }
            if (server_1.Server.opts.logging == "info")
                console.error(`${logString()}`, chalk_1.default.red(JSON.stringify(e)));
            else if (server_1.Server.opts.logging != "silent")
                console.error(`${logString()}`, chalk_1.default.red("\n[Error] " + (e.message || e.Message)));
        });
    }
    redirectToHttps(httpPort, httpsPort) {
        return (req, res) => {
            res.writeHead(301, {
                Location: "https://" +
                    req.headers["host"]
                        .toString()
                        .replace(":" + httpPort, ":" + httpsPort) +
                    req.url
            });
            res.end();
        };
    }
    static async processRequestToStatic(req, res, callback, staticPath) {
        var filePath = path.join(staticPath || HttpService.options.staticPath, req.url.split("?")[0]);
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
}
HttpService.options = {
    middlewares: [],
    beforeMiddlewares: [],
    bodyParserLimit: "50mb",
    controllers: []
};
exports.HttpService = HttpService;
