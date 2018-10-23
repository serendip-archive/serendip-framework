import { ServerRequestInterface, ServerResponseInterface } from "..";

export interface ServerMiddlewareInterface extends Function {

    (request: ServerRequestInterface, response: ServerResponseInterface,next : Function ,done : Function);

}