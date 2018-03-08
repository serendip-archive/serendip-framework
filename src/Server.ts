import * as async from 'async'
import * as cluster from 'cluster'


import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as useragent from 'useragent'
import * as routes from './routes'

import { MongoClient, Db, ObjectID } from 'mongodb'
import { requestAnswered } from './Start'
import { DbService, DbCollectionNames } from './services'
import { UserModel } from './models'



// Creating ServerRequest and ServerResponse to make property autocomplete available in project

export interface ServerRequest extends express.Request {

  ipv4: string;

}

export interface ServerResponse extends express.Response {

}

export interface ServerRoute {

  path: string;
  class: string;
  function: string;

}

// Will contain everything that we need from server
export class Server {



  // these will be available within the system
  public static app: express.Application;
  public static db: Db;
  public static worker: cluster.Worker;
  public static Routes: ServerRoute[];


  // usage : starting server from ./Start.js
  public static bootstrap(worker: cluster.Worker) {
    return new Server(worker);
  }


  // passing worker from Start.js 
  constructor(worker: cluster.Worker) {

    var port: number = parseInt(process.env.port);

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


  private async middlewareConfig() {

    Server.app.use((req: ServerRequest, res: ServerResponse, next) => {

      var ua = useragent.parse(req.headers["user-agent"].toString()).toString();
      req.ipv4 = req.ip.split(':').reverse()[0];

      console.log(`${req.method} [${req.path}] from "${req.ipv4}" ${ua}`);

      next();

    });

    Server.app.use(bodyParser.json());

  }

  // filing Server.db that will use in entire system
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



  // configuring express routes from ./routes folder
  // Notice : all routes should end with 'Route'
  // Notice : route methods should start with 'get' or 'post'
  private getServerRoutes(): ServerRoute[] {

    var _serverRoutes: ServerRoute[] = [];

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
        var routeUrl = `/api/${routeClassName.replace('Route', '')}/${routeFunction.replace("get","").replace("post","")}`;
        _serverRoutes.push({ path: routeUrl, function: routeFunction, class: routeClassName });
      });

    });



    return _serverRoutes;

  }

  private async routeConfig() {


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

