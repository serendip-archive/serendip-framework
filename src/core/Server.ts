import * as bodyParser from "body-parser";
import chalk from "chalk";
import * as cluster from "cluster";
import * as fs from "fs";
import * as http from "http";
import * as https from "https";
import * as _ from "underscore";
import * as ws from "ws";

import {
  ServerEndpointInterface,
  ServerOptionsInterface,
  ServerRequestHelpers,
  ServerResponseHelpers,
  ServerRouteInterface,
  ServerServiceInterface
} from ".";
import { WebSocketService } from "../ws/WebSocketService";
import { ServerRouter } from "./ServerRouter";
import { toposort } from "../utils";

/**
 *  Will contain everything that we need from server
 */

export class Server {
  /**
   * instance of process worker
   */
  public static worker: cluster.Worker;

  public static dir: string;
  /**
   * routes which server router will respond to
   * and feel free to add your routes to it
   */
  public static routes: ServerRouteInterface[] = [];

  public static services: any = {};

  public static httpServer: http.Server;
  public static httpsServer: https.Server;

  public static middlewares: any[];

  public static staticPath: string;

  public static opts: ServerOptionsInterface;
  public static wsServer: ws.Server;

  // usage : starting server from ./Start.js
  public static bootstrap(
    opts: ServerOptionsInterface,
    worker: cluster.Worker | any,
    serverStartCallback?: Function
  ) {
    return new Server(opts, worker, serverStartCallback);
  }

  private static async processRequest(req , res) {
 
    var requestReceived = Date.now();

    req = ServerRequestHelpers(req);
    res = ServerResponseHelpers(res);

    if (Server.opts.logging == "info")
    console.info(chalk.gray(`${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} | [${ req.method }] "${req.url}" ${req.ip()}/${req.useragent()} process request started.`));


    // finding controller by path
    var srvRoute = ServerRouter.findSrvRoute(req, true);

    if (Server.opts.cors)
      res.setHeader("Access-Control-Allow-Origin", Server.opts.cors);

    res.setHeader(
      "Access-Control-Allow-Headers",
      "clientid, Authorization , Content-Type, Accept"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "POST, GET, PUT, DELETE, OPTIONS"
    );

    if (req.method === "OPTIONS") {
      if (ServerRouter.findSrvRoute(req, false)) {
        res.statusCode = 200;
        res.end();
        return;
      } else {
        res.statusCode = 200;
        res.end();
        return;
      }
    }

    var logString = () => {
      return `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} | [${
        req.method
      }] "${req.url}" ${req.ip()}/${
        req.user ? req.user.username : "unauthorized"
      }  ${req.useragent()}  ${Date.now() - requestReceived}ms`;
    };

    ServerRouter.routeIt(req, res, srvRoute)
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
        if (e.code == 404 && Server.staticPath) {
          ServerRouter.processRequestToStatic(req, res, (code, filePath) => {
            if (code == 200)
              if (Server.opts.logging != "silent")
                console.error(
                  `${logString()} => Download started [${filePath}]`
                );
          });
        } else {
          if (!res.finished) {
            res.statusCode = e.code || 500;
            res.statusMessage = e.message || e.Message;
            res.json(_.pick(e, "code", "description"));
          }

          if (Server.opts.logging == "info")
            console.error(`${logString()}`, chalk.red(JSON.stringify(e)));
          else if (Server.opts.logging != "silent")
            console.error(
              `${logString()}`,
              chalk.red("\n[Error] " + (e.message || e.Message))
            );
        }
      });
  }

  private static redirectToHttps(httpPort, httpsPort) {
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

  // passing worker from Start.js
  constructor(
    opts: ServerOptionsInterface,
    worker: cluster.Worker,
    serverStartCallback?: Function
  ) {
    var httpPort: number = opts.httpPort || parseInt(process.env.httpPort);
    var httpsPort: number = opts.httpsPort || parseInt(process.env.httpsPort);

    Server.opts = opts;
    Server.staticPath = opts.staticPath;

    // Cluster worker
    Server.worker = worker;

    Server.middlewares = opts.middlewares || [];

    // adding basic middlewares to begging of middlewares array
    Server.middlewares.unshift(bodyParser.json({ limit: "50mb" }));
    Server.middlewares.unshift(
      bodyParser.urlencoded({ limit: "50mb", extended: false })
    );

    if (!opts.services) opts.services = [];

    this.addServices(opts.services)
      .then(() => {
        this.addRoutes(opts.controllers)
          .then(() => {
            Server.httpServer = http.createServer();

            if (opts.cert && opts.key) {
              Server.httpsServer = https.createServer({
                cert: fs.readFileSync(opts.cert),
                key: fs.readFileSync(opts.key)
              });
            }
            if (opts.httpsOnly) {
              Server.httpsServer.on("request", Server.processRequest);
              Server.httpServer.on(
                "request",
                Server.redirectToHttps(httpPort, httpsPort)
              );
            } else {
              if (Server.httpsServer)
                Server.httpsServer.on("request", Server.processRequest);
              Server.httpServer.on("request", Server.processRequest);
            }

            Server.httpServer.listen(httpPort, () => {
              if (Server.services["WebSocketService"]) {
                var wsService: WebSocketService =
                  Server.services["WebSocketService"];

                Server.wsServer = new ws.Server({ noServer: true });
                Server.httpServer.on("upgrade", (req, socket, head) => {
                  Server.wsServer.handleUpgrade(req, socket, head, ws => {
                    wsService.connectionEmitter.emit("connection", ws, req);
                  });
                });
              }

              if (Server.opts.logging == "info")
                console.log(
                  chalk.cyan(
                    `worker ${
                      worker.id
                    } running http server at port ${httpPort}`
                  )
                );
              if (!Server.httpsServer) return serverStartCallback();
              else
                Server.httpsServer.listen(httpsPort, () => {
                  if (Server.opts.logging == "info")
                    console.log(
                      chalk.cyan(
                        `worker ${
                          worker.id
                        } running https server at port ${httpsPort}`
                      )
                    );
                  if (serverStartCallback) serverStartCallback();
                });
            });
          })
          .catch(e => serverStartCallback(e));
      })
      .catch(e => serverStartCallback(e));
  }

  // FIXME: needs refactor
  private async addServices(servicesToRegister) {
    if (!servicesToRegister) return;

    if (servicesToRegister.length == 0) return;

    var servicesToStart = [];
    var dependenciesToSort = [];
    servicesToRegister.forEach(sv => {
      if (!sv) return;

      if (typeof sv.dependencies !== "undefined" && sv.dependencies.length)
        sv.dependencies.forEach(val => {
          dependenciesToSort.push([sv.name, val]);
        });

      servicesToStart[sv.name] = sv;
    });

    // TODO: replace toposort module with code :)
    var sortedDependencies: string[] = (toposort(
      dependenciesToSort
    ) as any).reverse();

    if (sortedDependencies.length == 0) {
      if (servicesToRegister[0])
        sortedDependencies.push(servicesToRegister[0].name);
    }

    return new Promise((resolve, reject) => {
      if (Server.opts.logging == "info")
        console.log(chalk.cyan`Starting server services...`);

      function startService(index) {
        var serviceName = sortedDependencies[index];

        if (!serviceName) resolve();

        var serviceObject: ServerServiceInterface;

        if (!servicesToStart[serviceName])
          return reject(
            chalk.red`"${serviceName}" not imported in start method. it's a dependency of another service.`
          );

        try {
          serviceObject = new servicesToStart[serviceName]();
        } catch (e) {
          e.message =
            chalk.red`Server Service Error in "${serviceName}"\n` + e.message;
          reject(e);
        }

        Server.services[serviceName] = serviceObject;

        if (!serviceObject.start) startService(index + 1);
        else
          serviceObject
            .start()
            .then(() => {
              if (Server.opts.logging == "info")
                console.log(chalk`{green ☑} ${serviceName}`);

              if (sortedDependencies.length > index + 1)
                startService(index + 1);
              else resolve();
            })
            .catch(err => {
              reject(err);
            });
      }

      if (servicesToRegister.length > 0) startService(0);
    });
  }

  /**
   * Add controllers to express router
   * Notice : all controllers should end with 'Controller'
   * Notice : controller methods should start with requested method ex : get,post,put,delete
   */
  private async addRoutes(controllersToRegister) {
    if (Server.opts.logging == "info")
      console.log(chalk.blueBright`Registering controller routes...`);
    // iterating trough controller classes
    controllersToRegister.forEach(function(controller) {
      var objToRegister = new controller();

      // iterating trough controller endpoint in class
      Object.getOwnPropertyNames(objToRegister).forEach(function(
        controllerEndpointName
      ) {
        var endpoint: ServerEndpointInterface =
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

        var serverRoute: ServerRouteInterface = {
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

        if (Server.opts.logging == "info")
          console.log(
            chalk`{green ☑}  [${serverRoute.method.toUpperCase()}] {magenta ${
              serverRoute.route
            }} | {gray ${serverRoute.controllerName} > ${serverRoute.endpoint}}`
          );

        Server.routes.push(serverRoute);
      });
    });
  }
}
