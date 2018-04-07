"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Start_1 = require("./Start");
const _1 = require(".");
_1.AuthService.configure({});
_1.DbService.configure({ mongoDb: 'serendipTests' });
Start_1.start({
    cpuCores: 1,
    controllers: [_1.AuthController, _1.ServerController],
    services: [_1.SmsService, _1.EmailService, _1.DbService, _1.AuthService]
}).then(() => {
    console.log('Server workers started successfully!');
}).catch((err) => {
    console.error(`Server start error : "${err}"`);
});
