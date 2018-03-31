"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Start_1 = require("./Start");
const _1 = require(".");
Start_1.start({
    cpuCores: 1,
    controllers: { AuthController: _1.AuthController },
    services: { SmsService: _1.SmsService, EmailService: _1.EmailService, FaxService: _1.FaxService, DbService: _1.DbService, AuthService: _1.AuthService }
});
