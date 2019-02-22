export interface ServerServiceInterface {
  start?(): Promise<any>;

  // optional array of service names your server dependent on and imported in serendip start
  dependencies?: string[];

  // private variable to hold options value
  options?: any;

  // method to set configuration
  configure?(options: any): void;
}
