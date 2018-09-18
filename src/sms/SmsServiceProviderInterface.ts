export interface SmsServiceProviderInterface {

    sendVerification(mobileNumber: string, code: string);
    send(mobileNumbers: string[], message);

}