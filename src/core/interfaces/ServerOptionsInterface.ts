import { ServerServiceInterface } from "..";

export interface ServerOptionsInterface {
  // server services to start.
  services?: ServerServiceInterface[] | any[];

  // Number CPU cores for cpu clustering. set to 'max' for running on all cpu cores
  cpuCores?: number | string;

  logging?: "info" | "warn" | "error" | "silent";

  // Set to true for disabling http(s) server. this is useful when you are building client apps without a http(s) server
  clientMode?: boolean;
}
