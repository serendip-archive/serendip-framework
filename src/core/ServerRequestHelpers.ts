import * as http from 'http'
import * as ua from 'useragent'

export function ServerRequestHelpers(req: http.IncomingMessage | any) {


    req.useragent = () => {

        return ua.parse(req.headers["user-agent"].toString());

    };

    req.client = () => {

        if (req.headers["client"] != undefined)
            return req.headers["client"].toString();
        else
            return null;
    };

  
    req.ip = () => {

        return req.connection.remoteAddress;

    };

    if (!req.body)
        req.body = {};

    return req;

}