"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("./core");
const dotenv = require("dotenv");
const cluster = require("cluster");
const os_1 = require("os");
const events_1 = require("events");
function start(opts) {
    var workerEmitter = new events_1.EventEmitter();
    return new Promise((resolve, reject) => {
        dotenv.config();
        var cpuCount = opts.cpuCores || os_1.cpus().length;
        var stopForking = false;
        // if this is process
        if (cluster.isMaster) {
            var onClusterMsg = (msg) => {
                if (msg == "fork")
                    cluster.fork().on('message', onClusterMsg);
            };
            onClusterMsg('fork');
            cluster.on('exit', function (worker) {
                console.error('Worker %s has died! Creating a new one.', worker.id);
                if (!stopForking)
                    cluster.fork();
            });
        }
        else {
            core_1.Server.bootstrap(opts, cluster.worker, (err) => {
                if (err)
                    return reject(err);
                if (cluster.worker.id == cpuCount) {
                    resolve(cluster.workers);
                }
                else if (cluster.worker.id < cpuCount)
                    process.send('fork');
            });
        }
    });
}
exports.start = start;
