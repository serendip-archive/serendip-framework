import { EmailModel } from './models'
import { ServerServiceInterface } from '../core';
import * as _ from 'underscore';
import * as nodeMailer from 'nodemailer';
import { DbService, Server, DbCollection, ViewEngineService } from '..';
import * as fs from "fs";
import * as glob from 'glob';
import * as path from 'path';

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

    private _dbService: DbService;
    private _viewEngineService: ViewEngineService;

    static dependencies = ['DbService', 'ViewEngineService'];
    private outboxCollection: DbCollection<EmailModel>;

    static options: EmailServiceOptionsInterface = {};

    static emailTemplates = [];

    static configure(options: EmailServiceOptionsInterface): void {
        EmailService.options = _.extend(EmailService.options, options);
    }

    private loadTemplates() {

        return new Promise((resolve, reject) => {

            glob(path.join(EmailService.options.templatesPath, '*.html'), (err, templates) => {
                templates.forEach((tmp) => {
                    EmailService.emailTemplates.push(
                        {
                            name: path.parse(tmp).name.toLowerCase(),
                            source: fs.readFileSync(tmp).toString()
                        }
                    );
                });

                resolve();

            });

        });

    };
    async start() {

        this._dbService = Server.services["DbService"];
        this._viewEngineService = Server.services["ViewEngineService"];
        this.outboxCollection = await this._dbService.collection<EmailModel>("EmailOutbox");

        if (EmailService.options.templatesPath)
            await this.loadTemplates();

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



            if (!emailModel.attachments)
                emailModel.attachments = [];


            if (emailModel.template) {

                var templateName = emailModel.template.name;
                if (emailModel.template.culture)
                    templateName += "." + emailModel.template.culture.toLowerCase();

                var template = _.findWhere(EmailService.emailTemplates, {
                    name: templateName
                });

                if (!emailModel.template.data)
                    emailModel.template.data = {};

                if (template)
                    emailModel.html = this._viewEngineService.renderMustache(template.source, emailModel.template.data);

            }

            transporter.sendMail(emailModel, (err, info) => {
                if (err)
                    return reject(err);


                this.outboxCollection.insertOne(emailModel);

                resolve(info);
            });



        });

    }


}
