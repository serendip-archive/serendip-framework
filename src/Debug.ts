import { start } from './Start'


import {
    AuthService, DbService, FaxService, EmailService, SmsService,
    AuthController,
    EntityController,
    ServerController
} from '.';


start({
    cpuCores: 1,
    controllers: [ AuthController , EntityController , ServerController ],
    services: [ SmsService, EmailService, FaxService, DbService, AuthService ]
});