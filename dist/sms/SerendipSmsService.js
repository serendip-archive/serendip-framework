"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../core");
const request = require("request");
const _ = require("underscore");
class SerendipSmsService {
    constructor() {
        if (!SerendipSmsService.options.username ||
            !SerendipSmsService.options.password)
            throw new Error("Configure SerendipSmsService options.");
    }
    static configure(options) {
        SerendipSmsService.options = _.extend(SerendipSmsService.options, options);
    }
    getToken() {
        return new Promise((resolve, reject) => {
            if (this.tokenIssueAt)
                if (Date.now() - this.tokenIssueAt < 1000 * 60 * 60)
                    return resolve(this.token);
            request({
                method: "POST",
                url: "https://serendip.cloud/api/auth/token",
                headers: {
                    "Cache-Control": "no-cache",
                    "Content-Type": "application/json"
                },
                body: {
                    username: SerendipSmsService.options.username,
                    password: SerendipSmsService.options.password
                },
                json: true
            }, (error, response, body) => {
                if (error) {
                    if (core_1.Server.opts.logging == "info" || core_1.Server.opts.logging == "error")
                        console.log("SerendipSmsService getToken error =>", error);
                    reject(error);
                    return;
                }
                if (core_1.Server.opts.logging == "info")
                    console.log("SerendipSmsService getToken success =>", body);
                this.token = body;
                this.tokenIssueAt = Date.now();
            });
        });
    }
    credit() {
        return new Promise((resolve, reject) => {
            this.getToken().then(token => {
                request({
                    method: "GET",
                    url: "https://serendip.cloud/api/sms/credit",
                    headers: {
                        Authorization: "Bearer " + this.token.access_token
                    },
                    json: true
                }, (error, response, body) => {
                    if (error)
                        return reject(error);
                    resolve(body);
                });
            });
        });
    }
    sendAuthCode(mobileNumber, code, useragent, ip, templateId) {
        console.log("SerendipSmsService sendAuthCode =>", mobileNumber, code);
        return this.send([mobileNumber], null, { code, useragent, ip });
    }
    send(mobileNumbers, message, model, templateId) {
        return new Promise((resolve, reject) => {
            this.getToken()
                .then(token => {
                request({
                    method: "POST",
                    url: "http://serendip.cloud.com/api/sms.send",
                    headers: {
                        Authorization: "Bearer " + token.access_token
                    },
                    body: {
                        message,
                        mobileNumbers,
                        model
                    },
                    json: true
                }, function (error, response, body) {
                    if (error)
                        return reject(error);
                    resolve(body);
                });
            })
                .catch(reject);
        });
    }
    async start() { }
}
SerendipSmsService.dependencies = ["DbService"];
SerendipSmsService.options = {
    username: "",
    password: ""
};
exports.SerendipSmsService = SerendipSmsService;
