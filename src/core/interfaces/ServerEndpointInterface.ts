import { ServerEndpointActionInterface } from "..";

export interface ServerEndpointInterface {

  /**
   * Http Method put,post,get,delete
   */
  method: string;

  /**
   * framework router will use this instead of default route
   */
  route?: string;

  isStream?: boolean;


  /**
   *  Action Description
   */
  description?: string;

  /**
   * Series of actions to respond any request to this endpoint route
   */
  actions: ServerEndpointActionInterface[]

  /**
   * is this endpoint publicly accessible by anyone on net
   */
  publicAccess?: boolean;
}