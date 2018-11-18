export interface UserRegisterRequestInterface {

    username: string;
    password: string;
    mobileCountryCode?: string;
    mobile?: string;
    email?: string;

    extra?: any;


}