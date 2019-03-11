"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const cluster = require("cluster");
const os_1 = require("os");
const events_1 = require("events");
class Worker {
}
Worker.others = [];
Worker.isMaster = cluster.isMaster;
Worker.isWorker = cluster.isWorker;
Worker.id = cluster.worker ? cluster.worker.id : null;
exports.Worker = Worker;
function start(opts) {
    if (!opts.services)
        opts.services = [];
    if (!opts.logging)
        opts.logging = "info";
    var workerEmitter = new events_1.EventEmitter();
    return new Promise((resolve, reject) => {
        var cpuCount = 1;
        //opts.cpuCores || cpus().length
        if (opts.cpuCores)
            if (opts.cpuCores
                .toString()
                .trim()
                .toLowerCase() == "max")
                cpuCount = os_1.cpus().length;
            else
                cpuCount = parseInt(opts.cpuCores.toString());
        // if this is process
        if (cluster.isMaster && cpuCount > 1) {
            var onClusterMsg = msg => {
                if (msg == "fork")
                    cluster.fork().on("message", onClusterMsg);
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
                    console.error("\n\tWorker %s has died! Creating a new one.", worker.id);
                cluster.fork();
            });
        }
        else {
            if (cluster.worker)
                cluster.worker.on("message", message => {
                    if (message && message.workers) {
                        Worker.others = message.workers.filter(p => p != cluster.worker.id);
                    }
                });
            server_1.Server.bootstrap(opts, cluster.worker || { id: 0 }, err => {
                if (err)
                    return reject(err);
                if (cpuCount == 1)
                    resolve();
                else if (cluster.worker.id == cpuCount) {
                    resolve(cluster.workers);
                }
                else if (cluster.worker.id < cpuCount)
                    process.send("fork");
            });
        }
    });
}
exports.start = start;
