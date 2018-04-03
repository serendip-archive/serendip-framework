import * as http from 'http'


export function ServerRequestHelpers(req: http.IncomingMessage | any) {


    req.useragent = () => {

        return req.headers["user-agent"].toString();

    };

    req.client = () => {

        if (req.headers["user-client"] != undefined)
            return req.headers["user-client"].toString();
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