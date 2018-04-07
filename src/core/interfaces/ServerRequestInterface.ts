import * as http from 'http'
import { UserModel, UserTokenModel } from '../..';

/**
 * ServerRequest 
 */
export interface ServerRequestInterface extends http.IncomingMessage {

    query: any;
    body: any;
    params: any;
    useragent();
    ip();
    client();
    user?: UserModel;
    userToken?: UserTokenModel;
}
