/**
 *  @module Sms
 */

 export interface SmsServiceProviderInterface {
  sendAuthCode(  mobileNumber: string,
    code: string,
    useragent?: string,
    ip?: string);
  send(mobileNumbers: string[], message);
}
