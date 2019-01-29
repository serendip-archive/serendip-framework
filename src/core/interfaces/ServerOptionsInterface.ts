import { ServerMiddlewareInterface } from "./ServerMiddlewareInterface";
import { ServerServiceInterface } from "..";
import { ServerControllerInterface } from "./ServerControllerInterface";

export interface ServerOptionsInterface {
  // server services to start.
  services?: ServerServiceInterface[];

  // controllers responsible for http(s) incoming requests
  controllers?: any[];

  // middle wares to run before anything proceed
  beforeMiddlewares?: ServerMiddlewareInterface[];

  // middle wares to run on http(s) incoming requests
  middlewares?: ServerMiddlewareInterface[];

  // port for http server to listen
  httpPort?: number;

  // port for https server to listen
  httpsPort?: number;

  // Number CPU cores for cpu clustering. set to 'max' for running on all cpu cores
  cpuCores?: number | string;

  // path for serving static files
  staticPath?: string;

  // path for ssl cert file
  cert?: string;

  // path for ssl key file
  key?: string;

  // set to true for enabling http to https redirect
  httpsOnly?: boolean;

  // this will set Access-Control-Allow-Origin
  cors?: string;
  logging?: "info" | "warn" | "error" | "silent";


  // Set to true for disabling http(s) server. this is useful when you are building client apps without a http(s) server
  clientMode?: boolean;

}
