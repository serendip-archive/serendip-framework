import { start } from './Start'


import {
    AuthService, DbService, FaxService, EmailService, SmsService,
    AuthController
} from '.';


start({
    cpuCores: 1,
    controllers: { AuthController },
    services: { SmsService, EmailService, FaxService, DbService, AuthService }
});