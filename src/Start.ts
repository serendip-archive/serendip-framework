import { Server, ServerOptionsInterface } from "./core";
import * as dotenv from 'dotenv';
import * as cluster from 'cluster';
import { cpus } from 'os';
import { EventEmitter } from 'events';

export function start(opts?: ServerOptionsInterface) {


    var workerEmitter = new EventEmitter();

    return new Promise((resolve, reject) => {

        dotenv.config();

        var cpuCount = opts.cpuCores || cpus().length;
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

        } else {
            Server.bootstrap(opts, cluster.worker, (err) => {


                if (err)
                    return reject(err);


                if (cluster.worker.id == cpuCount) {
                    resolve(cluster.worker);
                }
                else if (cluster.worker.id < cpuCount)
                    cluster.worker.send('fork');

            });

        }


    });





}

