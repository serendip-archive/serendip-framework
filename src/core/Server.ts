import * as cluster from 'cluster'
import * as bodyParser from 'body-parser'


import * as http from 'http'


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


import * as topoSort from 'toposort'
import { ServerRouter } from './ServerRouter';


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

  public static services: object = {};

  public static httpServer: http.Server;

  public static middlewares: any[];



  // usage : starting server from ./Start.js
  public static bootstrap(opts: ServerOptionsInterface, worker: cluster.Worker, serverStartCallback?: Function) {
    return new Server(opts, worker, serverStartCallback);
  }



  // passing worker from Start.js 
  constructor(opts: ServerOptionsInterface, worker: cluster.Worker, serverStartCallback?: Function) {

    var port: number = opts.port || parseInt(process.env.port);

    // Cluster worker
    Server.worker = worker;


    Server.middlewares = opts.middlewares || [];

    // adding basic middlewares to begging of middlewares array
    Server.middlewares.unshift(bodyParser.json());
    Server.middlewares.unshift(bodyParser.urlencoded({ extended: false }));


    Async.series([
      (cb) => this.addServices(opts.services).then(() => cb(null, null)).catch((e) => {
        if (serverStartCallback)
          serverStartCallback(e);
        else
          console.error(e);

      }),
      (cb) => this.addRoutes(opts.controllers).then(() => cb(null, null)).catch((e) => {
        if (serverStartCallback)
          serverStartCallback(e);
        else
          console.error(e);
      })
    ], () => {


      Server.httpServer = http.createServer(function (req: any, res: any) {
        var requestReceived = Date.now();

        req = ServerRequestHelpers(req);
        res = ServerResponseHelpers(res);

        var logString = () => {

          return `[${req.method}] "${req.url}" by [${req.ip()}/${req.user ? req.user.username : 'unauthorized'}] from [${req.useragent()}] answered in ${Date.now() - requestReceived}ms`;

        };

        ServerRouter.routeIt(req, res).then(() => {

          // Request successfully responded
          console.info(`${logString()}`);

        }).catch((e) => {

          console.error(`${logString()} => ${e.message}`);


        });



      });


      Server.httpServer.listen(port, function () {

        console.log(`worker ${worker.id} running http server at port ${port}`);
        if (serverStartCallback)
          serverStartCallback();

      });
      // Listen to port after configs done



    });

  }



  private async addServices(servicesToRegister) {


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
        var controllerUrl = `/api/${controller.name.replace('Controller', '')}/${controllerEndpointName}`;

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

