import * as cluster from 'cluster'


import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as useragent from 'useragent'

import * as controllers from './controllers'
import * as services from './services'

import * as http from 'http';

import { startOptions, start } from './Start';
import { ServiceInterface } from './services';
import { PromiseUtil } from './utils';

import * as topoSort from 'toposort'

/**
 * ServerRequest 
 */
export interface ServerRequest extends express.Request {

}


/**
 * ServerRequest 
 */
export interface ServerResponse extends express.Response {


}

export interface ControllerEndpointError {

  error: string;
  error_description: string;
  error_uri?: string;

}

export interface ControllerEndpointAction extends Function {

  /**
   * 
   * @param req ServerRequest
   * @param res ServerResponse
   * @param next Execute next action in array
   * @param done 
   */
  (req: ServerRequest, res: ServerResponse, next: Function, done: Function, model?: object)

}

export interface ControllerEndpoint {

  /**
   * Http Method put,post,get,delete
   */
  method: string;

  /**
   * framework router will use this instead of default route
   */
  customRoute?: string;

  /**
   *  Action Description
   */
  description?: string;

  /**
   * Series of actions to respond any request to this endpoint route
   */
  actions: ControllerEndpointAction[]

}


/**
 * routes to introduce to express :) 
 */
export interface serverRoute {

  method: string;
  route: string;
  controllerObject: object;
  controllerName: string;
  endpoint: string;

}



/**
 *  Will contain everything that we need from server
 */

export class Server {



  /**
   *  these will be available within the system
   */
  public static app: express.Application;


  /**
   * instance of process worker
   */
  public static worker: cluster.Worker;

  /**
   * routes which server router will respond to
   * and feel free to add your routes to it 
   */
  public static routes: serverRoute[];

  public static services: object;



  // usage : starting server from ./Start.js
  public static bootstrap(opts: startOptions, worker: cluster.Worker) {
    return new Server(opts, worker);
  }


  // passing worker from Start.js 
  constructor(opts: startOptions, worker: cluster.Worker) {

    var port: number = opts.port || parseInt(process.env.port);

    Server.worker = worker;
    Server.app = express();
    Server.routes = [];
    Server.services = {};


    this.middlewareConfig();

    this.routerConfig();


    Server.addRoutes(controllers, opts.controllers);


    Server.addServices(services, opts.services).then(() => {

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
  private async middlewareConfig() {

    Server.app.use((req: ServerRequest, res: ServerResponse, next) => {

      var ua = useragent.parse(req.headers["user-agent"].toString()).toString();

      console.log(`${req.method} [${req.path}] from "${req.ip}" ${ua}`);

      next();

    });

    Server.app.use(bodyParser.json());

  }


  public static async addServices(...serviceContainer) {


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

        var serviceObject: ServiceInterface = new servicesToStart[serviceName];

        Server.services[serviceName] = serviceObject;

        serviceObject.start().then(() => {

          console.log(`${serviceName} started .`);



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
  public static addRoutes(...controllerContainer) {


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

        console.log(controllerClassName);

        var objToRegister = new controllersToRegister[controllerClassName];

        // iterating trough controller endpoint in class
        Object.getOwnPropertyNames(objToRegister).forEach(function (controllerEndpointName) {


          var endpoint: ControllerEndpoint = objToRegister[controllerEndpointName];


          if (!endpoint)
            return;

          if (!endpoint.method || !endpoint.actions)
            return;


          // Defining controllerUrl for this controllerMethod
          var controllerUrl = `/api/${controllerClassName.replace('Controller', '')}/${controllerEndpointName}`;

          if (endpoint.customRoute)
            if (!endpoint.customRoute.startsWith('/'))
              endpoint.customRoute = '/' + endpoint.customRoute;


          var serverRoute: serverRoute = {
            route: endpoint.customRoute || controllerUrl,
            method: endpoint.method,
            endpoint: controllerEndpointName,
            controllerName: controllerClassName,
            controllerObject: objToRegister,
          };



          console.log(`route registered => [${serverRoute.method.toUpperCase()}] ${serverRoute.route} | ${serverRoute.controllerName} > ${serverRoute.endpoint}`);


          Server.routes.push(serverRoute);

        });

      });

    });

  }

  /** 
   * registering our Server.routes to express
  */
  private async routerConfig() {


    Server.app.use(function (req, res) {

      var requestReceived = Date.now();

      // finding controller by path
      var srvRoute: serverRoute = Server.routes.find((value) => {

        return value.route.toLowerCase() == req.path.toLowerCase() && value.method.trim().toLowerCase() == req.method.trim().toLowerCase();

      });
      


      // Check if controller exist and requested method matches 
      if (!srvRoute)
        return res.status(404).send('controller not found');

      // creating object from controllerClass 
      // Reason : basically because we need to run constructor
      var controllerObject = srvRoute.controllerObject;

      //controllerObject[srvRoute.function](req, res);
      var actions: ControllerEndpointAction[] = (controllerObject[srvRoute.endpoint].actions);

      // starting from first action
      var actionIndex = 0;


      var executeAction = function (passedModel) {
        actions[actionIndex](req, res, function next(model) {


          // Execute next
          actionIndex++;
          executeAction(model);


        }, function done() {

          res.end();
          console.log(`request answered in ${Date.now() - requestReceived}ms`)

        },
          passedModel);
      }

      // Execute first one
      executeAction(null);








    });


  }

}

