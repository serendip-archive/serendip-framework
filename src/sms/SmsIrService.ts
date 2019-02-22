import { ServerServiceInterface } from "../server";
import * as request from "request";
import * as _ from "underscore";
import { SmsServiceProviderInterface } from ".";
import { DbService } from "../db";

export interface SmsIrServiceOptionsInterface {
  lineNumber: string;
  apiKey: string;
  secretKey: string;

  verifyTemplateWithIpAndUseragent?: number;
  verifyTemplate?: number;
}

export class SmsIrService
  implements ServerServiceInterface, SmsServiceProviderInterface {
  static options: SmsIrServiceOptionsInterface = {
    apiKey: "",
    lineNumber: "",
    secretKey: "",
    verifyTemplate: 0,
    verifyTemplateWithIpAndUseragent: 0
  };

  static configure(options: SmsIrServiceOptionsInterface): void {
    SmsIrService.options = _.extend(SmsIrService.options, options);
  }

  constructor(private dbService: DbService) {
    if (
      !SmsIrService.options.apiKey ||
      !SmsIrService.options.lineNumber ||
      !SmsIrService.options.secretKey
    )
      throw new Error("Configure SmsIrService options.");
  }

  private token: string;
  private tokenIssueAt: number;

  getToken() {
    return new Promise((resolve, reject) => {
      if (this.tokenIssueAt)
        if (Date.now() - this.tokenIssueAt < 1000 * 60 * 29)
          return resolve(this.token);

      request(
        {
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
        },
        (error, response, body) => {
          if (body)
            if (body.TokenKey) {
              this.token = body.TokenKey;
              this.tokenIssueAt = Date.now();

              console.log("SmsIrService getToken success =>", body);

              resolve(this.token);
              return;
            } else {
              reject();
              return;
            }
          if (error) {
            console.log("SmsIrService getToken error =>", error);
            reject(error);
            return;
          }
        }
      );
    });
  }

  credit() {
    return new Promise((resolve, reject) => {
      this.getToken().then(token => {
        request(
          {
            method: "GET",
            url: "http://RestfulSms.com/api/credit",
            headers: {
              "Cache-Control": "no-cache",
              "Content-Type": "application/json",
              "x-sms-ir-secure-token": token
            },
            json: true
          },
          (error, response, body) => {
            if (error) return reject(error);

            if (body.Credit) {
              resolve(body.Credit);
            } else reject();
          }
        );
      });
    });
  }

  sendAuthCode(
    mobileNumber: string,
    code: string,
    useragent?: string,
    ip?: string
  ) {
    return new Promise((resolve, reject) => {
      console.log("SmsIrService sendVerification =>", mobileNumber, code);

      if (
        SmsIrService.options.verifyTemplateWithIpAndUseragent ||
        SmsIrService.options.verifyTemplate
      ) {
        var smsPayload = {
          ParameterArray: [
            { Parameter: "VerificationCode", ParameterValue: code }
          ],
          Mobile: mobileNumber,
          TemplateId:
            ip && useragent
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
            request(
              {
                method: "POST",
                url: "http://RestfulSms.com/api/UltraFastSend",
                headers: {
                  "Cache-Control": "no-cache",
                  "Content-Type": "application/json",
                  "x-sms-ir-secure-token": token
                },
                body: smsPayload,
                json: true
              },
              function(error, response, body) {
                if (error) {
                  console.error(
                    "SmsIrService sendVerification Error =>",
                    error
                  );
                  return reject(error);
                }
                if (!body.IsSuccessful) {
                  return reject(body);
                } else {
                  resolve(body);
                }
              }
            );
          })
          .catch(e => {
            console.error(e);
            reject(e);
          });
      } else {
        this.getToken()
          .then(token => {
            request(
              {
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
              },
              function(error, response, body) {
                if (error) {
                  console.error(
                    "SmsIrService sendVerification Error =>",
                    error
                  );
                  return reject(error);
                }
                if (!body.IsSuccessful) {
                  return reject(body);
                } else {
                  resolve(body);
                }
              }
            );
          })
          .catch(e => {
             
            reject(e);
          });
      }
    });
  }

  send(mobileNumbers: string[], message) {
    return new Promise((resolve, reject) => {
      this.getToken()
        .then(token => {
          request(
            {
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
            },
            function(error, response, body) {
              if (error) return reject(error);

              if (body.IsSuccessful) resolve(body);
              else reject(body);
            }
          );
        })
        .catch(reject);
    });
  }

  async start() {}
}
