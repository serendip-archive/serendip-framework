import * as http from 'http'


export function ServerRequestHelpers(req: http.IncomingMessage | any) {


    req.useragent = () => {

        return req.headers["user-agent"].toString();

    };

    req.ip = () => {

        return req.connection.remoteAddress;

    };


    return req;

}