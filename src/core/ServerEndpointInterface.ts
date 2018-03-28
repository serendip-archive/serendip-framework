import { ServerEndpointActionInterface } from ".";

export interface ServerEndpointInterface {

    /**
     * Http Method put,post,get,delete
     */
    method: string;
  
    /**
     * framework router will use this instead of default route
     */
    customRoute?: string;
  
    /**
     *  Action Description
     */
    description?: string;
  
    /**
     * Series of actions to respond any request to this endpoint route
     */
    actions: ServerEndpointActionInterface[]
  
  }