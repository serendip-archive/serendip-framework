import { EmailModel } from "./models";
import { ServerServiceInterface } from "../server";
import * as _ from "underscore";
import * as nodeMailer from "nodemailer";
import { DbService, Server, ViewEngineService } from "..";
import * as fs from "fs";
import * as glob from "glob";
import * as path from "path";
import { DbCollectionInterface } from "serendip-business-model";

export interface EmailServiceSmtpOptionsInterface {
  username: string;
  password: string;
  host: string;
  port: number;
  ssl: boolean;
}

export interface EmailServiceOptionsInterface {
  smtp?: EmailServiceSmtpOptionsInterface;
  templatesPath?: string;
}

export class EmailService implements ServerServiceInterface {
  private outboxCollection: DbCollectionInterface<EmailModel>;

  static options: EmailServiceOptionsInterface = {};

  static emailTemplates = [];

  constructor(
    private dbService: DbService,
    private viewEngineService: ViewEngineService
  ) {}

  static configure(options: EmailServiceOptionsInterface): void {
    EmailService.options = _.extend(EmailService.options, options);
  }

  private loadTemplates() {
    return new Promise((resolve, reject) => {
      glob(
        path.join(EmailService.options.templatesPath, "*.html"),
        (err, templates) => {
          templates.forEach(tmp => {
            EmailService.emailTemplates.push({
              name: path.parse(tmp).name.toLowerCase(),
              source: fs.readFileSync(tmp).toString()
            });
          });

          resolve();
        }
      );
    });
  }

  async start() {
    this.outboxCollection = await this.dbService.collection<EmailModel>(
      "EmailOutbox"
    );

    if (EmailService.options.templatesPath) await this.loadTemplates();
  }

  public send(emailModel: EmailModel): Promise<void> {
    return new Promise((resolve, reject) => {
      var transporter = nodeMailer.createTransport({
        host: EmailService.options.smtp.host,
        port: EmailService.options.smtp.port,
        secure: EmailService.options.smtp.ssl, // true for 465, false for other ports
        auth: {
          user: EmailService.options.smtp.username,
          pass: EmailService.options.smtp.password
        }
      });

      if (!emailModel.attachments) emailModel.attachments = [];

      if (emailModel.template && emailModel.template.name) {
        if (!emailModel.template.source)
          emailModel.template.source = _.findWhere(
            EmailService.emailTemplates,
            {
              name: emailModel.template.name
            }
          );

        if (!emailModel.template.data) emailModel.template.data = {};

        if (emailModel.template.source)
          emailModel.html = this.viewEngineService.renderMustache(
            emailModel.template.source,
            emailModel.template.data
          );
        else reject("no template source");
      }

      transporter.sendMail(emailModel, (err, info) => {
        if (err) return reject(err);

        this.outboxCollection.insertOne(emailModel);

        resolve(info);
      });
    });
  }
}
