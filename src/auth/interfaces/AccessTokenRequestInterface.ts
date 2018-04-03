export interface AccessTokenRequestInterface {


    grant_type: string;
    username?: string;
    password?: string;

    client: string;
    useragent: string;


}