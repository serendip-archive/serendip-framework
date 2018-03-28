"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("./core");
const dotenv = require("dotenv");
const cluster = require("cluster");
const os_1 = require("os");
function start(opts) {
    dotenv.config();
    var cpuCount = opts.cpuCores || os_1.cpus().length;
    // if this is process
    if (cluster.isMaster) {
        console.log('Forking workers ...');
        for (var i = 0; i < cpuCount; i++) {
            console.log('Creating worker ' + (i + 1));
            cluster.fork();
        }
        cluster.on('exit', function (worker) {
            console.error('Worker %s has died! Creating a new one.', worker.id);
            cluster.fork();
        });
    }
    else {
        core_1.Server.bootstrap(opts, cluster.worker);
    }
}
exports.start = start;
