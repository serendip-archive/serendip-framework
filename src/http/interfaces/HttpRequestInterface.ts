import * as http from "http";
import { TokenModel, ClientModel, UserModel } from "../../auth";

/**
 * HttpRequest
 */
export interface HttpRequestInterface extends http.IncomingMessage {
  query: any;
  body: any;
  params: any;
  useragent(): string;
  ip(): string;
  client?: ClientModel;
  user?: UserModel;
  userToken?: TokenModel;
}
