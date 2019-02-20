import * as WS from "ws";
import { TokenModel } from "serendip-business-model";

export interface WebSocketInterface extends WS {
  token?: TokenModel;
  path?: string;

  query?: any;
}
