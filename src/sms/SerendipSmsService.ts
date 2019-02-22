import { ServerServiceInterface, Server } from "../server";
import * as request from "request";
import * as _ from "underscore";
import { SmsServiceProviderInterface } from ".";
import { TokenModel } from "serendip-business-model";

export interface SerendipSmsServiceOptionsInterface {
  /**
   *  username(it's mobile by default) registered in https://serendip.cloud
   */
  username: string;

  /**
   * password from serendip.cloud
   */
  password: string;

  /**
   * line number used for sending sms to +98 numbers.
   */
  irLine?: string;

  /**
   * line number used for sending sms to any number in the world other than iran
   */
  globalLine?: string;
}

export class SerendipSmsService
  implements ServerServiceInterface, SmsServiceProviderInterface {
  static dependencies = ["DbService"];

  static options: SerendipSmsServiceOptionsInterface = {
    username: "",
    password: ""
  };

  static configure(options: SerendipSmsService): void {
    SerendipSmsService.options = _.extend(SerendipSmsService.options, options);
  }

  constructor() {
    if (
      !SerendipSmsService.options.username ||
      !SerendipSmsService.options.password
    )
      throw new Error("Configure SerendipSmsService options.");
  }

  private token: TokenModel;
  private tokenIssueAt: number;

  getToken(): Promise<TokenModel> {
    return new Promise((resolve, reject) => {
      if (this.tokenIssueAt)
        if (Date.now() - this.tokenIssueAt <  1000 * 60 * 60)
          return resolve(this.token);

      request(
        {
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
        },
        (error, response, body) => {
          if (error) {
            if (Server.opts.logging == "info" || Server.opts.logging == "error")
              console.log("SerendipSmsService getToken error =>", error);

            reject(error);
            return;
          }

          if (Server.opts.logging == "info")
            console.log("SerendipSmsService getToken success =>", body);

          this.token = body;
          this.tokenIssueAt = Date.now();
        }
      );
    });
  }

  credit(): Promise<number> {
    return new Promise((resolve, reject) => {
      this.getToken().then(token => {
        request(
          {
            method: "GET",
            url: "https://serendip.cloud/api/sms/credit",
            headers: {
              Authorization: "Bearer " + this.token.access_token
            },
            json: true
          },
          (error, response, body) => {
            if (error) return reject(error);
            resolve(body);
          }
        );
      });
    });
  }

  sendAuthCode(
    mobileNumber: string,
    code: string,
    useragent?: string,
    ip?: string,
    templateId?: string
  ) {
    console.log("SerendipSmsService sendAuthCode =>", mobileNumber, code);

    return this.send([mobileNumber], null, { code, useragent, ip });
  }

  send(
    mobileNumbers: string[],
    message: string,
    model?: any,
    templateId?: string
  ) {
    return new Promise((resolve, reject) => {
      this.getToken()
        .then(token => {
          request(
            {
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
            },
            function(error, response, body) {
              if (error) return reject(error);

              resolve(body);
            }
          );
        })
        .catch(reject);
    });
  }

  async start() {}
}
