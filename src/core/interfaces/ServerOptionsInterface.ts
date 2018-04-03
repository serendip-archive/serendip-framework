import { ServerMiddlewareInterface } from "./ServerMiddlewareInterface";
import { ServerServiceInterface } from "..";

export interface ServerOptionsInterface {

    services?: any;
    controllers?: any;
    middlewares?: [ServerMiddlewareInterface]
    port?: number;
    cpuCores?: number;
    
}