"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Start_1 = require("./Start");
const _1 = require(".");
const path_1 = require("path");
_1.AuthService.configure({});
_1.DbService.configure({ mongoDb: 'serendipTests' });
Start_1.start({
    cert: path_1.join(__dirname, '..', 'localhost_cert.pem'),
    key: path_1.join(__dirname, '..', 'localhost_key.pem'),
    staticPath: __dirname,
    cpuCores: 1,
    httpsOnly: false,
    controllers: [_1.AuthController, _1.ServerController],
    services: [_1.SmsService, _1.EmailService, _1.DbService, _1.AuthService, _1.ViewEngineService]
}).then(() => {
    console.log('Server workers started successfully!');
}).catch((err) => {
    console.error(`Server start error : "${err}"`);
});
