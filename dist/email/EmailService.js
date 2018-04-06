"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("underscore");
const nodeMailer = require("nodemailer");
const __1 = require("..");
class EmailService {
    static configure(options) {
        EmailService.options = _.extend(EmailService.options, options);
    }
    async start() {
        this._dbService = __1.Server.services["DbService"];
        this.outboxCollection = await this._dbService.collection("EmailOutbox");
    }
    send(emailModel) {
        return new Promise((resolve, reject) => {
            let transporter = nodeMailer.createTransport({
                host: EmailService.options.smtp.host,
                port: EmailService.options.smtp.port,
                secure: EmailService.options.smtp.ssl,
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
EmailService.dependencies = ['DbService'];
EmailService.options = {};
exports.EmailService = EmailService;
