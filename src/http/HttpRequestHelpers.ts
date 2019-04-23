import * as http from "http";
import * as ua from "useragent";
import * as reqIp from "request-ip";
import { querystring } from "serendip-utility"

export function HttpRequestHelpers(req: http.IncomingMessage | any) {

  req.query = querystring.toObject(req.url);

  req.useragent = () => {
    if (!req.headers["user-agent"]) return "";

    return ua.parse(req.headers["user-agent"].toString());
  };

  req.client = () => {
    if (req.headers["clientid"] != undefined)
      return req.headers["clientid"].toString();
    else return null;
  };

  req.ip = () => {
    return reqIp.getClientIp(req);
  };

  if (!req.body) req.body = {};

  return req;
}
