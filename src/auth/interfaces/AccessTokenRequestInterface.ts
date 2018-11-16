export interface AccessTokenRequestInterface {


    grant_type: string;
    username?: string;
    password?: string;

    clientId?: string;
    clientSecret?: string;
    useragent: string;


}