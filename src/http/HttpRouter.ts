/**
 *  @module Http
 */

 import * as pathMatch from "path-match";
import * as url from "url";
import * as qs from "qs";
import { AuthService } from "..";
import * as path from "path";
import * as fs from "fs";
import * as http from "http";
import * as _ from "underscore";
import { HttpMiddlewareInterface } from "./interfaces/HttpMiddlewareInterface";
import { HttpRouteInterface } from "./interfaces/HttpRouteInterface";
import { HttpResponseInterface } from "./interfaces/HttpResponseInterface";
import { HttpRequestInterface } from "./interfaces/HttpRequestInterface";
import { HttpEndpointActionInterface } from "./interfaces/HttpEndpointActionInterface";
import { Server } from "../server";
import { HttpError } from ".";

export class HttpRouter {
  constructor() {}

  static routerPathMatcher = pathMatch({
    // path-to-regexp options
    sensitive: false,
    strict: false,
    end: false
  });

  static findSrvRoute(
    req,
    routes: HttpRouteInterface[],
    matchMethod: boolean
  ): HttpRouteInterface {
    var parsedUrl = url.parse(req.url);
    var path = parsedUrl.pathname;

    // finding controller by path
    var srvRoute: HttpRouteInterface = routes.find(route => {
      // Check if controller exist and requested method matches

      var matcher = HttpRouter.routerPathMatcher(route.route);

      var params = matcher(path);

      if (params !== false) {
       // req.query = qs.parse(parsedUrl.query);
        req.params = params;

        if (matchMethod) {
          if (route.method.toLowerCase() != req.method.toLowerCase())
            return false;
        }

        return true;
      }

      return false;
    });

    return srvRoute;
  }

  // FIXME: needs refactor
  static executeRoute(
    srvRoute: HttpRouteInterface,
    middlewares: HttpMiddlewareInterface[],
    req: HttpRequestInterface,
    res: HttpResponseInterface
  ): Promise<any> {
    // creating object from controllerClass
    // Reason : basically because we need to run constructor
    var controllerObject = srvRoute.controllerObject;

    var actions: HttpEndpointActionInterface[] = _.clone(
      controllerObject[srvRoute.endpoint].actions
    );

    if (controllerObject["onRequest"])
      actions.unshift(controllerObject["onRequest"]);

    middlewares.forEach(middle => actions.unshift(middle));

    // starting from first action
    return HttpRouter.executeActions(req, res, null, actions, 0);
  }
  static executeActions(
    req,
    res: HttpResponseInterface,
    passedModel,
    actions,
    actionIndex
  ) {
    return new Promise((resolve, reject) => {
      var action;
      try {
        action = actions[actionIndex](
          req,
          res,
          //next
          model => {
            if (model)
              if (model.constructor)
                if (model.constructor.name == "HttpError") {
                  reject(model);
                  if (!res.finished) {
                    res.statusCode = model.code || 500;
                    res.statusMessage =
                      model.message || model.Message || model.description;
                    res.json(_.pick(model, "code", "description"));
                  }

                  return;
                }

            // Execute next
            actionIndex++;

            if (actions.length == actionIndex) {
              return resolve(model);
            }
            try {
              HttpRouter.executeActions(req, res, model, actions, actionIndex);
            } catch (error) {}
          },
          // done()
          (statusCode?: number, statusMessage?: string) => {
            res.statusCode = statusCode || 200;
            res.statusMessage = statusMessage;
            res.end();
            resolve();
          },
          passedModel
        );
      } catch (error) {
        reject(error);
      }
      if (action && action.then)
        action
          .then(data => {})
          .catch((e: Error) => {
            reject(new HttpError(500, e ? e.message : ""));
          });
    }).catch(e => {
      res.statusCode = e.code || 500;
      res.statusMessage = e.message || e;
      res.end();
    });
  }

  static routeIt(
    req: HttpRequestInterface,
    res: HttpResponseInterface,
    middlewares: HttpMiddlewareInterface[],
    srvRoute: HttpRouteInterface
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!srvRoute) {
        // Check if controller exist and requested method matches
        var err = new HttpError(
          404,
          `[${req.method.toUpperCase()} ${req.url}] route not found !`
        );
        reject(err);
        return;
      }

      var authService: AuthService = Server.services["AuthService"];

      if (!authService)
        HttpRouter.executeRoute(srvRoute, middlewares, req, res)
          .then(data => {
            resolve(data);
          })
          .catch(e => {
            reject(e);
          });
      else
        authService
          .authorizeRequest(
            req,
            srvRoute.controllerName,
            srvRoute.endpoint,
            srvRoute.publicAccess
          )
          .then(() => {
            HttpRouter.executeRoute(srvRoute, middlewares, req, res)
              .then(data => {
                resolve(data);
              })
              .catch(e => {
                reject(e);
              });
          })
          .catch(e => {
            reject(e);
          });
    });
  }
}
