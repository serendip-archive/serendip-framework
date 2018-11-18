export interface SmsServiceProviderInterface {
  sendAuthCode(mobileNumber: string, code: string);
  send(mobileNumbers: string[], message);
}
