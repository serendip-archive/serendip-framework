import { start } from './Start'


import {
    AuthService, DbService, FaxService, EmailService, SmsService,
    AuthController,
    EntityController
} from '.';


start({
    cpuCores: 1,
    controllers: [ AuthController , EntityController ],
    services: [ SmsService, EmailService, FaxService, DbService, AuthService ]
});