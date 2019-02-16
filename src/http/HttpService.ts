import { ServerServiceInterface, Server } from "../core";
import chalk from "chalk";
import * as bodyParser from "body-parser";
import * as http from "http";
import * as https from "https";
import * as _ from "underscore";
import * as fs from "fs";
import { WebSocketService } from "../ws/WebSocketService";
import * as ws from "ws";
import * as path from "path";
import * as mime from "mime-types";
import { HttpEndpointInterface } from "./interfaces/HttpEndpointInterface";
import { HttpRouteInterface } from "./interfaces/HttpRouteInterface";
import { HttpResponseHelpers } from "./HttpResponseHelpers";
import { HttpRequestHelpers } from "./HttpRequestHelpers";
import { HttpRouter } from "./HttpRouter";
import { HttpMiddlewareInterface } from "./interfaces/HttpMiddlewareInterface";
import * as sUtil from "serendip-utility";
export interface HttpServiceOptionsInterface {
  // controllers responsible for http(s) incoming requests
  controllers?: any[];
  // middle wares to run before anything proceed
  beforeMiddlewares?: HttpMiddlewareInterface[];

  // middle wares to run on http(s) incoming requests
  middlewares?: HttpMiddlewareInterface[];

  // port for http server to listen
  httpPort?: number;

  // port for https server to listen
  httpsPort?: number;

  bodyParserLimit?: string;

  // path for serving static files
  staticPath?: string;

  // path for ssl cert file
  cert?: string;

  // path for ssl key file
  key?: string;

  // set to true for enabling http to https redirect
  httpsOnly?: boolean;

  // this will set Access-Control-Allow-Origin
  cors?: string;
}
export class HttpService implements ServerServiceInterface {
  static get dependencies() {
    return HttpService.options.controllers
      .map(p => sUtil.functions.args(p))
      .reduceRight((prev, current) => {
        return prev.concat(current);
      })
      .filter(p => sUtil.text.capitalizeFirstLetter(p) != "HttpService");
  }
  /**
   * routes which server router will respond to
   * and feel free to add your routes to it
   */
  private static _routes: HttpRouteInterface[];

  /**
 
   * Notice : all controllers should end with 'Controller'
   * Notice : controller methods should start with requested method ex : get,post,put,delete
   */
  public static get routes() {
    if (HttpService._routes) return HttpService._routes;
    var result = [];

    if (
      HttpService.options.controllers &&
      HttpService.options.controllers.length > 0
    )
      if (Server.opts.logging == "info")
        console.log(chalk.blueBright`Registering controller routes...`);
    // iterating trough controller classes
    HttpService.options.controllers.forEach(controller => {
      var objToRegister = new controller(
        ...sUtil.functions
          .args(controller)
          .map(p => Server.services[sUtil.text.capitalizeFirstLetter(p)])
      );

      // iterating trough controller endpoint in class
      Object.getOwnPropertyNames(objToRegister).forEach(
        controllerEndpointName => {
          var endpoint: HttpEndpointInterface =
            objToRegister[controllerEndpointName];

          if (!endpoint) return;

          if (!endpoint.method || !endpoint.actions) return;

          // Defining controllerUrl for this controllerMethod
          var controllerUrl = `/api/${
            controller.apiPrefix ? controller.apiPrefix + "/" : ""
          }${controller.name.replace(
            "Controller",
            ""
          )}/${controllerEndpointName}`.toLowerCase();

          if (endpoint.route)
            if (!endpoint.route.startsWith("/"))
              endpoint.route = "/" + endpoint.route;

          var serverRoute: HttpRouteInterface = {
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

          if (Server.opts.logging == "info")
            console.log(
              chalk`{green ☑}  [${serverRoute.method.toUpperCase()}] {magenta ${
                serverRoute.route
              }} | {gray ${serverRoute.controllerName} > ${
                serverRoute.endpoint
              }}`
            );
        }
      );
    });
    return result;
  }
  static options: HttpServiceOptionsInterface = {
    middlewares: [],
    beforeMiddlewares: [],
    bodyParserLimit: "50mb",
    controllers: []
  };
  httpServer: http.Server;
  httpsServer: https.Server;
  wsServer: any;

  static configure(opts: HttpServiceOptionsInterface): void {
    HttpService.options = _.extend(HttpService.options, opts);
  }
  constructor(private webSocketService: WebSocketService) {
    // adding basic middlewares to begging of middlewares array
    HttpService.options.middlewares.unshift(
      bodyParser.json({ limit: HttpService.options.bodyParserLimit })
    );
    HttpService.options.middlewares.unshift(
      bodyParser.urlencoded({
        limit: HttpService.options.bodyParserLimit,
        extended: false
      })
    );
  }

  async start() {
    HttpService.routes;
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
      this.httpsServer.on("request", this.processRequest);
      this.httpServer.on(
        "request",
        this.redirectToHttps(
          HttpService.options.httpPort,
          HttpService.options.httpsPort
        )
      );
    } else {
      if (this.httpsServer) this.httpsServer.on("request", this.processRequest);
      this.httpServer.on("request", this.processRequest);
    }

    await new Promise((resolve, reject) => {
      this.httpServer.listen(HttpService.options.httpPort, () => {
        if (Server.services["WebSocketService"]) {
          this.wsServer = new ws.Server({ noServer: true });
          this.httpServer.on("upgrade", (req, socket, head) => {
            Server.wsServer.handleUpgrade(req, socket, head, ws => {
              this.webSocketService.connectionEmitter.emit(
                "connection",
                ws,
                req
              );
            });
          });
        }

        if (Server.opts.logging == "info")
          console.log(
            chalk.cyan(
              `worker ${Server.worker.id} running http server at port ${
                HttpService.options.httpPort
              }`
            )
          );
        if (!this.httpsServer) return resolve();
        else
          this.httpsServer.listen(HttpService.options.httpsPort, () => {
            if (Server.opts.logging == "info")
              console.log(
                chalk.cyan(
                  `worker ${Server.worker.id} running https server at port ${
                    HttpService.options.httpsPort
                  }`
                )
              );
            return resolve();
          });
      });
    });
  }

  private async processRequest(req, res) {
    var requestReceived = Date.now();

    req = HttpRequestHelpers(req);
    res = HttpResponseHelpers(res);

    var logString = () => {
      return `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} | [${
        req.method
      }] "${req.url}" ${req.ip()}/${
        req.user ? req.user.username : "unauthorized"
      }  ${req.useragent()}  ${Date.now() - requestReceived}ms`;
    };

    if (
      HttpService.options.beforeMiddlewares &&
      HttpService.options.beforeMiddlewares.length > 0
    ) {
      await HttpRouter.executeActions(
        req,
        res,
        null,
        HttpService.options.beforeMiddlewares,
        0
      );
      if (res.finished) return;
    }

    if (Server.opts.logging == "info")
      console.info(
        chalk.gray(
          `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} | [${
            req.method
          }] "${
            req.url
          }" ${req.ip()}/${req.useragent()} process request started.`
        )
      );

    // finding controller by path

    if (HttpService.options.cors)
      res.setHeader("Access-Control-Allow-Origin", HttpService.options.cors);

    res.setHeader(
      "Access-Control-Allow-Headers",
      "clientid, Authorization , Content-Type, Accept"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "POST, GET, PUT, DELETE, OPTIONS"
    );

    var srvRoute = HttpRouter.findSrvRoute(req, HttpService.routes, true);
    if (req.method === "OPTIONS") {
      if (HttpRouter.findSrvRoute(req, HttpService.routes, false)) {
        res.statusCode = 200;
        res.end();
        return;
      } else {
        res.statusCode = 400;
        res.end();
        return;
      }
    } else {
      if (!srvRoute) {
        if (HttpService.options.staticPath) {
          this.processRequestToStatic(req, res, (code, filePath) => {
            if (code == 200)
              if (Server.opts.logging == "info")
                console.info(
                  `${logString()} => Download started [${filePath}]`
                );
          });
          return;
        } else {
          res.statusCode = 404;
          res.statusMessage = req.url + " not found";
          res.end();
          return;
        }
      }
    }

    HttpRouter.routeIt(req, res, HttpService.options.middlewares, srvRoute)
      .then(data => {
        // Request gone through all middlewares and actions for matched route
        if (req.method.toLowerCase() != "options" && srvRoute) {
          if (!srvRoute.isStream)
            if (!res.finished)
              if (data) res.json(data);
              else res.end();

          if (Server.opts.logging == "info")
            console.info(
              `${logString()} ${srvRoute.isStream ? " stream started!" : ""}`
            );
        }
      })
      .catch((e: any) => {
        if (!res.finished) {
          res.statusCode = e.code || 500;
          res.statusMessage = e.message || e.Message;
          res.json(_.pick(e, "code", "description"));
          if (!res.finished) res.end();
        }

        if (Server.opts.logging == "info")
          console.error(`${logString()}`, chalk.red(JSON.stringify(e)));
        else if (Server.opts.logging != "silent")
          console.error(
            `${logString()}`,
            chalk.red("\n[Error] " + (e.message || e.Message))
          );
      });
  }

  private redirectToHttps(httpPort, httpsPort) {
    return (req, res) => {
      res.writeHead(301, {
        Location:
          "https://" +
          req.headers["host"]
            .toString()
            .replace(":" + httpPort, ":" + httpsPort) +
          req.url
      });
      res.end();
    };
  }

  private processRequestToStatic(
    req: http.IncomingMessage,
    res: http.ServerResponse,
    callback,
    staticPath?
  ): void {
    var filePath = path.join(
      staticPath || HttpService.options.staticPath,
      req.url.split("?")[0]
    );
    fs.stat(filePath, (err, stat) => {
      if (err) {
        res.writeHead(404);
        res.end();

        return callback(404);
      }

      if (stat.isDirectory()) filePath = path.join(filePath, "index.html");

      fs.exists(filePath, exist => {
        if (exist) {
          res.writeHead(200, {
            "Content-Type": mime.lookup(filePath).toString()
          });

          var readStream = fs.createReadStream(filePath);
          readStream.pipe(res);
          callback(200, filePath);
        } else {
          res.writeHead(404);
          res.end();
          return callback(404);
        }
      });
    });
  }
}
