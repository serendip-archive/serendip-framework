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
  private async addServices(serviceClasses: any[]) {
    if (!serviceClasses) return;

    if (serviceClasses.length == 0) return;

    let serviceObjects: { [key: string]: ServerServiceInterface } = {};
    let unsortedDependencies = [];
    serviceClasses.forEach(sv => {
      if (!sv) return;

      if (typeof sv.dependencies !== "undefined" && sv.dependencies.length)
        sv.dependencies.forEach((dep: any) => {
          dep = sUtil.text.capitalizeFirstLetter(dep);
          if (unsortedDependencies.indexOf([sv.name, dep]) === -1)
            unsortedDependencies.push([sv.name, dep]);
        });

      sUtil.functions.args(sv).forEach((dep: any) => {
        dep = sUtil.text.capitalizeFirstLetter(dep);
        if (unsortedDependencies.indexOf([sv.name, dep]) === -1)
          unsortedDependencies.push([sv.name, dep]);
      });

      serviceObjects[sv.name] = sv;
    });

    // TODO: replace toposort module with code :)
    var sortedDependencies: string[] = (toposort(
      unsortedDependencies
    ) as any).reverse();

    // if there is only one service topoSort will return empty array so we should push that one service ourselves
    if (sortedDependencies.length == 0) {
      if (serviceClasses[0]) sortedDependencies.push(serviceClasses[0].name);
    }

    if (Server.opts.logging == "info")
      console.log(chalk.cyan`Starting server services...`);

    if (serviceClasses.length > 0)
      await this.startService(
        0,
        serviceObjects,
        sortedDependencies,
        unsortedDependencies
      );
  }

  /**
   * Will start services from Index to length of sortedDependencies
   * @param index Index of item in sortedDependencies to start
   * @param serviceObjects key value object that contains service objects and their names
   * @param sortedDependencies Service names sorted by dependency order
   */
  async startService(
    index: number,
    serviceObjects: { [key: string]: ServerServiceInterface },
    sortedDependencies: string[],
    unsortedDependencies: string[][]
  ) {
    const serviceName = sortedDependencies[index];

    let serviceDependencies =
      unsortedDependencies.filter(p => p[0] === serviceName).map(p => p[1]) ||
      [];

    if (serviceDependencies.length > 0) {
      serviceDependencies = serviceDependencies.reduceRight(
        (prev: any, current, currentIndex, array) => {
          if (typeof prev == "string") return [prev];

          if (prev.indexOf(current) == -1) return prev.concat([current]);

          return prev;
        }
      ) as any;
    }

    if (typeof serviceDependencies == "string")
      serviceDependencies = [serviceDependencies];

    if (!serviceName) return;

    var serviceObject: ServerServiceInterface;

    if (!serviceObjects[serviceName])
      throw `${serviceName} not imported as service in start method. it's a dependency of ` +
        unsortedDependencies
          .filter(p => p[1] == serviceName)
          .map(p => p[0])
          .join(",");

    try {
      serviceObject = new serviceObjects[serviceName](
        ...unsortedDependencies
          .filter(p => p[0] === serviceName)
          .map(p => Server.services[p[1]])
      );
    } catch (e) {
      throw chalk.red`Server Service Error in "${serviceName}"\n` + e.message;
    }

    Server.services[serviceName] = serviceObject;

    if (!serviceObject.start)
      return this.startService(
        index + 1,
        serviceObjects,
        sortedDependencies,
        unsortedDependencies
      );
    else {
      if (Server.opts.logging == "info")
        console.log(
          chalk`{grey ${(index + 1)
            .toString()
            .padStart(2, " ")} of ${Object.keys(serviceObjects)
            .length.toString()
            .padStart(
              2,
              ""
            )} starting ${serviceName} it depends on: ${serviceDependencies.join(
            ","
          ) || "none"}}`
        );

      await serviceObject.start();

      if (Server.opts.logging == "info")
        console.log(
          chalk`${(index + 1).toString().padStart(2, " ")} of${Object.keys(
            serviceObjects
          )
            .length.toString()
            .padStart(2, " ")} {green ☑} ${serviceName}`
        );

      if (sortedDependencies.length > index + 1)
        return this.startService(
          index + 1,
          serviceObjects,
          sortedDependencies,
          unsortedDependencies
        );

      return;
    }
  }
}
