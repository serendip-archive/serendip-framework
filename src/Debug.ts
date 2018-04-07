import { start } from './Start'


import {
    AuthService, DbService, FaxService, EmailService, SmsService,
    AuthController,
    ServerController
} from '.';

AuthService.configure({});
DbService.configure({ mongoDb: 'serendipTests' });
start({
    cpuCores: 1,
    controllers: [AuthController, ServerController],
    services: [SmsService, EmailService, DbService, AuthService]
}).then(() => {

    console.log('Server workers started successfully!');

}).catch((err) => {

    console.error(`Server start error : "${err}"`);


});