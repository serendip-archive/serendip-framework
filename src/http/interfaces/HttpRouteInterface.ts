/**
 *  @module Http
 */

/**
 * routes to introduce to HttpService 
 */
export interface HttpRouteInterface {

    method: string;
    route: string;
    controllerObject: object;
    controllerName: string;
    endpoint: string;
    publicAccess:boolean;
    isStream : boolean;
  
  }
  
  