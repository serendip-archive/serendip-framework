import { ServerServiceInterface } from "../core";
import * as request from 'request';
import { SmsServiceProviderInterface } from ".";


export interface SmsIrServiceOptionsInterface {

    lineNumber: string;
    apiKey: string;
    secretKey: string;


}


export class SmsIrService implements ServerServiceInterface, SmsServiceProviderInterface {

    static dependencies = ["DbService"];


    static options: SmsIrServiceOptionsInterface;


    static configure(options: SmsIrServiceOptionsInterface): void {
        SmsIrService.options = options;
    }

    private token: string;
    private tokenIssueAt: number

    getToken() {
        return new Promise((resolve, reject) => {


            if (this.tokenIssueAt)
                if (Date.now() - this.tokenIssueAt < 1000 * 60 * 29)
                    return resolve(this.token);

            request({
                method: 'POST',
                url: 'http://RestfulSms.com/api/Token',
                headers:
                    {
                        'Cache-Control': 'no-cache',
                        'Content-Type': 'application/json'
                    },
                body:
                    {
                        UserApiKey: SmsIrService.options.apiKey,
                        SecretKey: SmsIrService.options.secretKey
                    },
                json: true
            }, (error, response, body) => {
                if (error)
                    return reject(error);

                if (body.TokenKey) {
                    this.token = body.TokenKey;
                    this.tokenIssueAt = Date.now();
                    resolve(this.token);

                }
                else
                    reject();


            });

        });

    }

    credit() {
        return new Promise((resolve, reject) => {

            this.getToken().then(token => {

                request({
                    method: 'GET',
                    url: 'http://RestfulSms.com/api/credit',
                    headers:
                        {
                            'Cache-Control': 'no-cache',
                            'Content-Type': 'application/json',
                            'x-sms-ir-secure-token': token
                        },
                    json: true
                }, (error, response, body) => {
                    if (error)
                        return reject(error);

                    if (body.Credit) {
                        resolve(body.Credit);
                    }
                    else
                        reject();
                });

            });
        });

    }

    sendVerification(mobileNumber: string, code: string) {
        return new Promise((resolve, reject) => {

            this.getToken().then(token => {

                request({
                    method: 'POST',
                    url: 'http://RestfulSms.com/api/VerificationCode',
                    headers:
                        {
                            'Cache-Control': 'no-cache',
                            'Content-Type': 'application/json',
                            'x-sms-ir-secure-token': token
                        },
                    body: {
                        Code: code,
                        MobileNumber: mobileNumber
                    },
                    json: true
                }, function (error, response, body) {
                    if (error)
                        return reject(error);

                    if (body.IsSuccessful)
                        resolve(body);
                    else
                        reject(body);
                });
            }).catch(reject);

        });
    }

    send(mobileNumbers: string[], message) {
        return new Promise((resolve, reject) => {

            this.getToken().then(token => {

                request({
                    method: 'POST',
                    url: 'http://RestfulSms.com/api/VerificationCode',
                    headers:
                        {
                            'Cache-Control': 'no-cache',
                            'Content-Type': 'application/json',
                            'x-sms-ir-secure-token': token
                        },
                    body: {
                        Messages: [message],
                        MobileNumbers: mobileNumbers,
                        LineNumber: SmsIrService.options.lineNumber,
                        SendDateTime: '',
                        CanContinueInCaseOfError: 'false'
                    },
                    json: true
                }, function (error, response, body) {
                    if (error)
                        return reject(error);

                    if (body.IsSuccessful)
                        resolve(body);
                    else
                        reject(body);
                });
            }).catch(reject);

        });
    }

    async start() {


    }

}