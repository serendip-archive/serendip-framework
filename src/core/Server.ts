import chalk from "chalk";
import * as cluster from "cluster";
import * as ws from "ws";

import { ServerServiceInterface } from ".";
import { toposort } from "../utils";
import * as sUtil from "serendip-utility";
import { ServerOptionsInterface } from "./interfaces";

/**
 *  Will contain everything that we need from server
 */

export class Server {
  /**
   * instance of process worker
   */
  public static worker: cluster.Worker;

  public static dir: string;

  public static services: any = {};

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

  // passing worker from Start.js
  constructor(
    opts: ServerOptionsInterface,
    worker: cluster.Worker,
    callback?: Function
  ) {
    Server.opts = opts;

    // Cluster worker
    Server.worker = worker;

    if (!opts.services) opts.services = [];

    this.addServices(opts.services)
      .then(() => callback())
      .catch(e => callback(e));
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
        sv.dependencies.forEach((dep: any) => {
          dep = sUtil.text.capitalizeFirstLetter(dep);
          if (dependenciesToSort.indexOf([sv.name, dep]) === -1)
            dependenciesToSort.push([sv.name, dep]);
        });

      sUtil.functions.args(sv).forEach((dep: any) => {
        dep = sUtil.text.capitalizeFirstLetter(dep);
        if (dependenciesToSort.indexOf([sv.name, dep]) === -1)
          dependenciesToSort.push([sv.name, dep]);
      });

      servicesToStart[sv.name] = sv;
    });

    // TODO: replace toposort module with code :)
    var sortedDependencies: string[] = (toposort(
      dependenciesToSort
    ) as any).reverse();

    // if there is only one service topoSort will return empty array so we should push that one service ourselves
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
            `${serviceName} not imported as service in start method. it's a dependency of ` +
              dependenciesToSort
                .filter(p => p[1] == serviceName)
                .map(p => p[0])
                .join(",")
          );

        try {
          serviceObject = new servicesToStart[serviceName](
            ...dependenciesToSort
              .filter(p => p[0] === serviceName)
              .map(p => Server.services[p[1]])
          );
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
              var serviceDependencies = dependenciesToSort
                .filter(p => p[0] === serviceName)
                .map(p => p[1]);

              if (Server.opts.logging == "info")
                console.log(
                  chalk`${(index + 1)
                    .toString()
                    .padStart(2, " ")} of ${Object.keys(servicesToStart)
                    .length.toString()
                    .padStart(
                      2,
                      " "
                    )} {green ☑} ${serviceName} {gray depends on: ${serviceDependencies.toString() ||
                    "none"}}`
                );

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
}
