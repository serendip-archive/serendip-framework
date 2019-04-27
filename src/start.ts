/**
 * @module Start
 */
import { Server, ServerOptionsInterface } from "./server";
import * as cluster from "cluster";
import { cpus } from "os";
import { EventEmitter } from "events";


/**
 * Worker class is used to store static properties about worker and it's cluster.
 */
export class Worker {
  static others: number[] = [];

  static isMaster = cluster.isMaster;
  static isWorker = cluster.isWorker;
  static id = cluster.worker ? cluster.worker.id : null;
}

/**
 * 
 * @param opts Options to bootstrap and start the server. [[ServerOptionsInterface]]  
 */
export function start(opts?: ServerOptionsInterface) {
  if (!opts.services) opts.services = [];

  if (!opts.logging) opts.logging = "info";

  var workerEmitter = new EventEmitter();

  return new Promise((resolve, reject) => {
    var cpuCount = 1;
    //opts.cpuCores || cpus().length

    if (opts.cpuCores)
      if (
        opts.cpuCores
          .toString()
          .trim()
          .toLowerCase() == "max"
      )
        cpuCount = cpus().length;
      else cpuCount = parseInt(opts.cpuCores.toString());

    // if this is process
    if (cluster.isMaster && cpuCount > 1) {
      var onClusterMsg = msg => {
        if (msg == "fork") cluster.fork().on("message", onClusterMsg);
      };

      onClusterMsg("fork");

      setInterval(() => {
        for (const key in cluster.workers) {
          if (cluster.workers.hasOwnProperty(key)) {
            const element = cluster.workers[key];

            element.send({ workers: Object.keys(cluster.workers) });
          }
        }
      }, 1000);

      cluster.on("disconnect", function (worker) {
        if (opts.logging != "silent")
          console.error(
            "\n\tWorker %s has died! Creating a new one.",
            worker.id
          );
        cluster.fork();
      });
    } else {
      if (cluster.worker)
        cluster.worker.on("message", message => {
          if (message && message.workers) {
            Worker.others = message.workers.filter(p => p != cluster.worker.id);
          }
        });
      Server.bootstrap(opts, cluster.worker || { id: 0 }, err => {
        if (err) return reject(err);

        if (cpuCount == 1) resolve();
        else if (cluster.worker.id == cpuCount) {
          resolve(cluster.workers);
        } else if (cluster.worker.id < cpuCount) process.send("fork");
      });
    }
  });
}
