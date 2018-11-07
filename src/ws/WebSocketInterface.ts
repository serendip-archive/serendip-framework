import * as WS from "ws";
import { UserTokenModel } from "../auth";

export interface WebSocketInterface extends WS {
  token?: UserTokenModel;
  path?: string;
}
