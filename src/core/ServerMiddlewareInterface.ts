import { ServerResponse, ServerRequest } from ".";

export interface ServerMiddlewareInterface extends Function {

    (request: ServerRequest, response: ServerResponse,next : Function ,done : Function);

}