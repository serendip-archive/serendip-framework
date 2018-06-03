import { AccessTokenResponseInterface, AccessTokenRequestInterface } from "../interfaces";


export class UserTokenModel implements AccessTokenResponseInterface, AccessTokenRequestInterface {

    userId?: string;

    // Request
    grant_type: string;
    username?: string;
    password?: string;
    client: string;
    useragent: string;

    //Response
    token_type: string;
    expires_in: number;
    expires_at: number;
    refresh_token: string;
    access_token: string;

    groups: string[];




}