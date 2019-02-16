"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("./core");
const cluster = require("cluster");
const os_1 = require("os");
const events_1 = require("events");
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
        var stopForking = false;
        // if this is process
        if (cluster.isMaster && cpuCount > 1) {
            var onClusterMsg = msg => {
                if (msg == "fork")
                    cluster.fork().on("message", onClusterMsg);
            };
            onClusterMsg("fork");
            cluster.on("exit", function (worker) {
                if (opts.logging != "silent")
                    console.error("Worker %s has died! Creating a new one.", worker.id);
                if (!stopForking)
                    cluster.fork();
            });
        }
        else {
            core_1.Server.bootstrap(opts, cluster.worker || { id: 0 }, err => {
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
