import * as cluster from 'cluster'
import * as bodyParser from 'body-parser'


import * as http from 'http'


import * as controllers from '../Controllers'
import * as services from '../Services'


import * as Async from 'async'

import {
  ServerServiceInterface,
  ServerRouteInterface,
  ServerOptionsInterface,
  ServerEndpointInterface,
  ServerEndpointActionInterface,
  ServerRequest,
  ServerResponse,
  ServerRequestHelpers,
  ServerResponseHelpers
} from '.';


import * as topoSort from 'toposort'
import { ServerMiddlewareInterface } from './ServerMiddlewareInterface';
import { ServerRouter } from './ServerRouter';


/**
 *  Will contain everything that we need from server
 */

export class Server {


  /**
   * instance of process worker
   */
  public static worker: cluster.Worker;

  /**
   * routes which server router will respond to
   * and feel free to add your routes to it 
   */
  public static routes: ServerRouteInterface[];

  public static services: object;

  public static httpServer: http.Server;

  public static middlewares: ServerMiddlewareInterface[];



  // usage : starting server from ./Start.js
  public static bootstrap(opts: ServerOptionsInterface, worker: cluster.Worker) {
    return new Server(opts, worker);
  }



  // passing worker from Start.js 
  constructor(opts: ServerOptionsInterface, worker: cluster.Worker) {

    var port: number = opts.port || parseInt(process.env.port);

    Server.worker = worker;

    Server.services = {};

    Server.routes = [];
    Server.middlewares = opts.middlewares || [];

    

    Async.series([
      (cb) => this.addServices(services, opts.services).then(() => cb(null, null)),
      (cb) => this.addRoutes(controllers, opts.controllers).then(() => cb(null, null))
    ], () => {


      Server.httpServer = http.createServer(function(req: any, res: any)  {

        req = ServerRequestHelpers(req);
        res = ServerResponseHelpers(res);

        ServerRouter.routeIt(req, res);

      });


      Server.httpServer.listen(port, function () {

        console.log(`worker ${worker.id} running http server at port ${port}`);

      });
      // Listen to port after configs done



    });

  }


  
  private async addServices(...serviceContainer) {


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


    var sortedDependencies: string[] = topoSort(dependenciesToSort).reverse();
    return new Promise((resolve, reject) => {


      function startService(index) {

        var serviceName = sortedDependencies[index];

        var serviceObject: ServerServiceInterface = new servicesToStart[serviceName];

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
  private async addRoutes(...controllerContainer) {


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


          var endpoint: ServerEndpointInterface = objToRegister[controllerEndpointName];


          if (!endpoint)
            return;

          if (!endpoint.method || !endpoint.actions)
            return;


          // Defining controllerUrl for this controllerMethod
          var controllerUrl = `/api/${controllerClassName.replace('Controller', '')}/${controllerEndpointName}`;

          if (endpoint.customRoute)
            if (!endpoint.customRoute.startsWith('/'))
              endpoint.customRoute = '/' + endpoint.customRoute;


          var serverRoute: ServerRouteInterface = {
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



}

