import { start } from './Start'


import {
    AuthService, DbService, FaxService, EmailService, SmsService,
    AuthController,
    ServerController
} from '.';

AuthService.configure({});

start({
    cpuCores: 1,
    controllers: [AuthController, ServerController],
    services: [SmsService, EmailService, FaxService, DbService, AuthService]
});