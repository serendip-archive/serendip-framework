import { HttpRequestInterface } from "./HttpRequestInterface";
import { HttpResponseInterface } from "./HttpResponseInterface";

export interface HttpEndpointActionInterface extends Function {
  /**
   *
   * @param req HttpRequest
   * @param res HttpResponse
   * @param next Execute next action in array
   * @param done
   */
  (
    req: HttpRequestInterface,
    res: HttpResponseInterface,
    next?: Function,
    done?: Function,
    model?: any
  );
}
