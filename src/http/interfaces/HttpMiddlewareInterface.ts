/**
 *  @module Http
 */

 import { HttpRequestInterface } from "./HttpRequestInterface";
import { HttpResponseInterface } from "./HttpResponseInterface";

export interface HttpMiddlewareInterface extends Function {

    (request: HttpRequestInterface, response: HttpResponseInterface,next : Function ,done : Function);

}