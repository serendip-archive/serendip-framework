import * as async from 'async'
import * as cluster from 'cluster'


import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as useragent from 'useragent'

import * as controllers from './controllers'

import { MongoClient, Db, ObjectID } from 'mongodb'
import { DbService, DbCollectionNames } from './services'
import * as http from 'http';
import { startOptions } from './Start';


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
export interface serverRouteInterface {

  method: string;
  route: string;
  controller: any;
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
   * Instance of mongodb database
   */
  public static db: Db;
  /**
   * instance of process worker
   */
  public static worker: cluster.Worker;

  /**
   * routes which server router will respond to
   * and feel free to add your routes to it 
   */
  public static routes: serverRouteInterface[];


  // usage : starting server from ./Start.js
  public static bootstrap(opts: startOptions, worker: cluster.Worker) {
    return new Server(opts, worker);
  }


  // passing worker from Start.js 
  constructor(opts: startOptions, worker: cluster.Worker) {

    var port: number = parseInt(process.env.port);

    Server.worker = worker;
    Server.app = express();
    Server.routes = [];




    // Running configs as series
    async.series([this.dbConfig, this.middlewareConfig, this.controllerConfig], () => {


      Server.setServerRoutes(controllers);

      // Set controllers from Start
      if (opts.controllersToRegister)
        Server.setServerRoutes(opts.controllersToRegister)


      // console.log(Server.controllers);
      // Listen to port after configs done
      Server.app.listen(opts.port || port,  () => {

        console.log(`worker ${Server.worker.id} running http server at port ${port}`);

      });

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

  /**
   *  filing Server.db that will use in entire system
   */
  private async dbConfig() {


    // Reading these two from .env file
    var mongoUrl: string = process.env.mongoUrl;
    var dbName: string = process.env.mongoDb;

    // Creating mongoDB client from mongoUrl
    var mongoClient = await MongoClient.connect(mongoUrl);

    Server.db = mongoClient.db(dbName);

    // Checking any collection that not exist in db and then creating them
    DbService.createCollectionsIfNotExists();



  }



  /**
  * Add controllers to express router
  * Notice : all controllers should end with 'Controller'
  * Notice : controller methods should start with requested method ex : get,post,put,delete
  */
  public static setServerRoutes(controllersToRegister: any): serverRouteInterface[] {



    var _serverControllers: serverRouteInterface[] = [];



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

        var endpoint: ControllerEndpoint = objToRegister[controllerEndpointName];

        if (!endpoint.method || !endpoint.actions)
          return;


        // Defining controllerUrl for this controllerMethod
        var controllerUrl = `/api/${controllerClassName.replace('Controller', '')}/${controllerEndpointName}`;

        if (endpoint.customRoute)
          if (!endpoint.customRoute.startsWith('/'))
            endpoint.customRoute = '/' + endpoint.customRoute;


        var serverRoute: serverRouteInterface = {
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
  private async controllerConfig() {


    Server.app.use(function (req, res) {

      var requestReceived = Date.now();

      // finding controller by path
      var srvRoute : serverRouteInterface = Server.routes.find((value) => {

        return value.route.toLowerCase() == req.path.toLowerCase();

      });


      // Check if controller exist and requested method matches 
      if (!srvRoute || srvRoute.method.trim().toLowerCase() != req.method.trim().toLowerCase())
        return res.status(404).send('controller not found');

      // creating object from controllerClass 
      // Reason : basically because we need to run constructor
      var controllerObject = new srvRoute.controller();

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

