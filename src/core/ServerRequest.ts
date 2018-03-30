import * as http from 'http'
import * as useragent from 'useragent'

/**
 * ServerRequest 
 */
export interface ServerRequest extends http.IncomingMessage {

    query: any;
    body: any;
    params: any;
    useragent();
    ip();
}

export function ServerRequestHelpers(req: http.IncomingMessage | any) {


    req.useragent = () => {

        return req.headers["user-agent"].toString();

    };

    req.ip = () => {

        return req.connection.remoteAddress;

    };


    return req;

}