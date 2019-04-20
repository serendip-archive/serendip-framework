import * as http from "http";
import { TokenModel, ClientModel, UserModel } from "serendip-business-model";

/**
 * HttpRequest
 */
export interface HttpRequestInterface extends http.IncomingMessage {
  query: any;
  body: any;
  params: any;
  useragent(): string;
  ip(): string;
  user?: UserModel;
  userToken?: TokenModel;
}
