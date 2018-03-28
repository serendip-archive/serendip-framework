import * as http from 'http'
import * as useragent from 'useragent'

/**
 * ServerRequest 
 */
export interface ServerRequest extends http.IncomingMessage {

    params : object;
    useragent();

}

export function ServerRequestHelpers(req: http.IncomingMessage | any) {


    req.useragent = () => {

        return useragent.parse(req.headers["user-agent"].toString());

    };


    return req;

}