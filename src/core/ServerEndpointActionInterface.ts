import { ServerRequest, ServerResponse } from ".";

export interface ServerEndpointActionInterface extends Function {

    /**
     * 
     * @param req ServerRequest
     * @param res ServerResponse
     * @param next Execute next action in array
     * @param done 
     */
    (req: ServerRequest, res: ServerResponse, next: Function, done: Function, model?: object)

}