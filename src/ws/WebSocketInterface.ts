import * as WS from "ws";
import { TokenModel } from "../auth";

export interface WebSocketInterface extends WS {
  token?: TokenModel;
  path?: string;
}
