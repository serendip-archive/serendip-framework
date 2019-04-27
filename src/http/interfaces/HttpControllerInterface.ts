/**
 *  @module Http
 */

import { HttpRequestInterface } from "./HttpRequestInterface";
import { HttpResponseInterface } from "./HttpResponseInterface";

 

export interface HttpControllerInterface {
  onRequest?(
    req: HttpRequestInterface,
    res: HttpResponseInterface,
    next?: Function,
    done?: Function,
    model?: any
  );
}
