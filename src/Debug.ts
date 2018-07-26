import { start } from './Start'


import {
    AuthService, DbService, FaxService, EmailService, SmsIrService,
    AuthController,
    ServerController,
    ViewEngineService
} from '.';
import { join } from 'path';

AuthService.configure({
    tokenExpireIn: 1000 * 60 * 60,
    smsProvider : 'SmsIrService'
});

DbService.configure({
    mongoDb: 'serendipTests',
    mongoUrl: 'mongodb://localhost:27017'
});
start({
    cert: join(__dirname, '..', 'localhost_cert.pem'),
    key: join(__dirname, '..', 'localhost_key.pem'),
    staticPath: __dirname,
    cpuCores: 1,
    httpPort: 2020,
    httpsPort: 2022,
    httpsOnly: false,
    controllers: [AuthController, ServerController],
    services: [SmsIrService, EmailService, DbService, AuthService, ViewEngineService]
}).then(() => {

    console.log('Server workers started successfully!');

}).catch((err) => {

    console.error(err);
    process.exit();

});