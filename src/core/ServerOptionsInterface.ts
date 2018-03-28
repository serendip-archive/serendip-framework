import { ServerMiddlewareInterface } from "./ServerMiddlewareInterface";

export interface ServerOptionsInterface {

    services?: any;
    controllers?: any;
    middlewares?: [ServerMiddlewareInterface]
    port?: number;
    cpuCores?: number;
}