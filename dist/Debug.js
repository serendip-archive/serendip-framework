"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Start_1 = require("./Start");
const _1 = require(".");
Start_1.start({
    cpuCores: 1,
    controllers: [_1.AuthController, _1.EntityController, _1.ServerController],
    services: [_1.SmsService, _1.EmailService, _1.FaxService, _1.DbService, _1.AuthService]
});
