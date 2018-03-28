import { EmailModel } from '../models/EmailModel'
import { ServerServiceInterface } from '../core';


export class EmailService implements ServerServiceInterface {

    static dependencies = ['DbService'];

    async start() {

    }

    public sendEmail(email: EmailModel) {



    }

    public syncFolders() {



    }
}
