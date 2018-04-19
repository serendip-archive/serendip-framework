import { ServerRequestInterface, ServerResponseInterface, ServerEndpointActionInterface } from "..";

export interface ServerControllerInterface {

    onRequest?(req: ServerRequestInterface, res: ServerResponseInterface, next?: Function, done?: Function, model?: any);




}