import { Server } from ".";
import * as _ from "underscore";
import { HttpService } from "../http/HttpService";
import { HttpEndpointInterface } from "../http/interfaces/HttpEndpointInterface";
import { AuthService } from "../auth";
import { HttpError } from "..";

export class ServerController {
  constructor(
    private httpService: HttpService,
    private authService: AuthService
  ) {}

  clusterTesting: HttpEndpointInterface = {
    publicAccess: true,
    route: "/api/server/cluster-testing",
    method: "get",
    actions: [
      (req, res, next, done) => {
        res.write("received in worker " + Server.worker.id);
        res.end();
      }
    ]
  };

  routes: HttpEndpointInterface = {
    method: "get",
    publicAccess: true,
    actions: [
      (req, res, next, done) => {
        setTimeout(() => {
          next();
        }, 200);
      },
      (req, res, next, done) => {
        // var model = _.map(this.httpService.routes, route => {
        //   route = _.omit(route, "controllerObject");

        //   return route;
        // });
        // res.json(model);
        done(200);
      }
    ]
  };

  throw: HttpEndpointInterface = {
    method: "get",
    publicAccess: true,
    actions: [
      (req, res, next, done) => {
        throw new Error("fake error");
      },
      (req, res, next, done) => {
        // var model = _.map(this.httpService.routes, route => {
        //   route = _.omit(route, "controllerObject");

        //   return route;
        // });
        // res.json(model);
        done(200);
      }
    ]
  };

  nextError: HttpEndpointInterface = {
    method: "get",
    publicAccess: true,
    actions: [
      (req, res, next, done) => {
        next(new HttpError(500, "just checking"));
      },
      (req, res, next, done) => {
        done(200);
      }
    ]
  };

  doneError: HttpEndpointInterface = {
    method: "get",
    publicAccess: true,
    actions: [
      (req, res, next, done) => {
        done("500", "done error");
      },
      (req, res, next, done) => {
        done(200);
      }
    ]
  };

  services: HttpEndpointInterface = {
    method: "get",
    publicAccess: true,
    actions: [
      (req, res, next, done) => {
        var model = _.keys(Server.services);
        res.json(model);
      }
    ]
  };
}
