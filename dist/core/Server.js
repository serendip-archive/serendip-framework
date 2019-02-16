"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const utils_1 = require("../utils");
const sUtil = require("serendip-utility");
/**
 *  Will contain everything that we need from server
 */
class Server {
    // passing worker from Start.js
    constructor(opts, worker, callback) {
        Server.opts = opts;
        // Cluster worker
        Server.worker = worker;
        if (!opts.services)
            opts.services = [];
        this.addServices(opts.services)
            .then(() => callback())
            .catch(e => callback(e));
    }
    // usage : starting server from ./Start.js
    static bootstrap(opts, worker, serverStartCallback) {
        return new Server(opts, worker, serverStartCallback);
    }
    // FIXME: needs refactor
    async addServices(servicesToRegister) {
        if (!servicesToRegister)
            return;
        if (servicesToRegister.length == 0)
            return;
        var servicesToStart = [];
        var dependenciesToSort = [];
        servicesToRegister.forEach(sv => {
            if (!sv)
                return;
            if (typeof sv.dependencies !== "undefined" && sv.dependencies.length)
                sv.dependencies.forEach((dep) => {
                    dep = sUtil.text.capitalizeFirstLetter(dep);
                    if (dependenciesToSort.indexOf([sv.name, dep]) === -1)
                        dependenciesToSort.push([sv.name, dep]);
                });
            sUtil.functions.args(sv).forEach((dep) => {
                dep = sUtil.text.capitalizeFirstLetter(dep);
                if (dependenciesToSort.indexOf([sv.name, dep]) === -1)
                    dependenciesToSort.push([sv.name, dep]);
            });
            servicesToStart[sv.name] = sv;
        });
        // TODO: replace toposort module with code :)
        var sortedDependencies = utils_1.toposort(dependenciesToSort).reverse();
        // if there is only one service topoSort will return empty array so we should push that one service ourselves
        if (sortedDependencies.length == 0) {
            if (servicesToRegister[0])
                sortedDependencies.push(servicesToRegister[0].name);
        }
        return new Promise((resolve, reject) => {
            if (Server.opts.logging == "info")
                console.log(chalk_1.default.cyan `Starting server services...`);
            function startService(index) {
                var serviceName = sortedDependencies[index];
                if (!serviceName)
                    resolve();
                var serviceObject;
                if (!servicesToStart[serviceName])
                    return reject(`${serviceName} not imported as service in start method. it's a dependency of ` +
                        dependenciesToSort
                            .filter(p => p[1] == serviceName)
                            .map(p => p[0])
                            .join(","));
                try {
                    serviceObject = new servicesToStart[serviceName](...dependenciesToSort
                        .filter(p => p[0] === serviceName)
                        .map(p => Server.services[p[1]]));
                }
                catch (e) {
                    e.message =
                        chalk_1.default.red `Server Service Error in "${serviceName}"\n` + e.message;
                    reject(e);
                }
                Server.services[serviceName] = serviceObject;
                if (!serviceObject.start)
                    startService(index + 1);
                else
                    serviceObject
                        .start()
                        .then(() => {
                        var serviceDependencies = dependenciesToSort
                            .filter(p => p[0] === serviceName)
                            .map(p => p[1]);
                        if (Server.opts.logging == "info")
                            console.log(chalk_1.default `${(index + 1)
                                .toString()
                                .padStart(2, " ")} of ${Object.keys(servicesToStart)
                                .length.toString()
                                .padStart(2, " ")} {green ☑} ${serviceName} {gray depends on: ${serviceDependencies.toString() ||
                                "none"}}`);
                        if (sortedDependencies.length > index + 1)
                            startService(index + 1);
                        else
                            resolve();
                    })
                        .catch(err => {
                        reject(err);
                    });
            }
            if (servicesToRegister.length > 0)
                startService(0);
        });
    }
}
Server.services = {};
exports.Server = Server;
