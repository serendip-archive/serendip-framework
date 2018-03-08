import { Server } from "./Server";
import * as dotenv from 'dotenv';
import * as cluster from 'cluster';
import { cpus } from 'os';
import * as models from './models';

export var requestAnswered = 0;

export function start() {

    dotenv.config();

    var cpuCount = 1 ||  cpus().length;

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

    } else {

        Server.bootstrap(cluster.worker);

    }






}

