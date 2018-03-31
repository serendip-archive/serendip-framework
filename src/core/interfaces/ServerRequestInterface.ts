import * as http from 'http'

/**
 * ServerRequest 
 */
export interface ServerRequestInterface extends http.IncomingMessage {

    query: any;
    body: any;
    params: any;
    useragent();
    ip();
}
