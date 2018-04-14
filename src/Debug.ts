import { start } from './Start'


import {
    AuthService, DbService, FaxService, EmailService, SmsIrService,
    AuthController,
    ServerController,
    ViewEngineService
} from '.';
import { join } from 'path';

AuthService.configure({});
DbService.configure({ mongoDb: 'serendipTests' });
start({
    cert: join(__dirname, '..', 'localhost_cert.pem'),
    key: join(__dirname, '..', 'localhost_key.pem'),
    staticPath: __dirname,
    cpuCores: 1,
    httpsOnly: false,
    controllers: [AuthController, ServerController],
    services: [SmsIrService, EmailService, DbService, AuthService, ViewEngineService]
}).then(() => {

    console.log('Server workers started successfully!');

}).catch((err) => {

    console.error(`Server start error : "${err}"`);


});