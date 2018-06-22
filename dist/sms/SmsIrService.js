"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request");
class SmsIrService {
    static configure(options) {
        SmsIrService.options = options;
    }
    getToken() {
        return new Promise((resolve, reject) => {
            if (this.tokenIssueAt)
                if (Date.now() - this.tokenIssueAt < 1000 * 60 * 29)
                    return resolve(this.token);
            request({
                method: 'POST',
                url: 'http://RestfulSms.com/api/Token',
                headers: {
                    'Cache-Control': 'no-cache',
                    'Content-Type': 'application/json'
                },
                body: {
                    UserApiKey: SmsIrService.options.apiKey,
                    SecretKey: SmsIrService.options.secretKey
                },
                json: true
            }, (error, response, body) => {
                if (error) {
                    console.log('SmsIrService getToken =>', error);
                    return reject(error);
                }
                if (body.TokenKey) {
                    this.token = body.TokenKey;
                    this.tokenIssueAt = Date.now();
                    console.log('SmsIrService getToken =>', body);
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
                    headers: {
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
    sendVerification(mobileNumber, code) {
        return new Promise((resolve, reject) => {
            console.log('SmsIrService sendVerification =>', mobileNumber, code);
            this.getToken().then(token => {
                request({
                    method: 'POST',
                    url: 'http://RestfulSms.com/api/VerificationCode',
                    headers: {
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
                    if (error) {
                        console.log('SmsIrService sendVerification =>', error);
                        return reject(error);
                    }
                    console.log('SmsIrService sendVerification =>', body);
                    if (body.IsSuccessful)
                        resolve(body);
                    else
                        reject(body);
                });
            }).catch(reject);
        });
    }
    send(mobileNumbers, message) {
        return new Promise((resolve, reject) => {
            this.getToken().then(token => {
                request({
                    method: 'POST',
                    url: 'http://RestfulSms.com/api/VerificationCode',
                    headers: {
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
SmsIrService.dependencies = ["DbService"];
exports.SmsIrService = SmsIrService;
