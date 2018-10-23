
export interface AccessTokenResponseInterface {


     token_type: string;

    // Expires in seconds
     expires_in: number;

    // Expires at date number
     expires_at: number;

     refresh_token: string;

     access_token: string;


}