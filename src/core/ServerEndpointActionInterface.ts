import { ServerRequestInterface, ServerResponseInterface } from ".";

export interface ServerEndpointActionInterface extends Function {

    /**
     * 
     * @param req ServerRequest
     * @param res ServerResponse
     * @param next Execute next action in array
     * @param done 
     */
    (req: ServerRequestInterface, res: ServerResponseInterface, next: Function, done: Function, model?: object)

}