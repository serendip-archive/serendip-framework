import { EmailModel } from '../models/EmailModel'
import { ServiceInterface } from '.';


export class EmailService implements ServiceInterface {

    static dependencies = ['DbService'];

    async start() {

    }

    public sendEmail(email: EmailModel) {



    }

    public syncFolders() {



    }
}
