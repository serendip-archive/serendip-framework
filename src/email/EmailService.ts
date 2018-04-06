import { EmailModel } from './models'
import { ServerServiceInterface } from '../core';
import * as _ from 'underscore';
import * as nodeMailer from 'nodemailer';
import { DbService, Server, DbCollection } from '..';

export interface EmailServiceSmtpOptionsInterface {

    username: string;
    password: string;
    host: string;
    port: number;
    ssl: boolean;

}

export interface EmailServiceOptionsInterface {

    smtp?: EmailServiceSmtpOptionsInterface;

}


export class EmailService implements ServerServiceInterface {

    private _dbService: DbService;

    static dependencies = ['DbService'];
    private outboxCollection: DbCollection<EmailModel>;

    static options: EmailServiceOptionsInterface = {};


    static configure(options: EmailServiceOptionsInterface): void {
        EmailService.options = _.extend(EmailService.options, options);
    }

    async start() {

        this._dbService = Server.services["DbService"];
        this.outboxCollection = await this._dbService.collection<EmailModel>("EmailOutbox");

    }





    public send(emailModel: EmailModel): Promise<void> {

        return new Promise((resolve, reject) => {

            let transporter = nodeMailer.createTransport({
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



            transporter.sendMail(emailModel, (err, info) => {
               
                if (err)
                    return reject(err);



                this.outboxCollection.insertOne(emailModel);
                resolve(info);
                // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
            });



        });

    }


}
