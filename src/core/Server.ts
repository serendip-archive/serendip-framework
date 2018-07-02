import * as cluster from 'cluster'
import * as bodyParser from 'body-parser'


import * as http from 'http'
import * as https from 'https'


import * as Async from 'async'

import {
  ServerServiceInterface,
  ServerRouteInterface,
  ServerOptionsInterface,
  ServerEndpointInterface,
  ServerEndpointActionInterface,
  ServerRequestHelpers,
  ServerResponseHelpers,
  ServerMiddlewareInterface
} from '.';

import * as fs from 'fs'

import * as topoSort from 'toposort'


import { ServerRouter } from './ServerRouter';
import { AuthService } from '../auth';
import { EmailService } from '../email';
import { ServerRequestInterface } from './interfaces/ServerRequestInterface';
import { ServerError } from './ServerErrorHandler';


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


  // usage : starting server from ./Start.js
  public static bootstrap(opts: ServerOptionsInterface, worker: cluster.Worker | any, serverStartCallback?: Function) {
    return new Server(opts, worker, serverStartCallback);
  }

  private static async processRequest(req, res) {

    var requestReceived = Date.now();

    req = ServerRequestHelpers(req);
    res = ServerResponseHelpers(res);

    var logString = () => {

      return `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} | [${req.method}] "${req.url}" ${req.ip()}/${req.user ? req.user.username : 'unauthorized'}  ${req.useragent()}  ${Date.now() - requestReceived}ms`;

    };

    ServerRouter.routeIt(req, res).then(() => {
      // Request successfully responded
      if (req.method.toLowerCase() != "options")
        console.info(`${logString()}`);

    }).catch((e: any) => {

      if (e.code == 404 && Server.staticPath) {
        ServerRouter.processRequestToStatic(req, res);
      } else {
        res.statusCode = e.code || 500;
        res.statusMessage = e.message;
        res.json(e);
        console.error(`${logString()} => ${e.message}`);
      }

    });

  }

  private static redirectToHttps(httpPort, httpsPort) {
    return (req, res) => {
      res.writeHead(301, { "Location": "https://" + req.headers['host'].toString().replace(':' + httpPort, ':' + httpsPort) + req.url });
      res.end();
    }
  }

  // passing worker from Start.js 
  constructor(opts: ServerOptionsInterface, worker: cluster.Worker, serverStartCallback?: Function) {

    var httpPort: number = opts.httpPort || parseInt(process.env.httpPort);
    var httpsPort: number = opts.httpsPort || parseInt(process.env.httpsPort);

    Server.opts = opts;
    Server.staticPath = opts.staticPath;

    // Cluster worker
    Server.worker = worker;


    Server.middlewares = opts.middlewares || [];

    // adding basic middlewares to begging of middlewares array
    Server.middlewares.unshift(bodyParser.json());
    Server.middlewares.unshift(bodyParser.urlencoded({ extended: false }));

    if (!opts.services)
      opts.services = [];


    this.addServices(opts.services).then(() => {
      this.addRoutes(opts.controllers).then(() => {


        Server.httpServer = http.createServer();

        if (opts.cert && opts.key) {
          Server.httpsServer = https.createServer({
            cert: fs.readFileSync(opts.cert),
            key: fs.readFileSync(opts.key)
          });
        }
        if (opts.httpsOnly) {
          Server.httpsServer.on('request', Server.processRequest);
          Server.httpServer.on('request', Server.redirectToHttps(httpPort, httpsPort));
        }
        else {
          if (Server.httpsServer)
            Server.httpsServer.on('request', Server.processRequest);
          Server.httpServer.on('request', Server.processRequest);
        }
  
        Server.httpServer.listen(httpPort, () => {
          console.log(`worker ${worker.id} running http server at port ${httpPort}`);
          if (!Server.httpsServer)
            return serverStartCallback();
          else
            Server.httpsServer.listen(httpsPort, () => {
              console.log(`worker ${worker.id} running https server at port ${httpsPort}`);
              if (serverStartCallback)
                serverStartCallback();
            });
        });


      }).catch(e => serverStartCallback(e))
    }).catch(e => serverStartCallback(e));

  }



  private async addServices(servicesToRegister) {

    if (!servicesToRegister)
      return;

    if (servicesToRegister.length == 0)
      return;

    var servicesToStart = [];
    var dependenciesToSort = [];
    servicesToRegister.forEach((sv) => {

      if (!sv)
        return;


      if (sv.dependencies)
        sv.dependencies.forEach((val) => {

          dependenciesToSort.push([sv.name, val]);

        });

      servicesToStart[sv.name] = sv;

    });



    var sortedDependencies: string[] = topoSort(dependenciesToSort).reverse();


    return new Promise((resolve, reject) => {


      function startService(index) {

        var serviceName = sortedDependencies[index];

        var serviceObject: ServerServiceInterface;

        try {
          serviceObject = new servicesToStart[serviceName];

        } catch{
          reject(`${serviceName} not imported in server start.`);
        }

        Server.services[serviceName] = serviceObject;

        if (!serviceObject.start)
          startService(index + 1);
        else
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

      if (sortedDependencies.length > 0)
        startService(0);


    });


  }

  /**
  * Add controllers to express router
  * Notice : all controllers should end with 'Controller'
  * Notice : controller methods should start with requested method ex : get,post,put,delete
  */
  private async addRoutes(controllersToRegister) {

    // iterating trough controller classes
    controllersToRegister.forEach(function (controller) {


      var objToRegister = new controller;

      // iterating trough controller endpoint in class
      Object.getOwnPropertyNames(objToRegister).forEach(function (controllerEndpointName) {


        var endpoint: ServerEndpointInterface = objToRegister[controllerEndpointName];


        if (!endpoint)
          return;

        if (!endpoint.method || !endpoint.actions)
          return;




        // Defining controllerUrl for this controllerMethod
        var controllerUrl = `/api/${controller.apiPrefix ? controller.apiPrefix + '/' : ''}${controller.name.replace('Controller', '')}/${controllerEndpointName}`.toLowerCase();

        if (endpoint.route)
          if (!endpoint.route.startsWith('/'))
            endpoint.route = '/' + endpoint.route;


        var serverRoute: ServerRouteInterface = {
          route: endpoint.route || controllerUrl,
          method: endpoint.method,
          publicAccess: endpoint.publicAccess || false,
          endpoint: controllerEndpointName,
          controllerName: controller.name,
          controllerObject: objToRegister,
        };

        serverRoute.route = serverRoute.route.toLowerCase();
        serverRoute.method = serverRoute.method.toLowerCase();



        console.log(`☑ [${serverRoute.method.toUpperCase()}] ${serverRoute.route} | ${serverRoute.controllerName} > ${serverRoute.endpoint}`);


        Server.routes.push(serverRoute);

      });

    });

  }



}

