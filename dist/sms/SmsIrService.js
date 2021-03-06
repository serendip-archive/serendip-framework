"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request");
const _ = require("underscore");
class SmsIrService {
    constructor(dbService) {
        this.dbService = dbService;
        if (!SmsIrService.options.apiKey ||
            !SmsIrService.options.lineNumber ||
            !SmsIrService.options.secretKey)
            throw new Error("Configure SmsIrService options.");
    }
    static configure(options) {
        SmsIrService.options = _.extend(SmsIrService.options, options);
    }
    getToken() {
        return new Promise((resolve, reject) => {
            if (this.tokenIssueAt)
                if (Date.now() - this.tokenIssueAt < 1000 * 60 * 29)
                    return resolve(this.token);
            request({
                method: "POST",
                url: "http://RestfulSms.com/api/Token",
                headers: {
                    "Cache-Control": "no-cache",
                    "Content-Type": "application/json"
                },
                body: {
                    UserApiKey: SmsIrService.options.apiKey,
                    SecretKey: SmsIrService.options.secretKey
                },
                json: true
            }, (error, response, body) => {
                if (body)
                    if (body.TokenKey) {
                        this.token = body.TokenKey;
                        this.tokenIssueAt = Date.now();
                        console.log("SmsIrService getToken success =>", body);
                        resolve(this.token);
                        return;
                    }
                    else {
                        reject();
                        return;
                    }
                if (error) {
                    console.log("SmsIrService getToken error =>", error);
                    reject(error);
                    return;
                }
            });
        });
    }
    credit() {
        return new Promise((resolve, reject) => {
            this.getToken().then(token => {
                request({
                    method: "GET",
                    url: "http://RestfulSms.com/api/credit",
                    headers: {
                        "Cache-Control": "no-cache",
                        "Content-Type": "application/json",
                        "x-sms-ir-secure-token": token
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
    sendAuthCode(mobileNumber, code, useragent, ip) {
        return new Promise((resolve, reject) => {
            console.log("SmsIrService sendVerification =>", mobileNumber, code);
            if (SmsIrService.options.verifyTemplateWithIpAndUseragent ||
                SmsIrService.options.verifyTemplate) {
                var smsPayload = {
                    ParameterArray: [
                        { Parameter: "VerificationCode", ParameterValue: code }
                    ],
                    Mobile: mobileNumber,
                    TemplateId: ip && useragent
                        ? SmsIrService.options.verifyTemplateWithIpAndUseragent
                        : SmsIrService.options.verifyTemplate
                };
                if (ip)
                    smsPayload.ParameterArray.push({
                        Parameter: "ip",
                        ParameterValue: "IP: " + (ip == "::1" ? "127.0.0.1" : ip)
                    });
                if (useragent)
                    smsPayload.ParameterArray.push({
                        Parameter: "useragent",
                        ParameterValue: useragent
                    });
                this.getToken()
                    .then(token => {
                    request({
                        method: "POST",
                        url: "http://RestfulSms.com/api/UltraFastSend",
                        headers: {
                            "Cache-Control": "no-cache",
                            "Content-Type": "application/json",
                            "x-sms-ir-secure-token": token
                        },
                        body: smsPayload,
                        json: true
                    }, function (error, response, body) {
                        if (error) {
                            console.error("SmsIrService sendVerification Error =>", error);
                            return reject(error);
                        }
                        if (!body.IsSuccessful) {
                            return reject(body);
                        }
                        else {
                            resolve(body);
                        }
                    });
                })
                    .catch(e => {
                    console.error(e);
                    reject(e);
                });
            }
            else {
                this.getToken()
                    .then(token => {
                    request({
                        method: "POST",
                        url: "http://RestfulSms.com/api/VerificationCode",
                        headers: {
                            "Cache-Control": "no-cache",
                            "Content-Type": "application/json",
                            "x-sms-ir-secure-token": token
                        },
                        body: {
                            Code: code,
                            mobileNumber: mobileNumber
                        },
                        json: true
                    }, function (error, response, body) {
                        if (error) {
                            console.error("SmsIrService sendVerification Error =>", error);
                            return reject(error);
                        }
                        if (!body.IsSuccessful) {
                            return reject(body);
                        }
                        else {
                            resolve(body);
                        }
                    });
                })
                    .catch(e => {
                    reject(e);
                });
            }
        });
    }
    send(mobileNumbers, message) {
        return new Promise((resolve, reject) => {
            this.getToken()
                .then(token => {
                request({
                    method: "POST",
                    url: "http://RestfulSms.com/api/MessageSend",
                    headers: {
                        "Cache-Control": "no-cache",
                        "Content-Type": "application/json",
                        "x-sms-ir-secure-token": token
                    },
                    body: {
                        Messages: [message],
                        MobileNumbers: mobileNumbers,
                        LineNumber: SmsIrService.options.lineNumber,
                        SendDateTime: "",
                        CanContinueInCaseOfError: "true"
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
            })
                .catch(reject);
        });
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
SmsIrService.options = {
    apiKey: "",
    lineNumber: "",
    secretKey: "",
    verifyTemplate: 0,
    verifyTemplateWithIpAndUseragent: 0
};
exports.SmsIrService = SmsIrService;
